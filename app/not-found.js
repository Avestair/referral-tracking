"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
        <div className="max-w-md mx-auto">
          {/* Gold decorative element */}
          <div className="w-24 h-1 bg-[#d4b483] mx-auto mb-6 rounded-full"></div>

          {/* 404 Number */}
          <h1 className="text-8xl font-bold text-[#d4b483] mb-4">404</h1>

          {/* Error Message */}
          <h2 className="text-2xl font-semibold text-[#d4b483] mb-6">
            صفحه مورد نظر یافت نشد
          </h2>

          {/* Description */}
          <p className="text-gray-300 mb-8">
            متأسفیم، صفحه‌ای که به دنبال آن هستید وجود ندارد یا ممکن است حذف شده
            باشد.
          </p>

          {/* Gold decorative element */}
          <div className="w-24 h-1 bg-[#d4b483] mx-auto mb-8 rounded-full"></div>

          {/* Home Link Button */}
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-[#d4b483] hover:bg-[#c19a65] transition-colors"
          >
            بازگشت به صفحه اصلی
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
        {/* 
        Optional decorative element (remove if not needed) */}
        {/* <div className="mt-12 opacity-20">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200ZM27.6 100C27.6 62.6548 62.6548 27.6 100 27.6C137.345 27.6 172.4 62.6548 172.4 100C172.4 137.345 137.345 172.4 100 172.4C62.6548 172.4 27.6 137.345 27.6 100Z"
              fill="#d4b483"
            />
          </svg>
        </div> */}
      </main>
    </div>
  );
}
