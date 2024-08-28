// Function to load an external script dynamically
function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    document.head.appendChild(script);
}

// Function to detect the browser
function getBrowserInfo() {
    const userAgent = navigator.userAgent;

    // Detecting the browser
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg') && !userAgent.includes('OPR')) {
        return 'Chrome';
    }
    if (userAgent.includes('Firefox')) {
        return 'Firefox';
    }
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        return 'Safari';
    }
    if (userAgent.includes('Edge')) {
        return 'Edge';
    }
    if (userAgent.includes('Trident') || userAgent.includes('MSIE')) {
        return 'Internet Explorer';
    }
    if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
        return 'Opera';
    }
    if (userAgent.includes('Android')) {
        return 'Android Browser';
    }
    if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
        return 'iOS Safari';
    }
    if (userAgent.includes('Nokia') || userAgent.includes('Mobile')) {
        return 'Mobile Browser';
    }

    return 'Unknown Browser'; // Fallback for unknown browsers
}

// Function to load SweetAlert2 and initialize the welcome alert
function initializeWelcome() {
    // Check if SweetAlert2 is already loaded
    if (typeof Swal === 'undefined') {
        loadScript('https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js', () => {
            showWelcomeAlert();
        });
    } else {
        showWelcomeAlert();
    }
}

// Function to show the SweetAlert2 popup
function showWelcomeAlert() {
    const browser = getBrowserInfo();
    let welcome_text = `欢迎来自 ${browser} 的用户！`;

    if (document.referrer !== '') {
        let referrer = new URL(document.referrer).hostname;
        welcome_text = `欢迎来自 ${referrer.toUpperCase()} 的 ${browser} 用户！`;
        if (referrer.toUpperCase() === window.location.hostname.toUpperCase()) return;
    }

    // SweetAlert2 with the avatar at the top
    Swal.fire({
        title: '欢迎！',
        html: `<div class="swal2-content">
                    <img src="/img/avatar/avatar.jpg" class="swal2-circular-image">
                    <div class="swal2-text">${welcome_text}<br>打开页面下方音乐以获得更佳体验！</div>
               </div>`,
        timer: 3000,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        background: '#fff',
        customClass: {
            content: 'swal2-content',
            text: 'swal2-text',
            image: 'swal2-circular-image'
        }
    });
}

// Apply custom CSS for compact layout and circular image
function applyCustomCSS() {
    const style = document.createElement('style');
    style.innerHTML = `
        .swal2-circular-image {
            border-radius: 50%; /* Makes the image circular */
            width: 100px; /* Adjust the size as needed */
            height: 100px; /* Adjust the size as needed */
            display: block;
            margin: 0 auto; /* Center the image */
        }
        .swal2-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
        .swal2-text {
            margin-top: 15px; /* Adjust spacing between image and text */
        }
    `;
    document.head.appendChild(style);
}

// Apply custom CSS and initialize welcome alert when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    applyCustomCSS();
    initializeWelcome();
});
