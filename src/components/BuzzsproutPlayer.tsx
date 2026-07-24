"use client";

import { useEffect } from "react";

// Embeds the Buzzsprout episode player. `episode` is the "<id>-<slug>" path from
// front matter; the numeric id (before the first "-") is the container id.
// Loaded as functional podcast playback (not gated behind cookie consent);
// Buzzsprout is disclosed in the Privacy Policy's cookie list.
const SHOW_ID = "2503948";

export function BuzzsproutPlayer({ episode }: { episode: string }) {
  const id = episode.split("-")[0];
  const containerId = `buzzsprout-player-${id}`;

  useEffect(() => {
    if (document.getElementById(`bz-${id}`)) return; // don't double-inject
    const s = document.createElement("script");
    s.id = `bz-${id}`;
    s.async = true;
    s.src = `https://www.buzzsprout.com/${SHOW_ID}/episodes/${episode}.js?container_id=${containerId}&player=small`;
    document.body.appendChild(s);
  }, [episode, id, containerId]);

  return <div id={containerId} />;
}
