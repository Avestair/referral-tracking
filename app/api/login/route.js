import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import {
  generateApiKey,
  hashPasswordWithCustomSalt,
  safeCompare,
} from "@/utils/crypto";
import { supabase } from "@/db/client";

const SESSION_TIMEOUT = 60 * 60 * 24; // 1 day

export async function POST(request) {
  const cookieStore = await cookies();
  try {
    const { email, password } = await request.json();

    // Enhanced input validation
    if (!email || !password) {
      return Response.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }

    // 1. Fetch user from database
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email.trim().toLowerCase())
      .single();

    if (userError || !user) {
      console.warn(`Failed login attempt for email: ${email}`);
      return Response.json(
        { error: "Invalid email or password" }, // Generic message for security
        { status: 401 }
      );
    }

    // 2. Verify password
    const hashedEnteredPassword = await hashPasswordWithCustomSalt(
      password,
      user.salt
    );
    const verify = await safeCompare(hashedEnteredPassword, user.password_hash);

    if (!verify) {
      console.warn(`Failed password attempt for user: ${user.id}`);
      return Response.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 3. Generate session token with additional security claims
    const sessionToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        iss: "blue bird", // Issuer
        aud: "blue bird", // Audience
      },
      process.env.JWT_SECRET,
      {
        expiresIn: SESSION_TIMEOUT,
        algorithm: "HS256", // Explicit algorithm
      }
    );

    // 4. API Key Management
    let apiKey;
    const { data: existingKeys, error: keysError } = await supabase
      .from("api_keys")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .limit(1);

    if (!existingKeys || existingKeys.length === 0) {
      apiKey = generateApiKey();
      const { error: insertError } = await supabase.from("api_keys").insert([
        {
          user_id: user.id,
          api_key: apiKey,
          name: "Default API Key",
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        },
      ]);

      if (insertError) throw insertError;
    } else {
      apiKey = existingKeys[0].api_key;
      // Update last used timestamp
      await supabase
        .from("api_keys")
        .update({ last_used_at: new Date() })
        .eq("id", existingKeys[0].id);
    }

    // 5. Set secure HTTP-only cookie

    cookieStore.set("session_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_TIMEOUT,
      path: "/",
      // domain: process.env.COOKIE_DOMAIN || undefined,
    });

    // 6. Secure response with additional headers
    return Response.json(
      {
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            createdAt: user.created_at,
          },
          apiKey: existingKeys?.[0]
            ? {
                id: existingKeys[0].id,
                name: existingKeys[0].name,
                expiresAt: existingKeys[0].expires_at,
              }
            : null,
        },
      },
      {
        headers: {
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
        },
      }
    );
  } catch (error) {
    console.log("Login error:", error);
    return Response.json(
      { error: "Authentication service unavailable" }, // Generic error
      { status: 500 }
    );
  }
}
