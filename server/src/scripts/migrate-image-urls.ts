import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Import models
import Service from '../models/service.model';
import Portfolio from '../models/portfolio.model';
import CareArticle from '../models/care-article.model';
import BlogPost from '../models/blog-post.model';

const OLD_URLS = [
  'http://localhost:8080',
  'http://80.78.243.241:8081',
  'http://80.78.243.241:8080',
];
const NEW_URL = 'https://api.bellezza-est.ru';

// Helper function to check if URL contains any old URL
const containsOldUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  return OLD_URLS.some(oldUrl => url.includes(oldUrl));
};

// Helper function to replace URLs in a string
const replaceUrl = (url: string | undefined): string | undefined => {
  if (!url) return url;
  
  let updatedUrl = url;
  
  // Replace all old URLs with the new one
  for (const oldUrl of OLD_URLS) {
    updatedUrl = updatedUrl.replace(new RegExp(oldUrl, 'g'), NEW_URL);
  }
  
  return updatedUrl;
};

// Helper function to replace URLs in an array
const replaceUrlsInArray = (urls: string[] | undefined): string[] | undefined => {
  if (!urls || !Array.isArray(urls)) return urls;
  return urls.map(url => replaceUrl(url) || url);
};

// Helper function to generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-zа-яё0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Helper function to generate random string
const generateRandomString = (length: number = 8): string => {
  return Math.random().toString(36).substring(2, 2 + length);
};

async function migrateImageUrls() {
  try {
    console.log('🔄 Starting image URL migration...\n');

    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://root:Jdjdb2334328Hdbndhj@cluster0.y6mrt.mongodb.net/bellezza-est?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB\n');

    let totalUpdated = 0;

    // 1. Migrate Services
    console.log('📋 Migrating Services...');
    const services = await Service.find({});
    let servicesUpdated = 0;
    
    for (const service of services) {
      let updated = false;
      
      if (service.image && containsOldUrl(service.image)) {
        service.image = replaceUrl(service.image) || service.image;
        updated = true;
      }
      
      if (updated) {
        await service.save();
        servicesUpdated++;
        console.log(`  ✓ Updated service: ${service.title}`);
      }
    }
    console.log(`  Total services updated: ${servicesUpdated}\n`);
    totalUpdated += servicesUpdated;

    // 2. Migrate Portfolio
    console.log('🖼️  Migrating Portfolio...');
    const portfolioItems = await Portfolio.find({});
    let portfolioUpdated = 0;
    
    for (const item of portfolioItems) {
      let updated = false;
      
      if (item.src && containsOldUrl(item.src)) {
        item.src = replaceUrl(item.src) || item.src;
        updated = true;
      }
      
      if (updated) {
        await item.save();
        portfolioUpdated++;
        console.log(`  ✓ Updated portfolio item: ${item._id}`);
      }
    }
    console.log(`  Total portfolio items updated: ${portfolioUpdated}\n`);
    totalUpdated += portfolioUpdated;

    // 3. Migrate Care Articles
    console.log('💆 Migrating Care Articles...');
    const careArticles = await CareArticle.find({});
    let careUpdated = 0;
    
    for (const article of careArticles) {
      let updated = false;
      
      // Fix missing slug
      if (!article.slug && article.title) {
        const baseSlug = generateSlug(article.title);
        article.slug = `${baseSlug}-${generateRandomString(6)}`;
        updated = true;
        console.log(`  ⚠️  Generated slug for: ${article.title}`);
      }
      
      // Fix missing content
      if (!article.content && article.excerpt) {
        article.content = article.excerpt;
        updated = true;
        console.log(`  ⚠️  Set content from excerpt for: ${article.title}`);
      } else if (!article.content) {
        article.content = `Статья: ${article.title}`;
        updated = true;
        console.log(`  ⚠️  Generated default content for: ${article.title}`);
      }
      
      // Update image URL
      if (article.image && containsOldUrl(article.image)) {
        article.image = replaceUrl(article.image) || article.image;
        updated = true;
      }
      
      if (updated) {
        await article.save({ validateBeforeSave: true });
        careUpdated++;
        console.log(`  ✓ Updated care article: ${article.title}`);
      }
    }
    console.log(`  Total care articles updated: ${careUpdated}\n`);
    totalUpdated += careUpdated;

    // 4. Migrate Blog Posts
    console.log('📝 Migrating Blog Posts...');
    const blogPosts = await BlogPost.find({});
    let blogUpdated = 0;
    
    for (const post of blogPosts) {
      let updated = false;
      
      // Fix missing slug
      if (!post.slug && post.title) {
        const baseSlug = generateSlug(post.title);
        post.slug = `${baseSlug}-${generateRandomString(6)}`;
        updated = true;
        console.log(`  ⚠️  Generated slug for: ${post.title}`);
      }
      
      // Fix missing content
      if (!post.content && post.excerpt) {
        post.content = post.excerpt;
        updated = true;
        console.log(`  ⚠️  Set content from excerpt for: ${post.title}`);
      } else if (!post.content) {
        post.content = `Статья: ${post.title}`;
        updated = true;
        console.log(`  ⚠️  Generated default content for: ${post.title}`);
      }
      
      // Update image URL
      if (post.image && containsOldUrl(post.image)) {
        post.image = replaceUrl(post.image) || post.image;
        updated = true;
      }
      
      if (updated) {
        await post.save({ validateBeforeSave: true });
        blogUpdated++;
        console.log(`  ✓ Updated blog post: ${post.title}`);
      }
    }
    console.log(`  Total blog posts updated: ${blogUpdated}\n`);
    totalUpdated += blogUpdated;

    // Summary
    console.log('═══════════════════════════════════════');
    console.log('✅ Migration completed successfully!');
    console.log(`📊 Total documents updated: ${totalUpdated}`);
    console.log('═══════════════════════════════════════\n');

    // Disconnect
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateImageUrls();
