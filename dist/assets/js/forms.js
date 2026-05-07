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

  document.querySelectorAll('[data-phone-mask]').forEach((input) => {
    IMask(input, { mask: '+{7} (000) 000-00-00' });
  });

  document.querySelectorAll('[data-file-input]').forEach((input) => {
    const label = input.closest('[data-file-input-label]');
    if (!label) return;
    const text = label.querySelector('[data-file-text]');
    const defaultText = text ? text.textContent : '';

    input.addEventListener('change', () => {
      if (!text) return;
      if (input.files && input.files.length > 0) {
        text.textContent =
          input.files.length === 1 ? input.files[0].name : `${input.files.length} файла`;
      } else {
        text.textContent = defaultText;
      }
    });
  });
});
