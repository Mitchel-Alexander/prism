"use client";

import { useEffect, useState } from "react";
import styles from "./CookieConsent.module.css";

// Analytics is loaded ONLY after the visitor accepts — nothing tracking-related
// fires on first paint. Consent is remembered in localStorage.
const GA4_ID = "G-E5XPRWE50C";
const ADS_ID = "AW-17158899995";
const STORAGE_KEY = "prism-cookie-consent"; // "accepted" | "rejected"

function loadAnalytics() {
  if (document.getElementById("ga-gtag")) return; // already loaded
  const s = document.createElement("script");
  s.id = "ga-gtag";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(s);

  const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", GA4_ID);
  w.gtag("config", ADS_ID);
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const choice = localStorage.getItem(STORAGE_KEY);
    if (choice === "accepted") loadAnalytics();
    else if (choice !== "rejected") setOpen(true);

    // Let the footer "Cookie settings" link reopen the banner.
    (window as unknown as { openCookieSettings?: () => void }).openCookieSettings = () =>
      setOpen(true);
  }, []);

  const decide = (accepted: boolean) => {
    localStorage.setItem(STORAGE_KEY, accepted ? "accepted" : "rejected");
    if (accepted) loadAnalytics();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie consent">
      <div className={styles.inner}>
        <p className={styles.text}>
          We use analytics cookies to understand how visitors use our site and to
          improve it. No non-essential cookies are set unless you accept. See our{" "}
          <a href="/privacy" className={styles.link}>Privacy Policy</a> for details.
        </p>
        <div className={styles.actions}>
          <button className={styles.reject} onClick={() => decide(false)}>
            Decline
          </button>
          <button className={styles.accept} onClick={() => decide(true)}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
