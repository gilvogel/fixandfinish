document.addEventListener('DOMContentLoaded', () => {
  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const button = form.querySelector('button');
      const original = button.textContent;
      button.textContent = 'Request Sent';
      button.disabled = true;

      setTimeout(() => {
        button.textContent = original;
        button.disabled = false;
        form.reset();
      }, 2000);
    });
  }
});
