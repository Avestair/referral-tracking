"use client";

import { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Image from "next/image";
import Header from "@/components/Header";

export default function QRCodeGen() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const qrCodeRef = useRef(null);
  const containerRef = useRef(null);
  const [currentDomain, setCurrentDomain] = useState("");

  useEffect(() => {
    setCurrentDomain(window.location.origin);
  }, []);

  const combinedContent = text ? `${currentDomain}/${text}` : currentDomain;

  // Keep the original downloadQRCode function exactly as is
  const downloadQRCode = async () => {
    if (!containerRef.current || !qrCodeRef.current) return;
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 300;
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.roundRect(0, 0, canvas.width, canvas.height, 10);
      ctx.clip();
      const bgImg = document.createElement("img");
      bgImg.crossOrigin = "anonymous";
      bgImg.src = "/backqrcodecard.png";
      await new Promise((resolve, reject) => {
        bgImg.onload = resolve;
        bgImg.onerror = reject;
      });
      ctx.drawImage(bgImg, 0, 0, 450, 300);
      const qrCanvas = qrCodeRef.current.querySelector("canvas");
      ctx.drawImage(qrCanvas, 108, 88, 115, 120);
      const dataUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = dataUrl;
      downloadLink.download = "qrcode-with-background.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-b from-black to-gray-950 flex items-center justify-center p-4">
        <div className="bg-black rounded-xl shadow-xl p-8 w-full max-w-2xl border border-[#d4b483]">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#d4b483] mb-2 font-[Yekan]">
              تولید کننده QR کد
            </h1>
            <div className="w-20 h-1 bg-[#d4b483] mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="domain"
                className="block text-sm font-medium text-[#d4b483] mb-2 text-right"
              >
                آدرس وبسایت شما
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="domain"
                  value={currentDomain}
                  disabled
                  className="w-full px-4 py-3 outline-none opacity-60 border border-[#d4b483]/30 rounded-lg bg-gray-800 text-[#d4b483] cursor-not-allowed"
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
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-[#d4b483] mb-2 text-right"
              >
                نام یا شناسه مورد نظر
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="مثال: restaurant-royal"
                  className="w-full px-4 py-3 outline-none border border-[#d4b483]/30 rounded-lg focus:ring-2 focus:ring-[#d4b483] focus:border-transparent bg-gray-800 text-[#d4b483] placeholder-[#d4b483]/50"
                />
                <div className="absolute left-3 top-3 text-[#d4b483]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {combinedContent && (
            <div className="mt-10 pt-8 border-t border-[#d4b483]/30">
              <div className="flex flex-col items-center">
                {/* Keep the original QR code container exactly as is */}
                <div
                  ref={containerRef}
                  className="relative p-4 scale-50 bg-white rounded-lg"
                  style={{ width: 502, height: 325 }}
                >
                  <Image
                    className="absolute inset-0 rounded-lg"
                    src="/backqrcodecard.png"
                    alt="QR Code Background"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    className="absolute top-[29%] left-[24%]"
                    ref={qrCodeRef}
                  >
                    <QRCodeCanvas
                      value={combinedContent}
                      size={130}
                      bgColor={"#ffffff"}
                      fgColor={"#000000"}
                      level={"L"}
                      imageSettings={{
                        src: "/favicon.png",
                        x: undefined,
                        y: undefined,
                        height: 24,
                        width: 24,
                        opacity: 1,
                        excavate: true,
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={downloadQRCode}
                  className="mb-6 px-6 py-3 bg-[#d4b483] hover:bg-[#c19a65] text-gray-900 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  دانلود QR کد
                </button>

                <div className="w-full max-w-lg">
                  <p className="text-sm font-medium text-[#d4b483] mb-2 text-right">
                    آدرس نهایی:
                  </p>
                  <div className="relative bg-gray-800 p-4 rounded-lg break-all text-center md:text- md:pr-16 border border-[#d4b483]/30">
                    <span className="md:text-base text-sm text-[#d4b483]">
                      {combinedContent}
                    </span>
                    <CopyToClipboard
                      text={combinedContent}
                      onCopy={() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                    >
                      <div>
                        <button className="mt-4 w-full py-1 md:hidden bg-[#d4b483] hover:bg-[#c19a65] text-gray-900 text-sm rounded transition-colors">
                          {copied ? "کپی شد!" : "کپی"}
                        </button>
                        <button className="absolute left-2 top-4 px-3 py-1 hidden md:block bg-[#d4b483] hover:bg-[#c19a65] text-gray-900 text-sm rounded transition-colors">
                          {copied ? "کپی شد!" : "کپی"}
                        </button>
                      </div>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
