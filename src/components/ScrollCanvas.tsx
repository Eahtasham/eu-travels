"use client";

import { useEffect, useRef, useState } from 'react';

/**
 * Full-bleed background that scrubs a 306-frame image sequence by scroll
 * position. Frames are pre-decoded raster images, so every seek is an
 * instant swap — no keyframe-decode latency the way video seeking has,
 * which is what made the scrubbed-video approach feel laggy.
 */
export default function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [shouldHideLoader, setShouldHideLoader] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frameCount = 306;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    let currentFrame = 0; // eased playhead
    let targetFrame = 0; // scroll-derived target
    let lastRenderedFrame = -1;
    let animationId = 0;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const getFramePath = (index: number) =>
      `/plane-window/${index.toString().padStart(5, '0')}.jpg`;

    function resizeCanvas() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';

      const ctx2 = canvas.getContext('2d');
      if (ctx2) {
        ctx2.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx2.imageSmoothingEnabled = true;
        ctx2.imageSmoothingQuality = 'high';
      }

      lastRenderedFrame = -1;
      renderFrame(Math.round(currentFrame));
    }

    function renderFrame(index: number) {
      if (index === lastRenderedFrame) return;
      const img = images[index];
      if (!img || !img.complete) return;
      if (!canvas) return;

      const ctx2 = canvas.getContext('2d');
      if (!ctx2) return;

      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;

      ctx2.clearRect(0, 0, canvasWidth, canvasHeight);

      const imgRatio = img.width / img.height;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth: number, drawHeight: number, drawX: number, drawY: number;
      if (canvasRatio > imgRatio) {
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
        drawX = 0;
        drawY = (canvasHeight - drawHeight) / 2;
      } else {
        drawWidth = canvasHeight * imgRatio;
        drawHeight = canvasHeight;
        drawX = (canvasWidth - drawWidth) / 2;
        drawY = 0;
      }

      ctx2.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      lastRenderedFrame = index;
    }

    const computeTarget = () => {
      const scrollTop = window.scrollY;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
      const fraction = maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;
      targetFrame = Math.min(Math.max(fraction, 0), 1) * (frameCount - 1);
    };

    const animate = () => {
      // Reduced motion: snap straight to the scrolled frame, no eased catch-up.
      const easing = prefersReducedMotion ? 1 : 0.08;
      const diff = targetFrame - currentFrame;

      if (Math.abs(diff) > 0.001) {
        currentFrame += diff * easing;
      } else {
        currentFrame = targetFrame;
      }
      renderFrame(Math.round(currentFrame));
      animationId = requestAnimationFrame(animate);
    };

    const start = () => {
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
      window.addEventListener('scroll', computeTarget, { passive: true });
      computeTarget();
      animationId = requestAnimationFrame(animate);
      setLoaded(true);
      // Let the loader fade out before we drop it from the tree.
      window.setTimeout(() => setShouldHideLoader(true), 900);
    };

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      const onSettle = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) start();
      };
      img.onload = onSettle;
      img.onerror = onSettle;
      images.push(img);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', computeTarget);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 -z-10 block h-full w-full pointer-events-none"
      />

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
