import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  async loadExistingAssets() {
    console.log('🔍 Loading existing assets from Cloudinary...');
    try {
      const result = await cloudinary.v2.search
        .expression('folder:pc-builder/*')
        .max_results(500)
        .execute();

      result.resources.forEach(resource => {
        this.existingAssets.add(resource.public_id);
      });
      console.log(`📁 Found ${this.existingAssets.size} existing assets`);
    } catch (error) {
      console.warn('⚠️ Could not load existing assets:', error.message);
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
    if (assetsIndex === -1) throw new Error('Invalid file path');
    
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
      
      const alreadyExists = await this.checkIfAssetExists(componentInfo.public_id);
      if (alreadyExists) {
        console.log(`⏭️  Skipping: ${componentInfo.normalizedName}`);
        this.skippedAssets.push({ ...componentInfo, reason: 'Already exists' });
        return null;
      }

      console.log(`📤 Uploading: ${componentInfo.normalizedName}`);
      
      const result = await cloudinary.v2.uploader.upload(filePath, {
        folder: `pc-builder/${componentInfo.category}/${componentInfo.brand}/${componentInfo.model}`,
        public_id: componentInfo.normalizedName,
        use_filename: true,
        unique_filename: false,
        overwrite: false,
        resource_type: 'image',
        tags: ['pc-builder', componentInfo.category, componentInfo.brand, componentInfo.model],
        transformation: [
          { width: 800, height: 800, crop: 'limit' },
          { quality: 'auto' },
          { format: 'auto' }
        ]
      });

      const assetInfo = {
        ...componentInfo,
        public_id: result.public_id,
        url: result.secure_url
      };

      this.uploadedAssets.push(assetInfo);
      console.log(`✅ Uploaded: ${assetInfo.normalizedName}`);
      
      return assetInfo;
    } catch (error) {
      console.error(`❌ Failed: ${filePath}`, error.message);
      this.failedUploads.push({ file: filePath, error: error.message });
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
    console.log('🖥️  PC Builder - Smart Cloudinary Upload\n');
    
    await this.loadExistingAssets();
    console.log('🔍 Scanning for new image files...');
    
    if (!fs.existsSync(assetsDir)) {
      console.error('❌ Assets directory not found!');
      return;
    }

    const allImageFiles = this.findAllImageFiles(assetsDir);
    console.log(`📁 Found ${allImageFiles.length} image files locally`);

    const newImageFiles = [];
    for (const filePath of allImageFiles) {
      const componentInfo = this.extractComponentInfo(filePath);
      const exists = await this.checkIfAssetExists(componentInfo.public_id);
      if (!exists) newImageFiles.push(filePath);
    }

    console.log(`🚀 ${newImageFiles.length} new files to upload (${allImageFiles.length - newImageFiles.length} already exist)`);

    if (newImageFiles.length === 0) {
      console.log('🎉 All assets already uploaded!');
      return;
    }

    const batchSize = 3;
    for (let i = 0; i < newImageFiles.length; i += batchSize) {
      const batch = newImageFiles.slice(i, i + batchSize);
      console.log(`\n🔄 Batch ${Math.floor(i/batchSize) + 1}...`);
      
      await Promise.allSettled(batch.map(file => this.uploadImage(file)));
      
      const progress = Math.min(i + batchSize, newImageFiles.length);
      console.log(`📊 ${progress}/${newImageFiles.length} (${Math.round(progress/newImageFiles.length*100)}%)`);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    this.generateReport();
  }

  generateReport() {
    console.log('\n' + '='.repeat(50));
    console.log('📊 SMART UPLOAD REPORT');
    console.log('='.repeat(50));
    
    console.log(`✅ Newly uploaded: ${this.uploadedAssets.length}`);
    console.log(`⏭️  Skipped: ${this.skippedAssets.length}`);
    console.log(`❌ Failed: ${this.failedUploads.length}`);

    const results = {
      timestamp: new Date().toISOString(),
      uploaded: this.uploadedAssets,
      skipped: this.skippedAssets,
      failed: this.failedUploads
    };

    const resultsFilename = `smart-upload-results-${Date.now()}.json`;
    fs.writeFileSync(resultsFilename, JSON.stringify(results, null, 2));
    console.log(`\n💾 Results: ${resultsFilename}`);

    if (this.uploadedAssets.length > 0) {
      console.log('\n✅ New uploads:');
      this.uploadedAssets.forEach(asset => console.log(`   - ${asset.normalizedName}`));
    }
  }
}

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