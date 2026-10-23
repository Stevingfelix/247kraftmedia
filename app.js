/**
 * 247KRAFT — CLIENT HIRE LANDING PAGE CONTROLLER
 * - Slick Custom Fluid Magnetic Cursor
 * - Web Audio API Tactile Button Click Sound Generator
 * - Multi-Step WhatsApp Project Intake Modal
 * - Interactive FAQ Accordion
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_PHONE = '2348102770008'; // 247Kraft Official Direct Line

  /* ==========================================================================
     1. WEB AUDIO API TACTILE CLICK SOUND GENERATOR
     ========================================================================== */
  let audioCtx = null;
  let isSoundEnabled = localStorage.getItem('247kraft_sound') !== 'false';
  let soundVolume = parseFloat(localStorage.getItem('247kraft_volume'));
  if (isNaN(soundVolume)) soundVolume = 0.75;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // 1. Tactile haptic button click
  function playButtonClickSound() {
    if (!isSoundEnabled || soundVolume <= 0) return;
    try {
      initAudioContext();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const masterGain = audioCtx.createGain();
      masterGain.connect(audioCtx.destination);
      masterGain.gain.setValueAtTime(0.22 * soundVolume, now);

      // High transient snap (crisp click)
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(1600, now);
      osc1.frequency.exponentialRampToValueAtTime(380, now + 0.026);
      gain1.gain.setValueAtTime(0.65, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.026);
      osc1.connect(gain1);
      gain1.connect(masterGain);
      osc1.start(now);
      osc1.stop(now + 0.028);

      // Subtle low mechanical thump
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(220, now);
      osc2.frequency.exponentialRampToValueAtTime(75, now + 0.038);
      gain2.gain.setValueAtTime(0.45, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.038);
      osc2.connect(gain2);
      gain2.connect(masterGain);
      osc2.start(now);
      osc2.stop(now + 0.04);
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  // 2. ChatGPT Voice Assistant style POPUP OPEN chime ("Something opening / expanding")
  function playModalOpenSound() {
    if (!isSoundEnabled || soundVolume <= 0) return;
    try {
      initAudioContext();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const master = audioCtx.createGain();
      master.connect(audioCtx.destination);
      master.gain.setValueAtTime(0.36 * soundVolume, now);

      // Root warm tone gliding upward (E4 329Hz -> G4 392Hz -> C5 523Hz)
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(320, now);
      osc1.frequency.exponentialRampToValueAtTime(523.2, now + 0.22);
      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(0.5, now + 0.04);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc1.connect(gain1);
      gain1.connect(master);
      osc1.start(now);
      osc1.stop(now + 0.29);

      // Harmonic bloom tone (C5 523Hz -> E5 659Hz)
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(520, now + 0.04);
      osc2.frequency.exponentialRampToValueAtTime(659.2, now + 0.24);
      gain2.gain.setValueAtTime(0.001, now + 0.04);
      gain2.gain.linearRampToValueAtTime(0.35, now + 0.09);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc2.connect(gain2);
      gain2.connect(master);
      osc2.start(now + 0.04);
      osc2.stop(now + 0.31);

      // Filtered airy aperture sweep (gentle spatial "whoosh")
      const osc3 = audioCtx.createOscillator();
      const filter = audioCtx.createBiquadFilter();
      const gain3 = audioCtx.createGain();
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(160, now);
      osc3.frequency.exponentialRampToValueAtTime(440, now + 0.18);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, now);
      filter.frequency.exponentialRampToValueAtTime(1500, now + 0.18);
      gain3.gain.setValueAtTime(0.001, now);
      gain3.gain.linearRampToValueAtTime(0.22, now + 0.03);
      gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc3.connect(filter);
      filter.connect(gain3);
      gain3.connect(master);
      osc3.start(now);
      osc3.stop(now + 0.23);
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  // 3. ChatGPT Voice Assistant style POPUP CLOSE tone ("Dismissal descent / pop down")
  function playModalCloseSound() {
    if (!isSoundEnabled || soundVolume <= 0) return;
    try {
      initAudioContext();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const master = audioCtx.createGain();
      master.connect(audioCtx.destination);
      master.gain.setValueAtTime(0.32 * soundVolume, now);

      // Descending soft dismissal glide (523Hz -> 260Hz)
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(520, now);
      osc1.frequency.exponentialRampToValueAtTime(260, now + 0.14);
      gain1.gain.setValueAtTime(0.55, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc1.connect(gain1);
      gain1.connect(master);
      osc1.start(now);
      osc1.stop(now + 0.17);

      // Gentle low body dampening release
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(200, now);
      osc2.frequency.exponentialRampToValueAtTime(70, now + 0.09);
      gain2.gain.setValueAtTime(0.32, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc2.connect(gain2);
      gain2.connect(master);
      osc2.start(now);
      osc2.stop(now + 0.11);
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  // 4. Form step change sound (Kinetic card slide with tactile micro-tick)
  function playStepChangeSound(isNext = true) {
    if (!isSoundEnabled || soundVolume <= 0) return;
    try {
      initAudioContext();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const master = audioCtx.createGain();
      master.connect(audioCtx.destination);
      master.gain.setValueAtTime(0.36 * soundVolume, now);

      // Layer A: Tactile click snap
      const oscSnap = audioCtx.createOscillator();
      const gainSnap = audioCtx.createGain();
      oscSnap.type = 'triangle';
      oscSnap.frequency.setValueAtTime(1400, now);
      oscSnap.frequency.exponentialRampToValueAtTime(320, now + 0.022);
      gainSnap.gain.setValueAtTime(0.65, now);
      gainSnap.gain.exponentialRampToValueAtTime(0.001, now + 0.024);
      oscSnap.connect(gainSnap);
      gainSnap.connect(master);
      oscSnap.start(now);
      oscSnap.stop(now + 0.026);

      // Layer B: Harmonic swoop
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';

      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'sine';

      if (isNext) {
        // Forward glide: 440Hz -> 880Hz (A4 -> A5)
        osc1.frequency.setValueAtTime(440, now);
        osc1.frequency.exponentialRampToValueAtTime(880, now + 0.16);
        // Overtone 660Hz -> 1320Hz
        osc2.frequency.setValueAtTime(660, now + 0.02);
        osc2.frequency.exponentialRampToValueAtTime(1320, now + 0.16);
      } else {
        // Reverse glide: 880Hz -> 440Hz
        osc1.frequency.setValueAtTime(880, now);
        osc1.frequency.exponentialRampToValueAtTime(440, now + 0.16);
        // Overtone
        osc2.frequency.setValueAtTime(1320, now + 0.02);
        osc2.frequency.exponentialRampToValueAtTime(660, now + 0.16);
      }

      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(0.6, now + 0.03);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      gain2.gain.setValueAtTime(0.001, now + 0.02);
      gain2.gain.linearRampToValueAtTime(0.38, now + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.17);

      osc1.connect(gain1);
      gain1.connect(master);
      osc2.connect(gain2);
      gain2.connect(master);

      osc1.start(now);
      osc1.stop(now + 0.19);
      osc2.start(now + 0.02);
      osc2.stop(now + 0.18);
    } catch (e) {
      console.warn('Step change sound error:', e);
    }
  }

  // 5. FAQ Accordion toggle sound (Tactile switch pop and resonance bloom)
  function playAccordionToggleSound(isOpen) {
    if (!isSoundEnabled || soundVolume <= 0) return;
    try {
      initAudioContext();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const master = audioCtx.createGain();
      master.connect(audioCtx.destination);
      master.gain.setValueAtTime(0.38 * soundVolume, now);

      // Layer A: Crisp mechanical switch click
      const oscClick = audioCtx.createOscillator();
      const gainClick = audioCtx.createGain();
      oscClick.type = 'triangle';
      oscClick.frequency.setValueAtTime(isOpen ? 1750 : 1300, now);
      oscClick.frequency.exponentialRampToValueAtTime(350, now + 0.02);
      gainClick.gain.setValueAtTime(0.7, now);
      gainClick.gain.exponentialRampToValueAtTime(0.001, now + 0.022);
      oscClick.connect(gainClick);
      gainClick.connect(master);
      oscClick.start(now);
      oscClick.stop(now + 0.025);

      // Layer B: Resonant body bloom (musical pop)
      const oscBody = audioCtx.createOscillator();
      const gainBody = audioCtx.createGain();
      oscBody.type = 'sine';

      if (isOpen) {
        // Upward expand tone: C4 (261.6Hz) -> E4 (329.6Hz) -> G4 (392Hz)
        oscBody.frequency.setValueAtTime(260, now);
        oscBody.frequency.exponentialRampToValueAtTime(420, now + 0.14);
        gainBody.gain.setValueAtTime(0.001, now);
        gainBody.gain.linearRampToValueAtTime(0.65, now + 0.025);
        gainBody.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      } else {
        // Downward collapse tone: G4 (392Hz) -> C4 (260Hz)
        oscBody.frequency.setValueAtTime(420, now);
        oscBody.frequency.exponentialRampToValueAtTime(220, now + 0.12);
        gainBody.gain.setValueAtTime(0.001, now);
        gainBody.gain.linearRampToValueAtTime(0.55, now + 0.02);
        gainBody.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      }

      oscBody.connect(gainBody);
      gainBody.connect(master);
      oscBody.start(now);
      oscBody.stop(now + 0.19);
    } catch (e) {
      console.warn('Accordion sound error:', e);
    }
  }

  // 6. Tactile micro-tick for interactive volume scrubbing
  let lastVolumeTickTime = 0;
  function playVolumeTickSound() {
    if (!isSoundEnabled || soundVolume <= 0) return;
    const nowMs = Date.now();
    if (nowMs - lastVolumeTickTime < 55) return;
    lastVolumeTickTime = nowMs;
    try {
      initAudioContext();
      if (!audioCtx) return;
      const now = audioCtx.currentTime;
      const tickGain = audioCtx.createGain();
      tickGain.connect(audioCtx.destination);
      tickGain.gain.setValueAtTime(0.18 * soundVolume, now);
      const osc = audioCtx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.015);
      const g = audioCtx.createGain();
      g.gain.setValueAtTime(0.5, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
      osc.connect(g);
      g.connect(tickGain);
      osc.start(now);
      osc.stop(now + 0.018);
    } catch (e) {}
  }

  // 7. Authentic macOS-Style Crystal Glass Notification Chime
  function playMacNotificationSound() {
    if (!isSoundEnabled || soundVolume <= 0) return;
    try {
      initAudioContext();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const now = audioCtx.currentTime;
      const master = audioCtx.createGain();
      master.connect(audioCtx.destination);
      master.gain.setValueAtTime(0.38 * soundVolume, now);

      // Chime 1 (Fundamental tone A5: 880Hz - pure crystalline bell tone)
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now);
      gain1.gain.setValueAtTime(0.42, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);
      osc1.connect(gain1);
      gain1.connect(master);
      osc1.start(now);
      osc1.stop(now + 0.76);

      // Chime 2 (Harmonic fifth E6: 1318.5Hz - offset by 35ms for glass bounce effect)
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1318.5, now + 0.035);
      gain2.gain.setValueAtTime(0.0001, now);
      gain2.gain.setValueAtTime(0.48, now + 0.035);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.95);
      osc2.connect(gain2);
      gain2.connect(master);
      osc2.start(now + 0.035);
      osc2.stop(now + 0.96);

      // Chime 3 (High overtone shimmer A6: 1760Hz)
      const osc3 = audioCtx.createOscillator();
      const gain3 = audioCtx.createGain();
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(1760, now + 0.05);
      gain3.gain.setValueAtTime(0.0001, now);
      gain3.gain.setValueAtTime(0.2, now + 0.05);
      gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
      osc3.connect(gain3);
      gain3.connect(master);
      osc3.start(now + 0.05);
      osc3.stop(now + 0.71);
    } catch (e) {
      console.warn('Mac notification sound error:', e);
    }
  }

  // 8. Gamified Step 10 Victory Celebration Sound (Triumphant 4-tone shimmering arpeggio chord)
  function playStep10SuccessSound() {
    if (!isSoundEnabled || soundVolume <= 0) return;
    try {
      initAudioContext();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const now = audioCtx.currentTime;
      const master = audioCtx.createGain();
      master.connect(audioCtx.destination);
      master.gain.setValueAtTime(0.42 * soundVolume, now);

      // Notes: C5 (523.25Hz), E5 (659.25Hz), G5 (783.99Hz), C6 (1046.5Hz)
      const chordNotes = [
        { freq: 523.25, time: 0.00, dur: 0.85, vol: 0.35, type: 'sine' },
        { freq: 659.25, time: 0.08, dur: 0.90, vol: 0.38, type: 'sine' },
        { freq: 783.99, time: 0.16, dur: 0.95, vol: 0.40, type: 'sine' },
        { freq: 1046.50, time: 0.24, dur: 1.15, vol: 0.45, type: 'sine' },
        { freq: 2093.00, time: 0.28, dur: 0.70, vol: 0.18, type: 'triangle' } // Crystal harmonic shimmer
      ];

      chordNotes.forEach(note => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = note.type;
        osc.frequency.setValueAtTime(note.freq, now + note.time);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.setValueAtTime(note.vol, now + note.time);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + note.time + note.dur);

        osc.connect(gain);
        gain.connect(master);

        osc.start(now + note.time);
        osc.stop(now + note.time + note.dur + 0.01);
      });
    } catch (e) {
      console.warn('Step 10 victory sound error:', e);
    }
  }

  /* ==========================================================================
     GAMIFIED STEP 10 CONFETTI & CELEBRATION ENGINE
     ========================================================================== */
  function triggerStep10Celebration() {
    playStep10SuccessSound();
  }

  window.triggerStep10Celebration = triggerStep10Celebration;

  // Pre-unlock audio on first touch/pointer event
  document.addEventListener('pointerdown', initAudioContext, { once: true });
  document.addEventListener('touchstart', initAudioContext, { once: true });

  // Play sound on EVERY button and interactive clickable element
  document.addEventListener('click', (e) => {
    // Skip elements that have dedicated specialized acoustic sounds
    if (e.target.closest('.modal-close-trigger, .step-nav-btn, .next-step-btn, .prev-step-btn, .faq-toggle-btn')) {
      return;
    }

    const clickable = e.target.closest('button, a, .sales-button, .nav-cta-btn, .open-modal-btn, .showcase-link-btn, .submit-proposal-btn, .radio-pill');
    if (clickable) {
      playButtonClickSound();
    }
  }, true);

  /* ==========================================================================
     2. SLICK FLUID CUSTOM CURSOR
     ========================================================================== */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursorDot && cursorRing && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isHovering = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows immediately with zero latency
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth fluid lerp loop for the outer ring
    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Hover scale effects on interactive elements
    const interactiveSelectors = 'a, button, select, label, summary, [role="button"], .radio-pill, .step-nav-btn';
    const textInputSelectors = 'input[type="text"], input[type="email"], textarea';

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        if (!isHovering) {
          isHovering = true;
          document.body.classList.add('cursor-hover');
        }
      }
      if (e.target.closest(textInputSelectors)) {
        document.body.classList.add('cursor-text-mode');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        isHovering = false;
        document.body.classList.remove('cursor-hover');
      }
      if (e.target.closest(textInputSelectors)) {
        document.body.classList.remove('cursor-text-mode');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-active');
    });

    document.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-active');
    });
  }

  /* ==========================================================================
     CINEMATIC MOVING VIDEO BACKGROUND CONTROLLER
     ========================================================================== */
  const bgVideo = document.getElementById('cinema-sky-video');
  if (bgVideo) {
    bgVideo.play().catch(() => { });
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && bgVideo.paused) {
        bgVideo.play().catch(() => { });
      }
    });
  }


  // Mobile Navigation Drawer Toggle
  // Mobile Navigation Full-Screen Blinds Drawer Controller
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');

  function setMobileMenuState(isOpen) {
    if (!mobileNavDrawer || !mobileNavToggle) return;
    if (isOpen) {
      mobileNavDrawer.classList.add('open');
      mobileNavDrawer.setAttribute('aria-hidden', 'false');
      mobileNavToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      mobileNavDrawer.classList.remove('open');
      mobileNavDrawer.setAttribute('aria-hidden', 'true');
      mobileNavToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (mobileNavToggle && mobileNavDrawer) {
    mobileNavToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !mobileNavDrawer.classList.contains('open');
      setMobileMenuState(isOpen);
      if (typeof playButtonClickSound === 'function') playButtonClickSound();
    });

    if (mobileMenuCloseBtn) {
      mobileMenuCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setMobileMenuState(false);
        if (typeof playButtonClickSound === 'function') playButtonClickSound();
      });
    }

    // Close menu when clicking any nav item or button
    mobileNavDrawer.querySelectorAll('.mobile-nav-item, .mobile-cta-btn').forEach(link => {
      link.addEventListener('click', () => {
        setMobileMenuState(false);
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNavDrawer.classList.contains('open')) {
        setMobileMenuState(false);
      }
    });
  }

  /* ==========================================================================
     3. FULL-SCREEN TYPEFORM-STYLE PROJECT INTAKE CONTROLLER (9 STEPS)
     ========================================================================== */
  const modal = document.getElementById('brief-modal');
  const form = document.getElementById('project-brief-form');
  const openButtons = document.querySelectorAll('.open-modal-btn');
  const closeButtons = document.querySelectorAll('.modal-close-trigger');

  const fsPanes = document.querySelectorAll('.fs-pane');
  const fsProgressFill = document.getElementById('fs-progress-fill');
  const fsStepIndicator = document.getElementById('fs-step-indicator');
  const fsPrevBtn = document.getElementById('fs-prev-btn');
  const fsNextBtn = document.getElementById('fs-next-btn');
  const fsSubmitBtn = document.getElementById('fs-submit-btn');
  const clientNameInput = document.getElementById('client_name');
  const clientNameSlots = document.querySelectorAll('.client-name-slot');

  const TOTAL_STEPS = 10;
  let currentActiveStep = 1;

  // Dynamic Name Personalization: updates eyebrows across all subsequent steps
  function updateClientNameDisplay() {
    const rawName = clientNameInput ? clientNameInput.value.trim() : '';
    const firstName = rawName.split(' ')[0] || 'Friend';
    clientNameSlots.forEach(slot => {
      slot.textContent = firstName;
    });
  }

  if (clientNameInput) {
    clientNameInput.addEventListener('input', updateClientNameDisplay);
  }

  function openBriefModal(source = 'General') {
    if (!modal) return;

    localStorage.setItem('247kraft_brief_opened', 'true');
    if (typeof hideMacResumeNotification === 'function') hideMacResumeNotification();
    if (typeof cancelInactivityResumeReminder === 'function') cancelInactivityResumeReminder();
    if (typeof stopTabAlertBlinking === 'function') stopTabAlertBlinking();

    setTimeout(() => {
      if (typeof playModalOpenSound === 'function') playModalOpenSound();
    }, 40);

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // If previously completed at Step 10, start fresh at Step 1
    if (currentActiveStep >= TOTAL_STEPS) {
      resetBriefForm();
    } else {
      // Synchronize active step UI state cleanly
      switchStep(currentActiveStep || 1);
    }

    if (typeof saveBriefDraft === 'function') saveBriefDraft();

    // Focus input on current step
    setTimeout(() => {
      focusCurrentStepInput();
    }, 180);
  }

  function resetBriefForm() {
    currentActiveStep = 1;
    localStorage.removeItem('247kraft_brief_draft');
    if (form) form.reset();
    document.body.classList.remove('on-step-10');
    const s9Email = document.getElementById('step9_client_email');
    if (s9Email) s9Email.value = '';
    const s9Phone = document.getElementById('step9_client_phone');
    if (s9Phone) s9Phone.value = '';
    const notes = document.getElementById('additional_notes');
    if (notes) notes.value = '';
    switchStep(1);
  }

  function closeBriefModal() {
    if (!modal || !modal.classList.contains('open')) return;

    if (chipAdvanceTimer) {
      clearTimeout(chipAdvanceTimer);
      chipAdvanceTimer = null;
    }

    if (typeof playModalCloseSound === 'function') playModalCloseSound();

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // If closing after reaching or finishing Step 10, start fresh next time
    if (currentActiveStep >= TOTAL_STEPS) {
      setTimeout(() => {
        resetBriefForm();
      }, 250);
    } else {
      if (typeof saveBriefDraft === 'function') saveBriefDraft();
      if (typeof scheduleInactivityResumeReminder === 'function') scheduleInactivityResumeReminder();
    }
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const source = btn.dataset.source || 'CTA Button';
      openBriefModal(source);
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeBriefModal);
  });

  // Close modal when clicking escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeBriefModal();
    }
  });

  function focusCurrentStepInput() {
    const activePane = document.querySelector(`.fs-pane[data-step="${currentActiveStep}"]`);
    if (activePane) {
      const input = activePane.querySelector('input:not([type="radio"]), textarea');
      if (input) input.focus();
    }
  }

  const STUDIO_EMAIL = 'steving@247kraft.com';

  function switchStep(targetStep) {
    if (targetStep < 1 || targetStep > TOTAL_STEPS) return;

    if (targetStep !== currentActiveStep) {
      if (typeof playStepChangeSound === 'function') {
        playStepChangeSound(targetStep > currentActiveStep);
      }
      currentActiveStep = targetStep;
      if (typeof saveBriefDraft === 'function') saveBriefDraft();
    }

    // Update Panes
    fsPanes.forEach(pane => {
      const paneStep = parseInt(pane.dataset.step, 10);
      if (paneStep === currentActiveStep) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // Update Progress Bar & Indicator
    const progressPercent = Math.round((currentActiveStep / TOTAL_STEPS) * 100);
    if (fsProgressFill) fsProgressFill.style.width = `${progressPercent}%`;
    if (fsStepIndicator) {
      if (currentActiveStep === TOTAL_STEPS) {
        fsStepIndicator.textContent = 'All done! 🎉';
      } else {
        fsStepIndicator.textContent = `Step ${currentActiveStep} of ${TOTAL_STEPS}`;
      }
    }

    // Update Back & Next/Submit Controls
    const modalFooter = document.querySelector('.fs-modal-footer');

    if (currentActiveStep === TOTAL_STEPS) {
      document.body.classList.add('on-step-10');
      // Step 10: Form is already submitted on Step 9.
      // Remove/hide footer completely so user cannot go back and there is no Send To WhatsApp button.
      if (modalFooter) modalFooter.style.display = 'none';
      if (fsPrevBtn) {
        fsPrevBtn.style.visibility = 'hidden';
        fsPrevBtn.style.display = 'none';
      }
      if (fsNextBtn) fsNextBtn.style.display = 'none';
      if (fsSubmitBtn) fsSubmitBtn.style.display = 'none';

      // Gamified Step 10 Celebration & Victory Chime
      if (typeof triggerStep10Celebration === 'function') {
        setTimeout(triggerStep10Celebration, 80);
      }
    } else {
      document.body.classList.remove('on-step-10');
      if (modalFooter) modalFooter.style.display = 'block';
      if (fsPrevBtn) {
        fsPrevBtn.style.display = 'inline-flex';
        fsPrevBtn.style.visibility = currentActiveStep === 1 ? 'hidden' : 'visible';
      }
      if (currentActiveStep === 9) {
        // Step 9: Show "Submit ›" button
        if (fsNextBtn) {
          fsNextBtn.innerHTML = '<span>Submit</span><span class="fs-btn-icon">›</span>';
          fsNextBtn.style.display = 'inline-flex';
        }
        if (fsSubmitBtn) fsSubmitBtn.style.display = 'none';
      } else {
        // Steps 1-8: Show "Continue ›" button
        if (fsNextBtn) {
          fsNextBtn.innerHTML = '<span>Continue</span><span class="fs-btn-icon">›</span>';
          fsNextBtn.style.display = 'inline-flex';
        }
        if (fsSubmitBtn) fsSubmitBtn.style.display = 'none';
      }
    }

    // Auto-scroll modal container and dialog to top on every step switch
    if (modal) {
      modal.scrollTop = 0;
      if (typeof modal.scrollTo === 'function') {
        modal.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
    const fsDialog = document.querySelector('.fs-modal-dialog');
    if (fsDialog) {
      fsDialog.scrollTop = 0;
      if (typeof fsDialog.scrollTo === 'function') {
        fsDialog.scrollTo({ top: 0, behavior: 'instant' });
      }
    }

    // Auto-focus current step input
    setTimeout(focusCurrentStepInput, 100);

    // Refresh chip carousels in the active pane
    setTimeout(() => {
      updateActivePaneCarousels();
    }, 120);
  }

  function validateCurrentStep() {
    const activePane = document.querySelector(`.fs-pane[data-step="${currentActiveStep}"]`);
    if (!activePane) return true;

    const requiredFields = activePane.querySelectorAll('input[required], textarea[required]');
    for (const field of requiredFields) {
      if (!field.value || !field.value.trim()) {
        field.scrollIntoView({ behavior: 'smooth', block: 'center' });
        field.focus();
        if (typeof field.reportValidity === 'function') {
          field.reportValidity();
        }
        return false;
      }
    }
    return true;
  }

  const BUDGET_TIERS = {
    'Nigeria 🇳🇬': [
      { value: '₦100,000–₦250,000', label: '₦100,000–₦250,000' },
      { value: '₦250,000–₦500,000', label: '₦250,000–₦500,000' },
      { value: '₦500,000+', label: '₦500,000+' },
      { value: 'Flexible / Not sure yet', label: 'Flexible / Not sure yet' }
    ],
    'United Kingdom 🇬🇧': [
      { value: '£500–£1,200', label: '£500–£1,200' },
      { value: '£1,200–£3,000', label: '£1,200–£3,000' },
      { value: '£3,000+', label: '£3,000+' },
      { value: 'Flexible / Not sure yet', label: 'Flexible / Not sure yet' }
    ],
    'United States 🇺🇸': [
      { value: '$500–$1,500', label: '$500–$1,500' },
      { value: '$1,500–$3,500', label: '$1,500–$3,500' },
      { value: '$3,500+', label: '$3,500+' },
      { value: 'Flexible / Not sure yet', label: 'Flexible / Not sure yet' }
    ],
    'Canada 🇨🇦': [
      { value: 'CA$700–CA$2,000', label: 'CA$700–CA$2,000' },
      { value: 'CA$2,000–CA$4,500', label: 'CA$2,000–CA$4,500' },
      { value: 'CA$4,500+', label: 'CA$4,500+' },
      { value: 'Flexible / Not sure yet', label: 'Flexible / Not sure yet' }
    ],
    'UAE 🇦🇪': [
      { value: '2,000–5,000 AED', label: '2,000–5,000 AED' },
      { value: '5,000–12,000 AED', label: '5,000–12,000 AED' },
      { value: '12,000+ AED', label: '12,000+ AED' },
      { value: 'Flexible / Not sure yet', label: 'Flexible / Not sure yet' }
    ],
    'Other 🌍': [
      { value: '$500–$1,500', label: '$500–$1,500' },
      { value: '$1,500–$3,500', label: '$1,500–$3,500' },
      { value: '$3,500+', label: '$3,500+' },
      { value: 'Flexible / Not sure yet', label: 'Flexible / Not sure yet' }
    ]
  };

  function updateBudgetCurrency(location) {
    const tiers = BUDGET_TIERS[location] || BUDGET_TIERS['Other 🌍'];
    const budgetGrid = document.getElementById('fs-budget-chips-grid');
    if (!budgetGrid) return;

    // Detect which tier index is currently checked
    const currentRadios = budgetGrid.querySelectorAll('input[type="radio"]');
    let checkedIndex = 0;
    currentRadios.forEach((r, idx) => {
      if (r.checked) checkedIndex = idx;
    });

    // Rebuild chips with currency of selected country
    budgetGrid.innerHTML = tiers.map((tier, idx) => `
      <label class="fs-chip">
        <input type="radio" name="budget" value="${tier.value}" ${idx === checkedIndex ? 'checked' : ''}>
        <span>${tier.label}</span>
      </label>
    `).join('');

    // Re-bind click / change listeners to dynamic chips
    attachChipRadioListeners(budgetGrid);

    setTimeout(() => {
      updateActivePaneCarousels();
    }, 50);
  }

  /* ==========================================================================
     COGNITO FORMS INTEGRATION ENGINE
     Form: ClientOnboardingForm (data-key: _qdXLo3INUO_QOZTbQUzYA, data-form: 13)
     ========================================================================== */
  const COGNITO_CONFIG = {
    key: '_qdXLo3INUO_QOZTbQUzYA',
    formId: '13',
    apiKey: window.COGNITO_API_KEY || '',
    endpoint: window.COGNITO_FORM_URL || window.COGNITO_ENDPOINT || ''
  };

  function formatTimelineDisplay(timeline, targetDate) {
    if (timeline === 'Specific date' || (timeline && timeline.startsWith('By '))) {
      const rawDate = targetDate || (timeline.startsWith('By ') ? timeline.replace('By ', '').trim() : '');
      if (rawDate) {
        try {
          const parts = rawDate.split('-');
          if (parts.length === 3) {
            const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
            if (!isNaN(d.getTime())) {
              return `By ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
            }
          }
        } catch (e) {}
        return `By ${rawDate}`;
      }
      return 'Specific target date';
    }
    return timeline || 'As soon as possible';
  }

  function getProjectBriefData() {
    const formData = new FormData(form);
    const name = (formData.get('client_name') || '').trim() || 'Friend';
    const location = formData.get('location') || 'Nigeria 🇳🇬';
    const businessName = (formData.get('business_name') || '').trim() || 'My Business';
    const websiteType = formData.get('website_type') || 'Business website';
    const situation = formData.get('current_situation') || 'I need a new website';
    const goal = (formData.get('website_goal') || '').trim() || 'High-converting platform';
    const budget = formData.get('budget') || 'Flexible / Not sure yet';
    const rawTimeline = formData.get('timeline') || 'As soon as possible';
    const targetDate = formData.get('target_date');
    const timeline = formatTimelineDisplay(rawTimeline, targetDate);
    const notes = (formData.get('additional_notes') || '').trim() || 'None provided';
    const phoneInput = document.getElementById('client_phone');
    const emailInput = document.getElementById('client_email');
    const s9Phone = document.getElementById('step9_client_phone');
    const s9Email = document.getElementById('step9_client_email');
    const phone = (formData.get('client_phone') || (s9Phone ? s9Phone.value : '') || (phoneInput ? phoneInput.value : '') || '').trim() || 'Not provided';
    const email = (formData.get('client_email') || (s9Email ? s9Email.value : '') || (emailInput ? emailInput.value : '') || '').trim() || 'Not provided';
    return { name, location, businessName, websiteType, situation, goal, budget, timeline, notes, phone, email };
  }

  function buildCognitoPayload(data) {
    const rawName = (data.name || '').trim();
    const nameParts = rawName.split(/\s+/);
    const firstName = nameParts[0] || 'Client';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '-';

    // Map location matching Cognito form: Nigeria, United States, United Kingdom, Canada, Other
    let locationVal = 'Other';
    const loc = (data.location || '').toLowerCase();
    if (loc.includes('nigeria')) locationVal = 'Nigeria';
    else if (loc.includes('united states') || loc.includes('usa')) locationVal = 'United States';
    else if (loc.includes('united kingdom') || loc.includes('uk')) locationVal = 'United Kingdom';
    else if (loc.includes('canada')) locationVal = 'Canada';

    // Map project type matching Cognito options
    let projectTypeVal = 'Business Website';
    const typ = (data.websiteType || '').toLowerCase();
    if (typ.includes('landing') || typ.includes('funnel')) projectTypeVal = 'Landing Page/ Sales Funnel';
    else if (typ.includes('commerce')) projectTypeVal = 'Ecommerce Website';
    else if (typ.includes('custom') || typ.includes('saas') || typ.includes('web app')) projectTypeVal = 'Custom Web App/Sass';
    else if (typ.includes('mobile')) projectTypeVal = 'Mobile App Design';
    else if (typ.includes('ui/ux') || typ.includes('branding')) projectTypeVal = 'UI/UX Branding';
    else if (typ.includes('consulting')) projectTypeVal = 'Consulting';
    else if (typ.includes('not sure')) projectTypeVal = 'Not Sure Yet';

    // Map current situation matching Cognito options
    let situationVal = 'I need a website';
    const sit = (data.situation || '').toLowerCase();
    if (sit.includes('redesign')) situationVal = 'Redesigning Existing Website';
    else if (sit.includes('feature')) situationVal = 'Add new features';
    else if (sit.includes('idea')) situationVal = 'Have an idea to flesh out';

    // Formatted timeline into Cognito's text box: "When do you want this completed? *"
    const timelineVal = (data.timeline || 'As soon as possible').trim();

    return {
      Name: {
        First: firstName,
        Last: lastName
      },
      WhereAreYouBased: locationVal,
      WhatsTheNameOfYourBusinessOrBrand: data.businessName || 'Not specified',
      WhatKindOfWebsiteOrProjectDoYouNeed: projectTypeVal,
      WhatsYourCurrentSituation: situationVal,
      WhatsTheMainGoalOfYourWebsite: data.goal || 'High-converting platform',
      EstimateBudget: data.budget || 'Flexible / Not sure yet',
      WhenDoYouWantThisCompleted: timelineVal,
      CanYouProvideABriefDetailOfTheProject: data.notes || 'None provided',
      EmailAddress: (data.email && data.email !== 'Not provided') ? data.email : '',
      WhatsAppPhoneNumber: (data.phone && data.phone !== 'Not provided') ? data.phone : ''
    };
  }

  const SUBMISSION_CONFIG = {
    // Primary recipient for silent background project brief deliveries (100% free, no paid API plan needed)
    email: window.STUDIO_SUBMISSION_EMAIL || 'officialfelixstevens@gmail.com',
    secondaryEmail: 'steving@247kraft.com',
    serviceUrl: 'https://formsubmit.co/ajax/',
    webhook: window.SUBMISSION_WEBHOOK_URL || ''
  };

  function syncToCognitoForms(data, isFullSubmit = false) {
    const payload = buildCognitoPayload(data);
    const jsonStr = JSON.stringify(payload);

    // 1. Maintain prefilled Cognito link with all fields (including formatted date)
    window.lastCognitoPrefillUrl = `https://www.cognitoforms.com/f/${COGNITO_CONFIG.key}?id=${COGNITO_CONFIG.formId}&entry=${encodeURIComponent(jsonStr)}`;

    // 2. Save in browser submissions archive (never lose an inquiry)
    try {
      const existing = JSON.parse(localStorage.getItem('247kraft_submissions') || '[]');
      existing.unshift({
        ...payload,
        submittedAt: new Date().toISOString(),
        isFullSubmit
      });
      localStorage.setItem('247kraft_submissions', JSON.stringify(existing.slice(0, 50)));
    } catch (e) {}

    // 3. Free Silent Background Submission via FormSubmit AJAX (Delivers directly to your email + CC)
    const targetEmail = SUBMISSION_CONFIG.email || 'officialfelixstevens@gmail.com';
    const formSubmitPayload = {
      _subject: `⚡ New Project Brief: ${data.websiteType} - ${data.name} (${data.businessName})`,
      _template: 'table',
      _captcha: 'false',
      _cc: SUBMISSION_CONFIG.secondaryEmail || 'steving@247kraft.com',
      'Client Name': data.name,
      'Where Are You Based': data.location,
      'Business / Brand': data.businessName,
      'Project Type': data.websiteType,
      'Current Situation': data.situation,
      'Main Goal': data.goal,
      'Estimated Budget': data.budget,
      'When Do You Want This Completed': data.timeline, // Cleanly formatted timeline or launch date!
      'Project Brief Details': data.notes,
      'WhatsApp Phone Number': data.phone || 'Pending Callback',
      'Email Address': data.email || 'Pending Callback',
      'Submission Type': isFullSubmit ? 'Callback / Full Brief Submission' : 'Step 9 Brief Completed',
      'Submitted At': new Date().toLocaleString()
    };

    try {
      fetch(`${SUBMISSION_CONFIG.serviceUrl}${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formSubmitPayload)
      })
      .then(res => res.json())
      .then(resData => {
        console.log('✓ Project brief silently delivered in background:', resData);
      })
      .catch(err => {
        console.warn('Silent background delivery note:', err);
      });
    } catch (err) {
      console.warn('Background delivery error:', err);
    }

    // 4. Optional custom webhook sync if configured
    if (SUBMISSION_CONFIG.webhook || COGNITO_CONFIG.endpoint) {
      const hookUrl = SUBMISSION_CONFIG.webhook || COGNITO_CONFIG.endpoint;
      try {
        fetch(hookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...payload,
            SubmittedAt: new Date().toISOString()
          })
        }).catch(err => console.warn('Webhook sync note:', err));
      } catch (err) {}
    }
  }

  function submitProjectBriefData() {
    const data = getProjectBriefData();
    syncToCognitoForms(data, false);
    if (typeof clearBriefDraft === 'function') clearBriefDraft(true);
  }

  /* ==========================================================================
     MACOS RESUME PROJECT BRIEF NOTIFICATION & DRAFT ENGINE
     - Auto-saves user progress into localStorage on input, change, and step navigation
     - Triggers 2-3 mins (150s) after user closes the modal to browse elsewhere
     - Triggers 7 seconds after page reload / revisit if unfinished draft exists
     - Plays authentic dual-tone macOS crystal glass chime
     - Restores inputs and resumes modal right at the exact saved step
     ========================================================================== */
  const macResumeNotif = document.getElementById('mac-resume-notification');
  const macNotifCloseBtn = document.getElementById('mac-notif-close-btn');
  const macNotifLaterBtn = document.getElementById('mac-notif-later-btn');
  const macNotifResumeBtn = document.getElementById('mac-notif-resume-btn');
  const macNotifDesc = document.getElementById('mac-notif-desc');

  const STEP_METADATA = {
    1: "Your Name",
    2: "Location",
    3: "Business Name",
    4: "Project Type",
    5: "Current Situation",
    6: "Main Goal",
    7: "Estimated Budget",
    8: "Timeline & Launch Date",
    9: "Project Brief Details",
    10: "Submission & Delivery"
  };

  let resumeInactivityTimer = null;
  let resumeRevisitTimer = null;

  /* ==========================================================================
     BROWSER TAB ALERT ENGINE (1 NEW MESSAGE INDICATOR)
     - Displays a blinking badge in the browser tab title:
       `(1) 💬 Resume Your Brief` <-> `🔴 (1) New Alert • 247Kraft`
     - Starts as soon as the resume notification appears
     - Continues blinking until user resumes, opens the brief, or dismisses
     ========================================================================== */
  let tabBlinkInterval = null;
  let originalDocumentTitle = document.title || '247Kraft — Thinking Of Getting A Website For Your Business? Read This Before You Kiss Your Money Goodbye';

  function startTabAlertBlinking() {
    if (tabBlinkInterval) return;
    if (document.title && !document.title.includes('(1)')) {
      originalDocumentTitle = document.title;
    }
    let isAlertOn = true;
    document.title = '🔴 (1) New Alert • 247Kraft';
    tabBlinkInterval = setInterval(() => {
      isAlertOn = !isAlertOn;
      document.title = isAlertOn
        ? '🔴 (1) New Alert • 247Kraft'
        : originalDocumentTitle;
    }, 1000);
  }

  function stopTabAlertBlinking() {
    if (tabBlinkInterval) {
      clearInterval(tabBlinkInterval);
      tabBlinkInterval = null;
    }
    if (originalDocumentTitle) {
      document.title = originalDocumentTitle;
    }
  }

  window.startTabAlertBlinking = startTabAlertBlinking;
  window.stopTabAlertBlinking = stopTabAlertBlinking;

  function getSavedDraft() {
    try {
      const saved = localStorage.getItem('247kraft_brief_draft');
      if (saved) {
        const draft = JSON.parse(saved);
        if (draft && draft.step) return draft;
      }
      if (localStorage.getItem('247kraft_brief_opened') === 'true') {
        return {
          step: currentActiveStep || 1,
          data: getProjectBriefData()
        };
      }
    } catch (e) {}
    return null;
  }

  function saveBriefDraft() {
    try {
      if (localStorage.getItem('247kraft_brief_completed') === 'true') return;
      const data = getProjectBriefData();
      const draft = {
        step: currentActiveStep || 1,
        data: data,
        updatedAt: Date.now()
      };
      localStorage.setItem('247kraft_brief_draft', JSON.stringify(draft));
      localStorage.setItem('247kraft_brief_opened', 'true');
    } catch (e) {}
  }

  function clearBriefDraft(markCompleted = false) {
    try {
      localStorage.removeItem('247kraft_brief_draft');
      localStorage.removeItem('247kraft_brief_opened');
      if (markCompleted) {
        localStorage.setItem('247kraft_brief_completed', 'true');
      }
      cancelInactivityResumeReminder();
      if (resumeRevisitTimer) clearTimeout(resumeRevisitTimer);
      hideMacResumeNotification();
      stopTabAlertBlinking();
    } catch (e) {}
  }

  function showMacResumeNotification(draft, force = false) {
    if (!macResumeNotif) return;
    if (modal && modal.classList.contains('open')) return;
    if (localStorage.getItem('247kraft_brief_completed') === 'true') return;

    // Check if dismissed recently (snoozes for 3 minutes, unless force=true like on page reload)
    if (!force) {
      const snoozedUntil = parseInt(sessionStorage.getItem('247kraft_resume_snoozed_until') || '0', 10);
      if (Date.now() < snoozedUntil) return;
    }

    const activeDraft = draft || getSavedDraft() || { step: currentActiveStep || 1, data: getProjectBriefData() };
    const stepNum = (activeDraft && activeDraft.step) ? activeDraft.step : (currentActiveStep || 1);
    const stepName = STEP_METADATA[stepNum] || `Step ${stepNum}`;
    const nameStr = (activeDraft && activeDraft.data && activeDraft.data.name && activeDraft.data.name !== 'Friend') ? activeDraft.data.name : '';

    let messageHtml = '';
    if (stepNum === 1) {
      if (nameStr) {
        messageHtml = `Hey ${nameStr}! Ready to continue? Your project brief is waiting at <strong>Step 1: Your Name</strong>.`;
      } else {
        messageHtml = `Ready to kick off your project? We saved your place at <strong>Step 1: Your Name</strong>.`;
      }
    } else {
      if (nameStr) {
        messageHtml = `Hey ${nameStr}! We saved your project details at <strong>Step ${stepNum}: ${stepName}</strong>. Ready to finish?`;
      } else {
        messageHtml = `Ready to finish? We saved your project progress at <strong>Step ${stepNum}: ${stepName}</strong>.`;
      }
    }

    if (macNotifDesc) {
      macNotifDesc.innerHTML = messageHtml;
    }

    macResumeNotif.classList.add('active');
    macResumeNotif.setAttribute('aria-hidden', 'false');

    // Start browser tab 1-new-message blinking alert
    startTabAlertBlinking();

    // Play macOS crystal chime sound
    if (typeof playMacNotificationSound === 'function') {
      setTimeout(() => {
        playMacNotificationSound();
      }, 100);
    }
  }

  function hideMacResumeNotification() {
    stopTabAlertBlinking();
    if (!macResumeNotif) return;
    macResumeNotif.classList.remove('active');
    macResumeNotif.setAttribute('aria-hidden', 'true');
  }

  function restoreSavedDraft() {
    const draft = getSavedDraft();
    if (!draft || !draft.data) return false;

    try {
      const d = draft.data;
      if (clientNameInput && d.name && d.name !== 'Friend') {
        clientNameInput.value = d.name;
      }
      const bInput = document.getElementById('business_name');
      if (bInput && d.businessName && d.businessName !== 'My Business' && d.businessName !== 'Not specified') {
        bInput.value = d.businessName;
      }
      const gInput = document.getElementById('website_goal');
      if (gInput && d.goal && d.goal !== 'High-converting platform') {
        gInput.value = d.goal;
      }
      const nInput = document.getElementById('additional_notes');
      if (nInput && d.notes && d.notes !== 'None provided') {
        nInput.value = d.notes;
      }
      if (d.email && d.email !== 'Not provided') {
        const s9Email = document.getElementById('step9_client_email');
        if (s9Email) s9Email.value = d.email;
        const cEmail = document.getElementById('client_email');
        if (cEmail) cEmail.value = d.email;
      }
      if (d.phone && d.phone !== 'Not provided') {
        const s9Phone = document.getElementById('step9_client_phone');
        if (s9Phone) s9Phone.value = d.phone;
        const cPhone = document.getElementById('client_phone');
        if (cPhone) cPhone.value = d.phone;
      }

      // Restore location radio
      if (d.location && form) {
        const rad = form.querySelector(`input[name="location"][value="${d.location}"]`);
        if (rad) rad.checked = true;
      }
      // Restore website_type radio
      if (d.websiteType && form) {
        const rad = form.querySelector(`input[name="website_type"][value="${d.websiteType}"]`);
        if (rad) rad.checked = true;
      }
      // Restore current_situation radio
      if (d.situation && form) {
        const rad = form.querySelector(`input[name="current_situation"][value="${d.situation}"]`);
        if (rad) rad.checked = true;
      }
      // Restore budget radio
      if (d.budget && form) {
        const rad = form.querySelector(`input[name="budget"][value="${d.budget}"]`);
        if (rad) rad.checked = true;
      }
      // Restore timeline radio
      if (d.timeline && form) {
        const rad = form.querySelector(`input[name="timeline"][value="${d.timeline}"]`);
        if (rad) rad.checked = true;
      }

      updateClientNameDisplay();
      return draft.step || 1;
    } catch (e) {
      console.warn('Error restoring draft:', e);
      return false;
    }
  }

  // Dismiss handlers (snooze for 3 minutes)
  function snoozeResumeNotification() {
    if (typeof playButtonClickSound === 'function') playButtonClickSound();
    hideMacResumeNotification();
    sessionStorage.setItem('247kraft_resume_snoozed_until', String(Date.now() + 180000));
  }

  if (macNotifCloseBtn) {
    macNotifCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      snoozeResumeNotification();
    });
  }

  if (macNotifLaterBtn) {
    macNotifLaterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      snoozeResumeNotification();
    });
  }

  // Resume button click handler
  if (macNotifResumeBtn) {
    macNotifResumeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (typeof playButtonClickSound === 'function') playButtonClickSound();
      hideMacResumeNotification();

      const targetStep = restoreSavedDraft() || currentActiveStep || 1;
      openBriefModal('Resume Notification');
      setTimeout(() => {
        switchStep(targetStep);
      }, 80);
    });
  }

  // Clicking the notification banner card body also resumes the form
  if (macResumeNotif) {
    macResumeNotif.addEventListener('click', (e) => {
      if (e.target.closest('#mac-notif-close-btn, #mac-notif-later-btn')) return;
      if (typeof playButtonClickSound === 'function') playButtonClickSound();
      hideMacResumeNotification();

      const targetStep = restoreSavedDraft() || currentActiveStep || 1;
      openBriefModal('Resume Notification');
      setTimeout(() => {
        switchStep(targetStep);
      }, 80);
    });
  }

  // In-session Inactivity Timer: 3 minutes (180,000ms) after abandoning/closing modal
  function scheduleInactivityResumeReminder() {
    cancelInactivityResumeReminder();
    if (localStorage.getItem('247kraft_brief_completed') === 'true') return;

    const draft = getSavedDraft();
    if (!draft) return;

    resumeInactivityTimer = setTimeout(() => {
      const activeDraft = getSavedDraft();
      if (activeDraft && (!modal || !modal.classList.contains('open'))) {
        showMacResumeNotification(activeDraft);
      }
    }, 180000); // 3 minutes exactly per user requirement
  }

  function cancelInactivityResumeReminder() {
    if (resumeInactivityTimer) {
      clearTimeout(resumeInactivityTimer);
      resumeInactivityTimer = null;
    }
  }

  // Page Revisit Reminder: IMMEDIATELY after reloading a page if unfinished draft exists
  function initPageRevisitResumeReminder() {
    if (localStorage.getItem('247kraft_brief_completed') === 'true') return;

    // Reset snooze on fresh page load so reload triggers immediately
    sessionStorage.removeItem('247kraft_resume_snoozed_until');

    const draft = getSavedDraft();
    if (!draft) return;

    // Display after some seconds upon page reload (4500ms for natural reading delay & chime)
    resumeRevisitTimer = setTimeout(() => {
      const activeDraft = getSavedDraft();
      if (activeDraft && (!modal || !modal.classList.contains('open'))) {
        showMacResumeNotification(activeDraft, true);
      }
    }, 4500);
  }

  initPageRevisitResumeReminder();

  // Attach live draft listeners to form inputs
  if (form) {
    form.addEventListener('input', saveBriefDraft);
    form.addEventListener('change', saveBriefDraft);
  }

  // Global console test helper for instant manual testing in browser console
  window.__showMacResumeNotification = function() {
    const draft = getSavedDraft() || { step: 2, data: { name: 'Friend' } };
    showMacResumeNotification(draft);
  };

  let isNavigating = false;
  let chipAdvanceTimer = null;

  function handleAdvance() {
    if (chipAdvanceTimer) {
      clearTimeout(chipAdvanceTimer);
      chipAdvanceTimer = null;
    }

    if (!validateCurrentStep()) return;

    if (currentActiveStep === 1) {
      updateClientNameDisplay();
    }

    // Step 9 Submit: Background sync and advance to Step 10 options screen
    if (currentActiveStep === 9) {
      submitProjectBriefData();
      switchStep(10);
      return;
    }

    if (currentActiveStep < TOTAL_STEPS) {
      switchStep(currentActiveStep + 1);
    }
  }

  if (fsNextBtn) {
    fsNextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (chipAdvanceTimer) clearTimeout(chipAdvanceTimer);
      if (isNavigating) return;
      isNavigating = true;
      setTimeout(() => { isNavigating = false; }, 180);

      if (typeof playButtonClickSound === 'function') playButtonClickSound();
      handleAdvance();
    });
  }

  if (fsPrevBtn) {
    fsPrevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (chipAdvanceTimer) clearTimeout(chipAdvanceTimer);
      if (isNavigating) return;
      isNavigating = true;
      setTimeout(() => { isNavigating = false; }, 180);

      if (typeof playButtonClickSound === 'function') playButtonClickSound();
      if (currentActiveStep > 1 && currentActiveStep < TOTAL_STEPS) {
        switchStep(currentActiveStep - 1);
      }
    });
  }

  // Keyboard navigation: Enter key advances without triggering form reset
  if (modal) {
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        // If inside textarea, allow standard line breaks unless Ctrl/Cmd+Enter
        if (e.target.tagName && e.target.tagName.toLowerCase() === 'textarea') {
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            e.stopPropagation();
            handleAdvance();
          }
          return;
        }

        if (!e.shiftKey) {
          e.preventDefault();
          e.stopPropagation();
          if (chipAdvanceTimer) clearTimeout(chipAdvanceTimer);
          if (isNavigating) return;
          isNavigating = true;
          setTimeout(() => { isNavigating = false; }, 180);

          if (currentActiveStep === TOTAL_STEPS) {
            return;
          } else {
            handleAdvance();
          }
        }
      }
    });
  }

  // Step 9 interactive cue: smoothly scrolls down to contact fields
  const step9Cue = document.getElementById('fs-step9-cue');
  if (step9Cue) {
    step9Cue.addEventListener('click', (e) => {
      e.preventDefault();
      const emailField = document.getElementById('step9_client_email');
      if (emailField) {
        emailField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => emailField.focus(), 250);
      }
    });
  }

  /* ==========================================================================
     SLEEK HORIZONTAL CHIP SELECTOR & CAROUSEL ENGINE
     ========================================================================== */
  const chipCarousels = [];

  function initChipCarousels() {
    const wraps = document.querySelectorAll('.fs-chip-carousel-wrap');
    wraps.forEach(wrap => {
      const grid = wrap.querySelector('.fs-chip-grid');
      const prevBtn = wrap.querySelector('.prev-btn');
      const nextBtn = wrap.querySelector('.next-btn');
      if (!grid) return;

      function updateButtons() {
        const maxScroll = Math.max(0, grid.scrollWidth - grid.clientWidth);
        if (maxScroll <= 4) {
          if (prevBtn) prevBtn.classList.remove('visible');
          if (nextBtn) nextBtn.classList.remove('visible');
          wrap.classList.remove('can-scroll-left', 'can-scroll-right');
          return;
        }

        if (prevBtn) {
          if (grid.scrollLeft > 6) {
            prevBtn.classList.add('visible');
            wrap.classList.add('can-scroll-left');
          } else {
            prevBtn.classList.remove('visible');
            wrap.classList.remove('can-scroll-left');
          }
        }

        if (nextBtn) {
          if (grid.scrollLeft < maxScroll - 6) {
            nextBtn.classList.add('visible');
            wrap.classList.add('can-scroll-right');
          } else {
            nextBtn.classList.remove('visible');
            wrap.classList.remove('can-scroll-right');
          }
        }
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          grid.scrollBy({ left: -260, behavior: 'smooth' });
          if (typeof playButtonClickSound === 'function') playButtonClickSound();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          grid.scrollBy({ left: 260, behavior: 'smooth' });
          if (typeof playButtonClickSound === 'function') playButtonClickSound();
        });
      }

      grid.addEventListener('scroll', updateButtons, { passive: true });

      // Mouse wheel horizontal scroll support
      grid.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && grid.scrollWidth > grid.clientWidth) {
          grid.scrollLeft += e.deltaY;
          e.preventDefault();
          updateButtons();
        }
      }, { passive: false });

      // Desktop drag-to-scroll support
      let isDown = false;
      let startX = 0;
      let scrollStart = 0;
      let hasDragged = false;

      grid.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        isDown = true;
        hasDragged = false;
        startX = e.pageX;
        scrollStart = grid.scrollLeft;
        grid.classList.add('is-dragging');
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        const dx = e.pageX - startX;
        if (Math.abs(dx) > 5) {
          hasDragged = true;
          grid.scrollLeft = scrollStart - dx;
        }
      });

      window.addEventListener('mouseup', () => {
        if (isDown) {
          isDown = false;
          grid.classList.remove('is-dragging');
          setTimeout(() => { hasDragged = false; }, 60);
        }
      });

      // Prevent chip radio click if user was dragging
      grid.querySelectorAll('.fs-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
          if (hasDragged) {
            e.preventDefault();
            e.stopPropagation();
          }
        }, true);
      });

      chipCarousels.push({ wrap, grid, prevBtn, nextBtn, updateButtons });
      updateButtons();
    });
  }

  function updateActivePaneCarousels() {
    chipCarousels.forEach(item => {
      item.updateButtons();
      const activeRadio = item.grid.querySelector('input[type="radio"]:checked');
      if (activeRadio) {
        const chip = activeRadio.closest('.fs-chip');
        if (chip) {
          chip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }
    });
  }

  window.addEventListener('resize', () => {
    chipCarousels.forEach(item => item.updateButtons());
  });

  initChipCarousels();

  /* ==========================================================================
     SLEEK BESPOKE CALENDAR ENGINE (STEP 8 SPECIFIC DATE)
     ========================================================================== */
  const datePickerWrap = document.getElementById('fs-date-picker-wrap');
  const targetDateHidden = document.getElementById('target_date');
  const calMonthYearEl = document.getElementById('cal-month-year');
  const calDaysGrid = document.getElementById('cal-days-grid');
  const calPrevBtn = document.getElementById('cal-prev-month');
  const calNextBtn = document.getElementById('cal-next-month');
  const calSelectedBar = document.getElementById('cal-selected-bar');
  const calSelectedText = document.getElementById('cal-selected-text');
  const calConfirmBtn = document.getElementById('cal-confirm-btn');

  let calCurrentDate = new Date();
  let calSelectedDate = null;

  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  function renderSleekCalendar() {
    if (!calMonthYearEl || !calDaysGrid) return;

    const year = calCurrentDate.getFullYear();
    const month = calCurrentDate.getMonth();
    calMonthYearEl.textContent = `${MONTH_NAMES[month]} ${year}`;

    // Monday-first index: (0 = Mon, 6 = Sun)
    const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let html = '';

    // Empty offset slots
    for (let i = 0; i < firstDayIndex; i++) {
      html += `<div class="cal-day-cell disabled" style="opacity: 0;"></div>`;
    }

    // Days in current month
    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(year, month, day);
      cellDate.setHours(0, 0, 0, 0);

      const isPast = cellDate < today;
      const isToday = cellDate.getTime() === today.getTime();
      const isSelected = calSelectedDate && cellDate.getTime() === calSelectedDate.getTime();

      let classes = ['cal-day-cell'];
      if (isPast) classes.push('disabled');
      if (isToday) classes.push('today');
      if (isSelected) classes.push('selected');

      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      html += `
        <button type="button" class="${classes.join(' ')}" data-date="${dateStr}" ${isPast ? 'disabled' : ''}>
          ${day}
        </button>
      `;
    }

    calDaysGrid.innerHTML = html;

    // Attach click handlers to days
    calDaysGrid.querySelectorAll('.cal-day-cell:not(.disabled)').forEach(cell => {
      cell.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const dateVal = cell.dataset.date;
        if (!dateVal) return;

        const [y, m, d] = dateVal.split('-').map(Number);
        calSelectedDate = new Date(y, m - 1, d);
        calSelectedDate.setHours(0, 0, 0, 0);

        if (targetDateHidden) {
          targetDateHidden.value = dateVal;
        }

        if (typeof playButtonClickSound === 'function') {
          playButtonClickSound();
        }

        // Highlight selected in grid
        calDaysGrid.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('selected'));
        cell.classList.add('selected');

        // Show confirmation bar in one single line
        if (calSelectedBar && calSelectedText) {
          const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
          calSelectedText.textContent = `Launch: ${calSelectedDate.toLocaleDateString('en-US', options)}`;
          calSelectedBar.style.display = 'flex';
        }

        // NO automatic proceeding when selecting date (user confirms or clicks continue)
        if (chipAdvanceTimer) {
          clearTimeout(chipAdvanceTimer);
          chipAdvanceTimer = null;
        }
      });
    });
  }

  if (calPrevBtn) {
    calPrevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      calCurrentDate.setMonth(calCurrentDate.getMonth() - 1);
      renderSleekCalendar();
    });
  }

  if (calNextBtn) {
    calNextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      calCurrentDate.setMonth(calCurrentDate.getMonth() + 1);
      renderSleekCalendar();
    });
  }

  if (calConfirmBtn) {
    calConfirmBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (chipAdvanceTimer) clearTimeout(chipAdvanceTimer);
      if (currentActiveStep < TOTAL_STEPS) {
        handleAdvance();
      }
    });
  }

  // Auto-advance & dynamic currency triggers when user clicks any pill option
  function attachChipRadioListeners(container = document) {
    const chipRadios = container.querySelectorAll('.fs-chip input[type="radio"]');
    chipRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (typeof playButtonClickSound === 'function') {
          playButtonClickSound();
        }

        // Center active chip smoothly
        const chip = radio.closest('.fs-chip');
        if (chip) {
          chip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }

        if (chipAdvanceTimer) clearTimeout(chipAdvanceTimer);

        // Step 2 Location: Dynamically update budget currencies on Step 7
        if (radio.name === 'location') {
          updateBudgetCurrency(radio.value);
        }

        // Step 8 Timeline: Reveal or hide custom sleek calendar
        if (radio.name === 'timeline' && radio.value === 'Specific date') {
          if (datePickerWrap) {
            datePickerWrap.style.display = 'flex';
            renderSleekCalendar();
            setTimeout(() => {
              datePickerWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
          }
          return;
        } else if (radio.name === 'timeline') {
          if (datePickerWrap) {
            datePickerWrap.style.display = 'none';
          }
        }

        chipAdvanceTimer = setTimeout(() => {
          if (currentActiveStep < TOTAL_STEPS) {
            handleAdvance();
          }
        }, 260);
      });
    });
  }

  attachChipRadioListeners();

  /* ==========================================================================
     STEP 10: DISPATCH DELIVERY OPTIONS (WHATSAPP, EMAIL, CALL/TEXT)
     ========================================================================== */
  const dispatchWhatsappBtn = document.getElementById('dispatch-whatsapp-btn');
  const dispatchEmailBtn = document.getElementById('dispatch-email-btn');
  const dispatchCallBtn = document.getElementById('dispatch-call-btn');
  const callbackModal = document.getElementById('callback-modal');
  const callbackModalBackdrop = document.getElementById('callback-modal-backdrop');
  const callbackModalClose = document.getElementById('callback-modal-close');
  const callbackModalFormView = document.getElementById('callback-modal-form-view');
  const callbackModalSuccessView = document.getElementById('callback-modal-success-view');
  const callbackModalDoneBtn = document.getElementById('callback-modal-done-btn');
  const callbackSuccessContactPill = document.getElementById('callback-success-contact-pill');
  const callbackBadgeHint = document.getElementById('callback-badge-hint');
  const callbackSubmitBtn = document.getElementById('callback-submit-btn');
  const clientPhoneInput = document.getElementById('client_phone');
  const clientEmailInput = document.getElementById('client_email');

  if (dispatchWhatsappBtn) {
    dispatchWhatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof playButtonClickSound === 'function') playButtonClickSound();
      const data = getProjectBriefData();
      syncToCognitoForms(data, false);
      const waMessage =
        `*NEW PROJECT INQUIRY — 247KRAFT*
━━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${data.name}
🏢 *Business:* ${data.businessName}
🌍 *Location:* ${data.location}
💻 *Project Type:* ${data.websiteType}
📍 *Current Situation:* ${data.situation}
🎯 *Main Goal:* ${data.goal}
💰 *Estimated Budget:* ${data.budget}
⏱ *Timeline:* ${data.timeline}
✉️ *Email:* ${data.email}
📞 *Phone:* ${data.phone}
📝 *Project Brief:*
${data.notes}
━━━━━━━━━━━━━━━━━━━━━
_Sent via 247Kraft Client Portal_`;

      const encodedMsg = encodeURIComponent(waMessage);
      const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMsg}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // Auto-close project brief form on both mobile and desktop
      setTimeout(() => {
        closeBriefModal();
      }, 450);
    });
  }

  if (dispatchEmailBtn) {
    dispatchEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof playButtonClickSound === 'function') playButtonClickSound();
      const data = getProjectBriefData();
      syncToCognitoForms(data, false);
      const subject = encodeURIComponent(`New Project Inquiry: ${data.websiteType} - ${data.name} (${data.businessName})`);
      const body = encodeURIComponent(
        `Hi 247Kraft Team,

Here are my project details:

• Client Name: ${data.name}
• Business / Brand: ${data.businessName}
• Location: ${data.location}
• Project Type: ${data.websiteType}
• Current Situation: ${data.situation}
• Main Goal: ${data.goal}
• Estimated Budget: ${data.budget}
• Timeline: ${data.timeline}
• Email Address: ${data.email}
• WhatsApp / Phone: ${data.phone}

Project Brief:
${data.notes}

Looking forward to your response!

Best regards,
${data.name}`
      );
      const mailtoUrl = `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl;

      // Auto-close project brief form on both mobile and desktop
      setTimeout(() => {
        closeBriefModal();
      }, 450);
    });
  }

  // Step 10: Start Fresh / Reset Brief Link
  const step10RestartLink = document.getElementById('step10-restart-link');
  if (step10RestartLink) {
    step10RestartLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof playButtonClickSound === 'function') playButtonClickSound();
      resetBriefForm();
    });
  }

  function openCallbackModal() {
    if (!callbackModal) return;
    if (typeof playButtonClickSound === 'function') playButtonClickSound();

    // Refresh client first name personalization
    const rawName = clientNameInput ? clientNameInput.value.trim() : '';
    const firstName = rawName.split(' ')[0] || 'Friend';
    document.querySelectorAll('.client-name-slot').forEach(slot => {
      slot.textContent = firstName;
    });

    // Prefill phone and email from Step 9 if already provided
    const data = getProjectBriefData();
    if (clientPhoneInput && data.phone && data.phone !== 'Not provided') {
      clientPhoneInput.value = data.phone;
    }
    if (clientEmailInput && data.email && data.email !== 'Not provided') {
      clientEmailInput.value = data.email;
    }

    callbackModal.style.display = 'flex';
    requestAnimationFrame(() => {
      callbackModal.classList.add('active');
    });
    if (dispatchCallBtn) dispatchCallBtn.classList.add('active-modal-open');
    if (clientPhoneInput && callbackModalFormView && callbackModalFormView.style.display !== 'none') {
      setTimeout(() => clientPhoneInput.focus(), 150);
    }
  }

  function closeCallbackModal() {
    if (!callbackModal) return;
    callbackModal.classList.remove('active');
    if (dispatchCallBtn) dispatchCallBtn.classList.remove('active-modal-open');
    setTimeout(() => {
      if (!callbackModal.classList.contains('active')) {
        callbackModal.style.display = 'none';
      }
    }, 240);
  }

  if (dispatchCallBtn) {
    dispatchCallBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCallbackModal();
    });
  }

  if (callbackModalClose) {
    callbackModalClose.addEventListener('click', (e) => {
      e.preventDefault();
      closeCallbackModal();
    });
  }

  if (callbackModalBackdrop) {
    callbackModalBackdrop.addEventListener('click', (e) => {
      e.preventDefault();
      closeCallbackModal();
    });
  }

  if (callbackModalDoneBtn) {
    callbackModalDoneBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof playButtonClickSound === 'function') playButtonClickSound();
      closeCallbackModal();
      // Since project intake & contact confirmation are 100% complete, close the main project modal as well
      setTimeout(() => {
        closeBriefModal();
      }, 200);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && callbackModal && callbackModal.classList.contains('active')) {
      closeCallbackModal();
    }
  });

  // Submit Callback / Text Request from Popup Modal
  if (callbackSubmitBtn) {
    callbackSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const phone = (clientPhoneInput ? clientPhoneInput.value : '').trim();
      const email = (clientEmailInput ? clientEmailInput.value : '').trim();

      if (!phone) {
        if (clientPhoneInput) {
          clientPhoneInput.focus();
          if (typeof clientPhoneInput.reportValidity === 'function') {
            clientPhoneInput.setCustomValidity('Please enter your WhatsApp or phone number.');
            clientPhoneInput.reportValidity();
            setTimeout(() => clientPhoneInput.setCustomValidity(''), 3000);
          }
        }
        return;
      }

      if (!email || !email.includes('@')) {
        if (clientEmailInput) {
          clientEmailInput.focus();
          if (typeof clientEmailInput.reportValidity === 'function') {
            clientEmailInput.setCustomValidity('Please provide a valid email address.');
            clientEmailInput.reportValidity();
            setTimeout(() => clientEmailInput.setCustomValidity(''), 3000);
          }
        }
        return;
      }

      if (typeof playButtonClickSound === 'function') playButtonClickSound();

      // Submit all details including phone and email to Cognito Forms in background
      const data = getProjectBriefData();
      data.phone = phone;
      data.email = email;
      syncToCognitoForms(data, true);

      // Display celebratory popup notification view in modal
      if (callbackModalFormView) {
        callbackModalFormView.style.display = 'none';
      }
      if (callbackModalSuccessView) {
        callbackModalSuccessView.style.display = 'block';
      }
      if (callbackSuccessContactPill) {
        callbackSuccessContactPill.textContent = `📞 ${phone} • ✉️ ${email}`;
      }

      // Update card title and desc on Step 10
      const descEl = dispatchCallBtn ? dispatchCallBtn.querySelector('.dispatch-card-desc') : null;
      if (descEl) {
        descEl.textContent = '✓ Details received! We will reach out to you shortly.';
      }
      if (callbackBadgeHint) {
        callbackBadgeHint.textContent = '✓ Details Sent';
      }
    });
  }

  // Prevent default form submit on Enter
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (currentActiveStep < TOTAL_STEPS) {
        handleAdvance();
      }
    });
  }

  /* ==========================================================================
     4. FAQ ACCORDION INTERACTIVITY
     ========================================================================== */
  const faqRows = document.querySelectorAll('.faq-row');
  faqRows.forEach(row => {
    const btn = row.querySelector('.faq-toggle-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = row.classList.contains('active');

        // Play acoustic accordion toggle sound
        playAccordionToggleSound(!isActive);

        // Close others
        faqRows.forEach(otherRow => {
          if (otherRow !== row) {
            otherRow.classList.remove('active');
            const otherBtn = otherRow.querySelector('.faq-toggle-btn');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        if (isActive) {
          row.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          row.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  /* ==========================================================================
     5. UNIFIED FLOATING UTILITY DOCK (THEME, SOUND, SMART DYNAMIC SCROLL)
     ========================================================================== */
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeTooltip = document.getElementById('theme-tooltip');
  const soundBtn = document.getElementById('sound-toggle-btn');
  const soundTooltip = document.getElementById('sound-tooltip');
  const scrollWrapper = document.getElementById('dock-scroll-wrapper');
  const scrollNavBtn = document.getElementById('scroll-nav-btn');
  const scrollProgressPath = document.getElementById('scroll-progress-path');
  const scrollArrowGlyph = document.getElementById('scroll-arrow-glyph');
  const scrollTooltip = document.getElementById('scroll-tooltip');

  // --- A. NIGHT / CINEMA MODE & CELESTIAL FRAMER MOTION ORCHESTRATION ---
  const sunEl = document.getElementById('celestial-sun');
  const moonEl = document.getElementById('celestial-moon');
  const savedTheme = localStorage.getItem('247kraft_theme');
  const isDarkInit = savedTheme === 'dark';

  if (isDarkInit) {
    document.body.classList.add('dark-theme');
    if (themeTooltip) themeTooltip.textContent = 'Daylight Paper';
  }

  // Initial celestial body positions based on theme
  function setupCelestialInitial(isDark) {
    if (!sunEl || !moonEl) return;
    if (isDark) {
      sunEl.style.transform = 'translate3d(-180px, 260px, 0) scale(0.35)';
      sunEl.style.opacity = '0';
      moonEl.style.transform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
      moonEl.style.opacity = '1';
    } else {
      sunEl.style.transform = 'translate3d(0, 0, 0) scale(1)';
      sunEl.style.opacity = '1';
      moonEl.style.transform = 'translate3d(120px, 220px, 0) scale(0.35) rotate(-25deg)';
      moonEl.style.opacity = '0';
    }
  }
  setupCelestialInitial(isDarkInit);

  function animateCelestialBodies(toDark) {
    if (!sunEl || !moonEl) return;
    const motionObj = window.Motion;

    if (toDark) {
      // 1. Sun sets down towards bottom-left corner and naturally fades out
      if (motionObj && typeof motionObj.animate === 'function') {
        motionObj.animate(
          sunEl,
          {
            x: -180,
            y: 260,
            scale: 0.35,
            opacity: 0
          },
          { duration: 1.2, easing: [0.32, 0.72, 0, 1] }
        );

        // 2. Moon gracefully rises into the night sky from bottom-right
        motionObj.animate(
          moonEl,
          {
            x: [120, 0],
            y: [220, 0],
            scale: [0.35, 1],
            opacity: [0, 1],
            rotate: [-25, 0]
          },
          {
            duration: 1.6,
            easing: motionObj.spring ? motionObj.spring({ damping: 14, stiffness: 40 }) : [0.16, 1, 0.3, 1]
          }
        );
      } else {
        // High-fidelity Web Animations API fallback
        sunEl.animate(
          [
            { transform: 'translate3d(0, 0, 0) scale(1)', opacity: 1 },
            { transform: 'translate3d(-180px, 260px, 0) scale(0.35)', opacity: 0 }
          ],
          { duration: 1200, fill: 'forwards', easing: 'cubic-bezier(0.32, 0.72, 0, 1)' }
        );
        moonEl.animate(
          [
            { transform: 'translate3d(120px, 220px, 0) scale(0.35) rotate(-25deg)', opacity: 0 },
            { transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)', opacity: 1 }
          ],
          { duration: 1600, fill: 'forwards', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
        );
      }
    } else {
      // 1. Moon sets down and fades
      if (motionObj && typeof motionObj.animate === 'function') {
        motionObj.animate(
          moonEl,
          {
            x: 120,
            y: 220,
            scale: 0.35,
            opacity: 0,
            rotate: -25
          },
          { duration: 1.1, easing: [0.32, 0.72, 0, 1] }
        );

        // 2. Sun animates rising from bottom-left corner up across into the daylight sky
        motionObj.animate(
          sunEl,
          {
            x: [-180, 0],
            y: [260, 0],
            scale: [0.35, 1],
            opacity: [0, 1]
          },
          {
            duration: 1.6,
            easing: motionObj.spring ? motionObj.spring({ damping: 14, stiffness: 40 }) : [0.16, 1, 0.3, 1]
          }
        );
      } else {
        // High-fidelity Web Animations API fallback
        moonEl.animate(
          [
            { transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)', opacity: 1 },
            { transform: 'translate3d(120px, 220px, 0) scale(0.35) rotate(-25deg)', opacity: 0 }
          ],
          { duration: 1100, fill: 'forwards', easing: 'cubic-bezier(0.32, 0.72, 0, 1)' }
        );
        sunEl.animate(
          [
            { transform: 'translate3d(-180px, 260px, 0) scale(0.35)', opacity: 0 },
            { transform: 'translate3d(0, 0, 0) scale(1)', opacity: 1 }
          ],
          { duration: 1600, fill: 'forwards', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
        );
      }
    }
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-theme');
      localStorage.setItem('247kraft_theme', isDark ? 'dark' : 'light');
      if (themeTooltip) {
        themeTooltip.textContent = isDark ? 'Daylight Paper' : 'Midnight Cinema';
      }
      animateCelestialBodies(isDark);
      playButtonClickSound();
    });
  }

  // --- B. AUDIO HAPTIC CONTROLLER (OPTION A: DYNAMIC ISLAND VOLUME KNOB) ---
  const soundCapsule = document.getElementById('sound-capsule');
  const soundVolumeSlider = document.getElementById('sound-volume-slider');
  const soundVolumeLabel = document.getElementById('sound-volume-label');
  const soundSliderFill = document.getElementById('sound-slider-fill');

  function updateSoundUI() {
    if (!soundBtn) return;
    const currentPercent = Math.round(soundVolume * 100);

    if (soundVolumeSlider) {
      soundVolumeSlider.value = isSoundEnabled ? currentPercent : 0;
    }
    if (soundSliderFill) {
      soundSliderFill.style.width = isSoundEnabled ? `${currentPercent}%` : '0%';
    }
    if (soundVolumeLabel) {
      soundVolumeLabel.textContent = isSoundEnabled ? `${currentPercent}%` : '0%';
    }

    if (isSoundEnabled && soundVolume > 0) {
      soundBtn.classList.remove('muted');
      if (soundTooltip) soundTooltip.textContent = `Sound ${currentPercent}%`;
    } else {
      soundBtn.classList.add('muted');
      if (soundTooltip) soundTooltip.textContent = 'Muted';
    }
  }
  updateSoundUI();

  // 1. Single click on speaker icon: toggle Mute / Unmute + toggle slider expansion
  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (soundCapsule) {
        soundCapsule.classList.toggle('is-expanded');
      }
      if (isSoundEnabled) {
        // Mute
        isSoundEnabled = false;
        localStorage.setItem('247kraft_sound', 'false');
        updateSoundUI();
      } else {
        // Unmute: restore volume if it was 0
        isSoundEnabled = true;
        if (soundVolume <= 0.05) soundVolume = 0.75;
        localStorage.setItem('247kraft_sound', 'true');
        localStorage.setItem('247kraft_volume', soundVolume);
        updateSoundUI();
        playButtonClickSound();
      }
    });
  }

  // 2. Sliding the Volume Knob: live scrub with tactile audio ticks
  if (soundVolumeSlider) {
    soundVolumeSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      soundVolume = val / 100;

      if (val === 0) {
        isSoundEnabled = false;
        localStorage.setItem('247kraft_sound', 'false');
      } else {
        isSoundEnabled = true;
        localStorage.setItem('247kraft_sound', 'true');
      }

      localStorage.setItem('247kraft_volume', soundVolume);

      if (soundSliderFill) soundSliderFill.style.width = `${val}%`;
      if (soundVolumeLabel) soundVolumeLabel.textContent = `${val}%`;

      if (isSoundEnabled && val > 0) {
        soundBtn.classList.remove('muted');
        if (soundTooltip) soundTooltip.textContent = `Sound ${val}%`;
        playVolumeTickSound();
      } else {
        soundBtn.classList.add('muted');
        if (soundTooltip) soundTooltip.textContent = 'Muted';
      }
    });

    let isInteractingVolume = false;

    soundVolumeSlider.addEventListener('touchstart', (e) => {
      isInteractingVolume = true;
      e.stopPropagation();
    }, { passive: true });

    soundVolumeSlider.addEventListener('mousedown', (e) => {
      isInteractingVolume = true;
      e.stopPropagation();
    });

    soundVolumeSlider.addEventListener('touchend', () => {
      setTimeout(() => { isInteractingVolume = false; }, 300);
      soundVolumeSlider.blur();
    });

    soundVolumeSlider.addEventListener('touchcancel', () => {
      isInteractingVolume = false;
    });

    soundVolumeSlider.addEventListener('mouseup', () => {
      setTimeout(() => { isInteractingVolume = false; }, 300);
      soundVolumeSlider.blur();
    });

    soundVolumeSlider.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    soundVolumeSlider.addEventListener('change', () => {
      soundVolumeSlider.blur();
    });
  }

  // 3. Auto-collapse sound capsule when user scrolls the page (ignoring slider drags)
  function collapseSoundCapsule(e) {
    if (isInteractingVolume) return;
    if (e && e.target && soundCapsuleWrapper && soundCapsuleWrapper.contains(e.target)) return;

    if (soundCapsule && soundCapsule.classList.contains('is-expanded')) {
      soundCapsule.classList.remove('is-expanded');
      soundCapsule.classList.add('force-collapsed');
      setTimeout(() => {
        if (soundCapsule) soundCapsule.classList.remove('force-collapsed');
      }, 350);
    }
    if (soundVolumeSlider) soundVolumeSlider.blur();
    if (soundBtn) soundBtn.blur();
    if (document.activeElement && (document.activeElement === soundBtn || document.activeElement === soundVolumeSlider)) {
      document.activeElement.blur();
    }
  }

  window.addEventListener('scroll', collapseSoundCapsule, { passive: true });
  window.addEventListener('touchmove', collapseSoundCapsule, { passive: true });

  const soundCapsuleWrapper = document.getElementById('sound-capsule-wrapper');
  if (soundCapsuleWrapper) {
    soundCapsuleWrapper.addEventListener('mouseleave', () => {
      if (soundVolumeSlider) soundVolumeSlider.blur();
      if (soundBtn) soundBtn.blur();
      if (soundCapsule) soundCapsule.classList.remove('is-expanded');
    });
  }

  // --- C. DYNAMIC SMART SCROLL NAVIGATOR (↓ / ↑) ---
  let lastScrollY = window.scrollY;
  let isScrollUpMode = false;

  function handleScrollNavigation() {
    const currentScrollY = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressPercent = scrollHeight > 0 ? Math.min(100, Math.max(0, (currentScrollY / scrollHeight) * 100)) : 0;

    // Reveal dock scroll arrow after scrolling down ~160px
    if (currentScrollY > 160) {
      if (scrollWrapper) scrollWrapper.classList.add('visible');
    } else {
      if (scrollWrapper) scrollWrapper.classList.remove('visible');
    }

    // Update circular progress SVG stroke
    if (scrollProgressPath) {
      scrollProgressPath.setAttribute('stroke-dasharray', `${progressPercent.toFixed(1)}, 100`);
    }

    // Dynamic Direction Sensing:
    // If user is scrolling up by > 12px OR reached the very bottom (> 92% read), flip arrow to UP (↑)
    if (currentScrollY < lastScrollY - 12 || progressPercent > 92) {
      if (!isScrollUpMode) {
        isScrollUpMode = true;
        if (scrollArrowGlyph) scrollArrowGlyph.classList.add('scroll-up');
        if (scrollTooltip) scrollTooltip.textContent = 'Back to Top';
      }
    } else if (currentScrollY > lastScrollY + 12 && progressPercent <= 92) {
      // User is scrolling down: point arrow DOWN (↓)
      if (isScrollUpMode) {
        isScrollUpMode = false;
        if (scrollArrowGlyph) scrollArrowGlyph.classList.remove('scroll-up');
        if (scrollTooltip) scrollTooltip.textContent = 'Scroll Down';
      }
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleScrollNavigation, { passive: true });
  handleScrollNavigation(); // Initial check

  if (scrollNavBtn) {
    scrollNavBtn.addEventListener('click', () => {
      if (isScrollUpMode) {
        // Smoothly glide all the way to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Smoothly advance down by viewport height
        const scrollAmount = window.innerHeight * 0.85;
        window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
      }
      playButtonClickSound();
    });
  }

  /* ==========================================================================
     6. EVRA-STYLE SNAPPY FLIP SHOWCASE CAROUSEL (FAST MOVE, CENTER-LOCK & HOLD)
     ========================================================================== */
  const carouselWrapper = document.getElementById('showcase-carousel-wrapper');
  const stage = document.getElementById('showcase-stage');
  const track = document.getElementById('showcase-track');
  const slides = Array.from(document.querySelectorAll('.showcase-card.continuous-slide'));
  const prevBtn = document.getElementById('carousel-prev-btn');
  const nextBtn = document.getElementById('carousel-next-btn');
  const dots = Array.from(document.querySelectorAll('.carousel-dot'));

  if (carouselWrapper && stage && track && slides.length > 0) {
    let activeIdx = 4; // Start centered on Cycle 2 (Slide 4: VSO Table Tennis)
    const total = slides.length;
    let stepTimer = null;
    let isHovered = false;
    let isTransitioning = false;

    // Measurement helper
    function getGeometry() {
      const stageWidth = stage.clientWidth;
      const cardWidth = slides[0].offsetWidth || 470;
      const trackStyle = window.getComputedStyle(track);
      const gap = parseFloat(trackStyle.columnGap || trackStyle.gap) || 24;
      const step = cardWidth + gap;
      const centerOffset = (stageWidth - cardWidth) / 2;
      return { stageWidth, cardWidth, gap, step, centerOffset };
    }

    function getCenterPosition(index) {
      const { step, centerOffset } = getGeometry();
      return centerOffset - (index * step);
    }

    function updateCardClasses(index) {
      slides.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add('is-center');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.classList.remove('is-center');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      // Synchronize 3 indicator dots
      const projectIdx = parseInt(slides[index].dataset.project, 10);
      dots.forEach((dot, idx) => {
        if (idx === projectIdx) {
          dot.classList.add('active');
          dot.setAttribute('aria-selected', 'true');
        } else {
          dot.classList.remove('active');
          dot.setAttribute('aria-selected', 'false');
        }
      });
    }

    function goTo(index, animated = true, userInitiated = false) {
      activeIdx = index;
      const targetX = getCenterPosition(activeIdx);

      if (animated) {
        isTransitioning = true;
        // Fast, high-energy snappy cubic-bezier transition (Evra style)
        track.style.transition = 'transform 0.72s cubic-bezier(0.19, 1, 0.22, 1)';
        track.style.transform = `translate3d(${targetX.toFixed(2)}px, 0, 0)`;
        updateCardClasses(activeIdx);

        if (userInitiated && typeof playPageTurnSound === 'function') {
          playPageTurnSound();
        }

        // Invisible, flicker-free wrap around when reaching either boundary cycle
        setTimeout(() => {
          if (activeIdx >= 6 || activeIdx <= 2) {
            if (activeIdx >= 6) {
              activeIdx -= 3;
            } else if (activeIdx <= 2) {
              activeIdx += 3;
            }
            const resetX = getCenterPosition(activeIdx);

            // Temporarily freeze transitions on all slides & track for an instant, zero-flicker clone swap
            slides.forEach((s) => {
              s.style.transition = 'none';
            });
            track.style.transition = 'none';
            track.style.transform = `translate3d(${resetX.toFixed(2)}px, 0, 0)`;
            updateCardClasses(activeIdx);

            // Force reflow so the instant visual state commits without animation
            void track.offsetHeight;

            // Restore smooth transitions on next frame for upcoming flips
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                slides.forEach((s) => {
                  s.style.transition = '';
                });
                track.style.transition = '';
                isTransitioning = false;
              });
            });
          } else {
            isTransitioning = false;
          }
        }, 730);
      } else {
        track.style.transition = 'none';
        track.style.transform = `translate3d(${targetX.toFixed(2)}px, 0, 0)`;
        updateCardClasses(activeIdx);
      }
    }

    // Auto-advancing loop: hold centered for 2.8s, then whoosh fast to next screen
    function startAutoFlip() {
      stopAutoFlip();
      stepTimer = setInterval(() => {
        if (!isHovered && !isTransitioning && !document.body.classList.contains('modal-open')) {
          goTo(activeIdx + 1, true, false);
        }
      }, 2800); // 2.8 seconds hold between snappy flips
    }

    function stopAutoFlip() {
      if (stepTimer) {
        clearInterval(stepTimer);
        stepTimer = null;
      }
    }

    function resetAutoFlip() {
      stopAutoFlip();
      startAutoFlip();
    }

    // Hover pauses the flip so the user can study the centered card
    carouselWrapper.addEventListener('mouseenter', () => { isHovered = true; });
    carouselWrapper.addEventListener('mouseleave', () => { isHovered = false; });

    // Arrow navigation
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goTo(activeIdx + 1, true, true);
        resetAutoFlip();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goTo(activeIdx - 1, true, true);
        resetAutoFlip();
      });
    }

    // Pagination Dots
    dots.forEach((dot, dotIdx) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        // Jump to nearest instance of this project relative to current activeIdx
        let bestIdx = activeIdx;
        let minDiff = Infinity;
        slides.forEach((slide, i) => {
          if (parseInt(slide.dataset.project, 10) === dotIdx) {
            const diff = Math.abs(i - activeIdx);
            if (diff < minDiff) {
              minDiff = diff;
              bestIdx = i;
            }
          }
        });
        goTo(bestIdx, true, true);
        resetAutoFlip();
      });
    });

    // Clicking any side card brings it straight into the center
    slides.forEach((slide, idx) => {
      slide.addEventListener('click', (e) => {
        if (e.target.closest('.showcase-visit-btn')) {
          // Allow the external website link to open directly in a new tab
          return;
        }
        if (idx !== activeIdx) {
          e.preventDefault();
          goTo(idx, true, true);
          resetAutoFlip();
        }
      });
    });

    // Keyboard navigation
    carouselWrapper.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        goTo(activeIdx - 1, true, true);
        resetAutoFlip();
      } else if (e.key === 'ArrowRight') {
        goTo(activeIdx + 1, true, true);
        resetAutoFlip();
      }
    });

    // Touch & Pointer Drag Gestures for fast swiping
    let isDragging = false;
    let startX = 0;
    let initialTransformX = 0;

    track.addEventListener('pointerdown', (e) => {
      isDragging = true;
      startX = e.clientX;
      initialTransformX = getCenterPosition(activeIdx);
      track.style.transition = 'none';
      track.style.cursor = 'grabbing';
      stopAutoFlip();
      if (track.setPointerCapture) {
        try { track.setPointerCapture(e.pointerId); } catch (err) { }
      }
    });

    track.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      track.style.transform = `translate3d(${(initialTransformX + deltaX).toFixed(2)}px, 0, 0)`;
    });

    function finishDrag(e) {
      if (!isDragging) return;
      isDragging = false;
      track.style.cursor = 'grab';
      if (track.releasePointerCapture) {
        try { track.releasePointerCapture(e.pointerId); } catch (err) { }
      }
      const deltaX = e.clientX - startX;
      if (deltaX < -45) {
        goTo(activeIdx + 1, true, true);
      } else if (deltaX > 45) {
        goTo(activeIdx - 1, true, true);
      } else {
        goTo(activeIdx, true, false);
      }
      resetAutoFlip();
    }

    track.addEventListener('pointerup', finishDrag);
    track.addEventListener('pointercancel', finishDrag);

    // Window resize recalculation
    window.addEventListener('resize', () => {
      goTo(activeIdx, false, false);
    });

    // Initial setup
    goTo(activeIdx, false, false);
    startAutoFlip();
  }

  /* ==========================================================================
     8. FRAMER MOTION / MOTION ONE SCROLL & PHYSICS ORCHESTRATION
     ========================================================================== */
  function initFramerMotionAnimations() {
    const motionObj = window.Motion;
    if (!motionObj || typeof motionObj.animate !== 'function') {
      return;
    }

    // A. ColorInvoice Hero Staggered Entrance
    const breadcrumb = document.querySelector('.article-breadcrumb-wrap');
    const metaRow = document.querySelector('.article-meta-row');
    const headline = document.querySelector('.colorinvoice-headline');
    const authorRow = document.querySelector('.article-author-row');
    const featuredCard = document.querySelector('.article-featured-card');

    if (breadcrumb) {
      motionObj.animate(breadcrumb, { opacity: [0, 1], y: [-15, 0] }, { duration: 0.6, easing: [0.16, 1, 0.3, 1] });
    }
    if (metaRow) {
      motionObj.animate(metaRow, { opacity: [0, 1], y: [15, 0] }, { duration: 0.7, delay: 0.1, easing: [0.16, 1, 0.3, 1] });
    }
    if (headline) {
      motionObj.animate(headline, { opacity: [0, 1], y: [25, 0] }, { duration: 0.85, delay: 0.18, easing: [0.16, 1, 0.3, 1] });
    }
    if (authorRow) {
      motionObj.animate(authorRow, { opacity: [0, 1], y: [20, 0] }, { duration: 0.8, delay: 0.28, easing: [0.16, 1, 0.3, 1] });
    }
    if (featuredCard) {
      motionObj.animate(featuredCard, { opacity: [0, 1], scale: [0.96, 1], y: [30, 0] }, { duration: 0.9, delay: 0.38, easing: [0.16, 1, 0.3, 1] });
    }

    // B. Scroll Reveals using Motion inView
    if (typeof motionObj.inView === 'function') {
      try {
        motionObj.inView('.colorinvoice-body-flow h2.section-headline, .saas-reading-container h2.section-headline', (info) => {
          motionObj.animate(info.target, { opacity: [0, 1], y: [35, 0] }, { duration: 0.85, easing: [0.16, 1, 0.3, 1] });
        });

        motionObj.inView('.meme-container', (info) => {
          motionObj.animate(info.target, { opacity: [0, 1], scale: [0.95, 1], y: [25, 0] }, { duration: 0.8, easing: [0.16, 1, 0.3, 1] });
        });

        motionObj.inView('.testimonial-card', (info) => {
          motionObj.animate(info.target, { opacity: [0, 1], y: [30, 0] }, { duration: 0.8, easing: [0.16, 1, 0.3, 1] });
        });

        motionObj.inView('.step-item', (info) => {
          motionObj.animate(info.target, { opacity: [0, 1], y: [25, 0] }, { duration: 0.7, easing: [0.16, 1, 0.3, 1] });
        });

        motionObj.inView('.letter-signoff', (info) => {
          motionObj.animate(info.target, { opacity: [0, 1], y: [30, 0] }, { duration: 0.8, easing: [0.16, 1, 0.3, 1] });
        });
      } catch (err) {
        console.warn('inView Motion error:', err);
      }
    }

    // C. Micro spring physics on buttons
    const interactiveBtns = document.querySelectorAll('.sales-button, .evra-btn-primary, .nav-cta-btn');
    interactiveBtns.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        try {
          motionObj.animate(btn, { scale: 1.035 }, { duration: 0.25, easing: [0.34, 1.56, 0.64, 1] });
        } catch (e) { }
      });
      btn.addEventListener('mouseleave', () => {
        try {
          motionObj.animate(btn, { scale: 1 }, { duration: 0.2, easing: [0.16, 1, 0.3, 1] });
        } catch (e) { }
      });
    });
  }

  // Trigger Motion orchestration
  if (window.Motion) {
    initFramerMotionAnimations();
  } else {
    window.addEventListener('load', initFramerMotionAnimations);
  }

});



