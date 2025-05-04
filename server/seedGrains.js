// server/seedGrains.js
require('dotenv').config();
const mongoose = require('mongoose');
const Grain = require('./models/Grain');
const grains = [
  { name: { en: 'Soyabean Seed', mr: 'सोयाबीन बिया' }, price: 0, unit: 'per kg', imageUrl: 'https://m.media-amazon.com/images/I/51GAe8FrDLL._AC_UF894,1000_QL80_.jpg' },
  { name: { en: 'Wheat',         mr: 'गहू'          }, price: 0, unit: 'per kg', imageUrl: 'https://www.tastingtable.com/img/gallery/the-only-way-you-should-be-cleaning-whole-grains/l-intro-1664307140.jpg' },
  { name: { en: 'Jawar',         mr: 'ज्वार'        }, price: 0, unit: 'per kg', imageUrl: 'https://m.media-amazon.com/images/I/61eKPTRJisL._AC_UF1000,1000_QL80_.jpg' },
  { name: { en: 'Red Toor',      mr: 'तूर डाळ'      }, price: 0, unit: 'per kg', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4vffEBw4Crao8qllfQoP_NCUd12LBz2o9Ug&s' },
  { name: { en: 'White Toor',    mr: 'पांढरी तूर डाळ' }, price: 0, unit: 'per kg', imageUrl: 'https://cpimg.tistatic.com/6019852/b/4/white-toor-seeds.jpg' },
  { name: { en: 'Urad',          mr: 'उडद डाळ'      }, price: 0, unit: 'per kg', imageUrl: 'https://myfavouritepastime.com/wp-content/uploads/2018/03/black-gram-urad-dal-whole-with-skin-myfavouritepastime-com_3135.jpg?w=730' },
  { name: { en: 'Moong',         mr: 'मूंग डाळ'      }, price: 0, unit: 'per kg', imageUrl: 'https://www.skorganicfarms.com/cdn/shop/products/Moong_Dal_800x.jpg?v=1596342021' },
  { name: { en: 'Imli',          mr: 'चिंच'         }, price: 0, unit: 'per kg', imageUrl: 'https://happiestplants.com/cdn/shop/files/Screenshot2023-08-23161805.png?v=1692922877' },
  { name: { en: 'Chichuka',      mr: 'चिचुका'       }, price: 0, unit: 'per kg', imageUrl: 'https://www.yuvikaherbs.com/cdn/shop/files/BeejImliChota_2_48954b9a-4bef-4d7d-b2c1-f424d33bef52.jpg?v=1744617374&width=1946' },
  { name: { en: 'Harbara',       mr: 'हरभरा'        }, price: 0, unit: 'per kg', imageUrl: 'https://i5.walmartimages.com/seo/Black-Chickpeas-Kala-Chana-Brown-Chickpeas-Whole-Brown-Chana-3Lbs_d7f48145-4fb8-4f18-bca2-79ab4cacbe92.7b0a325637ffa7b228eaff6f144490f3.jpeg' },
  { name: { en: 'Bajra',         mr: 'बाजरी'        }, price: 0, unit: 'per kg', imageUrl: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/09/bajra-pearl-millet-grain-1296x728-header.jpg?w=1155&h=1528' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected for seeding');

    // Optional: clear existing grains
    await Grain.deleteMany({});
    console.log('🗑️  Cleared existing grains');

    const inserted = await Grain.insertMany(grains);
    console.log(`🌱 Seeded ${inserted.length} grains`);
  } catch (err) {
    console.error('❌ Seeding error:', err);
  } finally {
    mongoose.disconnect();
  }
}

seed();