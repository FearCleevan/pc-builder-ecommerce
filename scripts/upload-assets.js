import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from scripts/.env
dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Debug: Check if env vars are loaded
console.log('🔧 Cloudinary Config Check:');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME ? '✅ Loaded' : '❌ Missing');
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '✅ Loaded' : '❌ Missing');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '✅ Loaded' : '❌ Missing');
console.log('');

// Configure Cloudinary with direct values (no VITE_ prefix)
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

class AssetUploader {
  constructor() {
    this.uploadedAssets = [];
    this.failedUploads = [];
  }

  normalizeFileName(filename) {
    return path.basename(filename, path.extname(filename))
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  extractComponentInfo(filePath) {
    // Handle different path separators for Windows/Linux
    const normalizedPath = filePath.replace(/\\/g, '/');
    const parts = normalizedPath.split('/');
    
    // Find the indices dynamically
    const assetsIndex = parts.indexOf('assets');
    if (assetsIndex === -1) {
      throw new Error('Invalid file path: assets folder not found');
    }
    
    const category = parts[assetsIndex + 1]; // 'cpu'
    const brand = parts[assetsIndex + 2]; // 'amd', 'intel'
    const model = parts[assetsIndex + 3]; // 'lga 1700', 'am4'
    
    return {
      category,
      brand,
      model: model ? model.replace(/\s+/g, '') : 'unknown',
      displayCategory: COMPONENT_CATEGORIES[category] || category,
      normalizedName: this.normalizeFileName(filePath)
    };
  }

  async uploadImage(filePath) {
    try {
      const componentInfo = this.extractComponentInfo(filePath);
      
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

  async bulkUpload(assetsDir = './assets') {
    console.log('🔍 Scanning for image files...');
    
    if (!fs.existsSync(assetsDir)) {
      console.error('❌ Assets directory not found!');
      return;
    }

    const allImageFiles = this.findAllImageFiles(assetsDir);
    console.log(`📁 Found ${allImageFiles.length} image files`);

    if (allImageFiles.length === 0) {
      console.log('No image files found in assets directory');
      return;
    }

    console.log('🚀 Starting bulk upload...\n');

    const batchSize = 3; // Reduced for better debugging
    for (let i = 0; i < allImageFiles.length; i += batchSize) {
      const batch = allImageFiles.slice(i, i + batchSize);
      console.log(`\n🔄 Processing batch ${Math.floor(i/batchSize) + 1}...`);
      
      const batchPromises = batch.map(file => this.uploadImage(file));
      await Promise.allSettled(batchPromises);
      
      const progress = Math.min(i + batchSize, allImageFiles.length);
      console.log(`📊 Progress: ${progress}/${allImageFiles.length} (${Math.round(progress/allImageFiles.length*100)}%)`);
      
      // Increased delay between batches
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    this.generateReport();
  }

  generateReport() {
    console.log('\n' + '='.repeat(50));
    console.log('📊 UPLOAD REPORT');
    console.log('='.repeat(50));
    
    console.log(`✅ Successfully uploaded: ${this.uploadedAssets.length} files`);
    console.log(`❌ Failed uploads: ${this.failedUploads.length} files`);

    const byCategory = this.uploadedAssets.reduce((acc, asset) => {
      acc[asset.displayCategory] = (acc[asset.displayCategory] || 0) + 1;
      return acc;
    }, {});

    console.log('\n📁 By Category:');
    Object.entries(byCategory).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} files`);
    });

    const results = {
      timestamp: new Date().toISOString(),
      uploaded: this.uploadedAssets,
      failed: this.failedUploads,
      summary: {
        total: this.uploadedAssets.length + this.failedUploads.length,
        successful: this.uploadedAssets.length,
        failed: this.failedUploads.length,
        byCategory: byCategory
      }
    };

    const resultsFilename = `upload-results-${Date.now()}.json`;
    fs.writeFileSync(
      resultsFilename,
      JSON.stringify(results, null, 2)
    );

    console.log(`\n💾 Detailed results saved to: ${resultsFilename}`);

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
  const uploader = new AssetUploader();
  
  const args = process.argv.slice(2);
  const assetsDir = args[0] || './assets';
  
  console.log('🖥️  PC Builder - Cloudinary Bulk Upload');
  console.log('========================================\n');
  
  await uploader.bulkUpload(assetsDir);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}

export default AssetUploader;