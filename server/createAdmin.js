require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const Admin    = require('./models/Admin');

async function upsertAdmin() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD, MONGO_URI } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !MONGO_URI) {
    console.error('❌ Please set ADMIN_EMAIL, ADMIN_PASSWORD, and MONGO_URI in .env');
    process.exit(1);
  }

  // Connect to MongoDB
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');

  // Hash the password
  const saltRounds = 10;
  const hash        = await bcrypt.hash(ADMIN_PASSWORD, saltRounds);

  // Upsert (create or overwrite) the Admin user
  const result = await Admin.findOneAndUpdate(
    { email: ADMIN_EMAIL },
    { email: ADMIN_EMAIL, passwordHash: hash },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log(`🌱 Admin account ready for: ${result.email}`);
  await mongoose.disconnect();
}

upsertAdmin().catch(err => {
  console.error('❌ Error creating admin:', err);
  process.exit(1);
});