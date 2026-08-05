// Gradebook & Academic Transcript Component

import { store } from '../state.js';
import { calculateGPA, gradeToPoints, getGPABadgeClass, getStudentAvatar } from '../utils/helpers.js';
import { showToast } from '../utils/toast.js';

export function renderGrades() {
    const students = store.students;
    const courses = store.courses;

    return `
        <div class="glass-card">
            <div class="section-header">
                <div class="section-title">
                    <h3>Gradebook & Transcripts</h3>
                    <p>Enter scores, calculate GPA, and generate official academic transcripts</p>
                </div>
            </div>

            <div class="table-responsive">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Department</th>
                            <th>GPA</th>
                            ${courses.map(c => `<th>${c.id}</th>`).join('')}
                            <th>Transcript</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${students.map(s => {
                            const gpa = calculateGPA(s.grades);
                            return `
                                <tr>
                                    <td>
                                        <div class="student-cell">
                                            <img src="${getStudentAvatar(s)}" class="student-avatar" alt="${s.firstName}">
                                            <div>
                                                <div class="student-name">${s.firstName} ${s.lastName}</div>
                                                <code style="font-size: 10px;">${s.id}</code>
                                            </div>
                                        </div>
                                    </td>
                                    <td>${s.department}</td>
                                    <td><span class="badge ${getGPABadgeClass(gpa)}">${gpa}</span></td>
                                    ${courses.map(c => {
                                        const gradeObj = s.grades ? s.grades.find(g => g.courseId === c.id) : null;
                                        if (gradeObj) {
                                            const { letter } = gradeToPoints(gradeObj.percentage);
                                            return `
                                                <td>
                                                    <span class="badge badge-info" title="${gradeObj.percentage}%">${letter} (${gradeObj.percentage}%)</span>
                                                </td>
                                            `;
                                        }
                                        return `<td style="color: var(--text-muted); font-size: 11px;">N/A</td>`;
                                    }).join('')}
                                    <td>
                                        <button class="btn btn-secondary btn-sm print-transcript-btn" data-id="${s.id}">
                                            <i class="fa-solid fa-print"></i> Transcript
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

export function bindGradesEvents(container) {
    container.querySelectorAll('.print-transcript-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const studentId = e.currentTarget.getAttribute('data-id');
            openTranscriptModal(studentId);
        });
    });
}

function openTranscriptModal(studentId) {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return;

    const student = store.students.find(s => s.id === studentId);
    if (!student) return;

    const gpa = calculateGPA(student.grades);

    modalRoot.innerHTML = `
        <div class="modal-overlay" id="transcript-modal">
            <div class="modal-content" style="max-width: 700px; background: #ffffff; color: #000000; padding: 0;">
                <div style="padding: 30px; border-bottom: 2px solid #333;">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <div>
                            <h2 style="font-family: 'Outfit', sans-serif; font-size: 24px; color: #111;">OFFICIAL ACADEMIC TRANSCRIPT</h2>
                            <p style="color: #666; font-size: 12px; margin-top: 4px;">EduPulse Institute of Higher Education & Technology</p>
                        </div>
                        <div style="text-align: right; font-size: 12px; color: #444;">
                            <div>Date Issued: ${new Date().toLocaleDateString()}</div>
                            <div>Transcript ID: TR-${Math.floor(100000 + Math.random() * 900000)}</div>
                        </div>
                    </div>

                    <div style="margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; background: #f8f9fa; padding: 16px; border-radius: 8px; font-size: 13px; color: #333;">
                        <div><strong>Student Name:</strong> ${student.firstName} ${student.lastName}</div>
                        <div><strong>Student ID:</strong> ${student.id}</div>
                        <div><strong>Department:</strong> ${student.department}</div>
                        <div><strong>Year Level:</strong> ${student.gradeLevel}</div>
                        <div><strong>Enrollment Date:</strong> ${student.enrollmentDate}</div>
                        <div><strong>Cumulative GPA:</strong> <strong style="font-size: 16px; color: #4f46e5;">${gpa} / 4.00</strong></div>
                    </div>
                </div>

                <div style="padding: 30px;">
                    <h4 style="margin-bottom: 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #444;">Coursework & Evaluation</h4>
                    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; color: #222;">
                        <thead>
                            <tr style="border-bottom: 2px solid #ddd; background: #f1f3f5;">
                                <th style="padding: 10px;">Course Code</th>
                                <th style="padding: 10px;">Credits</th>
                                <th style="padding: 10px;">Score</th>
                                <th style="padding: 10px;">Grade</th>
                                <th style="padding: 10px;">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${student.grades.map(g => {
                                const { letter, points } = gradeToPoints(g.percentage);
                                return `
                                    <tr style="border-bottom: 1px solid #eee;">
                                        <td style="padding: 10px;"><code>${g.courseId}</code></td>
                                        <td style="padding: 10px;">${g.credits || 3}</td>
                                        <td style="padding: 10px;">${g.percentage}%</td>
                                        <td style="padding: 10px;"><strong>${letter}</strong></td>
                                        <td style="padding: 10px;">${points.toFixed(1)}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>

                <div style="padding: 20px 30px; background: #f8f9fa; border-top: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
                    <button class="btn btn-secondary close-modal-btn" style="color: #333; border-color: #ccc;">Close</button>
                    <button class="btn btn-primary" onclick="window.print()"><i class="fa-solid fa-print"></i> Print Official Copy</button>
                </div>
            </div>
        </div>
    `;

    const modalOverlay = document.getElementById('transcript-modal');
    modalOverlay.querySelectorAll('.close-modal-btn').forEach(b => b.addEventListener('click', () => modalRoot.innerHTML = ''));
}
