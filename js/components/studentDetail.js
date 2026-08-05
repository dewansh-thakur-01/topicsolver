// Student Detail Modal Component (Tabs: Overview, Transcript, Attendance, Fees)

import { store } from '../state.js';
import { calculateGPA, gradeToPoints, formatCurrency, getGPABadgeClass, getAttendanceBadgeClass, getFeeBadgeClass, getStudentAvatar } from '../utils/helpers.js';
import { showToast } from '../utils/toast.js';

let activeTab = 'overview';

export function openStudentDetailModal(studentId) {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return;

    activeTab = 'overview';
    renderModal(studentId, modalRoot);
}

function renderModal(studentId, modalRoot) {
    const student = store.students.find(s => s.id === studentId);
    if (!student) return;

    const gpa = calculateGPA(student.grades);
    const feeBalance = student.tuitionFee - (student.paidFee || 0);

    modalRoot.innerHTML = `
        <div class="modal-overlay" id="student-detail-modal">
            <div class="modal-content" style="max-width: 800px;">
                <!-- Header Banner -->
                <div class="modal-header" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.15)); padding: 24px;">
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <img src="${getStudentAvatar(student)}" class="student-avatar" style="width: 60px; height: 60px; border: 3px solid var(--primary);">
                        <div>
                            <h2 style="font-size: 20px;">${student.firstName} ${student.lastName}</h2>
                            <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                                <code>${student.id}</code> &bull; 
                                <span class="badge badge-info">${student.department}</span> &bull; 
                                <span class="badge ${student.status === 'Active' ? 'badge-success' : 'badge-warning'}">${student.status}</span>
                            </div>
                        </div>
                    </div>
                    <button class="icon-btn close-modal-btn"><i class="fa-solid fa-xmark"></i></button>
                </div>

                <!-- Navigation Tabs -->
                <div style="display: flex; border-bottom: 1px solid var(--border-color); background: var(--bg-input); padding: 0 16px;">
                    <button class="tab-btn ${activeTab === 'overview' ? 'active' : ''}" data-tab="overview" style="padding: 14px 18px; border: none; background: transparent; color: var(--text-secondary); font-weight: 600; cursor: pointer; border-bottom: 2px solid ${activeTab === 'overview' ? 'var(--primary)' : 'transparent'};">
                        <i class="fa-solid fa-id-card"></i> Overview
                    </button>
                    <button class="tab-btn ${activeTab === 'grades' ? 'active' : ''}" data-tab="grades" style="padding: 14px 18px; border: none; background: transparent; color: var(--text-secondary); font-weight: 600; cursor: pointer; border-bottom: 2px solid ${activeTab === 'grades' ? 'var(--primary)' : 'transparent'};">
                        <i class="fa-solid fa-award"></i> Transcript & Grades
                    </button>
                    <button class="tab-btn ${activeTab === 'attendance' ? 'active' : ''}" data-tab="attendance" style="padding: 14px 18px; border: none; background: transparent; color: var(--text-secondary); font-weight: 600; cursor: pointer; border-bottom: 2px solid ${activeTab === 'attendance' ? 'var(--primary)' : 'transparent'};">
                        <i class="fa-solid fa-calendar-check"></i> Attendance Record
                    </button>
                    <button class="tab-btn ${activeTab === 'fees' ? 'active' : ''}" data-tab="fees" style="padding: 14px 18px; border: none; background: transparent; color: var(--text-secondary); font-weight: 600; cursor: pointer; border-bottom: 2px solid ${activeTab === 'fees' ? 'var(--primary)' : 'transparent'};">
                        <i class="fa-solid fa-wallet"></i> Tuition & Fees
                    </button>
                </div>

                <!-- Tab Content Body -->
                <div class="modal-body">
                    ${renderTabContent(student, gpa, feeBalance)}
                </div>

                <div class="modal-footer">
                    <button class="btn btn-secondary close-modal-btn">Close</button>
                </div>
            </div>
        </div>
    `;

    // Event Bindings
    const modalOverlay = document.getElementById('student-detail-modal');
    modalOverlay.querySelectorAll('.close-modal-btn').forEach(b => b.addEventListener('click', () => modalRoot.innerHTML = ''));

    modalOverlay.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            activeTab = e.currentTarget.getAttribute('data-tab');
            renderModal(studentId, modalRoot);
        });
    });

    bindTabActions(student, modalOverlay, modalRoot);
}

