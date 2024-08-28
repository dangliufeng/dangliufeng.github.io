// 检查并应用初始主题
(function() {
    const isDark = localStorage.getItem('isDark');
    if (isDark === '1') {
        activateDarkMode();
        document.querySelector('body').classList.add('DarkMode');
        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon'); // 设置为月亮图标
    } else {
        activateLightMode();
        document.querySelector('body').classList.remove('DarkMode');
        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun'); // 设置为太阳图标
    }
})();

function activateLightMode() {
    document.documentElement.setAttribute('data-theme', 'light');
}

function activateDarkMode() {
    document.documentElement.setAttribute('data-theme', 'dark');
}

function switchNightMode() {
    document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>');

    setTimeout(function() {
        if (document.querySelector('body').classList.contains('DarkMode')) {
            activateLightMode();
            document.querySelector('body').classList.remove('DarkMode');
            localStorage.setItem('isDark', '0');
            document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun'); // 设置为太阳图标
        } else {
            activateDarkMode();
            document.querySelector('body').classList.add('DarkMode');
            localStorage.setItem('isDark', '1');
            document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon'); // 设置为月亮图标
        }

        setTimeout(function() {
            document.getElementsByClassName('Cuteen_DarkSky')[0].style.transition = 'opacity 3s';
            document.getElementsByClassName('Cuteen_DarkSky')[0].style.opacity = '0';
            setTimeout(function() {
                document.getElementsByClassName('Cuteen_DarkSky')[0].remove();
            }, 1000);
        }, 2000);
    });

    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    if (nowMode === 'light') {
        activateDarkMode();
        saveToLocal.set('theme', 'dark', 2);
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon'); // 设置为月亮图标
    } else {
        activateLightMode();
        saveToLocal.set('theme', 'light', 2);
        document.querySelector('body').classList.add('DarkMode');
        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun'); // 设置为太阳图标
    }

    // 处理一些特殊情况
    typeof utterancesTheme === 'function' && utterancesTheme();
    typeof FB === 'object' && window.loadFBComment();
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200);
}
