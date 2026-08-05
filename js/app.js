// Main Application Entry Point & Router

import { store } from './state.js';
import { renderDashboard, bindDashboardEvents } from './components/dashboard.js';
import { renderStudents, bindStudentsEvents, openStudentModal } from './components/students.js';
import { renderCourses, bindCoursesEvents } from './components/courses.js';
import { renderAttendance, bindAttendanceEvents } from './components/attendance.js';
import { renderGrades, bindGradesEvents } from './components/grades.js';
import { renderFees, bindFeesEvents } from './components/fees.js';
import { renderAnalytics, bindAnalyticsEvents } from './components/analytics.js';
import { showToast } from './utils/toast.js';

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    const viewContainer = document.getElementById('view-container');
    const studentCountBadge = document.getElementById('student-count-badge');
    const globalSearchInput = document.getElementById('global-search-input');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
    const sidebar = document.querySelector('.sidebar');
    const mainWrapper = document.querySelector('.main-wrapper');

    // Render active view
    function updateUI() {
        if (studentCountBadge) {
            studentCountBadge.textContent = store.students.length;
        }

        const currentView = store.currentView;

        // Update nav active states
        document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
            if (item.getAttribute('data-view') === currentView) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Render HTML content for active view
        let viewHTML = '';
        if (currentView === 'dashboard') viewHTML = renderDashboard();
        else if (currentView === 'students') viewHTML = renderStudents();
        else if (currentView === 'courses') viewHTML = renderCourses();
        else if (currentView === 'attendance') viewHTML = renderAttendance();
        else if (currentView === 'grades') viewHTML = renderGrades();
        else if (currentView === 'fees') viewHTML = renderFees();
        else if (currentView === 'analytics') viewHTML = renderAnalytics();

        viewContainer.innerHTML = viewHTML;

        // Bind view specific events
        if (currentView === 'dashboard') bindDashboardEvents(viewContainer);
        else if (currentView === 'students') bindStudentsEvents(viewContainer);
        else if (currentView === 'courses') bindCoursesEvents(viewContainer);
        else if (currentView === 'attendance') bindAttendanceEvents(viewContainer);
        else if (currentView === 'grades') bindGradesEvents(viewContainer);
        else if (currentView === 'fees') bindFeesEvents(viewContainer);
        else if (currentView === 'analytics') bindAnalyticsEvents(viewContainer);
    }

    // Subscribe to store updates
    store.subscribe(() => {
        updateUI();
    });

    // Initial render
    updateUI();

    // Sidebar Navigation Click Handlers
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const view = item.getAttribute('data-view');
            if (view) store.setView(view);
        });
    });

    // Global Search Bar Handler
    if (globalSearchInput) {
        globalSearchInput.addEventListener('input', (e) => {
            store.setSearchQuery(e.target.value);
            if (store.currentView !== 'students' && e.target.value.trim() !== '') {
                store.setView('students');
            }
        });

        // Press '/' keyboard shortcut to focus search bar
        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && document.activeElement !== globalSearchInput) {
                e.preventDefault();
                globalSearchInput.focus();
            }
        });
    }

    // Sidebar Toggle
    if (toggleSidebarBtn && sidebar && mainWrapper) {
        toggleSidebarBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            mainWrapper.classList.toggle('expanded');
        });
    }

    // Theme Toggle Handler
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            themeToggleBtn.innerHTML = newTheme === 'dark' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
            showToast(`Switched to ${newTheme} theme`, 'info');
        });
    }

    // Global Add Student Button
    const globalAddBtn = document.getElementById('global-add-student-btn');
    if (globalAddBtn) {
        globalAddBtn.addEventListener('click', () => openStudentModal());
    }

    // Export Data & Reset Data Buttons
    const exportBtn = document.getElementById('export-data-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            store.exportJSON();
            showToast('System data backup exported successfully!', 'success');
        });
    }

    const resetBtn = document.getElementById('reset-data-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all data back to original demo values?')) {
                store.resetToDemoData();
                showToast('Reset data to default demo state.', 'warning');
            }
        });
    }

    // Live Digital Clock
    const clockElement = document.getElementById('live-clock');
    if (clockElement) {
        const updateClock = () => {
            const now = new Date();
            clockElement.textContent = now.toLocaleTimeString();
        };
        updateClock();
        setInterval(updateClock, 1000);
    }
}
