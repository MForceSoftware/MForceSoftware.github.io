(function () {
  const flashClassName = 'meeting-timer-warning-flash';
  const styleId = 'meeting-timer-warning-style';

  function ensureFlashStyle() {
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      body.${flashClassName}::before {
        content: '';
        position: fixed;
        inset: 0;
        background: rgba(248, 113, 113, 0.2);
        pointer-events: none;
        z-index: 2147483647;
        animation: meeting-timer-warning-pulse 0.35s ease-in-out 0s 6 alternate;
      }

      @keyframes meeting-timer-warning-pulse {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `;

    document.head.appendChild(style);
  }

  function beep(minutesRemaining) {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) {
      return;
    }

    const context = new AudioContextCtor();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = minutesRemaining <= 2 ? 1046.5 : 880;

    gainNode.gain.setValueAtTime(0.0001, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.2, context.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.35);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.36);
    oscillator.onended = () => {
      context.close().catch(() => {});
    };
  }

  function flash() {
    ensureFlashStyle();
    document.body.classList.remove(flashClassName);
    // Force reflow so repeated warnings retrigger the animation.
    void document.body.offsetHeight;
    document.body.classList.add(flashClassName);
    window.setTimeout(() => {
      document.body.classList.remove(flashClassName);
    }, 2400);
  }

  window.meetingTimerAlert = {
    warn: function (minutesRemaining) {
      beep(minutesRemaining);
      flash();
    }
  };
})();
