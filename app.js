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
    if (!isSoundEnabled) return;
    try {
      initAudioContext();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const masterGain = audioCtx.createGain();
      masterGain.connect(audioCtx.destination);
      masterGain.gain.setValueAtTime(0.22, now);

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
    if (!isSoundEnabled) return;
    try {
      initAudioContext();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const master = audioCtx.createGain();
      master.connect(audioCtx.destination);
      master.gain.setValueAtTime(0.36, now);

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
    if (!isSoundEnabled) return;
    try {
      initAudioContext();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const master = audioCtx.createGain();
      master.connect(audioCtx.destination);
      master.gain.setValueAtTime(0.32, now);

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
    if (!isSoundEnabled) return;
    try {
      initAudioContext();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const master = audioCtx.createGain();
      master.connect(audioCtx.destination);
      master.gain.setValueAtTime(0.36, now);

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
    if (!isSoundEnabled) return;
    try {
      initAudioContext();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const master = audioCtx.createGain();
      master.connect(audioCtx.destination);
      master.gain.setValueAtTime(0.38, now);

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
    bgVideo.play().catch(() => {});
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && bgVideo.paused) {
        bgVideo.play().catch(() => {});
      }
    });
  }


  // Mobile Navigation Drawer Toggle
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  if (mobileNavToggle && mobileNavDrawer) {
    mobileNavToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileNavDrawer.classList.toggle('open');
      mobileNavToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (typeof playButtonClickSound === 'function') playButtonClickSound();
    });

    // Close when clicking outside drawer
    document.addEventListener('click', (e) => {
      if (!mobileNavDrawer.contains(e.target) && !mobileNavToggle.contains(e.target)) {
        mobileNavDrawer.classList.remove('open');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close drawer when clicking a link
    mobileNavDrawer.querySelectorAll('a, button').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('open');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
      });
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
  
  const TOTAL_STEPS = 9;
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
    
    setTimeout(() => {
      if (typeof playModalOpenSound === 'function') playModalOpenSound();
    }, 40);

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus input on current step
    setTimeout(() => {
      focusCurrentStepInput();
    }, 180);
  }

  function closeBriefModal() {
    if (!modal || !modal.classList.contains('open')) return;

    if (typeof playModalCloseSound === 'function') playModalCloseSound();

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
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

  function switchStep(targetStep) {
    if (targetStep < 1 || targetStep > TOTAL_STEPS) return;

    if (targetStep !== currentActiveStep) {
      if (typeof playStepChangeSound === 'function') {
        playStepChangeSound(targetStep > currentActiveStep);
      }
      currentActiveStep = targetStep;
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
    if (fsStepIndicator) fsStepIndicator.textContent = `Step ${currentActiveStep} of ${TOTAL_STEPS}`;

    // Update Back & Next/Submit Controls
    if (fsPrevBtn) {
      fsPrevBtn.style.visibility = currentActiveStep === 1 ? 'hidden' : 'visible';
    }

    if (currentActiveStep === TOTAL_STEPS) {
      if (fsNextBtn) fsNextBtn.style.display = 'none';
      if (fsSubmitBtn) fsSubmitBtn.style.display = 'inline-flex';
    } else {
      if (fsNextBtn) fsNextBtn.style.display = 'inline-flex';
      if (fsSubmitBtn) fsSubmitBtn.style.display = 'none';
    }

    // Auto-focus current step input
    setTimeout(focusCurrentStepInput, 100);
  }

  function validateCurrentStep() {
    const activePane = document.querySelector(`.fs-pane[data-step="${currentActiveStep}"]`);
    if (!activePane) return true;

    const requiredFields = activePane.querySelectorAll('input[required], textarea[required]');
    for (const field of requiredFields) {
      if (!field.value || !field.value.trim()) {
        field.focus();
        if (typeof field.reportValidity === 'function') {
          field.reportValidity();
        }
        return false;
      }
    }
    return true;
  }

  function handleAdvance() {
    if (!validateCurrentStep()) return;

    if (currentActiveStep === 1) {
      updateClientNameDisplay();
    }

    if (currentActiveStep < TOTAL_STEPS) {
      switchStep(currentActiveStep + 1);
    }
  }

  if (fsNextBtn) {
    fsNextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (typeof playButtonClickSound === 'function') playButtonClickSound();
      handleAdvance();
    });
  }

  if (fsPrevBtn) {
    fsPrevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (typeof playButtonClickSound === 'function') playButtonClickSound();
      if (currentActiveStep > 1) {
        switchStep(currentActiveStep - 1);
      }
    });
  }

  // Keyboard navigation: Enter key advances
  if (modal) {
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        // If inside textarea, allow standard line breaks unless ctrl/cmd+enter
        if (e.target.tagName && e.target.tagName.toLowerCase() === 'textarea') return;
        
        e.preventDefault();
        if (currentActiveStep === TOTAL_STEPS) {
          if (form) form.requestSubmit();
        } else {
          handleAdvance();
        }
      }
    });
  }

  // Tactile sound feedback and auto-advance on pill chip selections
  const fsChips = document.querySelectorAll('.fs-chip');
  fsChips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (typeof playButtonClickSound === 'function') {
        playButtonClickSound();
      }

      // Smooth auto-advance on chip-choice steps (2, 4, 5, 7, 8)
      if ([2, 4, 5, 7, 8].includes(currentActiveStep)) {
        setTimeout(() => {
          handleAdvance();
        }, 280);
      }
    });
  });

  // Form Submission -> Cognito Forms & WhatsApp
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateCurrentStep()) return;

      const formData = new FormData(form);
      const name = formData.get('client_name') || 'Friend';
      const location = formData.get('location') || 'Nigeria 🇳🇬';
      const businessName = formData.get('business_name') || 'My Business';
      const websiteType = formData.get('website_type') || 'Business website';
      const situation = formData.get('current_situation') || 'I need a new website';
      const goal = formData.get('website_goal') || 'High-converting platform';
      const budget = formData.get('budget') || '₦100,000–₦250,000';
      const timeline = formData.get('timeline') || 'As soon as possible';
      const notes = formData.get('additional_notes') || 'None';

      // 1. Cognito Forms Integration: Dispatch entry data
      const cognitoEndpoint = window.COGNITO_FORM_URL || window.COGNITO_ENDPOINT || '';
      if (cognitoEndpoint) {
        try {
          fetch(cognitoEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ClientName: name,
              Location: location,
              BusinessName: businessName,
              WebsiteType: websiteType,
              CurrentSituation: situation,
              WebsiteGoal: goal,
              EstimatedBudget: budget,
              Timeline: timeline,
              AdditionalNotes: notes,
              SubmittedAt: new Date().toISOString()
            })
          }).catch(err => console.warn('Cognito Form sync note:', err));
        } catch (err) {
          console.warn('Cognito Form sync error:', err);
        }
      }

      // 2. WhatsApp Instant Direct Channel
      const waMessage = 
