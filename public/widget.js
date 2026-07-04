(function () {
  'use strict';

  const BRAND = {
    primary: '#22C55E',
    primaryDark: '#16A34A',
    accent: '#4ADE80',
    primaryRgb: '34,197,94',
    bg: '#0B0F0E',
    bgSecondary: '#111827',
    bgCard: '#1F2937',
    bgGlass: 'rgba(11,15,14,0.6)',
    textPrimary: '#FFFFFF',
    textSecondary: '#9CA3AF',
    textMuted: '#6B7280',
    borderSubtle: 'rgba(255,255,255,0.06)',
    borderLight: 'rgba(255,255,255,0.1)',
    borderGlow: 'rgba(34,197,94,0.3)',
    radiusLg: '20px',
    radiusFull: '9999px',
    easeOutExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  };

  const scriptTag = document.currentScript;
  const scriptSrc = scriptTag ? scriptTag.src : '';
  const serverOrigin = scriptSrc ? scriptSrc.substring(0, scriptSrc.lastIndexOf('/')) : '';
  const dataApiUrl = scriptTag ? scriptTag.getAttribute('data-api-url') : null;
  const baseUrl = dataApiUrl || serverOrigin || window.location.origin;
  const isVoiceEnabled = scriptTag && scriptTag.hasAttribute('data-voice');

  const BOT_SVG = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
    <circle cx="50" cy="50" r="47" fill="${BRAND.bgGlass}" stroke="${BRAND.borderGlow}" stroke-width="1.5"/>
    <circle cx="50" cy="52" r="36" fill="rgba(17,24,39,0.4)" stroke="rgba(34,197,94,0.1)" stroke-width="1"/>
    <path d="M50 3 C50 3, 56 14, 50 20" stroke="${BRAND.primary}" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="50" cy="6" r="4.5" fill="${BRAND.primary}" opacity="0.9"/>
    <circle cx="50" cy="6" r="8" fill="rgba(34,197,94,0.2)"/>
    <circle cx="36" cy="46" r="7.5" fill="${BRAND.primary}"/>
    <circle cx="36" cy="46" r="12" fill="rgba(34,197,94,0.12)"/>
    <circle cx="64" cy="46" r="7.5" fill="${BRAND.primary}"/>
    <circle cx="64" cy="46" r="12" fill="rgba(34,197,94,0.12)"/>
    <circle cx="38" cy="44" r="2.5" fill="rgba(255,255,255,0.35)"/>
    <circle cx="66" cy="44" r="2.5" fill="rgba(255,255,255,0.35)"/>
    <path d="M40 60 C44 64.5, 56 64.5, 60 60" stroke="${BRAND.primary}" stroke-width="2" stroke-linecap="round" opacity="0.85"/>
    <circle cx="28" cy="54" r="5" fill="rgba(34,197,94,0.1)"/>
    <circle cx="72" cy="54" r="5" fill="rgba(34,197,94,0.1)"/>
    <ellipse cx="36" cy="30" rx="14" ry="7" fill="rgba(255,255,255,0.04)" transform="rotate(-20, 36, 30)"/>
  </svg>`;

  const CLOSE_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

  const CHAT_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;

  const SEND_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px;"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;

  const MIC_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px;"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="19" x2="12" y2="22"/></svg>`;

  const root = document.createElement('div');
  root.id = 'mch-root';
  const shadow = root.attachShadow({ mode: 'closed' });

  let sessionId = localStorage.getItem('mch_session') || '';
  let isOpen = false;
  let isListening = false;

  const styles = document.createElement('style');
  styles.textContent = `
    @import url('https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    .mch-wrap {
      position: fixed;
      bottom: 24px;
      right: 90px;
      z-index: 2147483647;
      font-family: 'Satoshi', 'Inter', -apple-system, sans-serif;
      direction: ltr;
    }

    .mch-bot {
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: ${BRAND.bgGlass};
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1.5px solid ${BRAND.borderGlow};
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 24px rgba(34,197,94,0.35), 0 0 60px rgba(34,197,94,0.08);
      transition: transform 0.35s ${BRAND.easeOutExpo}, box-shadow 0.35s ${BRAND.easeOutExpo};
      position: relative;
      margin-left: auto;
      padding: 9px;
      -webkit-tap-highlight-color: transparent;
    }
    .mch-bot:hover { transform: scale(1.06); box-shadow: 0 6px 32px rgba(34,197,94,0.5), 0 0 80px rgba(34,197,94,0.12); }
    .mch-bot:active { transform: scale(0.92); }

    .mch-bot-close { display: none; }
    .mch-bot.mch-open .mch-bot-open { display: none; }
    .mch-bot.mch-open .mch-bot-close { display: block; width: 60%; height: 60%; color: ${BRAND.textSecondary}; }

    .mch-ring {
      position: absolute;
      inset: -5px;
      border-radius: 50%;
      border: 2px solid ${BRAND.primary};
      animation: mch-pulse 2s ease-out infinite;
      pointer-events: none;
      opacity: 0.5;
    }
    .mch-ring.mch-stop { animation: none; opacity: 0; }

    @keyframes mch-pulse {
      0%   { transform: scale(1); opacity: 0.6; }
      100% { transform: scale(1.7); opacity: 0; }
    }

    .mch-window {
      position: absolute;
      bottom: 72px;
      right: -8px;
      width: 380px;
      height: 600px;
      max-height: min(600px, calc(100vh - 140px));
      max-width: calc(100vw - 40px);
      background: ${BRAND.bg};
      border: 1px solid ${BRAND.borderLight};
      border-radius: ${BRAND.radiusLg};
      overflow: hidden;
      box-shadow: 0 8px 48px rgba(0,0,0,0.5), 0 0 120px rgba(34,197,94,0.06);
      display: none;
      flex-direction: column;
      animation: mch-slideUp 0.35s ${BRAND.easeOutExpo};
    }
    .mch-window.mch-open { display: flex; }

    @keyframes mch-slideUp {
      from { opacity: 0; transform: translateY(12px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes mch-fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    .mch-header {
      background: ${BRAND.bgGlass};
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid ${BRAND.borderSubtle};
      padding: 14px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }
    .mch-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: ${BRAND.bg};
      border: 1.5px solid ${BRAND.borderGlow};
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      padding: 6px;
      color: ${BRAND.primary};
    }
    .mch-hdr-info { flex: 1; min-width: 0; }
    .mch-hdr-name { font-size: 14px; font-weight: 600; color: ${BRAND.textPrimary}; letter-spacing: -0.01em; }
    .mch-hdr-status { font-size: 11px; color: ${BRAND.primary}; display: flex; align-items: center; gap: 4px; }
    .mch-hdr-dot { width: 5px; height: 5px; border-radius: 50%; background: ${BRAND.primary}; display: inline-block; }
    .mch-hdr-actions { display: flex; gap: 2px; }
    .mch-hdr-btn {
      background: transparent;
      border: none;
      border-radius: 8px;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: ${BRAND.textMuted};
      transition: background 0.2s, color 0.2s;
    }
    .mch-hdr-btn:hover { background: rgba(255,255,255,0.06); color: ${BRAND.textPrimary}; }
    .mch-hdr-btn svg { width: 16px; height: 16px; }

    .mch-body {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: ${BRAND.bg};
      scroll-behavior: smooth;
    }
    .mch-body::-webkit-scrollbar { width: 3px; }
    .mch-body::-webkit-scrollbar-track { background: transparent; }
    .mch-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }

    .mch-msg {
      max-width: 88%;
      padding: 10px 14px;
      border-radius: 14px;
      font-size: 13.5px;
      line-height: 1.55;
      word-wrap: break-word;
      animation: mch-fadeIn 0.25s ease;
    }
    .mch-msg p { margin: 0; }
    .mch-msg p + p { margin-top: 5px; }

    .mch-msg-user {
      background: ${BRAND.primary};
      color: #0B0F0E;
      align-self: flex-end;
      border-bottom-right-radius: 4px;
      font-weight: 500;
    }
    .mch-msg-bot {
      background: ${BRAND.bgSecondary};
      color: ${BRAND.textPrimary};
      align-self: flex-start;
      border: 1px solid ${BRAND.borderSubtle};
      border-bottom-left-radius: 4px;
    }

    .mch-time {
      font-size: 10px;
      opacity: 0.35;
      margin-top: 4px;
      text-align: right;
    }

    .mch-typing {
      align-self: flex-start;
      background: ${BRAND.bgSecondary};
      border: 1px solid ${BRAND.borderSubtle};
      padding: 12px 16px;
      border-radius: 14px;
      border-bottom-left-radius: 4px;
      display: flex;
      gap: 4px;
      align-items: center;
      animation: mch-fadeIn 0.2s ease;
    }
    .mch-typing span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${BRAND.textMuted};
      animation: mch-bounce 1.4s ease-in-out infinite;
    }
    .mch-typing span:nth-child(2) { animation-delay: 0.2s; }
    .mch-typing span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes mch-bounce {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
      40% { transform: scale(1); opacity: 0.9; }
    }

    .mch-footer {
      background: ${BRAND.bgGlass};
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-top: 1px solid ${BRAND.borderSubtle};
      padding: 10px 14px;
      display: flex;
      align-items: flex-end;
      gap: 8px;
      flex-shrink: 0;
    }
    .mch-input {
      flex: 1;
      background: rgba(31,41,55,0.4);
      border: 1px solid ${BRAND.borderSubtle};
      border-radius: 12px;
      padding: 9px 13px;
      font-family: inherit;
      font-size: 13.5px;
      color: ${BRAND.textPrimary};
      outline: none;
      transition: border-color 0.2s, background 0.2s;
      resize: none;
      min-height: 38px;
      max-height: 120px;
      line-height: 1.4;
    }
    .mch-input::placeholder { color: ${BRAND.textMuted}; }
    .mch-input:focus { border-color: rgba(34,197,94,0.4); background: rgba(31,41,55,0.6); }

    .mch-send {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: none;
      background: ${BRAND.primary};
      color: #0B0F0E;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: transform 0.2s ${BRAND.easeOutExpo}, background 0.2s, opacity 0.2s;
    }
    .mch-send:hover { transform: scale(1.05); background: ${BRAND.accent}; }
    .mch-send:active { transform: scale(0.9); }
    .mch-send:disabled { opacity: 0.3; cursor: default; transform: none; }
    .mch-send svg { width: 18px; height: 18px; }

    .mch-mic {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 1px solid ${BRAND.borderSubtle};
      background: transparent;
      color: ${BRAND.textSecondary};
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.2s;
    }
    .mch-mic:hover { border-color: ${BRAND.borderGlow}; color: ${BRAND.primary}; }
    .mch-mic.mch-listening { background: rgba(239,68,68,0.15); border-color: #ef4444; color: #ef4444; }

    .mch-quick {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 4px 16px 12px;
      background: ${BRAND.bg};
    }
    .mch-qchip {
      background: rgba(31,41,55,0.5);
      border: 1px solid ${BRAND.borderSubtle};
      border-radius: 20px;
      padding: 5px 12px;
      font-size: 12px;
      color: ${BRAND.textSecondary};
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }
    .mch-qchip:hover { background: rgba(34,197,94,0.1); border-color: ${BRAND.borderGlow}; color: ${BRAND.accent}; }

    @media (max-width: 480px) {
      .mch-wrap { bottom: 24px; right: 90px; }
      .mch-window {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
        width: 100%;
        max-width: 100%;
        height: 100%;
        max-height: 100%;
        border-radius: 0;
        border: none;
        animation: mch-mobileUp 0.35s ${BRAND.easeOutExpo};
      }
      @keyframes mch-mobileUp {
        from { transform: translateY(20px); }
        to   { transform: translateY(0); }
      }
      .mch-bot { bottom: 16px; right: 12px; }
    }
  `;

  shadow.appendChild(styles);

  const wrap = document.createElement('div');
  wrap.className = 'mch-wrap';

  const botBtn = document.createElement('div');
  botBtn.className = 'mch-bot';
  botBtn.setAttribute('role', 'button');
  botBtn.setAttribute('tabindex', '0');
  botBtn.setAttribute('aria-label', 'Chat with Manhar AI');
  botBtn.innerHTML = `
    <span class="mch-bot-open" style="width:100%;height:100%;display:block;">${BOT_SVG}</span>
    <span class="mch-bot-close">${CLOSE_SVG}</span>
    <span class="mch-ring"></span>
  `;
  wrap.appendChild(botBtn);

  const chatWindow = document.createElement('div');
  chatWindow.className = 'mch-window';
  chatWindow.innerHTML = `
    <div class="mch-header">
      <div class="mch-avatar">${BOT_SVG}</div>
      <div class="mch-hdr-info">
        <div class="mch-hdr-name">Manhar AI</div>
        <div class="mch-hdr-status"><span class="mch-hdr-dot"></span> Online</div>
      </div>
      <div class="mch-hdr-actions">
        <button class="mch-hdr-btn" data-action="reset" title="New chat">${`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`}</button>
        <button class="mch-hdr-btn" data-action="minimize" title="Minimize">${`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`}</button>
        <button class="mch-hdr-btn" data-action="close" title="Close">${CLOSE_SVG}</button>
      </div>
    </div>
    <div class="mch-body"></div>
    <div class="mch-quick">
      <button class="mch-qchip" data-q="What services do you offer?">What services do you offer?</button>
      <button class="mch-qchip" data-q="How much does a website cost?">How much does a website cost?</button>
      <button class="mch-qchip" data-q="Can you show me your work?">Can you show me your work?</button>
      <button class="mch-qchip" data-q="I want to start a project">I want to start a project</button>
    </div>
    <div class="mch-footer">
      <textarea class="mch-input" rows="1" placeholder="Type your message..." aria-label="Chat message"></textarea>
      ${isVoiceEnabled ? `<button class="mch-mic" title="Voice input">${MIC_SVG}</button>` : ''}
      <button class="mch-send" disabled aria-label="Send">${SEND_SVG}</button>
    </div>
  `;
  wrap.appendChild(chatWindow);
  shadow.appendChild(wrap);

  // ─── DOM refs ───
  const body = chatWindow.querySelector('.mch-body');
  const input = chatWindow.querySelector('.mch-input');
  const sendBtn = chatWindow.querySelector('.mch-send');
  const micBtn = chatWindow.querySelector('.mch-mic');
  const chips = chatWindow.querySelectorAll('.mch-qchip');
  const ring = botBtn.querySelector('.mch-ring');

  // ─── Auto-resize input ───
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    sendBtn.disabled = !input.value.trim();
  });

  // ─── Send message ───
  function sendMessage(text) {
    if (!text.trim()) return;
    addMessage(text, 'user');
    input.value = '';
    input.style.height = 'auto';
    sendBtn.disabled = true;
    chips.forEach(c => c.remove());

    const typing = document.createElement('div');
    typing.className = 'mch-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;

    const reply = document.createElement('div');
    reply.className = 'mch-msg mch-msg-bot';

    fetch(baseUrl + '/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, sessionId: sessionId || undefined })
    })
    .then(r => r.json())
    .then(data => {
      sessionId = data.sessionId;
      localStorage.setItem('mch_session', sessionId);
      typing.remove();
      reply.textContent = data.reply;
      const time = document.createElement('div');
      time.className = 'mch-time';
      time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      reply.appendChild(time);
      body.appendChild(reply);
      body.scrollTop = body.scrollHeight;
    })
    .catch(() => {
      typing.remove();
      reply.textContent = 'I apologize, but I\'m having trouble connecting. Please reach out on WhatsApp at +919714571522 or email manharcreatives@gmail.com.';
      body.appendChild(reply);
      body.scrollTop = body.scrollHeight;
    });
  }

  function addMessage(text, type) {
    const msg = document.createElement('div');
    msg.className = 'mch-msg mch-msg-' + type;
    msg.textContent = text;
    const time = document.createElement('div');
    time.className = 'mch-time';
    time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    msg.appendChild(time);
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }

  // ─── Events ───
  sendBtn.addEventListener('click', () => sendMessage(input.value));

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.value.trim()) sendMessage(input.value);
    }
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => sendMessage(chip.dataset.q));
  });

  // ─── Header actions ───
  chatWindow.querySelector('[data-action="close"]').addEventListener('click', toggle);
  chatWindow.querySelector('[data-action="minimize"]').addEventListener('click', toggle);
  chatWindow.querySelector('[data-action="reset"]').addEventListener('click', () => {
    sessionId = '';
    localStorage.removeItem('mch_session');
    body.innerHTML = '';
    fetch(baseUrl + '/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'hi', sessionId: '' })
    }).then(r => r.json()).then(data => {
      sessionId = data.sessionId;
      localStorage.setItem('mch_session', sessionId);
      const msg = document.createElement('div');
      msg.className = 'mch-msg mch-msg-bot';
      msg.textContent = data.reply;
      body.appendChild(msg);
    }).catch(() => {});
  });

  // ─── Voice input ───
  if (micBtn) {
    micBtn.addEventListener('click', () => {
      if (isListening) return;
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        addMessage('Voice input is not supported in your browser.', 'bot');
        return;
      }
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      isListening = true;
      micBtn.classList.add('mch-listening');

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        if (text.trim()) {
          input.value = text;
          sendMessage(text);
        }
        isListening = false;
        micBtn.classList.remove('mch-listening');
      };
      recognition.onerror = () => {
        isListening = false;
        micBtn.classList.remove('mch-listening');
      };
      recognition.onend = () => {
        isListening = false;
        micBtn.classList.remove('mch-listening');
      };
      recognition.start();
    });
  }

  function toggle() {
    isOpen = !isOpen;
    botBtn.classList.toggle('mch-open', isOpen);
    chatWindow.classList.toggle('mch-open', isOpen);
    ring.classList.toggle('mch-stop', isOpen);
    if (isOpen) {
      input.focus();
      if (body.children.length === 0) {
        sendMessage('hi');
      }
    }
  }

  botBtn.addEventListener('click', toggle);
  botBtn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });

  // ─── Close on Escape ───
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) toggle();
  });

  // ─── Attach to DOM ───
  document.body.appendChild(root);

  // ─── Welcome on session resume ───
  if (sessionId) {
    fetch(baseUrl + '/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'hi', sessionId })
    }).then(r => r.json()).then(data => {
      sessionId = data.sessionId;
      localStorage.setItem('mch_session', sessionId);
    }).catch(() => {});
  }
})();
