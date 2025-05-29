"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-bg-black p-2 border-b mt-4 border-[#d4b483]/30">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex justify-between items-center">
          {/* Logo/Link */}
          <span className="text-xl font-bold text-[#d4b483] font-[Yekan]">
            Blue Bird
          </span>

          {/* Navigation Links */}
          <div className="flex md:gap-6 gap-4 items-center space-x-6 rtl:space-x-reverse">
            <Link
              href="/qrcodegen"
              className="text-[#d4b483] hover:text-[#c19a65] transition-colors text-sm md:text-base"
            >
              تولید QR code
            </Link>
            <Link
              href="/addreferral"
              className="text-[#d4b483] hover:text-[#c19a65] transition-colors text-sm md:text-base"
            >
              افزودن معرف
            </Link>

            <Link
              href="/referrallist"
              className="text-[#d4b483] hover:text-[#c19a65] transition-colors text-sm md:text-base"
            >
              لیست معرف
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
