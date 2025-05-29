"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/db/client";
import { ReferralAnalytics } from "./ReferralAnalytics";
import Loader from "@/components/Loader";

export default function AnalyticsClientWrapper() {
  const [referralStats, setReferralStats] = useState([]);
  const [allReferrals, setAllReferrals] = useState([]);
  const [allVisitors, setAllVisitors] = useState([]);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First get all referrals
        const { data: referralsData, error: referralsError } = await supabase
          .from("referrals")
          .select("*");

        if (referralsError) throw referralsError;

        // Then get visitor counts for each referral
        const statsPromises = referralsData.map(async (referral) => {
          // Count visitors for this specific referral_id
          const { data: visitors, error: visitorsError } = await supabase
            .from("visitors")
            .select("*")
            .eq("referral_id", referral.referral_id);

          if (visitorsError) throw visitorsError;

          const { data: lastVisitData, error: lastVisitError } = await supabase
            .from("visitors")
            .select("created_at")
            .eq("referral_id", referral.referral_id)
            .order("created_at", { ascending: false })
            .limit(1);

          return {
            name: referral.name,
            referral_id: referral.referral_id,
            visitor_count: visitors ? visitors.length : 0, // Count the actual visitor records
            last_visit: lastVisitData?.[0]?.created_at || null,
          };
        });

        // Get all visitors for stats
        const { data: visitorsData, error: visitorsError } = await supabase
          .from("visitors")
          .select("*");

        if (visitorsError) throw visitorsError;

        const stats = await Promise.all(statsPromises);

        // Sort by visitor count descending
        stats.sort((a, b) => b.visitor_count - a.visitor_count);

        setReferralStats(stats);
        setAllReferrals(referralsData);
        setAllVisitors(visitorsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Loader />
      </div>
    );
  if (error)
    return <div className="text-red-400 p-8 text-center">خطا: {error}</div>;
  if (!referralStats)
    return (
      <div className="text-gold-300 p-8 text-center">داده‌ای یافت نشد</div>
    );

  return (
    <ReferralAnalytics
      referralStats={referralStats}
      allReferrals={allReferrals}
      allVisitors={allVisitors}
    />
  );
}
