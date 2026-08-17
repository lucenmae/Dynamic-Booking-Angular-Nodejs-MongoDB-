const crypto = require("crypto");
const User = require("../models/User");

function toBase64Url(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto
    .pbkdf2Sync(password, salt, 310000, 32, "sha256")
    .toString("hex");

  return `${salt}:${derived}`;
}

function verifyPassword(password, storedHash) {
  const [salt, expectedHash] = storedHash.split(":");
  if (!salt || !expectedHash) return false;

  const derived = crypto
    .pbkdf2Sync(password, salt, 310000, 32, "sha256")
    .toString("hex");

  return derived === expectedHash;
}

function createToken(user) {
  const secret = process.env.JWT_SECRET || "dynamic-booking-dev-secret";
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: String(user?._id || user?.id || user?.email || "unknown"),
    email: user?.email,
    role: user?.role || "customer",
    iat: now,
    exp: now + 60 * 60 * 24,
  };

  const headerSegment = toBase64Url(
    JSON.stringify({ alg: "HS256", typ: "JWT" }),
  );
  const payloadSegment = toBase64Url(JSON.stringify(payload));
  const signingInput = `${headerSegment}.${payloadSegment}`;
  const signature = crypto
    .createHmac("sha256", secret)
    .update(signingInput)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

  return `${signingInput}.${signature}`;
}

exports.createToken = createToken;

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "An account with that email already exists" });
    }

    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      passwordHash: hashPassword(String(password)),
      role: "customer",
    });

    return res.status(201).json({
      message: "Account created successfully",
      token: createToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (!verifyPassword(String(password), user.passwordHash)) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    return res.json({
      message: "Signed in successfully",
      token: createToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
