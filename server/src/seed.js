require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");
const crypto = require("crypto");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto
    .pbkdf2Sync(password, salt, 310000, 32, "sha256")
    .toString("hex");

  return `${salt}:${derived}`;
}

async function seed() {
  await connectDB(process.env.MONGO_URI);

  const users = [
    {
      name: "Admin User",
      email: "admin@example.com",
      passwordHash: hashPassword("Admin123!"),
      role: "admin",
    },
    {
      name: "Customer User",
      email: "customer@example.com",
      passwordHash: hashPassword("Customer123!"),
      role: "customer",
    },
  ];

  for (const user of users) {
    const existing = await User.findOne({ email: user.email });
    if (!existing) {
      await User.create(user);
      console.log(`Created ${user.role}: ${user.email}`);
    } else {
      console.log(`Skipped existing ${user.role}: ${user.email}`);
    }
  }

  await mongoose.disconnect();
  console.log("Seeding complete");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
