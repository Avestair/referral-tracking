/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_AUTH_KEY: process.env.SUPABASE_AUTH_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

export default nextConfig;
