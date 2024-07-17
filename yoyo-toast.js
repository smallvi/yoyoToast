/*! Yoyo Toast v1.0.0 (https://github.com/smallvi/yoyo_toast) */
const yoyoToast = (function() {
    const icons = {
      success: '✓',
      warning: '⚠',
      danger: '✗',
      info: 'ℹ',
      question: '?'
    };
  
    function createToastContainer(position) {
      const container = document.querySelector(`.yoyo-toast-container.${position}`);
      if (container) return container;
  
      const newContainer = document.createElement('div');
      newContainer.className = `yoyo-toast-container ${position}`;
      document.body.appendChild(newContainer);
      return newContainer;
    }
  
    function createToast(type, message, timeout, position) {
      const container = createToastContainer(position);
      
      const toast = document.createElement('div');
      toast.className = `yoyo-toast ${type}`;
      
      const icon = document.createElement('span');
      icon.className = 'yoyo-toast-icon';
      icon.textContent = icons[type];
      
      const content = document.createElement('span');
      content.className = 'yoyo-toast-content';
      content.textContent = message;
      
      const closeButton = document.createElement('span');
      closeButton.className = 'yoyo-toast-close';
      closeButton.textContent = '×';
      closeButton.onclick = () => closeToast(toast, container);
      
      const progress = document.createElement('div');
      progress.className = 'yoyo-toast-progress';
      
      toast.appendChild(icon);
      toast.appendChild(content);
      toast.appendChild(closeButton);
      toast.appendChild(progress);
      
      container.appendChild(toast);
      
      setTimeout(() => {
        toast.classList.add('show');
        if (timeout > 0) {
          animateProgress(progress, timeout);
          setTimeout(() => closeToast(toast, container), timeout);
        }
      }, 10);
  
      return toast;
    }
  
    function closeToast(toast, container) {
      toast.classList.remove('show');
      setTimeout(() => {
        container.removeChild(toast);
        if (container.children.length === 0) {
          document.body.removeChild(container);
        }
      }, 300);
    }
  
    function animateProgress(progressElement, duration) {
      const startTime = performance.now();
      
      function step() {
        const currentTime = performance.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        progressElement.style.width = `${progress * 100}%`;
        
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }
      
      requestAnimationFrame(step);
    }
  
    return {
      fire: function({ type = 'info', message, timeout = 5000, position = 'top-right' } = {}) {
        return createToast(type, message, timeout, position);
      }
    };
  })();
  
