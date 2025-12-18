import { loginHandler } from "./login.js";
import { signupHandler } from "./signup.js";

(function () {
  const $ = (sel) => document.querySelector(sel);
  const USERS_KEY = 'users_map';
  const CURRENT_KEY = 'currentUser';
  
  function setCurrent(email) {
    if (email) localStorage.setItem(CURRENT_KEY, email);
    else localStorage.removeItem(CURRENT_KEY);
    updateNav();
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

  // check if user is signed in, then display the correct buttons
  document.addEventListener('DOMContentLoaded', function () {
    updateNav();
    const signupForm = $('#signup-form');
    if (signupForm) signupForm.addEventListener('submit', signupHandler);
    const loginForm = $('#login-form');
    if (loginForm) loginForm.addEventListener('submit', loginHandler);
  });
})();
