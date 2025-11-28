import mongoose from 'mongoose';
import dotenv from 'dotenv';
import BlogPost from '../models/blog-post.model';

dotenv.config();

const blogPosts = [
  {
    slug: "pro-age-philosophy",
    title: "Философия Pro Age: красота в любом возрасте",
    excerpt: "Современный подход к эстетической косметологии — не борьба с возрастом, а гармоничное сопровождение",
    date: "15 ноября 2025",
    image: "http://localhost:8080/uploads/skin-rejuvenation-result-woman.jpg",
  },
  {
    slug: "hyaluronic-acid-guide",
    title: "Гиалуроновая кислота: что нужно знать",
    excerpt: "Всё о главном компоненте современной косметологии: виды, применение, мифы и реальность",
    date: "10 ноября 2025",
    image: "http://localhost:8080/uploads/biorevitalization-skin-treatment-injection.jpg",
  },
  {
    slug: "seasonal-skincare",
    title: "Сезонный уход: осень-зима",
    excerpt: "Как адаптировать домашний уход к холодному времени года",
    date: "5 ноября 2025",
    image: "http://localhost:8080/uploads/facial-cleansing-treatment-spa.jpg",
  },
];

async function seedBlogPosts() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://root:Jdjdb2334328Hdbndhj@cluster0.y6mrt.mongodb.net/bellezza-est?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');

    await BlogPost.deleteMany({});
    console.log('Cleared existing blog posts');

    const createdPosts = await BlogPost.insertMany(blogPosts);
    console.log(`Created ${createdPosts.length} blog posts`);

    console.log('✅ Blog posts seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding blog posts:', error);
    process.exit(1);
  }
}

seedBlogPosts();
