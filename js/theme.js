(function () {
    const storageKey = 'cv-builder-theme';
    const root = document.documentElement;
    const toggleButtons = document.querySelectorAll('[data-theme-toggle]');

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        root.dataset.theme = isDark ? 'dark' : 'light';

        toggleButtons.forEach((button) => {
            const icon = button.querySelector('i');
            const label = button.querySelector('span');
            button.setAttribute('aria-pressed', String(isDark));
            button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');

            if (icon) {
                icon.classList.toggle('fa-moon', !isDark);
                icon.classList.toggle('fa-sun', isDark);
            }

            if (label) {
                label.textContent = isDark ? 'Light mode' : 'Dark mode';
            }
        });
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem(storageKey, theme);
        } catch (error) {
            console.warn('Could not save the selected theme:', error);
        }
    }

    applyTheme(root.dataset.theme);

    toggleButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
            saveTheme(nextTheme);
        });
    });

    window.addEventListener('storage', (event) => {
        if (event.key === storageKey && (event.newValue === 'light' || event.newValue === 'dark')) {
            applyTheme(event.newValue);
        }
    });
}());
