"use client";

import { useEffect, useRef, useState } from 'react';

/**
 * Full-bleed background that scrubs a video by scroll position.
 *
 * Renders the native <video> directly (object-cover) rather than blitting
 * frames to a canvas, so it stays crisp at any device-pixel ratio and at the
 * source resolution — no upscaled/pixelated frames. The scroll position eases
 * a playhead which we snap to the 30fps frame grid before seeking.
 */
export default function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [shouldHideLoader, setShouldHideLoader] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const FPS = 30;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let duration = 0;
    let currentTime = 0; // eased playhead
    let targetTime = 0; // scroll-derived target
    let animationId = 0;
    let started = false;

    const computeTarget = () => {
      const scrollTop = window.scrollY;
      const maxScrollTop =
        document.documentElement.scrollHeight - window.innerHeight;
      const fraction = maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;
      targetTime = Math.min(Math.max(fraction, 0), 1) * duration;
    };

    const animate = () => {
      // Reduced motion: snap straight to the scrolled position, no eased catch-up.
      const easing = prefersReducedMotion ? 1 : 0.1;
      const diff = targetTime - currentTime;
      currentTime += Math.abs(diff) > 0.0005 ? diff * easing : diff;

      // Snap to the 30fps frame grid, then seek only on a real change.
      const snapped = Math.round(currentTime * FPS) / FPS;
      if (video.readyState >= 2 && Math.abs(video.currentTime - snapped) > 0.001) {
        try {
          video.currentTime = snapped;
        } catch {
          /* seek can throw mid-load; the next frame retries */
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    const updateBufferProgress = () => {
      if (!video.duration || !video.buffered.length) return;
      const buffered = video.buffered.end(video.buffered.length - 1);
      setProgress(Math.min(100, Math.round((buffered / video.duration) * 100)));
    };

    const start = () => {
      if (started) return;
      started = true;
      duration = video.duration || 0;
      setProgress(100);
      computeTarget();
      window.addEventListener('scroll', computeTarget, { passive: true });
      window.addEventListener('resize', computeTarget);
      animationId = requestAnimationFrame(animate);
      setLoaded(true);
      // Let the loader fade out before we drop it from the tree.
      window.setTimeout(() => setShouldHideLoader(true), 900);
    };

    const onProgress = () => updateBufferProgress();
    const onLoadedMetadata = () => {
      duration = video.duration || 0;
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('progress', onProgress);
    // 'loadeddata' (first frame decodable) rather than 'canplaythrough'
    // (browser estimates the *whole* file can download in time to play
    // straight through). We only ever seek nearby frames via HTTP range
    // requests, so waiting for a full-file download estimate before
    // starting was the main source of a slow-feeling load.
    video.addEventListener('loadeddata', start);
    // Failsafe: never hang on the loader if loadeddata is slow to fire.
    const failsafe = window.setTimeout(start, 4000);

    return () => {
      window.removeEventListener('scroll', computeTarget);
      window.removeEventListener('resize', computeTarget);
      cancelAnimationFrame(animationId);
      window.clearTimeout(failsafe);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('progress', onProgress);
      video.removeEventListener('loadeddata', start);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        aria-hidden="true"
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
        poster="/plane-window/00001.jpg"
        className="fixed inset-0 -z-10 block h-full w-full object-cover pointer-events-none"
      >
        <source src="/plane-window.mp4" type="video/mp4" />
      </video>

      {!shouldHideLoader && (
        <div
          id="loader"
          role="status"
          aria-live="polite"
          aria-label={`Preparing your journey, ${progress} percent loaded`}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background:
              'radial-gradient(120% 90% at 50% 42%, #0b1016 0%, #05070a 55%, #030405 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '30px',
            padding: '0 24px',
            zIndex: 100,
            transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.9s',
            color: '#ffffff',
            opacity: loaded ? 0 : 1,
            visibility: loaded ? 'hidden' : 'visible',
          }}
        >
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.42em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.82)',
              paddingLeft: '0.42em',
            }}
          >
            EU Travels
          </div>

          <div
            aria-hidden="true"
            style={{
              position: 'relative',
              width: 'min(240px, 62vw)',
              height: '1px',
              background: 'rgba(255,255,255,0.14)',
              overflow: 'hidden',
              borderRadius: '1px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                transformOrigin: 'left center',
                transform: `scaleX(${progress / 100})`,
                background: 'linear-gradient(90deg, rgba(255,255,255,0.35), #ffffff)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>

          <div
            style={{
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span>Preparing your journey</span>
            <span style={{ color: 'rgba(255,255,255,0.82)', fontVariantNumeric: 'tabular-nums' }}>
              {progress}%
            </span>
          </div>
        </div>
      )}
    </>
  );
}