`*NEW PROJECT INQUIRY — 247KRAFT*
━━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${name}
🌍 *Location:* ${location}
🏢 *Business:* ${businessName}
💻 *Website Type:* ${websiteType}
📍 *Current Situation:* ${situation}
🎯 *Main Goal:* ${goal}
💰 *Estimated Budget:* ${budget}
⏱ *Timeline:* ${timeline}
📝 *Additional Notes:* ${notes}
━━━━━━━━━━━━━━━━━━━━━
_Sent via 247Kraft Client Portal_`;

      const encodedMsg = encodeURIComponent(waMessage);
      const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMsg}`;

      closeBriefModal();
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
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

  // --- B. AUDIO HAPTIC CONTROLLER ---
  function updateSoundUI() {
    if (!soundBtn) return;
    if (isSoundEnabled) {
      soundBtn.classList.remove('muted');
      if (soundTooltip) soundTooltip.textContent = 'Sound ON';
    } else {
      soundBtn.classList.add('muted');
      if (soundTooltip) soundTooltip.textContent = 'Muted';
    }
  }
  updateSoundUI();

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      isSoundEnabled = !isSoundEnabled;
      localStorage.setItem('247kraft_sound', isSoundEnabled ? 'true' : 'false');
      updateSoundUI();
      if (isSoundEnabled) {
        playButtonClickSound();
      }
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
        try { track.setPointerCapture(e.pointerId); } catch (err) {}
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
        try { track.releasePointerCapture(e.pointerId); } catch (err) {}
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
        } catch (e) {}
      });
      btn.addEventListener('mouseleave', () => {
        try {
          motionObj.animate(btn, { scale: 1 }, { duration: 0.2, easing: [0.16, 1, 0.3, 1] });
        } catch (e) {}
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



