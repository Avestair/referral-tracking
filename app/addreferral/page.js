"use client";

import Header from "@/components/Header";
import { supabase } from "@/db/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddReferralPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      // console.log("Submitting form with name:", formData.name);

      // Generate referral ID: name + random 6-character string
      const randomChars = Math.random().toString(36).substring(2, 8); // 6 random alphanumeric chars
      const referralId = `${"bluebird"
        .toLowerCase()
        .replace(/\s+/g, "-")}-${randomChars}`;

      // console.log(referralId);
      // console.log(formData);

      // Insert into Supabase
      const { data, error } = await supabase
        .from("referrals") // Make sure table name is correct
        .insert([
          {
            name: formData.name,
            referral_id: referralId, // Writing to referral_id field
          },
        ])
        .select();

      if (error) {
        // console.log("Supabase error:", error);
        throw new Error(error.message || "خطایی در ایجاد معرف به وجود آمد");
      }

      // console.log("Success response:", data);
      setSuccess("معرف با موفقیت اضافه شد!");
      setFormData({ name: "" });
      // setTimeout(() => router.push("/referrallist"), 2000);
    } catch (err) {
      console.error("مشکلی در ایجاد معرف به وجود آمد!", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-bg-black flex items-center justify-center mt-14">
        <div className="bg-bg-black rounded-xl shadow-lg p-8 w-full max-w-md border border-[#d4b483]/30">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#d4b483] mb-2">
              افزودن معرف جدید
            </h1>
            <div className="w-20 h-1 bg-[#d4b483] mx-auto rounded-full"></div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-900/50 text-red-300 rounded-lg border border-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-900/50 text-green-300 rounded-lg border border-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#d4b483] mb-2 text-right"
              >
                نام معرف
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  placeholder="نام معرف را وارد کنید..."
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border border-[#d4b483]/30 outline-none rounded-lg bg-gray-900 text-[#d4b483] focus:ring-2 focus:ring-[#d4b483] focus:border-transparent"
                />
                <div className="absolute left-3 top-3 text-[#d4b483]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 cursor-pointer bg-[#d4b483] hover:bg-[#c19a65] text-gray-900 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-gray-900"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  درحال اضافه کردن...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  معرف را اضافه کن
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
