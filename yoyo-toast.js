/*! Yoyo Toast v1.0.0 (https://github.com/smallvi/yoyo_toast) */
const yoyoToast = (function () {
    const yoyoIcons = {
        warning: '<svg class="yoyo-toast-icon;" fill="#D68910" viewBox="0 0 20 20"><path d="M10 0C4.485 0 0 4.485 0 10s4.485 10 10 10 10-4.485 10-10S15.515 0 10 0zM11 15H9v-2h2v2zM11 11H9V5h2v6z"/></svg>',
        danger: '<svg class="yoyo-toast-icon;" fill="Crimson" viewBox="0 0 20 20"><path d="M10 0C4.485 0 0 4.485 0 10s4.485 10 10 10 10-4.485 10-10S15.515 0 10 0zM11 15H9v-2h2v2zM11 11H9V5h2v6z"/></svg>',
        success: '<svg class="yoyo-toast-icon;" fill="MediumSeaGreen" viewBox="0 0 20 20"><path d="M10 0C4.485 0 0 4.485 0 10s4.485 10 10 10 10-4.485 10-10S15.515 0 10 0zM8 15l-5-5 1.5-1.5L8 12.5l7.5-7.5L17 6l-9 9z"/></svg>',
        question: '<svg class="yoyo-toast-icon;" fill="grey" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',
        info: '<svg class="yoyo-toast-icon;" fill="SteelBlue" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>',
    };

    function createYoyoToastContainer(position) {
        const container = document.querySelector(`.yoyo-toast-container.${position}`);
        if (container) return container;

        const newContainer = document.createElement('div');
        newContainer.className = `yoyo-toast-container ${position}`;
        document.body.appendChild(newContainer);
        return newContainer;
    }

    function createYoyoToast(type, title, message, subtext, timeout, position) {
        const container = createYoyoToastContainer(position);

        const yoyoToast = document.createElement('div');
        yoyoToast.className = `yoyo-toast ${type} ${position}`;

        const icon = document.createElement('div');
        icon.className = 'yoyo-toast-icon';
        icon.innerHTML = yoyoIcons[type];

        const content = document.createElement('div');
        content.className = 'yoyo-toast-content';
        content.innerHTML = `<div>${title ? `<div class="yoyo-title">${title}</div>` : ``} <div>${message}</div> ${subtext ? `<div class="yoyo-subtext">${subtext}</div></div>` : ``}`;

        const closeButton = document.createElement('span');
        closeButton.className = 'yoyo-toast-close';
        closeButton.textContent = '×';
        closeButton.onclick = () => closeYoyoToast(yoyoToast, container);

        const progress = document.createElement('div');
        progress.className = 'yoyo-toast-progress';

        yoyoToast.appendChild(icon);
        yoyoToast.appendChild(content);
        yoyoToast.appendChild(closeButton);
        yoyoToast.appendChild(progress);

        container.appendChild(yoyoToast);

        let timeoutId;
        let progressAnimationId;
        let paused = false;

        function startTimeout() {
            timeoutId = setTimeout(() => closeYoyoToast(yoyoToast, container), timeout);
            animateProgress(progress, timeout);
        }

        function stopTimeout() {
            clearTimeout(timeoutId);
            cancelAnimationFrame(progressAnimationId);
            progress.style.display = 'none';
        }

        function animateProgress(progressElement, duration) {
            const startTime = performance.now();

            function step() {
                if (paused) return;

                const currentTime = performance.now();
                const elapsed = currentTime - startTime;
                const progressValue = Math.min(elapsed / duration, 1);
                progressElement.style.width = `${progressValue * 100}%`;

                if (progressValue < 1) {
                    progressAnimationId = requestAnimationFrame(step);
                }
            }

            progressAnimationId = requestAnimationFrame(step);
        }

        yoyoToast.addEventListener('mouseover', () => {
            paused = true;
            stopTimeout();
        });

        yoyoToast.addEventListener('mouseout', () => {
            paused = true;
        });

        setTimeout(() => {
            yoyoToast.classList.add('show');
            if (timeout > 0) {
                startTimeout();
            }
        }, 10);

        return yoyoToast;
    }

    function closeYoyoToast(yoyoToast, container) {
        yoyoToast.classList.remove('show');
        yoyoToast.classList.add('hide');
        setTimeout(() => {
            container.removeChild(yoyoToast);
            if (container.children.length === 0) {
                document.body.removeChild(container);
            }
        }, 500);
    }

    return {
        fire: function ({ type = 'info', title, message, subtext, timeout = 5000, position = 'top-right' } = {}) {
            return createYoyoToast(type, title, message, subtext, timeout, position);
        }
    };
})();