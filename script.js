'use strict';
const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('.dot')];
const captions = ['01 / TILE & GROUT', '02 / SMALL PLUMBING REPAIRS', '03 / KITCHEN & BATHROOM FIX-UPS', '04 / HOME REPAIR & MAINTENANCE'];
const pauseButton = document.querySelector('#pause-slides');
let current = 0;
let paused = false;
let timer;
function showSlide(index) {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === current);
    slide.setAttribute('aria-hidden', String(i !== current));
    slide.inert = i !== current;
    dots[i].classList.toggle('active', i === current);
    if (i === current) dots[i].setAttribute('aria-current', 'true');
    else dots[i].removeAttribute('aria-current');
  });
  document.querySelector('.photo-caption').textContent = captions[current];
}
function stopTimer() { clearInterval(timer); }
function startTimer() {
  stopTimer();
  if (!paused && !document.hidden) timer = setInterval(() => showSlide(current + 1), 5000);
}
function updatePause() {
  pauseButton.textContent = paused ? '▶' : 'Ⅱ';
  pauseButton.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
  startTimer();
}
document.querySelector('#prev-slide').addEventListener('click', () => { showSlide(current - 1); startTimer(); });
document.querySelector('#next-slide').addEventListener('click', () => { showSlide(current + 1); startTimer(); });
dots.forEach((dot, i) => dot.addEventListener('click', () => { showSlide(i); startTimer(); }));
pauseButton.addEventListener('click', () => { paused = !paused; updatePause(); });
document.addEventListener('visibilitychange', startTimer);
updatePause();
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu() { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menuButton.focus(); } });
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#inquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const notes = `FIX AND FINISH RESTORATION ? REPAIR INQUIRY\n\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nService: ${data.get('service')}\n\nProject details:\n${data.get('details')}\n\nThese notes have not been sent. Contact details are coming soon.\n`;
  const url = URL.createObjectURL(new Blob([notes], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url; link.download = 'fix-and-finish-repair-notes.txt'; document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#form-status').textContent = 'Your repair notes are ready to save. Nothing has been sent.';
});
