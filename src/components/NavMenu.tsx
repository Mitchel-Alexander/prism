"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./NavMenu.module.css";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// In-page sections — only the Home page exists today, so these anchor to it.
// (When the multi-page plan lands, swap these for real routes.)
const LINKS = [
  { label: "Mission", href: "#mission" },
  { label: "Our work", href: "#work" },
  { label: "Partnerships", href: "#partnerships" },
  { label: "Values", href: "#values" },
  { label: "Who we are", href: "#people" },
  { label: "Opportunities", href: "#opportunities" },
];

// Live external projects PRISM runs or supports.
const PROJECTS = [
  { label: "Digital Minds Guide", href: "https://digitalminds.guide/" },
  { label: "Digital Minds Newsletter", href: "https://www.digitalminds.news/" },
];

export function NavMenu() {
  const [open, setOpen] = useState(false);
  // The overlay is portalled to <body> so it escapes the hero's nested stacking
  // contexts; portalling needs the DOM, so wait for mount (no SSR overlay).
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  // Close + return focus to the trigger (without scrolling the page back up).
  const closeMenu = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  // While open: move focus into the menu, lock body scroll, close on Escape.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, closeMenu]);

  // Anchor links: unlock scroll first, then smooth-scroll to the section.
  const handleNav = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.body.style.overflow = "";
    setOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const reduce = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      history.replaceState(null, "", href);
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        className={styles.trigger}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="4" y1="8" x2="22" y2="8" />
          <line x1="4" y1="13" x2="22" y2="13" />
          <line x1="4" y1="18" x2="22" y2="18" />
        </svg>
      </button>

      {mounted &&
        createPortal(
          <div
            className={`${styles.overlay} ${open ? styles.open : ""}`}
            aria-hidden={!open}
          >
            <div className={styles.bar}>
              <img
                src={`${BASE}/logo-prism-white.png`}
                alt="PRISM"
                className={styles.logo}
                width={138}
                height={30}
              />
              <button
                ref={closeRef}
                className={styles.close}
                type="button"
                aria-label="Close menu"
                onClick={closeMenu}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="6" y1="6" x2="20" y2="20" />
                  <line x1="20" y1="6" x2="6" y2="20" />
                </svg>
              </button>
            </div>

            <nav className={styles.links} aria-label="Primary">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={styles.link}
                  onClick={handleNav(l.href)}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className={styles.projects}>
              <span className={styles.projectsLabel}>Projects</span>
              <div className={styles.projectLinks}>
                {PROJECTS.map((p) => (
                  <a
                    key={p.href}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                    onClick={() => setOpen(false)}
                  >
                    {p.label}
                    <span aria-hidden="true">&nbsp;↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
