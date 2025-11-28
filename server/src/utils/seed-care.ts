import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CareArticle from '../models/care-article.model';

dotenv.config();

const careArticles = [
  {
    title: "Утренний уход за кожей лица",
    excerpt: "Правильная последовательность шагов для здорового сияния кожи в течение дня",
    image: "http://localhost:8080/uploads/facial-cleansing-treatment-spa.jpg",
  },
  {
    title: "Защита от солнца",
    excerpt: "Почему SPF важен даже зимой и как выбрать подходящее средство",
    image: "http://localhost:8080/uploads/biorevitalization-skin-treatment-injection.jpg",
  },
  {
    title: "Уход после процедур",
    excerpt: "Рекомендации по восстановлению кожи после инъекционных методик",
    image: "http://localhost:8080/uploads/botox-injection-cosmetology.jpg",
  },
  {
    title: "Увлажнение кожи изнутри",
    excerpt: "Питьевой режим и продукты для здоровой, увлажнённой кожи",
    image: "http://localhost:8080/uploads/chemical-peel-skincare-treatment.jpg",
  },
];

async function seedCareArticles() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://root:Jdjdb2334328Hdbndhj@cluster0.y6mrt.mongodb.net/bellezza-est?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');

    await CareArticle.deleteMany({});
    console.log('Cleared existing care articles');

    const createdArticles = await CareArticle.insertMany(careArticles);
    console.log(`Created ${createdArticles.length} care articles`);

    console.log('✅ Care articles seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding care articles:', error);
    process.exit(1);
  }
}

seedCareArticles();
