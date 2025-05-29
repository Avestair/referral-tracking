import Header from "./Header";

export function ReferralAnalytics({
  referralStats,
  allReferrals,
  allVisitors,
}) {
  const formatDate = (timestamp) => {
    if (!timestamp) return "هنوز بازدیدی نگرفته";
    const date = new Date(timestamp);
    return date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // console.log("refstats", referralStats);
  // console.log("allrefs", allReferrals);
  // console.log("all visitors", allVisitors);

  return (
    <>
      <Header />

      <div
        className="min-h-screen bg-[#0a0a0a] text-[#f0e2c2] p-4 md:p-8 font-vazir"
        dir="rtl"
      >
        {/* Header */}
        <div className="mb-8 border-b border-[#8b5a2b]/30 pb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#d4b483]">
            آمار معرفی‌ها
          </h1>
        </div>

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#121212] border border-[#6e4519]/20 rounded-lg p-4">
            <p className="text-[#c19a65]/80 text-sm">تعداد معرف‌ها</p>
            <p className="text-2xl font-bold text-[#d4b483]">
              {allReferrals.length}
            </p>
          </div>
          <div className="bg-[#121212] border border-[#6e4519]/20 rounded-lg p-4">
            <p className="text-[#c19a65]/80 text-sm">تعداد بازدیدها</p>
            <p className="text-2xl font-bold text-[#d4b483]">
              {allVisitors.length}
            </p>
          </div>
          <div className="bg-[#121212] border border-[#6e4519]/20 rounded-lg p-4">
            <p className="text-[#c19a65]/80 text-sm">بهترین معرف</p>
            <p className="text-2xl font-bold text-[#d4b483] truncate">
              {referralStats[0]?.name || "وجود ندارد"}
            </p>
          </div>
        </div>

        {/* Responsive Table Container */}
        <div className="bg-[#121212] border border-[#6e4519]/20 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] md:min-w-full">
              <thead>
                <tr className="border-b border-[#6e4519]/20">
                  <th className="p-4 text-right text-[#c19a65] font-medium">
                    نام معرف
                  </th>
                  <th className="p-4 text-right text-[#c19a65] font-medium">
                    شناسه
                  </th>
                  <th className="p-4 text-right text-[#c19a65] font-medium">
                    بازدیدها
                  </th>
                  <th className="p-4 text-right text-[#c19a65] font-medium">
                    آخرین بازدید
                  </th>
                </tr>
              </thead>
              <tbody>
                {referralStats.map((referral) => (
                  <tr
                    key={referral.referral_id}
                    className="border-b border-[#6e4519]/10 hover:bg-[#1a1a1a]/30 transition-colors"
                  >
                    <td className="p-4 text-[#f0e2c2] text-right">
                      {referral.name}
                    </td>
                    <td className="p-4 text-[#d4b483]/90 font-mono text-sm text-right">
                      {referral.referral_id}
                    </td>
                    <td className="p-4 text-right">
                      <span className="inline-block px-2 py-1 bg-[#8b5a2b]/20 text-[#d4b483] rounded-full text-sm">
                        {referral.visitor_count}
                      </span>
                    </td>
                    <td className="p-4 text-[#e6d1a3]/80 text-sm text-right">
                      {formatDate(referral.last_visit)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {referralStats.length === 0 && (
            <div className="p-8 text-center text-[#c19a65]/60">
              اطلاعاتی برای نمایش وجود ندارد
            </div>
          )}
        </div>

        {/* Mobile Cards for smaller screens */}
        <div className="md:hidden mt-6 space-y-4">
          {referralStats.map((referral) => (
            <div
              key={referral.referral_id}
              className="bg-[#121212] border border-[#6e4519]/20 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-[#f0e2c2] font-medium">{referral.name}</h3>
                <span className="text-[#d4b483] text-sm bg-[#8b5a2b]/20 px-2 py-1 rounded-full">
                  {referral.visitor_count} بازدید
                </span>
              </div>
              <div className="text-[#d4b483]/70 text-xs font-mono mb-1">
                {referral.referral_id}
              </div>
              <div className="text-[#c19a65]/80 text-sm">
                آخرین بازدید: {formatDate(referral.last_visit)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
