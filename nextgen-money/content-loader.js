// Loads content.json and populates elements with data-key attributes
fetch('/data/content.json')
  .then(r => r.json())
  .then(data => {
    document.querySelectorAll('[data-key]').forEach(el => {
      const val = el.dataset.key.split('.').reduce((o, k) => o?.[k], data);
      if (val !== undefined) el.innerHTML = val;
    });
  })
  .catch(() => {}); // silently fail — static text already in HTML as fallback
