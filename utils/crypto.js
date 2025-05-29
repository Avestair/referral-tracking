import crypto from "crypto";

// Generate secure random API key
export function generateApiKey() {
  return crypto.randomBytes(32).toString("hex");
}

// Password hashing (alternative to database hashing)
export async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return { salt, hash };
}

export async function verifyPassword(password, salt, hash) {
  const verifyHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return verifyHash === hash;
}

export async function hashPasswordWithCustomSalt(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 1000, 64, "sha512", (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString("hex"));
    });
  });
}

export async function safeCompare(a, b) {
  try {
    const aBuf = Buffer.from(await a); // Handle promises
    const bBuf = Buffer.from(await b); // Handle promises
    return crypto.timingSafeEqual(aBuf, bBuf);
  } catch (err) {
    console.error("Comparison error:", err);
    return false;
  }
}
