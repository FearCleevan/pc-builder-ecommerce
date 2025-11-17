import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const COMPONENT_CATEGORIES = {
  'cpu': 'Processors',
  'cpu-cooler': 'CPU Coolers',
  'motherboard': 'Motherboards',
  'memory': 'Memory',
  'storage': 'Storage',
  'video-card': 'Video Cards',
  'power-supply': 'Power Supplies',
  'case': 'Cases',
  'peripherals': 'Peripherals',
  'headphones': 'Headphones',
  'keyboard': 'Keyboards',
  'mouse': 'Mice',
  'speakers': 'Speakers',
  'webcam': 'Webcams',
  'display': 'Displays',
  'monitor': 'Monitors',
  'software': 'Software',
  'operating-system': 'Operating Systems',
  'expansion': 'Expansion',
  'sound-card': 'Sound Cards',
  'wired-networking': 'Wired Networking',
  'wireless-networking': 'Wireless Networking',
  'accessories': 'Accessories / Other',
  'case-fan': 'Case Fans',
  'fan-controller': 'Fan Controllers',
  'thermal-compound': 'Thermal Compound',
  'external-hard-drive': 'External Hard Drives',
  'optical-drive': 'Optical Drives',
  'ups': 'Uninterruptible Power Supplies'
};

class SmartAssetUploader {
  constructor() {
    this.uploadedAssets = [];
    this.skippedAssets = [];
    this.failedUploads = [];
    this.existingAssets = new Set();
  }

  // Load existing assets from Cloudinary to avoid duplicates
  async loadExistingAssets() {
    console.log('🔍 Loading existing assets from Cloudinary...');
    
    try {
      // Search for all assets in the pc-builder folder
      const result = await cloudinary.v2.search
        .expression('folder:pc-builder/*')
        .max_results(500)
        .execute();

      result.resources.forEach(resource => {
        this.existingAssets.add(resource.public_id);
      });

      console.log(`📁 Found ${this.existingAssets.size} existing assets in Cloudinary`);
    } catch (error) {
      console.warn('⚠️ Could not load existing assets from Cloudinary:', error.message);
    }
  }

