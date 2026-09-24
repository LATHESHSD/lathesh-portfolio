import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";

// Get device info from user agent
function getDeviceInfo() {
  const ua = navigator.userAgent;

  // Device type
  let device_type = "desktop";
  if (/tablet|ipad|playbook|silk/i.test(ua)) device_type = "tablet";
  else if (/mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua))
    device_type = "mobile";

  // Browser
  let browser = "Unknown";
  if (ua.includes("Edg/")) browser = "Edge";
  else if (ua.includes("Chrome/")) browser = "Chrome";
  else if (ua.includes("Safari/") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Firefox/")) browser = "Firefox";
  else if (ua.includes("Opera/") || ua.includes("OPR/")) browser = "Opera";

  return { device_type, browser, user_agent: ua };
}

// Get country + city from a free IP geolocation API
async function getGeoInfo() {
  try {
    const res = await fetch("https://ipwho.is/");
    const data = await res.json();
    if (data && data.success) {
      return {
        country: data.country || null,
        city: data.city || null,
      };
    }
  } catch (err) {
    console.warn("Geo lookup failed:", err);
  }
  return { country: null, city: null };
}

export default function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    const track = async () => {
      const { device_type, browser, user_agent } = getDeviceInfo();
      const { country, city } = await getGeoInfo();

      // Get current user email if logged in (for admin tracking)
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user_email = session?.user?.email || null;

      // Insert tracking row
      const { error } = await supabase.from("page_views").insert({
        page_path: location.pathname,
        referrer: document.referrer || null,
        country,
        city,
        user_agent,
        device_type,
        browser,
        user_email,
      });

      if (error) {
        console.warn("Tracking failed:", error.message);
      }
    };

    // Small delay so it doesn't block page load
    const timeout = setTimeout(track, 500);
    return () => clearTimeout(timeout);
  }, [location.pathname]);
}