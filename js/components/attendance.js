// Attendance Tracker & Batch Logger Component

import { store } from '../state.js';
import { showToast } from '../utils/toast.js';

let selectedCourseId = 'CS101';
let selectedLogDate = new Date().toISOString().split('T')[0];

export function renderAttendance() {
    const courses = store.courses;
    const currentCourse = courses.find(c => c.id === selectedCourseId) || courses[0];
    const enrolledStudents = store.students.filter(s => s.courses && s.courses.includes(currentCourse.id));
    const logs = store.attendanceLogs;

    return `
        <div class="glass-card">
            <div class="section-header">
                <div class="section-title">
                    <h3>Daily Class Attendance Logger</h3>
                    <p>Mark attendance for enrolled students per course and date</p>
                </div>
            </div>

            <!-- Logger Selection Bar -->
            <div class="controls-bar" style="background: var(--bg-input); padding: 16px; border-radius: 12px; border: 1px solid var(--border-color);">
                <div class="filter-group">
                    <label style="font-size: 13px; font-weight: 700;">Select Course:</label>
                    <select class="select-input" id="att-course-select">
                        ${courses.map(c => `<option value="${c.id}" ${c.id === selectedCourseId ? 'selected' : ''}>${c.id} - ${c.title}</option>`).join('')}
                    </select>

                    <label style="font-size: 13px; font-weight: 700;">Class Date:</label>
                    <input type="date" class="text-input" id="att-date-input" value="${selectedLogDate}">
                </div>
            </div>

            <!-- Attendance Marking Sheet -->
            <div style="margin-top: 20px;">
                <h4 style="margin-bottom: 12px;">Student Roster for ${currentCourse.id} (${enrolledStudents.length} Students)</h4>
                
                <form id="attendance-sheet-form">
                    <div class="table-responsive">
                        <table class="custom-table">
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>ID</th>
                                    <th>Current Att Rate</th>
                                    <th>Status Selection</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${enrolledStudents.length === 0 ? `
                                    <tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 30px;">No students enrolled in this course yet.</td></tr>
                                ` : enrolledStudents.map(s => `
                                    <tr>
                                        <td><strong>${s.firstName} ${s.lastName}</strong></td>
                                        <td><code>${s.id}</code></td>
                                        <td><span class="badge badge-info">${s.attendanceRate}%</span></td>
                                        <td>
                                            <div style="display: flex; gap: 8px;">
                                                <label style="cursor: pointer; padding: 6px 12px; background: var(--bg-input); border-radius: 6px; font-size: 12px; font-weight: 600;">
                                                    <input type="radio" name="att_${s.id}" value="present" checked> <span style="color: var(--success);">Present</span>
                                                </label>
                                                <label style="cursor: pointer; padding: 6px 12px; background: var(--bg-input); border-radius: 6px; font-size: 12px; font-weight: 600;">
                                                    <input type="radio" name="att_${s.id}" value="late"> <span style="color: var(--warning);">Late</span>
                                                </label>
                                                <label style="cursor: pointer; padding: 6px 12px; background: var(--bg-input); border-radius: 6px; font-size: 12px; font-weight: 600;">
                                                    <input type="radio" name="att_${s.id}" value="absent"> <span style="color: var(--danger);">Absent</span>
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    ${enrolledStudents.length > 0 ? `
                        <div style="margin-top: 16px; text-align: right;">
                            <button type="submit" class="btn btn-primary">
                                <i class="fa-solid fa-cloud-arrow-up"></i> Save Attendance Session
                            </button>
                        </div>
                    ` : ''}
                </form>
            </div>
        </div>

        <!-- Attendance Logs History -->
        <div class="glass-card" style="margin-top: 24px;">
            <div class="section-header">
                <div class="section-title">
                    <h3>Recent Recorded Attendance Logs</h3>
                </div>
            </div>
            <div class="table-responsive">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>Log ID</th>
                            <th>Date</th>
                            <th>Course ID</th>
                            <th>Present</th>
                            <th>Absent</th>
                            <th>Late</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${logs.map(l => `
                            <tr>
                                <td><code>${l.id}</code></td>
                                <td>${l.date}</td>
                                <td><span class="badge badge-info">${l.courseId}</span></td>
                                <td style="color: var(--success); font-weight: 700;">${l.presentCount}</td>
                                <td style="color: var(--danger); font-weight: 700;">${l.absentCount}</td>
                                <td style="color: var(--warning); font-weight: 700;">${l.lateCount}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

export function bindAttendanceEvents(container) {
    const courseSelect = container.querySelector('#att-course-select');
    if (courseSelect) {
        courseSelect.addEventListener('change', (e) => {
            selectedCourseId = e.target.value;
            store.notify();
        });
    }

    const dateInput = container.querySelector('#att-date-input');
    if (dateInput) {
        dateInput.addEventListener('change', (e) => {
            selectedLogDate = e.target.value;
        });
    }

    const form = container.querySelector('#attendance-sheet-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            let presentCount = 0;
            let absentCount = 0;
            let lateCount = 0;

            const enrolledStudents = store.students.filter(s => s.courses && s.courses.includes(selectedCourseId));

            enrolledStudents.forEach(s => {
                const val = formData.get(`att_${s.id}`);
                if (val === 'present') presentCount++;
                else if (val === 'absent') {
                    absentCount++;
                    // Reduce attendance rate slightly for absent
                    s.attendanceRate = Math.max(40, s.attendanceRate - 3);
                } else if (val === 'late') {
                    lateCount++;
                    s.attendanceRate = Math.max(50, s.attendanceRate - 1);
                } else {
                    presentCount++;
                }
                store.updateStudent(s.id, { attendanceRate: s.attendanceRate });
            });

            store.addAttendanceLog({
                date: selectedLogDate,
                courseId: selectedCourseId,
                presentCount,
                absentCount,
                lateCount
            });

            showToast(`Attendance recorded for ${selectedCourseId} on ${selectedLogDate}!`, 'success');
            store.notify();
        });
    }
}
