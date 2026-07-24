"use client";

import { useEffect, useState } from "react";
import styles from "./content.module.css";

// Embeds the Buzzsprout episode player. `episode` is the "<id>-<slug>" path from
// front matter; the numeric id (before the first "-") is the container id.
// Loaded as functional podcast playback (not gated behind cookie consent);
// Buzzsprout is disclosed in the Privacy Policy's cookie list.
//
// If the embed can't render — an ad/tracking blocker stripped the third-party
// script, the network is offline, or it's simply slow — we surface a fallback in
// the same spot: the episode artwork plus direct listen/watch links, so the
// player area is never just a blank gap.
const SHOW_ID = "2503948";
const SPOTIFY = "https://open.spotify.com/show/3UIunv0XnAke98WPRSzM48";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function BuzzsproutPlayer({
  episode,
  image,
  youtube,
  title,
}: {
  episode: string;
  image?: string | null;
  youtube?: string | null;
  title?: string;
}) {
  const id = episode.split("-")[0];
  const containerId = `buzzsprout-player-${id}`;
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // The embed script injects an iframe into the container; treat any child as
    // "the player rendered". If it's already there (remount), we're done.
    const markReadyIfFilled = () => {
      if (container.childElementCount > 0) {
        setReady(true);
        setFailed(false);
        return true;
      }
      return false;
    };
    if (markReadyIfFilled()) return;

    const observer = new MutationObserver(() => {
      if (markReadyIfFilled()) observer.disconnect();
    });
    observer.observe(container, { childList: true });

    if (!document.getElementById(`bz-${id}`)) {
      const s = document.createElement("script");
      s.id = `bz-${id}`;
      s.async = true;
      s.src = `https://www.buzzsprout.com/${SHOW_ID}/episodes/${episode}.js?container_id=${containerId}&player=small`;
      s.onerror = () => setFailed(true); // blocked at the network level
      document.body.appendChild(s);
    }

    // Caught silently blocked / offline / very slow: if nothing has rendered
    // after a few seconds, fall back. (If the player shows up later, the
    // observer flips `ready` and the fallback is hidden again.)
    const timer = setTimeout(() => {
      if (container.childElementCount === 0) setFailed(true);
    }, 5000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [episode, id, containerId]);

  return (
    <div>
      <div id={containerId} />
      {failed && !ready && (
        <div className={styles.playerFallback}>
          {image && (
            <img
              className={styles.playerFallbackArt}
              src={`${BASE}${image}`}
              alt={title ? `${title} — episode artwork` : "Episode artwork"}
              width={96}
              height={96}
            />
          )}
          <div className={styles.playerFallbackBody}>
            <p className={styles.playerFallbackNote}>
              The audio player couldn&rsquo;t load. Listen on your preferred
              platform:
            </p>
            <div className={styles.playerFallbackLinks}>
              {youtube && (
                <a
                  className={styles.submit}
                  href={youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ▶ Watch on YouTube
                </a>
              )}
              <a
                className={styles.submit}
                href={SPOTIFY}
                target="_blank"
                rel="noopener noreferrer"
              >
                Listen on Spotify
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
