/**
 * NexusAuth Client-Side Application Logic
 * Implements Direct Sign Up / Sign In Tabs, Salted Bcrypt Authentication, and Session State
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const views = {
    signin: document.getElementById('signin-view'),
    signup: document.getElementById('signup-view'),
    dashboard: document.getElementById('dashboard-view')
  };

  const tabsContainer = document.getElementById('auth-tabs-container');
  const tabBtnSignin = document.getElementById('tab-btn-signin');
  const tabBtnSignup = document.getElementById('tab-btn-signup');
  const toastContainer = document.getElementById('toast-container');

  // Update Footer Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ==========================================
  // 1. TAB & VIEW SWITCHER
  // ==========================================
  function showView(viewName) {
    Object.keys(views).forEach(key => {
      if (views[key]) {
        views[key].classList.remove('active');
      }
    });

    if (views[viewName]) {
      views[viewName].classList.add('active');
    }

    if (viewName === 'dashboard') {
      if (tabsContainer) tabsContainer.style.display = 'none';
    } else {
      if (tabsContainer) tabsContainer.style.display = 'flex';
      
      // Update Tab button active styles
      if (viewName === 'signin') {
        tabBtnSignin?.classList.add('active');
        tabBtnSignup?.classList.remove('active');
        document.getElementById('signin-email')?.focus();
      } else if (viewName === 'signup') {
        tabBtnSignup?.classList.add('active');
        tabBtnSignin?.classList.remove('active');
        document.getElementById('signup-name')?.focus();
      }
    }
  }

  // Tab button click listeners
  tabBtnSignin?.addEventListener('click', () => showView('signin'));
  tabBtnSignup?.addEventListener('click', () => showView('signup'));

  // Card footer link click listeners
  document.getElementById('go-to-signup')?.addEventListener('click', () => showView('signup'));
  document.getElementById('go-to-signin')?.addEventListener('click', () => showView('signin'));

  // ==========================================
  // 2. TOAST NOTIFICATIONS
  // ==========================================
  function showToast(type, title, message) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconClass = 'fa-solid fa-circle-info';
    if (type === 'success') iconClass = 'fa-solid fa-circle-check';
    if (type === 'error') iconClass = 'fa-solid fa-circle-xmark';

    toast.innerHTML = `
      <i class="${iconClass} toast-icon"></i>
      <div class="toast-content">
        <div class="toast-title">${escapeHtml(title)}</div>
        <div class="toast-message">${escapeHtml(message)}</div>
      </div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(40px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4200);
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m]);
  }

  // ==========================================
  // 3. PASSWORD VISIBILITY TOGGLES
  // ==========================================
  setupPasswordToggle('signin-password', 'toggle-signin-pwd', 'signin-pwd-icon');
  setupPasswordToggle('signup-password', 'toggle-signup-pwd', 'signup-pwd-icon');

  function setupPasswordToggle(inputId, toggleBtnId, iconId) {
    const input = document.getElementById(inputId);
    const btn = document.getElementById(toggleBtnId);
    const icon = document.getElementById(iconId);

    if (!input || !btn || !icon) return;

    btn.addEventListener('click', () => {
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      icon.className = isPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
    });
  }

  // ==========================================
  // 4. DYNAMIC PASSWORD STRENGTH METER
  // ==========================================
  const signupPasswordInput = document.getElementById('signup-password');
  const strengthFill = document.getElementById('strength-fill');
  const strengthScore = document.getElementById('strength-score');

  if (signupPasswordInput && strengthFill && strengthScore) {
    signupPasswordInput.addEventListener('input', (e) => {
      const val = e.target.value;
      if (!val) {
        strengthFill.style.width = '0%';
        strengthScore.textContent = '';
        return;
      }

      let score = 0;
      if (val.length >= 6) score++;
      if (val.length >= 10) score++;
      if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;

      if (score <= 2) {
        strengthFill.style.width = '33%';
        strengthFill.style.backgroundColor = '#f43f5e';
        strengthScore.textContent = 'Weak';
        strengthScore.style.color = '#f87171';
      } else if (score <= 4) {
        strengthFill.style.width = '66%';
        strengthFill.style.backgroundColor = '#f59e0b';
        strengthScore.textContent = 'Medium';
        strengthScore.style.color = '#fbbf24';
      } else {
        strengthFill.style.width = '100%';
        strengthFill.style.backgroundColor = '#10b981';
        strengthScore.textContent = 'Strong ✓';
        strengthScore.style.color = '#34d399';
      }
    });
  }

  // ==========================================
  // 5. SIGN UP FORM SUBMISSION
  // ==========================================
  const signupForm = document.getElementById('signup-form');
  const signupBtn = document.getElementById('btn-signup-submit');

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('signup-name')?.value.trim();
      const email = document.getElementById('signup-email')?.value.trim();
      const password = document.getElementById('signup-password')?.value;

      if (!email || !password) {
        showToast('error', 'Missing Fields', 'Please enter your email and a password.');
        return;
      }

      if (password.length < 6) {
        showToast('error', 'Weak Password', 'Password must be at least 6 characters.');
        return;
      }

      signupBtn.disabled = true;
      signupBtn.classList.add('loading');

      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Store token
          if (data.token) {
            localStorage.setItem('nexus_auth_token', data.token);
          }

          // Trigger Flower Shower Celebration!
          if (window.celebrationEngine) {
            window.celebrationEngine.startCelebration(5000);
          }

          showToast('success', 'Account Created! 🎉', 'Welcome aboard! Entering dashboard.');
          populateDashboard(data.user);

          setTimeout(() => {
            showView('dashboard');
          }, 500);

        } else if (data.alreadyRegistered) {
          // If already signed up once, guide them to Sign In with their password
          showToast('info', 'Already Registered ℹ️', data.message);
          
          // Switch to sign in and prefill email
          const signinEmailInput = document.getElementById('signin-email');
          if (signinEmailInput) signinEmailInput.value = email;
          
          showView('signin');
          document.getElementById('signin-password')?.focus();

        } else {
          showToast('error', 'Sign Up Failed', data.message || 'Could not register account.');
        }
      } catch (err) {
        showToast('error', 'Connection Error', 'Failed to reach server. Please check your connection.');
      } finally {
        signupBtn.disabled = false;
        signupBtn.classList.remove('loading');
      }
    });
  }

  // ==========================================
  // 6. SIGN IN FORM SUBMISSION
  // ==========================================
  const signinForm = document.getElementById('signin-form');
  const signinBtn = document.getElementById('btn-signin-submit');

  if (signinForm) {
    signinForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('signin-email')?.value.trim();
      const password = document.getElementById('signin-password')?.value;

      if (!email || !password) {
        showToast('error', 'Missing Input', 'Please enter your email and password.');
        return;
      }

      signinBtn.disabled = true;
      signinBtn.classList.add('loading');

      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          if (data.token) {
            localStorage.setItem('nexus_auth_token', data.token);
          }

          // Trigger Flower Shower Celebration!
          if (window.celebrationEngine) {
            window.celebrationEngine.startCelebration(4000);
          }

          showToast('success', 'Welcome Back! 👋', 'Signed in successfully.');
          populateDashboard(data.user);

          setTimeout(() => {
            showView('dashboard');
          }, 400);

        } else if (data.notRegistered) {
          showToast('error', 'Account Not Found', data.message);
          
          // Switch to sign up tab and prefill email
          const signupEmailInput = document.getElementById('signup-email');
          if (signupEmailInput) signupEmailInput.value = email;
          
          showView('signup');
          document.getElementById('signup-password')?.focus();

        } else {
          showToast('error', 'Authentication Failed', data.message || 'Invalid email or password.');
        }
      } catch (err) {
        showToast('error', 'Connection Error', 'Failed to connect to authentication server.');
      } finally {
        signinBtn.disabled = false;
        signinBtn.classList.remove('loading');
      }
    });
  }

  // ==========================================
  // 7. DASHBOARD & SESSION OPERATIONS
  // ==========================================
  function populateDashboard(user) {
    if (!user) return;

    const name = user.name || (user.email ? user.email.split('@')[0] : 'User');
    const initial = name.charAt(0).toUpperCase();

    const nameEl = document.getElementById('dash-user-name');
    const initialEl = document.getElementById('dash-user-initial');
    const emailEl = document.getElementById('dash-user-email');
    const detailsEmailEl = document.getElementById('dash-details-email');
    const idEl = document.getElementById('dash-user-id');
    const createdEl = document.getElementById('dash-created-at');

    if (nameEl) nameEl.textContent = name;
    if (initialEl) initialEl.textContent = initial;
    if (emailEl) emailEl.textContent = user.email;
    if (detailsEmailEl) detailsEmailEl.textContent = user.email;
    if (idEl) idEl.textContent = user.id || 'usr_secure';
    if (createdEl) {
      createdEl.textContent = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Active Now';
    }
  }

  // Logout Action
  document.getElementById('btn-logout')?.addEventListener('click', () => {
    localStorage.removeItem('nexus_auth_token');
    
    // Clear forms
    signupForm?.reset();
    signinForm?.reset();

    showToast('info', 'Signed Out', 'You have been safely signed out.');
    showView('signin');
  });

  // Refresh Profile Action
  document.getElementById('btn-refresh-profile')?.addEventListener('click', async () => {
    const token = localStorage.getItem('nexus_auth_token');
    if (!token) {
      showToast('error', 'Session Expired', 'Please sign in again.');
      showView('signin');
      return;
    }

    try {
      const response = await fetch('/api/user/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok && data.success) {
        populateDashboard(data.user);
        showToast('success', 'Profile Updated', 'Loaded latest account status.');
      } else {
        showToast('error', 'Session Invalid', 'Please sign in again.');
        showView('signin');
      }
    } catch {
      showToast('error', 'Error', 'Could not refresh profile.');
    }
  });

  // Check existing session on load
  const existingToken = localStorage.getItem('nexus_auth_token');
  if (existingToken) {
    fetch('/api/user/profile', {
      headers: { 'Authorization': `Bearer ${existingToken}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user) {
          populateDashboard(data.user);
          showView('dashboard');
        } else {
          localStorage.removeItem('nexus_auth_token');
          showView('signin');
        }
      })
      .catch(() => {
        showView('signin');
      });
  } else {
    showView('signin');
  }

});
