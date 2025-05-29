import { hashPassword, verifyPassword } from "@/utils/crypto.js";
import crypto from "crypto";

async function testHashing() {
  // const password = "1212test";
  const password = "tes21t";

  // Hash a password
  const { salt, hash } = await hashPassword(password);
  console.log("Salt:", salt);
  console.log("Hash:", hash);

  // Verify the password
  const isValid = await verifyPassword(password, salt, hash);
  console.log("Password valid:", isValid);

  const isWrongValid = await verifyPassword("wrongPassword", salt, hash);
  console.log("Wrong password valid:", isWrongValid);
}

testHashing();

function generateApiKey() {
  const apikey = crypto.randomBytes(32).toString("hex");
  console.log(apikey);
}

// generateApiKey();