  normalizeFileName(filename) {
    return path.basename(filename, path.extname(filename))
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  extractComponentInfo(filePath) {
    const normalizedPath = filePath.replace(/\\/g, '/');
    const parts = normalizedPath.split('/');
    
    const assetsIndex = parts.indexOf('assets');
    if (assetsIndex === -1) {
      throw new Error('Invalid file path: assets folder not found');
    }
    
    const category = parts[assetsIndex + 1];
    const brand = parts[assetsIndex + 2];
    const model = parts[assetsIndex + 3];
    
    return {
      category,
      brand,
      model: model ? model.replace(/\s+/g, '') : 'unknown',
      displayCategory: COMPONENT_CATEGORIES[category] || category,
      normalizedName: this.normalizeFileName(filePath),
      public_id: `pc-builder/${category}/${brand}/${model ? model.replace(/\s+/g, '') : 'unknown'}/${this.normalizeFileName(filePath)}`
    };
  }

  async checkIfAssetExists(publicId) {
    return this.existingAssets.has(publicId);
  }

  async uploadImage(filePath) {
    try {
      const componentInfo = this.extractComponentInfo(filePath);
      
      // Check if asset already exists
      const alreadyExists = await this.checkIfAssetExists(componentInfo.public_id);
      
      if (alreadyExists) {
        console.log(`⏭️  Skipping (already exists): ${componentInfo.normalizedName}`);
        this.skippedAssets.push({
          ...componentInfo,
          reason: 'Already exists in Cloudinary'
        });
        return null;
      }

      console.log(`📤 Uploading: ${componentInfo.normalizedName}`);
      console.log(`   📁 Folder: pc-builder/${componentInfo.category}/${componentInfo.brand}/${componentInfo.model}`);
      
      const result = await cloudinary.v2.uploader.upload(filePath, {
        folder: `pc-builder/${componentInfo.category}/${componentInfo.brand}/${componentInfo.model}`,
        public_id: componentInfo.normalizedName,
        use_filename: true,
        unique_filename: false,
        overwrite: false,
        resource_type: 'image',
        tags: [
          'pc-builder',
          componentInfo.category,
          componentInfo.brand,
          componentInfo.model,
          componentInfo.displayCategory
        ],
        context: {
          category: componentInfo.displayCategory,
          brand: componentInfo.brand,
          model: componentInfo.model,
          component: componentInfo.normalizedName
        },
        transformation: [
          { width: 800, height: 800, crop: 'limit' },
          { quality: 'auto' },
          { format: 'auto' }
        ]
      });

      const assetInfo = {
        ...componentInfo,
        public_id: result.public_id,
        url: result.secure_url,
        cloudinary_id: result.public_id
      };

      this.uploadedAssets.push(assetInfo);
      console.log(`✅ Uploaded: ${assetInfo.normalizedName}`);
      console.log(`   🔗 URL: ${result.secure_url}`);
      
      return assetInfo;
    } catch (error) {
      console.error(`❌ Failed to upload ${filePath}:`, error.message);
      this.failedUploads.push({
        file: filePath,
        error: error.message
      });
      return null;
    }
  }

  findAllImageFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        this.findAllImageFiles(filePath, fileList);
      } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
        fileList.push(filePath);
      }
    });
    
    return fileList;
  }

  async uploadNewAssets(assetsDir = './assets') {
    console.log('🖥️  PC Builder - Smart Cloudinary Upload');
    console.log('========================================\n');

    // First, load existing assets to avoid duplicates
    await this.loadExistingAssets();

    console.log('🔍 Scanning for new image files...');
    
    if (!fs.existsSync(assetsDir)) {
      console.error('❌ Assets directory not found!');
      return;
    }

    const allImageFiles = this.findAllImageFiles(assetsDir);
    console.log(`📁 Found ${allImageFiles.length} image files in local directory`);

    if (allImageFiles.length === 0) {
      console.log('No image files found in assets directory');
      return;
    }

    // Filter out files that already exist
    const newImageFiles = [];
    for (const filePath of allImageFiles) {
      const componentInfo = this.extractComponentInfo(filePath);
      const exists = await this.checkIfAssetExists(componentInfo.public_id);
      
      if (!exists) {
        newImageFiles.push(filePath);
      }
    }

    console.log(`🚀 Found ${newImageFiles.length} new files to upload (${allImageFiles.length - newImageFiles.length} already exist)`);

    if (newImageFiles.length === 0) {
      console.log('🎉 All assets are already uploaded to Cloudinary!');
      return;
    }

    console.log('\n🚀 Starting upload of new assets...\n');

    const batchSize = 3;
    for (let i = 0; i < newImageFiles.length; i += batchSize) {
      const batch = newImageFiles.slice(i, i + batchSize);
      console.log(`\n🔄 Processing batch ${Math.floor(i/batchSize) + 1}...`);
      
      const batchPromises = batch.map(file => this.uploadImage(file));
      await Promise.allSettled(batchPromises);
      
      const progress = Math.min(i + batchSize, newImageFiles.length);
      console.log(`📊 Progress: ${progress}/${newImageFiles.length} (${Math.round(progress/newImageFiles.length*100)}%)`);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    this.generateReport();
  }

  generateReport() {
    console.log('\n' + '='.repeat(50));
    console.log('📊 SMART UPLOAD REPORT');
    console.log('='.repeat(50));
    
    console.log(`✅ Newly uploaded: ${this.uploadedAssets.length} files`);
    console.log(`⏭️  Skipped (already exist): ${this.skippedAssets.length} files`);
    console.log(`❌ Failed uploads: ${this.failedUploads.length} files`);

    const byCategory = {};
    [...this.uploadedAssets, ...this.skippedAssets].forEach(asset => {
      byCategory[asset.displayCategory] = (byCategory[asset.displayCategory] || 0) + 1;
    });

    console.log('\n📁 By Category:');
    Object.entries(byCategory).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} files`);
    });

    const results = {
      timestamp: new Date().toISOString(),
      uploaded: this.uploadedAssets,
      skipped: this.skippedAssets,
      failed: this.failedUploads,
      summary: {
        total_scanned: this.uploadedAssets.length + this.skippedAssets.length + this.failedUploads.length,
        newly_uploaded: this.uploadedAssets.length,
        skipped_existing: this.skippedAssets.length,
        failed: this.failedUploads.length,
        byCategory: byCategory
      }
    };

    const resultsFilename = `smart-upload-results-${Date.now()}.json`;
    fs.writeFileSync(
      resultsFilename,
      JSON.stringify(results, null, 2)
    );

    console.log(`\n💾 Detailed results saved to: ${resultsFilename}`);

    if (this.uploadedAssets.length > 0) {
      console.log('\n✅ Newly uploaded files:');
      this.uploadedAssets.forEach(asset => {
        console.log(`   - ${asset.normalizedName}`);
      });
    }

    if (this.failedUploads.length > 0) {
      console.log('\n❌ Failed uploads:');
      this.failedUploads.forEach(failed => {
        console.log(`   - ${failed.file}: ${failed.error}`);
      });
    }
  }
}

// CLI execution
async function main() {
  const uploader = new SmartAssetUploader();
  
  const args = process.argv.slice(2);
  const assetsDir = args[0] || './assets';
  
  await uploader.uploadNewAssets(assetsDir);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}

export default SmartAssetUploader;