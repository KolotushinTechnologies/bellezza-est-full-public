import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../models/service.model';

dotenv.config();

const services = [
  {
    title: "Биоревитализация / Мезотерапия",
    description: "Глубокое увлажнение кожи инъекциями гиалуроновой кислоты и введение витаминных коктейлей для питания кожи, укрепления волос и коррекции локальных жировых отложений.",
    image: "http://localhost:8080/uploads/biorevitalization-skin-treatment-injection.jpg",
  },
  {
    title: "Ботулинотерапия",
    description: "Инъекции ботулотоксина для коррекции мимических морщин, лечения гипергидроза и профилактики возрастных изменений. Препараты последнего поколения обеспечивают естественный результат без эффекта «маски».",
    image: "http://localhost:8080/uploads/botox-injection-cosmetology-professional.jpg",
  },
  {
    title: "Контурная пластика губ",
    description: "Инъекционное моделирование и увеличение объёма губ с помощью гиалуроновых филлеров. Создание естественной формы и коррекция асимметрии.",
    image: "http://localhost:8080/uploads/dermal-filler-lip-injection-cosmetology.jpg",
  },
  {
    title: "Контурная пластика скул",
    description: "Восполнение объёма и моделирование скул с помощью гиалуроновых филлеров. Создание выразительных контуров лица и коррекция возрастных изменений.",
    image: "http://localhost:8080/uploads/face-contouring-result-cheeks.jpg",
  },
  {
    title: "Контурная пластика носогубных складок",
    description: "Коррекция носогубных складок и слёзных борозд с помощью инъекций филлеров. Разглаживание морщин и восстановление молодости лица.",
    image: "http://localhost:8080/uploads/dermal-filler-injection-lips.jpg",
  },
  {
    title: "Жидкие бионити",
    description: "Инновационная методика лифтинга и армирования кожи с помощью инъекций биодеградируемых нитей. Подтяжка овала лица без хирургического вмешательства.",
    image: "http://localhost:8080/uploads/biorevitalization-skin-treatment-injection.jpg",
  },
  {
    title: "Липолитик",
    description: "Инъекционная коррекция локальных жировых отложений. Расщепление жировых клеток и моделирование контуров тела без операции.",
    image: "http://localhost:8080/uploads/mesotherapy-facial.png",
  },
  {
    title: "Пилинг",
    description: "Контролируемая эксфолиация для обновления кожи, устранения пигментации, следов постакне и мелких морщин. Подбор пилинга по типу кожи и задачам.",
    image: "http://localhost:8080/uploads/chemical-peel-skincare-treatment-professional.jpg",
  },
];

async function seedServices() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://root:Jdjdb2334328Hdbndhj@cluster0.y6mrt.mongodb.net/bellezza-est?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');

    await Service.deleteMany({});
    console.log('Cleared existing services');

    const createdServices = await Service.insertMany(services);
    console.log(`Created ${createdServices.length} services`);

    console.log('✅ Services seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding services:', error);
    process.exit(1);
  }
}

seedServices();
