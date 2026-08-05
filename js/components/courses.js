// Courses & Class Management Component

import { store } from '../state.js';
import { showToast } from '../utils/toast.js';

export function renderCourses() {
    const courses = store.courses;
    const students = store.students;

    return `
        <div class="glass-card">
            <div class="section-header">
                <div class="section-title">
                    <h3>Academic Course Catalog & Classes</h3>
                    <p>Manage curriculum, course credits, schedules, and active student enrollments</p>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
                ${courses.map(c => {
                    const enrolledStudents = students.filter(s => s.courses && s.courses.includes(c.id));
                    return `
                        <div class="glass-card" style="display: flex; flex-direction: column; justify-content: space-between;">
                            <div>
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                                    <code style="font-size: 14px; font-weight: 700; color: var(--primary);">${c.id}</code>
                                    <span class="badge badge-info">${c.credits} Credits</span>
                                </div>
                                <h4 style="font-size: 16px; margin-bottom: 8px;">${c.title}</h4>
                                <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">
                                    <i class="fa-solid fa-user-tie"></i> ${c.instructor} &bull; ${c.department}
                                </p>
                                
                                <div style="font-size: 12px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; background: var(--bg-input); padding: 10px; border-radius: 8px;">
                                    <div><i class="fa-solid fa-clock"></i> ${c.schedule}</div>
                                    <div><i class="fa-solid fa-location-dot"></i> ${c.room}</div>
                                </div>
                            </div>

                            <div style="margin-top: 16px; border-top: 1px solid var(--border-color); padding-top: 12px; display: flex; align-items: center; justify-content: space-between;">
                                <div style="font-size: 12px; font-weight: 700;">
                                    <i class="fa-solid fa-users"></i> ${enrolledStudents.length} / ${c.capacity} Enrolled
                                </div>
                                <button class="btn btn-secondary btn-sm manage-enrollment-btn" data-id="${c.id}">
                                    <i class="fa-solid fa-user-check"></i> Manage Roster
                                </button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

export function bindCoursesEvents(container) {
    container.querySelectorAll('.manage-enrollment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const courseId = e.currentTarget.getAttribute('data-id');
            openRosterModal(courseId);
        });
    });
}

function openRosterModal(courseId) {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return;

    const course = store.courses.find(c => c.id === courseId);
    if (!course) return;

    const students = store.students;

    modalRoot.innerHTML = `
        <div class="modal-overlay" id="roster-modal">
            <div class="modal-content" style="max-width: 650px;">
                <div class="modal-header">
                    <h3>Course Roster: ${course.id} - ${course.title}</h3>
                    <button class="icon-btn close-modal-btn"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="modal-body">
                    <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">Toggle student enrollment for this course:</p>
                    <div style="max-height: 350px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;">
                        ${students.map(s => {
                            const isEnrolled = s.courses && s.courses.includes(course.id);
                            return `
                                <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: var(--bg-input); border-radius: 8px;">
                                    <div>
                                        <span style="font-weight: 700;">${s.firstName} ${s.lastName}</span>
                                        <span style="font-size: 11px; color: var(--text-muted); margin-left: 8px;">(${s.department})</span>
                                    </div>
                                    <button class="btn btn-sm ${isEnrolled ? 'btn-danger' : 'btn-primary'} toggle-enroll-btn" data-student="${s.id}" data-enrolled="${isEnrolled}">
                                        ${isEnrolled ? '<i class="fa-solid fa-minus"></i> Remove' : '<i class="fa-solid fa-plus"></i> Enroll'}
                                    </button>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary close-modal-btn">Done</button>
                </div>
            </div>
        </div>
    `;

    const modalOverlay = document.getElementById('roster-modal');
    modalOverlay.querySelectorAll('.close-modal-btn').forEach(b => b.addEventListener('click', () => modalRoot.innerHTML = ''));

    modalOverlay.querySelectorAll('.toggle-enroll-btn').forEach(b => {
        b.addEventListener('click', (e) => {
            const studentId = e.currentTarget.getAttribute('data-student');
            const isEnrolled = e.currentTarget.getAttribute('data-enrolled') === 'true';

            if (isEnrolled) {
                store.unenrollStudentFromCourse(studentId, courseId);
                showToast('Removed student from course roster', 'warning');
            } else {
                store.enrollStudentInCourse(studentId, courseId);
                showToast('Enrolled student in course!', 'success');
            }
            openRosterModal(courseId);
        });
    });
}
