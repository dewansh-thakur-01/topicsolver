// Dashboard View Component

import { store } from '../state.js';
import { calculateGPA, formatCurrency, getGPABadgeClass, getAttendanceBadgeClass, getStudentAvatar } from '../utils/helpers.js';
import { openStudentModal } from './students.js';
import { openStudentDetailModal } from './studentDetail.js';

export function renderDashboard() {
    const students = store.students;
    const courses = store.courses;

    // Calculate system stats
    const totalStudents = students.length;
    const activeStudents = students.filter(s => s.status === 'Active').length;
    const activeCourses = courses.length;

    // Average GPA
    const gpas = students.map(s => parseFloat(calculateGPA(s.grades)));
    const avgGPA = gpas.length ? (gpas.reduce((a, b) => a + b, 0) / gpas.length).toFixed(2) : '0.00';

    // Average Attendance
    const avgAttendance = students.length ? Math.round(students.reduce((acc, s) => acc + (s.attendanceRate || 90), 0) / students.length) : 0;

    // Pending Fees
    const totalPendingFees = students.reduce((acc, s) => acc + (s.tuitionFee - (s.paidFee || 0)), 0);

    // High risk students (GPA < 2.2 or Attendance < 75%)
    const riskStudents = students.filter(s => {
        const gpa = parseFloat(calculateGPA(s.grades));
        return gpa < 2.2 || s.attendanceRate < 75;
    });

    // Grade Distribution counts
    let gradeCounts = { A: 0, B: 0, C: 0, D: 0, F: 0 };
    students.forEach(s => {
        const gpa = parseFloat(calculateGPA(s.grades));
        if (gpa >= 3.5) gradeCounts.A++;
        else if (gpa >= 2.8) gradeCounts.B++;
        else if (gpa >= 2.0) gradeCounts.C++;
        else if (gpa >= 1.0) gradeCounts.D++;
        else gradeCounts.F++;
    });

    return `
        <!-- Welcome Hero Banner -->
        <div class="glass-card welcome-hero" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.15)); border-color: rgba(99, 102, 241, 0.4);">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
                <div>
                    <h2 style="font-size: 24px; margin-bottom: 6px;">Welcome Back, Academic Director 👋</h2>
                    <p style="color: var(--text-secondary); font-size: 13px;">Here is the real-time overview of academic performance, attendance, and campus finances.</p>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="btn btn-primary" id="dash-add-student-btn">
                        <i class="fa-solid fa-plus"></i> Enroll New Student
                    </button>
                    <button class="btn btn-secondary" id="dash-attendance-btn">
                        <i class="fa-solid fa-calendar-check"></i> Mark Attendance
                    </button>
                </div>
            </div>
        </div>

        <!-- Metrics KPI Cards -->
        <div class="metrics-grid">
            <div class="glass-card metric-card">
                <div class="metric-icon" style="background: rgba(99, 102, 241, 0.15); color: var(--primary);">
                    <i class="fa-solid fa-user-graduate"></i>
                </div>
                <div class="metric-info">
                    <span class="metric-label">Total Enrolled Students</span>
                    <span class="metric-value">${totalStudents}</span>
                    <span class="metric-sub"><span style="color: var(--success); font-weight: 700;">${activeStudents} Active</span> campus learners</span>
                </div>
            </div>

            <div class="glass-card metric-card">
                <div class="metric-icon" style="background: rgba(139, 92, 246, 0.15); color: var(--secondary);">
                    <i class="fa-solid fa-book-open"></i>
                </div>
                <div class="metric-info">
                    <span class="metric-label">Offered Academic Courses</span>
                    <span class="metric-value">${activeCourses}</span>
                    <span class="metric-sub">Across 5 Departments</span>
                </div>
            </div>

            <div class="glass-card metric-card">
                <div class="metric-icon" style="background: rgba(16, 185, 129, 0.15); color: var(--success);">
                    <i class="fa-solid fa-award"></i>
                </div>
                <div class="metric-info">
                    <span class="metric-label">Campus Average GPA</span>
                    <span class="metric-value">${avgGPA} <span style="font-size: 14px; font-weight: 500; color: var(--text-muted);">/ 4.0</span></span>
                    <span class="metric-sub"><span class="badge ${getGPABadgeClass(avgGPA)}">Satisfactory</span></span>
                </div>
            </div>

            <div class="glass-card metric-card">
                <div class="metric-icon" style="background: rgba(6, 182, 212, 0.15); color: var(--info);">
                    <i class="fa-solid fa-chart-line"></i>
                </div>
                <div class="metric-info">
                    <span class="metric-label">Overall Attendance Rate</span>
                    <span class="metric-value">${avgAttendance}%</span>
                    <span class="metric-sub"><span class="badge ${getAttendanceBadgeClass(avgAttendance)}">Good Standing</span></span>
                </div>
            </div>

            <div class="glass-card metric-card">
                <div class="metric-icon" style="background: rgba(245, 158, 11, 0.15); color: var(--warning);">
                    <i class="fa-solid fa-wallet"></i>
                </div>
                <div class="metric-info">
                    <span class="metric-label">Pending Tuition Balance</span>
                    <span class="metric-value">${formatCurrency(totalPendingFees)}</span>
                    <span class="metric-sub" style="color: var(--warning);">Requires follow-up</span>
                </div>
            </div>
        </div>

        <!-- Charts & Risk Alerts Grid -->
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-top: 8px;">
            <!-- Grade Distribution SVG Chart -->
            <div class="glass-card">
                <div class="section-header">
                    <div class="section-title">
                        <h3>Campus Academic Grade Distribution</h3>
                        <p>Student breakdown by GPA tier (A = 3.5+, B = 2.8-3.4, C = 2.0-2.7, D/F = <2.0)</p>
                    </div>
                </div>
                <div class="chart-container" style="height: 220px; display: flex; align-items: flex-end; justify-content: space-around; padding: 20px 10px 10px; border-bottom: 1px solid var(--border-color);">
                    ${renderBarChart(gradeCounts, totalStudents)}
                </div>
                <div style="display: flex; justify-content: space-around; margin-top: 12px; text-align: center;">
                    <div><span style="font-weight: 700; color: var(--success);">A Grade:</span> ${gradeCounts.A}</div>
                    <div><span style="font-weight: 700; color: var(--info);">B Grade:</span> ${gradeCounts.B}</div>
                    <div><span style="font-weight: 700; color: var(--warning);">C Grade:</span> ${gradeCounts.C}</div>
                    <div><span style="font-weight: 700; color: var(--danger);">D/F Warning:</span> ${gradeCounts.D + gradeCounts.F}</div>
                </div>
            </div>

            <!-- Risk & Action Alerts -->
            <div class="glass-card" style="display: flex; flex-direction: column;">
                <div class="section-header">
                    <div class="section-title">
                        <h3><i class="fa-solid fa-triangle-exclamation" style="color: var(--danger);"></i> Academic Risk Watch</h3>
                        <p>Students needing academic counseling</p>
                    </div>
                    <span class="badge badge-danger">${riskStudents.length} Students</span>
                </div>
                
                <div style="flex: 1; overflow-y: auto; max-height: 250px; display: flex; flex-direction: column; gap: 10px;">
                    ${riskStudents.length === 0 ? `
                        <div style="text-align: center; color: var(--text-muted); padding: 30px;">
                            <i class="fa-solid fa-shield-check" style="font-size: 32px; color: var(--success); margin-bottom: 10px;"></i>
                            <p>No students currently at academic risk!</p>
                        </div>
                    ` : riskStudents.map(s => {
                        const gpa = calculateGPA(s.grades);
                        return `
                            <div class="risk-item" data-id="${s.id}" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: var(--bg-input); border-radius: 10px; cursor: pointer; border: 1px solid var(--border-color);">
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <img src="${getStudentAvatar(s)}" class="student-avatar" style="width: 32px; height: 32px;">
                                    <div>
                                        <div style="font-weight: 700; font-size: 13px;">${s.firstName} ${s.lastName}</div>
                                        <div style="font-size: 11px; color: var(--text-muted);">${s.department}</div>
                                    </div>
                                </div>
                                <div style="text-align: right;">
                                    <span class="badge ${getGPABadgeClass(gpa)}">GPA ${gpa}</span>
                                    <div style="font-size: 10px; color: var(--danger); margin-top: 2px;">Att: ${s.attendanceRate}%</div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>

        <!-- Recent Enrollments Table -->
        <div class="glass-card">
            <div class="section-header">
                <div class="section-title">
                    <h3>Recent Student Directory Snapshot</h3>
                    <p>Latest active students registered in EduPulse</p>
                </div>
                <button class="btn btn-secondary btn-sm" id="view-all-students-btn">
                    View Full Directory <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>

            <div class="table-responsive">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Student ID</th>
                            <th>Department</th>
                            <th>Grade Level</th>
                            <th>GPA</th>
                            <th>Attendance</th>
                            <th>Fee Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${students.slice(0, 5).map(s => {
                            const gpa = calculateGPA(s.grades);
                            return `
                                <tr>
                                    <td>
                                        <div class="student-cell">
                                            <img src="${getStudentAvatar(s)}" class="student-avatar" alt="${s.firstName}">
                                            <div class="student-name-group">
                                                <span class="student-name">${s.firstName} ${s.lastName}</span>
                                                <span class="student-email">${s.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td><code>${s.id}</code></td>
                                    <td>${s.department}</td>
                                    <td><span class="badge badge-info">${s.gradeLevel}</span></td>
                                    <td><span class="badge ${getGPABadgeClass(gpa)}">${gpa}</span></td>
                                    <td>
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <div style="flex: 1; height: 6px; background: var(--bg-input); border-radius: 3px; width: 60px; overflow: hidden;">
                                                <div style="height: 100%; width: ${s.attendanceRate}%; background: ${s.attendanceRate >= 80 ? 'var(--success)' : 'var(--danger)'};"></div>
                                            </div>
                                            <span>${s.attendanceRate}%</span>
                                        </div>
                                    </td>
                                    <td><span class="badge ${s.feeStatus === 'Paid' ? 'badge-success' : s.feeStatus === 'Partial' ? 'badge-warning' : 'badge-danger'}">${s.feeStatus}</span></td>
                                    <td>
                                        <button class="btn btn-secondary btn-sm view-student-btn" data-id="${s.id}">
                                            <i class="fa-solid fa-eye"></i> View Profile
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Render SVG bar chart for grade counts
function renderBarChart(counts, total) {
    const max = Math.max(counts.A, counts.B, counts.C, counts.D + counts.F, 1);
    const bars = [
        { label: 'Grade A', count: counts.A, color: 'var(--success)' },
        { label: 'Grade B', count: counts.B, color: 'var(--info)' },
        { label: 'Grade C', count: counts.C, color: 'var(--warning)' },
        { label: 'Grade D/F', count: counts.D + counts.F, color: 'var(--danger)' }
    ];

    return bars.map(b => {
        const heightPct = Math.round((b.count / max) * 100);
        return `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; width: 60px;">
                <span style="font-size: 12px; font-weight: 700; color: ${b.color};">${b.count}</span>
                <div style="width: 32px; height: ${Math.max(heightPct * 1.5, 12)}px; background: ${b.color}; border-radius: 6px 6px 0 0; transition: height 0.5s ease;"></div>
                <span style="font-size: 11px; color: var(--text-muted); font-weight: 600;">${b.label}</span>
            </div>
        `;
    }).join('');
}

// Event Bindings for Dashboard
export function bindDashboardEvents(container) {
    const addBtn = container.querySelector('#dash-add-student-btn');
    if (addBtn) addBtn.addEventListener('click', () => openStudentModal());

    const attBtn = container.querySelector('#dash-attendance-btn');
    if (attBtn) attBtn.addEventListener('click', () => store.setView('attendance'));

    const viewAllBtn = container.querySelector('#view-all-students-btn');
    if (viewAllBtn) viewAllBtn.addEventListener('click', () => store.setView('students'));

    container.querySelectorAll('.view-student-btn, .risk-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const studentId = e.currentTarget.getAttribute('data-id');
            if (studentId) openStudentDetailModal(studentId);
        });
    });
}
