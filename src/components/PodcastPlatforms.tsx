import styles from "./content.module.css";

// Platform buttons for the podcast — shared by the homepage podcast block and
// the /podcast index header. Ghost pills sized for dark backgrounds.
export function PodcastPlatforms() {
  return (
    <div className={styles.platformRow}>
      <a
        className={styles.platformBtn}
        href="https://youtube.com/playlist?list=PLuTk8vjerfMNh_NDV7jMYZRRHjsa3ky-t"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* YouTube play glyph */}
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="1.5" y="4.5" width="21" height="15" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M10 8.8v6.4l5.6-3.2z" fill="currentColor" />
        </svg>
        YouTube
      </a>
      <a
        className={styles.platformBtn}
        href="https://open.spotify.com/show/3UIunv0XnAke98WPRSzM48"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* Spotify arcs glyph */}
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7 9.6c3.4-1 7-.7 9.8.9M7.4 12.7c2.8-.8 5.7-.5 8 .8M7.8 15.6c2.2-.6 4.4-.4 6.3.7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Spotify
      </a>
      <a
        className={styles.platformBtn}
        href="https://podcasts.apple.com/us/podcast/exploring-machine-consciousness/id1817108529"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* Apple Podcasts broadcast glyph */}
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="13.5" r="2.2" fill="currentColor" />
          <path d="M12 16.5c1.6 0 2.6.9 2.4 2.1l-.5 2.6c-.15.8-3.65.8-3.8 0l-.5-2.6c-.2-1.2.8-2.1 2.4-2.1z" fill="currentColor" />
          <path d="M7.7 15.4a6 6 0 1 1 8.6 0M5.2 17.6a9.4 9.4 0 1 1 13.6 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Apple Podcasts
      </a>
    </div>
  );
}
