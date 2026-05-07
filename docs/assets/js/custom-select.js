const initCustomSelects = () => {
  const closeAll = (except = null) => {
    document.querySelectorAll('[data-custom-select][data-open]').forEach((el) => {
      if (el === except) return;
      el.removeAttribute('data-open');
      el.querySelector('[data-select-trigger]')?.setAttribute('aria-expanded', 'false');
    });
  };

  document.querySelectorAll('[data-custom-select]').forEach((root) => {
    const trigger = root.querySelector('[data-select-trigger]');
    const list = root.querySelector('[data-select-list]');
    const label = root.querySelector('[data-select-label]');
    const native = root.querySelector('select');
    const options = root.querySelectorAll('[data-select-option]');

    const open = () => {
      closeAll(root);
      root.setAttribute('data-open', '');
      trigger.setAttribute('aria-expanded', 'true');
      (list.querySelector('[data-selected]') || options[0])?.focus();
    };

    const close = () => {
      root.removeAttribute('data-open');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
    };

    const choose = (option) => {
      options.forEach((o) => o.removeAttribute('data-selected'));
      option.setAttribute('data-selected', '');
      label.textContent = option.textContent.trim();
      if (native) native.value = option.dataset.value;
      close();
    };

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      root.hasAttribute('data-open') ? close() : open();
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        open();
      }
    });

    options.forEach((option) => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        choose(option);
      });

      option.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          choose(option);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          option.nextElementSibling?.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          option.previousElementSibling?.focus();
        } else if (e.key === 'Escape') {
          close();
        }
      });
    });
  });

  document.addEventListener('click', () => closeAll());
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });
};

initCustomSelects();
