(() => {
  'use strict';
  let dataPromise;
  const ownScript = document.currentScript;
  const dataUrl = new URL('contact-data.js', ownScript.src).href;
  const sectionNames = { email: 'e-mail', phone: 'telefon', accounts: 'bankovní spojení' };
  const status = document.getElementById('contact-status');

  function loadData() {
    if (!dataPromise) {
      dataPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = dataUrl;
        script.onload = () => {
          try {
            const bytes = Uint8Array.from(atob(window.__jpContactData), c => c.charCodeAt(0));
            resolve(JSON.parse(new TextDecoder().decode(bytes)));
            delete window.__jpContactData;
            script.remove();
          } catch (error) { dataPromise = undefined; script.remove(); reject(error); }
        };
        script.onerror = () => { dataPromise = undefined; script.remove(); reject(new Error('Data unavailable')); };
        document.head.append(script);
      });
    }
    return dataPromise;
  }

  function node(tag, text, className) {
    const element = document.createElement(tag);
    if (text) element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  function render(section, data, panel) {
    if (section === 'email' || section === 'phone') {
      const link = node('a', data[section].label);
      link.href = data[section].href;
      panel.append(link);
      return;
    }
    const list = node('ul', '', 'account-list');
    data.accounts.forEach(account => {
      const item = node('li', '', 'account');
      const name = node('div', '', 'account-name');
      name.append(node('strong', account.bank), node('span', account.currency, 'currency'));
      const fields = node('dl', '', 'account-data');
      [['IBAN', account.iban], ['BIC', account.bic]].forEach(([label, value]) => {
        const row = node('div');
        row.append(node('dt', label), node('dd', value));
        fields.append(row);
      });
      item.append(name, fields);
      list.append(item);
    });
    panel.append(list, node('p', data.owner, 'account-owner'));
  }

  document.querySelectorAll('[data-section]').forEach(button => {
    button.addEventListener('click', async () => {
      const section = button.dataset.section;
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      if (button.getAttribute('aria-expanded') === 'true') {
        panel.hidden = true;
        panel.replaceChildren();
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', `Zobrazit ${sectionNames[section]}`);
        button.replaceChildren(document.createTextNode('Zobrazit '), node('span', '+'));
        button.lastElementChild.setAttribute('aria-hidden', 'true');
        return;
      }
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      status.textContent = '';
      try {
        const data = await loadData();
        render(section, data, panel);
        panel.hidden = false;
        button.setAttribute('aria-expanded', 'true');
        button.setAttribute('aria-label', `Skrýt ${sectionNames[section]}`);
        button.replaceChildren(document.createTextNode('Skrýt '), node('span', '−'));
        button.lastElementChild.setAttribute('aria-hidden', 'true');
      } catch {
        status.textContent = 'Údaje se nepodařilo načíst. Zkuste prosím tlačítko znovu.';
      } finally {
        button.disabled = false;
        button.removeAttribute('aria-busy');
      }
    });
  });
})();
