(function () {
  'use strict';

  const BRAND = {
    primary: '#22C55E', primaryDark: '#16A34A', accent: '#4ADE80',
    primaryRgb: '34,197,94', bg: '#0B0F0E', bgSecondary: '#111827',
    bgGlass: 'rgba(11,15,14,0.6)', textPrimary: '#FFFFFF',
    textSecondary: '#9CA3AF', textMuted: '#6B7280',
    borderSubtle: 'rgba(255,255,255,0.06)', borderLight: 'rgba(255,255,255,0.1)',
    borderGlow: 'rgba(34,197,94,0.3)', radiusLg: '20px',
    easeOutExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  };

  const scriptTag = document.currentScript;
  const baseUrl = (scriptTag ? scriptTag.src.substring(0, scriptTag.src.lastIndexOf('/')) : '') || window.location.origin;
  const BOT_IMG = '/images/manhar-bot.png';

  const CLOSE_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  const SEND_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>';

  // ─── State ───
  let sessionId = localStorage.getItem('mch_session') || '';
  let chatOpen = false;
  let botVisible = false;
  let currentSectionIdx = -1;
  let selectedLanguage = null;
  let isDismissing = false;
  const sections = [
    { id: '#hero',     pos: { left: '30px', bottom: '45%' } },
    { id: '#services', pos: { right: '30px', bottom: '40%' } },
    { id: '#process',  pos: { left: '30px', top: '40%' } },
    { id: '#projects', pos: { right: '30px', bottom: '35%' } },
    { id: '#contact',  pos: { bottom: '100px', right: '90px' } },
  ];

  // ─── HTML ───
  const root = document.createElement('div');
  root.id = 'mch-root';
  const shadow = root.attachShadow({ mode: 'closed' });

  const styles = document.createElement('style');
  styles.textContent = `
    @import url('https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    .mch-float {
      position: fixed;
      z-index: 2147483647;
      font-family: 'Satoshi', 'Inter', -apple-system, sans-serif;
      pointer-events: none;
    }
    .mch-bubble-wrap {
      position: relative;
      display: flex;
      align-items: center;
      gap: 12px;
      pointer-events: auto;
      opacity: 0;
      transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: transform, opacity;
    }
    .mch-bubble-wrap.mch-from-left { transform: translateX(-100%); }
    .mch-bubble-wrap.mch-from-right { transform: translateX(100%); }
    .mch-bubble-wrap.mch-show {
      opacity: 1;
      transform: translateX(0);
    }
    .mch-bubble-wrap.mch-hide {
      opacity: 0;
      transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .mch-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 2px solid rgba(34,197,94,0.3);
      box-shadow: 0 0 24px rgba(34,197,94,0.35), 0 0 60px rgba(34,197,94,0.08);
      cursor: pointer;
      flex-shrink: 0;
      overflow: hidden;
      background: rgba(11,15,14,0.6);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      animation: mch-bob 3s ease-in-out infinite;
      -webkit-tap-highlight-color: transparent;
    }
    .mch-avatar:hover {
      transform: scale(1.08);
      box-shadow: 0 0 32px rgba(34,197,94,0.5), 0 0 80px rgba(34,197,94,0.12);
    }
    .mch-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    @keyframes mch-bob {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }

    .mch-bubble {
      position: relative;
      background: rgba(11,15,14,0.6);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px;
      padding: 10px 16px 10px 14px;
      color: #FFFFFF;
      font-size: 13px;
      line-height: 1.4;
      box-shadow: 0 4px 24px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .mch-bubble::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 100%;
      margin-top: -6px;
      border: 6px solid transparent;
      border-right-color: rgba(255,255,255,0.1);
    }
    .mch-bubble-wrap.mch-right { flex-direction: row-reverse; }
    .mch-bubble-wrap.mch-right .mch-bubble::after {
      right: auto; left: 100%;
      border-right-color: transparent;
      border-left-color: rgba(255,255,255,0.1);
    }
    .mch-bubble-close {
      background: none;
      border: none;
      color: #6B7280;
      cursor: pointer;
      padding: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: color 0.2s, background 0.2s;
      flex-shrink: 0;
    }
    .mch-bubble-close:hover { color: #FFFFFF; background: rgba(255,255,255,0.06); }
    .mch-bubble-close svg { width: 14px; height: 14px; }

    /* Language Picker */
    .mch-lang-picker {
      display: none;
      flex-direction: column;
      gap: 6px;
      white-space: nowrap;
    }
    .mch-lang-label {
      font-size: 11px;
      color: #9CA3AF;
    }
    .mch-lang-options {
      display: flex;
      gap: 4px;
    }
    .mch-lang-btn {
      background: rgba(31,41,55,0.6);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 8px;
      padding: 5px 10px;
      font-size: 11.5px;
      font-family: inherit;
      color: #FFFFFF;
      cursor: pointer;
      transition: all 0.2s;
    }
    .mch-lang-btn:hover {
      background: rgba(34,197,94,0.15);
      border-color: rgba(34,197,94,0.3);
    }

    /* ── Chat Window ── */
    .mch-window {
      position: fixed;
      bottom: 100px;
      right: 90px;
      width: 380px;
      height: 600px;
      max-height: min(600px, calc(100vh - 140px));
      max-width: calc(100vw - 40px);
      background: #0B0F0E;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 8px 48px rgba(0,0,0,0.5);
      display: none;
      flex-direction: column;
      z-index: 2147483647;
      animation: mch-slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .mch-window.mch-open { display: flex; }

    @keyframes mch-slideUp {
      from { opacity: 0; transform: translateY(12px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    .mch-hdr {
      background: rgba(11,15,14,0.6);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      padding: 14px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }
    .mch-hdr-avatar {
      width: 36px; height: 36px; border-radius: 50%; overflow: hidden;
      border: 1.5px solid rgba(34,197,94,0.3); flex-shrink: 0;
    }
    .mch-hdr-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .mch-hdr-info { flex: 1; min-width: 0; }
    .mch-hdr-name { font-size: 14px; font-weight: 600; color: #FFFFFF; }
    .mch-hdr-status { font-size: 11px; color: #22C55E; display: flex; align-items: center; gap: 4px; }
    .mch-hdr-dot { width: 5px; height: 5px; border-radius: 50%; background: #22C55E; display: inline-block; }
    .mch-hdr-btn {
      background: transparent; border: none; border-radius: 8px; width: 30px; height: 30px;
      display: flex; align-items: center; justify-content: center; cursor: pointer;
      color: #6B7280; transition: background 0.2s, color 0.2s;
    }
    .mch-hdr-btn:hover { background: rgba(255,255,255,0.06); color: #FFFFFF; }
    .mch-hdr-btn svg { width: 16px; height: 16px; }

    .mch-body {
      flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 8px;
      background: #0B0F0E; scroll-behavior: smooth;
    }
    .mch-body::-webkit-scrollbar { width: 3px; }
    .mch-body::-webkit-scrollbar-track { background: transparent; }
    .mch-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }

    .mch-msg {
      max-width: 88%; padding: 10px 14px; border-radius: 14px; font-size: 13.5px;
      line-height: 1.55; word-wrap: break-word; animation: mch-fadeIn 0.25s ease;
    }
    .mch-msg-user {
      background: #22C55E; color: #0B0F0E; align-self: flex-end;
      border-bottom-right-radius: 4px; font-weight: 500;
    }
    .mch-msg-bot {
      background: #111827; color: #FFFFFF;
      align-self: flex-start; border: 1px solid rgba(255,255,255,0.06); border-bottom-left-radius: 4px;
    }
    .mch-time { font-size: 10px; opacity: 0.35; margin-top: 4px; text-align: right; }

    .mch-typing {
      align-self: flex-start; background: #111827; border: 1px solid rgba(255,255,255,0.06);
      padding: 12px 16px; border-radius: 14px; border-bottom-left-radius: 4px; display: flex; gap: 4px;
      animation: mch-fadeIn 0.2s ease;
    }
    .mch-typing span {
      width: 6px; height: 6px; border-radius: 50%; background: #6B7280;
      animation: mch-bounce 1.4s ease-in-out infinite;
    }
    .mch-typing span:nth-child(2) { animation-delay: 0.2s; }
    .mch-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes mch-bounce {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
      40% { transform: scale(1); opacity: 0.9; }
    }
    @keyframes mch-fadeIn { from { opacity: 0; } to { opacity: 1; } }

    .mch-footer {
      background: rgba(11,15,14,0.6); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      border-top: 1px solid rgba(255,255,255,0.06); padding: 10px 14px;
      display: flex; align-items: flex-end; gap: 8px; flex-shrink: 0;
    }
    .mch-input {
      flex: 1; background: rgba(31,41,55,0.4); border: 1px solid rgba(255,255,255,0.06);
      border-radius: 12px; padding: 9px 13px; font-family: inherit; font-size: 13.5px;
      color: #FFFFFF; outline: none; transition: border-color 0.2s, background 0.2s;
      resize: none; min-height: 38px; max-height: 120px; line-height: 1.4;
    }
    .mch-input::placeholder { color: #6B7280; }
    .mch-input:focus { border-color: rgba(34,197,94,0.4); background: rgba(31,41,55,0.6); }

    .mch-send {
      width: 38px; height: 38px; border-radius: 50%; border: none; background: #22C55E;
      color: #0B0F0E; display: flex; align-items: center; justify-content: center;
      cursor: pointer; flex-shrink: 0; transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s, opacity 0.2s;
    }
    .mch-send:hover { transform: scale(1.05); background: #4ADE80; }
    .mch-send:active { transform: scale(0.9); }
    .mch-send:disabled { opacity: 0.3; cursor: default; transform: none; }
    .mch-send svg { width: 18px; height: 18px; }

    .mch-quick {
      display: flex; flex-wrap: wrap; gap: 6px; padding: 4px 16px 12px; background: #0B0F0E;
    }
    .mch-qchip {
      background: rgba(31,41,55,0.5); border: 1px solid rgba(255,255,255,0.06);
      border-radius: 20px; padding: 5px 12px; font-size: 12px; color: #9CA3AF;
      cursor: pointer; transition: all 0.2s; font-family: inherit;
    }
    .mch-qchip:hover { background: rgba(34,197,94,0.1); border-color: rgba(34,197,94,0.3); color: #4ADE80; }

    @media (max-width: 480px) {
      .mch-window {
        position: fixed; bottom: 0; right: 0; left: 0; top: 0;
        width: 100%; max-width: 100%; height: 100%; max-height: 100%;
        border-radius: 0; border: none;
      }
      .mch-bubble-wrap { gap: 8px; }
      .mch-avatar { width: 52px; height: 52px; }
      .mch-bubble { font-size: 12px; padding: 8px 12px; }
    }
  `;
  shadow.appendChild(styles);

  // ─── Build UI ───
  const floatWrap = document.createElement('div');
  floatWrap.className = 'mch-float';

  const bubbleWrap = document.createElement('div');
  bubbleWrap.className = 'mch-bubble-wrap';

  const avatar = document.createElement('div');
  avatar.className = 'mch-avatar';
  avatar.setAttribute('role', 'button');
  avatar.setAttribute('tabindex', '0');
  avatar.setAttribute('aria-label', 'Chat with Manhar AI');
  const avatarImg = document.createElement('img');
  avatarImg.src = BOT_IMG;
  avatarImg.alt = 'Manhar AI';
  avatarImg.draggable = false;
  avatar.appendChild(avatarImg);

  const bubble = document.createElement('div');
  bubble.className = 'mch-bubble';

  // Language picker UI (hidden by default)
  const langPicker = document.createElement('div');
  langPicker.className = 'mch-lang-picker';

  const langLabel = document.createElement('div');
  langLabel.className = 'mch-lang-label';
  langLabel.textContent = 'Choose your language:';

  const langOptions = document.createElement('div');
  langOptions.className = 'mch-lang-options';

  const languages = [
    { code: 'hindi', label: '🇮🇳 हिंदी' },
    { code: 'english', label: '🇬🇧 English' },
    { code: 'gujarati', label: '🇮🇳 ગુજરાતી' },
  ];
  languages.forEach(lang => {
    const btn = document.createElement('button');
    btn.className = 'mch-lang-btn';
    btn.textContent = lang.label;
    btn.dataset.lang = lang.code;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      selectLanguage(lang.code);
    });
    langOptions.appendChild(btn);
  });

  langPicker.appendChild(langLabel);
  langPicker.appendChild(langOptions);

  const msgSpan = document.createElement('span');
  msgSpan.textContent = "Need help? 👋";

  const closeBtn = document.createElement('button');
  closeBtn.className = 'mch-bubble-close';
  closeBtn.setAttribute('aria-label', 'Dismiss');
  closeBtn.innerHTML = CLOSE_SVG;

  bubble.appendChild(langPicker);
  bubble.appendChild(msgSpan);
  bubble.appendChild(closeBtn);

  bubbleWrap.appendChild(avatar);
  bubbleWrap.appendChild(bubble);
  floatWrap.appendChild(bubbleWrap);

  // ─── Chat Window ───
  const chatEl = document.createElement('div');
  chatEl.className = 'mch-window';
  chatEl.innerHTML = `
    <div class="mch-hdr">
      <div class="mch-hdr-avatar"><img src="${BOT_IMG}" alt="Manhar AI"></div>
      <div class="mch-hdr-info">
        <div class="mch-hdr-name">Manhar AI</div>
        <div class="mch-hdr-status"><span class="mch-hdr-dot"></span> Online</div>
      </div>
      <div class="mch-hdr-actions">
        <button class="mch-hdr-btn" data-action="reset" title="New chat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg></button>
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
      <button class="mch-send" disabled aria-label="Send">${SEND_SVG}</button>
    </div>
  `;

  shadow.appendChild(floatWrap);
  shadow.appendChild(chatEl);

  // ─── Chat DOM refs ───
  const chatBody = chatEl.querySelector('.mch-body');
  const chatInput = chatEl.querySelector('.mch-input');
  const chatSend = chatEl.querySelector('.mch-send');
  const chatChips = chatEl.querySelectorAll('.mch-qchip');

  // ─── Show/hide bot ───
  function showBot(pos) {
    if (botVisible || isDismissing) return;
    botVisible = true;

    Object.keys(pos).forEach(key => {
      floatWrap.style[key] = pos[key];
    });
    if (pos.left) floatWrap.style.right = 'auto';
    if (pos.right) floatWrap.style.left = 'auto';
    if (pos.top) floatWrap.style.bottom = 'auto';
    if (pos.bottom) floatWrap.style.top = 'auto';

    const isRight = !!pos.right;
    bubbleWrap.classList.remove('mch-hide', 'mch-show', 'mch-from-left', 'mch-from-right', 'mch-right');
    void bubbleWrap.offsetHeight;
    bubbleWrap.classList.add(isRight ? 'mch-from-right' : 'mch-from-left');
    if (isRight) bubbleWrap.classList.add('mch-right');
    void bubbleWrap.offsetHeight;
    bubbleWrap.classList.add('mch-show');
  }

  function hideBot(callback) {
    if (!botVisible && !isDismissing) {
      if (callback) callback();
      return;
    }
    botVisible = false;
    isDismissing = true;

    const isRight = bubbleWrap.classList.contains('mch-right');
    bubbleWrap.classList.remove('mch-show');
    bubbleWrap.classList.add('mch-hide');
    bubbleWrap.style.transform = isRight ? 'translateX(100%)' : 'translateX(-100%)';

    setTimeout(() => {
      bubbleWrap.style.transform = '';
      isDismissing = false;
      if (callback) callback();
    }, 400);
  }

  // ─── Language picker ───
  function showLanguagePicker() {
    msgSpan.style.display = 'none';
    langPicker.style.display = 'flex';
  }

  function hideLanguagePicker() {
    msgSpan.style.display = '';
    langPicker.style.display = 'none';
  }

  function selectLanguage(lang) {
    selectedLanguage = lang;
    hideLanguagePicker();
    openChat();
  }

  // ─── Section tracking (continuous, Lenis-compatible) ───
  let sectionRaf = null;

  function startSectionWatcher() {
    function checkSections() {
      if (chatOpen) {
        sectionRaf = requestAnimationFrame(checkSections);
        return;
      }

      let foundSection = -1;
      for (let i = 0; i < sections.length; i++) {
        const el = document.querySelector(sections[i].id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const threshold = i === 0 ? 0.75 : 0.6;
        if (rect.top < window.innerHeight * threshold && rect.bottom > 80) {
          foundSection = i;
          break;
        }
      }

      if (foundSection >= 0 && foundSection !== currentSectionIdx && !isDismissing) {
        const newPos = sections[foundSection].pos;
        currentSectionIdx = foundSection;
        if (botVisible) {
          hideBot(() => showBot(newPos));
        } else {
          showBot(newPos);
        }
      } else if (foundSection < 0 && botVisible && !isDismissing) {
        hideBot();
      }

      sectionRaf = requestAnimationFrame(checkSections);
    }
    sectionRaf = requestAnimationFrame(checkSections);
  }

  // ─── Initial activation ───
  function tryActivate() {
    const hero = document.querySelector('#hero');
    if (!hero) { setTimeout(tryActivate, 500); return; }
    const preloader = document.querySelector('.preloader');
    if (preloader) { setTimeout(tryActivate, 500); return; }
    startSectionWatcher();
  }

  // ─── Chat functions ───
  function addMsg(text, type) {
    const msg = document.createElement('div');
    msg.className = 'mch-msg mch-msg-' + type;
    msg.textContent = text;
    const time = document.createElement('div');
    time.className = 'mch-time';
    time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    msg.appendChild(time);
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function sendMsg(text) {
    if (!text.trim()) return;
    addMsg(text, 'user');
    chatInput.value = '';
    chatInput.style.height = 'auto';
    chatSend.disabled = true;
    chatChips.forEach(c => c.remove());

    const typing = document.createElement('div');
    typing.className = 'mch-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    chatBody.appendChild(typing);
    chatBody.scrollTop = chatBody.scrollHeight;

    const reply = document.createElement('div');
    reply.className = 'mch-msg mch-msg-bot';

    const body = { message: text, sessionId: sessionId || undefined };
    if (selectedLanguage) body.language = selectedLanguage;

    fetch(baseUrl + '/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(r => r.json())
    .then(data => {
      sessionId = data.sessionId;
      localStorage.setItem('mch_session', sessionId);
      typing.remove();
      const cleanReply = (data.reply || '').replace(/\*\*/g, '');
      reply.textContent = cleanReply;
      const time = document.createElement('div');
      time.className = 'mch-time';
      time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      reply.appendChild(time);
      chatBody.appendChild(reply);
      chatBody.scrollTop = chatBody.scrollHeight;
    })
    .catch(() => {
      typing.remove();
      reply.textContent = 'Sorry, having trouble connecting. Reach us on WhatsApp at +919714571522 or email manharcreatives@gmail.com.';
      chatBody.appendChild(reply);
      chatBody.scrollTop = chatBody.scrollHeight;
    });
  }

  function openChat() {
    if (chatOpen) return;
    chatOpen = true;
    hideBot();
    chatEl.classList.add('mch-open');
    chatInput.focus();
    if (chatBody.children.length === 0) {
      const greetings = {
        hindi: 'Namaste! Main Manhar AI hoon. Aapki kaise madad kar sakta hoon?',
        gujarati: 'Namaste! Hu Manhar AI chhu. Tamari kem madad kari shaku?',
        english: 'Hello! I\'m Manhar AI. How can I help you?',
      };
      const greeting = greetings[selectedLanguage] || greetings.english;
      const msg = document.createElement('div');
      msg.className = 'mch-msg mch-msg-bot';
      msg.textContent = greeting;
      const time = document.createElement('div');
      time.className = 'mch-time';
      time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      msg.appendChild(time);
      chatBody.appendChild(msg);
    }
  }

  function closeChat() {
    chatOpen = false;
    selectedLanguage = null;
    chatEl.classList.remove('mch-open');
    currentSectionIdx = -1;
  }

  // ─── Events ───
  avatar.addEventListener('click', showLanguagePicker);
  avatar.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showLanguagePicker(); } });
  closeBtn.addEventListener('click', (e) => { e.stopPropagation(); hideBot(); });

  chatSend.addEventListener('click', () => sendMsg(chatInput.value));
  chatInput.addEventListener('input', () => {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
    chatSend.disabled = !chatInput.value.trim();
  });
  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (chatInput.value.trim()) sendMsg(chatInput.value);
    }
  });
  chatChips.forEach(chip => {
    chip.addEventListener('click', () => sendMsg(chip.dataset.q));
  });

  chatEl.querySelector('[data-action="close"]').addEventListener('click', closeChat);
  chatEl.querySelector('[data-action="reset"]').addEventListener('click', () => {
    sessionId = '';
    selectedLanguage = null;
    localStorage.removeItem('mch_session');
    chatBody.innerHTML = '';
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
      chatBody.appendChild(msg);
    }).catch(() => {});
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && chatOpen) closeChat();
  });

  // ─── Init ───
  document.body.appendChild(root);
  setTimeout(tryActivate, 1000);

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
