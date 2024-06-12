let currentPath = null;

export function navigateTo(path) {
    if (currentPath === path) {
        return;
    }
    currentPath = path

    window.history.pushState({}, '', path);
    const navigationEvent = new CustomEvent('navigation');
    window.dispatchEvent(navigationEvent);
}