import { useEffect } from 'react';

const PHONE_NUMBER = '+919714571522';

// ─── NUCLEAR APPROACH ──────────────────────────────────────────────────────
// After multiple CSS/portal fixes failed on real mobile Chrome, we bypass
// React entirely. Pure vanilla JS DOM injection:
//   • No createPortal (some mobile browsers mishandle portal stacking)
//   • No CSS classes (avoids class not being applied due to load order)  
//   • Appended to document.documentElement (<html>), not body
//     → Completely outside any overflow/stacking context that could clip it
//   • Inline styles only, dead-simple positioning (no max(), no env())
//   • Injects its own <style> tag into <head> for the pulse animation
// ──────────────────────────────────────────────────────────────────────────

export default function FloatingCall() {
  useEffect(() => {
    // Remove any previous instance (StrictMode double-invoke guard)
    const prev = document.getElementById('fc-btn');
    if (prev) prev.remove();
    const prevStyle = document.getElementById('fc-style');
    if (prevStyle) prevStyle.remove();

    // ── 1. Inject keyframe animation into <head> ──────────────────────────
    const styleEl = document.createElement('style');
    styleEl.id = 'fc-style';
    styleEl.textContent = `
      @keyframes fc-pulse {
        0%   { transform: scale(1);   opacity: 0.5; }
        100% { transform: scale(1.6); opacity: 0;   }
      }
      @keyframes fc-bounce {
        0%, 100% { transform: scale(1); }
        50%       { transform: scale(1.08); }
      }
      #fc-btn {
        position: fixed !important;
        bottom: 24px !important;
        right: 20px !important;
        z-index: 2147483647 !important;
        width: 58px !important;
        height: 58px !important;
        border-radius: 50% !important;
        background: #22c55e !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        text-decoration: none !important;
        box-shadow: 0 4px 24px rgba(34,197,94,0.55) !important;
        cursor: pointer !important;
        -webkit-tap-highlight-color: transparent !important;
        animation: fc-bounce 2.4s ease-in-out infinite !important;
        /* Force own GPU compositing layer */
        transform: translateZ(0) !important;
        -webkit-transform: translateZ(0) !important;
        will-change: transform !important;
      }
      #fc-btn:active {
        transform: translateZ(0) scale(0.9) !important;
        -webkit-transform: translateZ(0) scale(0.9) !important;
      }
      #fc-ring {
        position: absolute !important;
        inset: -5px !important;
        border-radius: 50% !important;
        border: 2.5px solid #22c55e !important;
        animation: fc-pulse 2s ease-out infinite !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(styleEl);

    // ── 2. Create the button element ──────────────────────────────────────
    const btn = document.createElement('a');
    btn.id = 'fc-btn';
    btn.href = `tel:${PHONE_NUMBER}`;
    btn.setAttribute('aria-label', 'Call Manhar Creatives');
    btn.setAttribute('role', 'link');

    // ── 3. Phone SVG icon ─────────────────────────────────────────────────
    btn.innerHTML = `
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
           stroke="#0B0F0E" stroke-width="2.2"
           stroke-linecap="round" stroke-linejoin="round"
           style="display:block;flex-shrink:0;">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07
                 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1
                 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0
                 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1
                 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
      <span id="fc-ring"></span>
    `;

    // ── 4. Append to <html> element — completely outside body/root ─────────
    // This bypasses ANY overflow, stacking context, or transform on body/#root
    document.documentElement.appendChild(btn);

    // ── 5. Cleanup on unmount ──────────────────────────────────────────────
    return () => {
      document.getElementById('fc-btn')?.remove();
      document.getElementById('fc-style')?.remove();
    };
  }, []);

  return null; // renders nothing in React tree
}
