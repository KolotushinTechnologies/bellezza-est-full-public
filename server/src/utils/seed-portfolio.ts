import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Portfolio from '../models/portfolio.model';

dotenv.config();

const portfolioItems = [
  { type: "image", src: "http://localhost:8080/uploads/before-after-lips-filler-result.jpg", category: "Контурная пластика" },
  { type: "image", src: "http://localhost:8080/uploads/skin-rejuvenation-result-woman.jpg", category: "Биоревитализация" },
  { type: "image", src: "http://localhost:8080/uploads/facial-treatment-result-clean-skin.jpg", category: "Пилинги" },
  { type: "image", src: "http://localhost:8080/uploads/botox-result-natural-look.jpg", category: "Ботулинотерапия" },
  { type: "image", src: "http://localhost:8080/uploads/face-contouring-result-cheeks.jpg", category: "Контурная пластика" },
  { type: "image", src: "http://localhost:8080/uploads/acne-treatment-result-clear-skin.jpg", category: "Чистки" },
  { type: "image", src: "http://localhost:8080/uploads/mesotherapy-hair-treatment-result.jpg", category: "Мезотерапия" },
];

async function seedPortfolio() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://root:Jdjdb2334328Hdbndhj@cluster0.y6mrt.mongodb.net/bellezza-est?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');

    await Portfolio.deleteMany({});
    console.log('Cleared existing portfolio items');

    const createdItems = await Portfolio.insertMany(portfolioItems);
    console.log(`Created ${createdItems.length} portfolio items`);

    console.log('✅ Portfolio seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding portfolio:', error);
    process.exit(1);
  }
}

seedPortfolio();