function renderTabContent(student, gpa, feeBalance) {
    if (activeTab === 'overview') {
        return `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div class="glass-card" style="padding: 16px;">
                    <h4 style="margin-bottom: 12px; font-size: 14px; color: var(--primary);">Personal Details</h4>
                    <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
                        <div><strong>Full Name:</strong> ${student.firstName} ${student.lastName}</div>
                        <div><strong>Email:</strong> ${student.email}</div>
                        <div><strong>Phone:</strong> ${student.phone || 'N/A'}</div>
                        <div><strong>Gender:</strong> ${student.gender || 'N/A'}</div>
                        <div><strong>Enrollment Date:</strong> ${student.enrollmentDate}</div>
                    </div>
                </div>

                <div class="glass-card" style="padding: 16px;">
                    <h4 style="margin-bottom: 12px; font-size: 14px; color: var(--secondary);">Academic Snapshot</h4>
                    <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
                        <div><strong>Department:</strong> ${student.department}</div>
                        <div><strong>Year Level:</strong> ${student.gradeLevel}</div>
                        <div><strong>Current GPA:</strong> <span class="badge ${getGPABadgeClass(gpa)}">${gpa} / 4.0</span></div>
                        <div><strong>Attendance Rate:</strong> <span class="badge ${getAttendanceBadgeClass(student.attendanceRate)}">${student.attendanceRate}%</span></div>
                        <div><strong>Fee Balance:</strong> <span class="badge ${getFeeBadgeClass(student.feeStatus)}">${formatCurrency(feeBalance)}</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    if (activeTab === 'grades') {
        return `
            <div class="glass-card" style="padding: 16px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
                    <h4>Official Course Gradebook</h4>
                    <span class="badge ${getGPABadgeClass(gpa)}">Cumulative GPA: ${gpa}</span>
                </div>
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Credits</th>
                            <th>Score (%)</th>
                            <th>Letter Grade</th>
                            <th>Quality Points</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${student.grades.length === 0 ? `
                            <tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No courses assigned yet.</td></tr>
                        ` : student.grades.map(g => {
                            const { letter, points } = gradeToPoints(g.percentage);
                            return `
                                <tr>
                                    <td><code>${g.courseId}</code></td>
                                    <td>${g.credits || 3}</td>
                                    <td>${g.percentage}%</td>
                                    <td><span class="badge badge-info">${letter}</span></td>
                                    <td>${points.toFixed(1)}</td>
                                    <td>
                                        <button class="btn btn-secondary btn-sm edit-grade-btn" data-course="${g.courseId}">
                                            <i class="fa-solid fa-pen"></i> Update Marks
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    if (activeTab === 'attendance') {
        return `
            <div class="glass-card" style="padding: 16px; text-align: center;">
                <h4 style="margin-bottom: 10px;">Attendance Summary</h4>
                <div style="font-size: 36px; font-weight: 800; color: ${student.attendanceRate >= 80 ? 'var(--success)' : 'var(--danger)'};">
                    ${student.attendanceRate}%
                </div>
                <p style="color: var(--text-muted); font-size: 12px; margin-top: 4px;">Verified campus attendance logs</p>
                <div style="margin-top: 20px; background: var(--bg-input); padding: 12px; border-radius: 10px;">
                    <div style="display: flex; justify-content: space-between; font-size: 13px;">
                        <span>Present Classes:</span>
                        <strong style="color: var(--success);">${Math.round(student.attendanceRate * 0.3)} / 30 Days</strong>
                    </div>
                </div>
            </div>
        `;
    }

    if (activeTab === 'fees') {
        return `
            <div class="glass-card" style="padding: 16px;">
                <h4 style="margin-bottom: 12px;">Tuition Fee Account</h4>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;">
                    <div style="background: var(--bg-input); padding: 12px; border-radius: 10px;">
                        <span style="font-size: 11px; color: var(--text-muted);">Total Tuition:</span>
                        <div style="font-size: 16px; font-weight: 700;">${formatCurrency(student.tuitionFee)}</div>
                    </div>
                    <div style="background: var(--bg-input); padding: 12px; border-radius: 10px;">
                        <span style="font-size: 11px; color: var(--text-muted);">Amount Paid:</span>
                        <div style="font-size: 16px; font-weight: 700; color: var(--success);">${formatCurrency(student.paidFee || 0)}</div>
                    </div>
                    <div style="background: var(--bg-input); padding: 12px; border-radius: 10px;">
                        <span style="font-size: 11px; color: var(--text-muted);">Remaining Balance:</span>
                        <div style="font-size: 16px; font-weight: 700; color: var(--danger);">${formatCurrency(feeBalance)}</div>
                    </div>
                </div>

                ${feeBalance > 0 ? `
                    <div style="border-top: 1px solid var(--border-color); padding-top: 14px;">
                        <h5>Record Fee Payment</h5>
                        <form id="record-payment-form" style="display: flex; gap: 10px; margin-top: 10px;">
                            <input type="number" name="amount" class="text-input" placeholder="Amount ($)" max="${feeBalance}" required style="flex: 1;">
                            <button type="submit" class="btn btn-primary"><i class="fa-solid fa-check"></i> Submit Payment</button>
                        </form>
                    </div>
                ` : `
                    <div style="color: var(--success); font-weight: 700; text-align: center; padding: 10px; background: var(--success-bg); border-radius: 8px;">
                        <i class="fa-solid fa-circle-check"></i> Tuition fees fully paid!
                    </div>
                `}
            </div>
        `;
    }

    return '';
}

function bindTabActions(student, modalOverlay, modalRoot) {
    // Grade Update Handler
    modalOverlay.querySelectorAll('.edit-grade-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const courseId = e.currentTarget.getAttribute('data-course');
            const newMarks = prompt(`Enter new grade score percentage (0-100) for course ${courseId}:`);
            if (newMarks !== null && !isNaN(newMarks)) {
                store.updateStudentGrade(student.id, courseId, newMarks);
                showToast(`Grade updated for ${courseId}!`, 'success');
                renderModal(student.id, modalRoot);
            }
        });
    });

    // Payment Handler
    const payForm = modalOverlay.querySelector('#record-payment-form');
    if (payForm) {
        payForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const amount = payForm.amount.value;
            store.recordFeePayment(student.id, amount);
            showToast(`Recorded payment of ${formatCurrency(amount)} for ${student.firstName}!`, 'success');
            renderModal(student.id, modalRoot);
        });
    }
}
