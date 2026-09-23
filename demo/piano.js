/* Created by Erion Nezha — © 2026 All rights reserved */
/* Piano origjinal: Engineer Elhamuddin Taheri (B.Sc Software Engineering, Kabul University)
   Demo e përshtatur: klikim + tastierë */

// tingujt e tastes
const sounds = {};
for (let i = 1; i <= 11; i++) {
    sounds[i] = new Audio('sounds/key' + i + '.mp3');
    sounds[i].preload = 'auto';
}

const whiteKeys = [1, 3, 5, 7, 9, 11];
const keyMap = { a: 1, w: 2, s: 3, e: 4, d: 5, t: 6, f: 7, y: 8, g: 9, u: 10, h: 11 };

function press(n) {
    const el = document.getElementById('k' + n);
    if (!el) return;
    const s = sounds[n];
    s.currentTime = 0;
    s.play().catch(() => {});
    const isWhite = whiteKeys.includes(n);
    el.classList.add(isWhite ? 'active-white' : 'active-black');
}

function release(n) {
    const el = document.getElementById('k' + n);
    if (!el) return;
    el.classList.remove('active-white', 'active-black');
}

for (let i = 1; i <= 11; i++) {
    ((n) => {
        const el = document.getElementById('k' + n);
        el.addEventListener('mousedown', () => press(n));
        el.addEventListener('mouseup', () => release(n));
        el.addEventListener('mouseleave', () => release(n));
        el.addEventListener('touchstart', (e) => { e.preventDefault(); press(n); }, { passive: false });
        el.addEventListener('touchend', () => release(n));
    })(i);
}

document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    const n = keyMap[e.key.toLowerCase()];
    if (n) press(n);
});
document.addEventListener('keyup', (e) => {
    const n = keyMap[e.key.toLowerCase()];
    if (n) release(n);
});
