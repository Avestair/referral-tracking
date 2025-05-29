import { supabase } from "@/db/client";
import { headers } from "next/headers";
import Link from "next/link";

export default async function TheaterLandingPage({ params }) {
  const headersList = await headers();
  let { referralName } = await params;
  referralName = "blue bird";
  // Track the visit
  let trackingStatus = "pending";

  try {
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip");
    const userAgent = headersList.get("user-agent");

    // Log request start
    // console.log(
    //   `[Visitor Tracking] Starting tracking for IP: ${ip} (Referral ID: ${referralName})`
    // );
    // console.debug(`[Debug] Full User-Agent: ${userAgent}`);

    const { data: existingVisit, error: queryError } = await supabase
      .from("visitors")
      .select("*")
      .eq("ip_address", ip)
      .limit(1);

    if (queryError) {
      console.error("[Visitor Tracking] Database query failed:", {
        error: queryError.message,
        ip,
        referralId: referralName,
        timestamp: new Date().toISOString(),
      });
      throw queryError;
    }

    if (!existingVisit?.length) {
      // console.log(`[Visitor Tracking] New visitor detected (IP: ${ip})`);

      const { error: insertError } = await supabase.from("visitors").insert({
        referral_id: referralName,
        ip_address: ip,
        user_agent: userAgent,
      });

      if (insertError) {
        console.error("[Visitor Tracking] Failed to insert visitor:", {
          error: insertError.message,
          ip,
          referralId: referralName,
        });
        throw insertError;
      }

      // console.log(
      //   `[Visitor Tracking] Successfully tracked new visitor (IP: ${ip}, Referral ID: ${referralName})`
      // );
      trackingStatus = "success";
    } else {
      // console.log(
      //   `[Visitor Tracking] Existing visitor (IP: ${ip}, Visit ID: ${existingVisit[0].id})`
      // );
      trackingStatus = "duplicate";
    }
  } catch (error) {
    console.error("[Visitor Tracking] Critical error in tracking:", {
      error: error.message,
      stack: error.stack,
      referralId: referralName,
      timestamp: new Date().toISOString(),
    });
    trackingStatus = "error";
  }

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-[#f0e2c2] font-vazir"
      dir="rtl"
    >
      {/* Artistic Header with Diagonal Elements */}
      <header className="relative overflow-hidden border-b border-[#8b5a2b]/30">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_65%,#8b5a2b_65%,#8b5a2b_70%,transparent_70%)] opacity-10"></div>
        <div className="container mx-auto px-4 py-8 relative z-10 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <span className="text-[#c19a65]">پرده</span>
            <span className="text-white"> طلایی</span>
          </div>
          <div className="flex gap-8">
            <Link className="text-[#d4b483] text-sm" href={"/login"}>
              ورود
            </Link>
            <div className="text-[#d4b483] text-sm hidden md:block">
              تئاتر معاصر
            </div>
          </div>
        </div>
      </header>

      {/* Modern Hero Section */}
      <main>
        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Artistic Title with Gold Accent */}
          <div className="relative mb-16 text-center">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="256"
              height="256"
              viewBox="0 0 256 256"
              className="text-[#c19a65]"
            >
              <g fill="currentColor">
                <path d="m224 56l-96 88l-96-88Z" opacity="0.2" />
                <path d="M224 48H32a8 8 0 0 0-8 8v136a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a8 8 0 0 0-8-8m-96 85.15L52.57 64h150.86ZM98.71 128L40 181.81V74.19Zm11.84 10.85l12 11.05a8 8 0 0 0 10.82 0l12-11.05l58 53.15H52.57ZM157.29 128L216 74.18v107.64Z" />
              </g>
            </svg> */}
            <p className="text-[#d4b483] mb-3 text-sm">دعوتنامه اختصاصی</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#f0e2c2] to-[#d4b483]">
              {referralName}
            </h1>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#8b5a2b] to-transparent mx-auto"></div>
          </div>

          {/* Artistic Show Card */}
          <div className="grid relative bg-[#121212] rounded-2xl overflow-hidden border border-[#6e4519]/50 mb-16 max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_75%,#8b5a2b_100%)] opacity-10"></div>
            <div className="block md:hidden w-[80%] mx-auto mt-8 flex-1 h-64  bg-[#1a1a1a] rounded-lg overflow-hidden cardshow">
              {/* Theater Image Placeholder */}
              <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] to-[#8b5a2b]/10 flex items-center justify-center">
                <span className="text-gold-400 text-lg">پرده نمایش</span>
              </div>
            </div>
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 text-right">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    هملت: بازخوانی مدرن
                  </h2>
                  <p className="text-[#e6d1a3] mb-6 leading-relaxed">
                    اجرایی پیشرو از شاهکار شکسپیر با طراحی صحنه‌ای خیره‌کننده و
                    بازی‌های به یاد ماندنی
                  </p>
                  <ul className="space-y-2 text-[#f0e2c2] text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#c19a65]"></span>
                      <span>کارگردانی: رضا بهبودی</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#c19a65]"></span>
                      <span>موسیقی: کیهان کلهر</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#c19a65]"></span>
                      <span>طراحی صحنه: نیلوفر بیضایی</span>
                    </li>
                  </ul>
                </div>
                <div className="md:block flex-1 h-64 hidden bg-[#1a1a1a] rounded-lg overflow-hidden cardshow">
                  {/* Theater Image Placeholder */}
                  <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] to-[#8b5a2b]/10 flex items-center justify-center">
                    <span className="text-gold-400 text-lg">پرده نمایش</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modern Schedule Section */}
          <div className="mb-20 max-w-4xl mx-auto">
            <h3 className="text-xl text-[#d4b483] mb-8 text-center">
              زمان‌بندی اجراها
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  month: "خرداد",
                  dates: "۱۵-۳۰",
                  days: "سه‌شنبه‌ها و پنجشنبه‌ها",
                },
                { month: "تیر", dates: "۱-۳۰", days: "شنبه تا چهارشنبه" },
                { month: "مرداد", dates: "۱-۱۵", days: "جمعه و شنبه" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#121212] border border-[#6e4519]/30 rounded-lg p-6 hover:border-[#c19a65] transition-colors"
                >
                  <div className="text-[#c19a65] text-lg font-bold mb-2">
                    {item.month}
                  </div>
                  <div className="text-[#f0e2c2] text-sm">{item.dates}</div>
                  <div className="text-[#d4b483] text-xs mt-2">{item.days}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Artistic CTA */}
          <div className="text-center mb-24">
            <a
              href="https://tickets.example.com"
              className="inline-block px-10 py-4 bg-transparent border-2 border-[#c19a65] text-[#f0e2c2] font-bold rounded-full hover:bg-[#8b5a2b]/20 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">رزرو جایگاه </span>
              <span className="absolute inset-0 bg-[linear-gradient(45deg,transparent_50%,#8b5a2b_50%)] bg-[length:400%_400%] bg-[position:100%_100%] group-hover:bg-[position:0%_0%] transition-all duration-500 opacity-30"></span>
            </a>
          </div>

          {/* Modern Reviews */}
          <div className="border-t border-[#543310]/50 pt-12">
            <h3 className="text-xl text-[#d4b483] mb-8 text-center">
              بازتاب رسانه‌ها
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "اجرایی که تعریف تئاتر را دگرگون می‌کند",
                  source: "شرق",
                  rating: "★★★★★",
                },
                {
                  quote: "بی‌نظیر در اجرا و عمیق در معنا",
                  source: "اعتماد",
                  rating: "★★★★☆",
                },
                {
                  quote: "شاهکاری که باید چندین بار دید",
                  source: "هنر امروز",
                  rating: "★★★★★",
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="absolute -top-4 -right-4 text-5xl text-[#8b5a2b]/30 font-serif">
                    ”
                  </div>
                  <div className="bg-[#121212] border border-[#6e4519]/30 p-6 rounded-lg h-full">
                    <p className="text-[#e6d1a3] mb-4 leading-relaxed">
                      «{item.quote}»
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-[#d4b483] text-sm">— {item.source}</p>
                      <p className="text-[#c19a65]">{item.rating}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="bg-[linear-gradient(180deg,#121212_0%,#0a0a0a_100%)] py-12 border-t border-[#6e4519]/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-right">
              <div className="text-xl font-bold mb-2">
                <span className="text-[#c19a65]">پرده</span>
                <span className="text-white"> طلایی</span>
              </div>
              <p className="text-[#d4b483] text-sm">
                خیابان انقلاب، پردیس تئاتر شهر
              </p>
            </div>

            <div className="text-center">
              <p className="text-[#8b5a2b] mb-2">
                شما توسط {referralName} دعوت شده‌اید
              </p>
              <p className="text-[#d4b483] text-sm">تلفن رزرو: ۰۲۱-۸۸۸۱۲۳۴۵</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
