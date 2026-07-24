"use client";

// Footer "Cookie settings" trigger — reopens the consent banner. Isolated as a
// client component so Footer itself can stay a server component.
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const w = window as unknown as { openCookieSettings?: () => void };
        w.openCookieSettings?.();
      }}
    >
      Cookie settings
    </button>
  );
}
