'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const wrappers = document.querySelectorAll('[data-custom-input]');

  wrappers.forEach((wrapper) => {
    const input = wrapper.querySelector('input, textarea');
    if (!input) return;

    input.addEventListener('input', () => syncState(wrapper, input));
    input.addEventListener('change', () => syncState(wrapper, input));
  });

  setTimeout(() => {
    wrappers.forEach((wrapper) => {
      const input = wrapper.querySelector('input, textarea');
      if (input) syncState(wrapper, input);
    });
  }, 100);

  function syncState(wrapper, input) {
    if (input.value.length > 0) {
      wrapper.setAttribute('data-active', '');
    } else {
      wrapper.removeAttribute('data-active');
    }
  }
});
