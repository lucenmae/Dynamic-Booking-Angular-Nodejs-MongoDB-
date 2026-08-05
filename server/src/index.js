require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 4000;

async function start() {
  await connectDB(process.env.MONGO_URI);

  const app = express();
  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (req, res) =>
    res.json({ ok: true, time: new Date() }),
  );

  // Placeholder route mounts
  app.use("/api/bookings", require("./routes/bookings"));

  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
