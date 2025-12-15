(function () {
  const $ = (sel) => document.querySelector(sel);
  const USERS_KEY = 'users_map';
  const CURRENT_KEY = 'currentUser';

  function loadUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || '{}'); }
    catch (e) { return {}; }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function setCurrent(email) {
    if (email) localStorage.setItem(CURRENT_KEY, email);
    else localStorage.removeItem(CURRENT_KEY);
    updateNav();
  }

  function signupHandler(evt) {
    evt.preventDefault();
    const nameEl = $('#signup-name');
    const emailEl = $('#signup-email');
    const passEl = $('#signup-password');
    const name = nameEl && nameEl.value.trim();
    const email = emailEl && emailEl.value.trim().toLowerCase();
    const pass = passEl && passEl.value;
    if (!name || !email || !pass || pass.length < 6) {
      return alert('Please fill name, email and a password (min 6 chars).');
    }
    const users = loadUsers();
    if (users[email]) return alert('Account already exists for that email.');
    users[email] = { name: name, password: btoa(pass) };
    saveUsers(users);
    setCurrent(email);
    // redirect to next if provided
    const params = new URLSearchParams(window.location.search);
    const next = params.get('next') || localStorage.getItem('returnTo');
    if (next) {
      localStorage.removeItem('returnTo');
      window.location.href = decodeURIComponent(next);
    } else {
      window.location.href = 'index.html';
    }
  }

  function loginHandler(evt) {
    evt.preventDefault();
    const emailEl = $('#login-email');
    const passEl = $('#login-password');
    const email = emailEl && emailEl.value.trim().toLowerCase();
    const pass = passEl && passEl.value;
    if (!email || !pass) return alert('Please enter email and password.');
    const users = loadUsers();
    const user = users[email];
    if (!user || user.password !== btoa(pass)) return alert('Invalid email or password.');
    setCurrent(email);
    // after login redirect to next if present
    const params = new URLSearchParams(window.location.search);
    const next = params.get('next') || localStorage.getItem('returnTo');
    if (next) {
      localStorage.removeItem('returnTo');
      window.location.href = decodeURIComponent(next);
    } else {
      window.location.href = 'index.html';
    }
  }

  function logout() {
    setCurrent(null);
    window.location.href = 'index.html';
  }

  function updateNav() {
    const current = localStorage.getItem(CURRENT_KEY);
    const signup = $('#nav-signup');
    const login = $('#nav-login');
    const logoutEl = $('#nav-logout');
    if (signup) signup.classList.toggle('hidden', !!current);
    if (login) login.classList.toggle('hidden', !!current);
    if (logoutEl) logoutEl.classList.toggle('hidden', !current);
    // footer auth link
    const footerAuth = $('#footer-auth-link');
    if (footerAuth) {
      if (current) {
        footerAuth.textContent = 'Log out';
        footerAuth.href = 'javascript:void(0);';
        footerAuth.onclick = function (e) { e.preventDefault(); logout(); };
      } else {
        footerAuth.textContent = 'Log in';
        footerAuth.href = 'login.html';
        footerAuth.onclick = null;
      }
    }
  }

  window.logout = logout;

  document.addEventListener('DOMContentLoaded', function () {
    updateNav();
    const signupForm = $('#signup-form');
    if (signupForm) signupForm.addEventListener('submit', signupHandler);
    const loginForm = $('#login-form');
    if (loginForm) loginForm.addEventListener('submit', loginHandler);
    // Intercept actions that require authentication
    const checkoutBtn = $('#checkout-button');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', function (e) {
        const current = localStorage.getItem(CURRENT_KEY);
        if (!current) {
          // remember target and redirect to login
          const ret = window.location.pathname + window.location.search + window.location.hash;
          localStorage.setItem('returnTo', ret);
          window.location.href = 'login.html?next=' + encodeURIComponent(ret);
        }
      });
    }
    const addToCart = $('#add-to-cart-btn');
    if (addToCart) {
      addToCart.addEventListener('click', function (e) {
        const current = localStorage.getItem(CURRENT_KEY);
        if (!current) {
          e.preventDefault();
          const ret = window.location.pathname + window.location.search + window.location.hash;
          localStorage.setItem('returnTo', ret);
          window.location.href = 'login.html?next=' + encodeURIComponent(ret);
        }
      });
    }
  });
})();
