// Students Directory & CRUD Component

import { store } from '../state.js';
import { calculateGPA, getGPABadgeClass, getAttendanceBadgeClass, getStudentAvatar, exportToCSV } from '../utils/helpers.js';
import { showToast } from '../utils/toast.js';
import { openStudentDetailModal } from './studentDetail.js';

let selectedDept = 'ALL';
let selectedGrade = 'ALL';
let selectedStatus = 'ALL';
let sortBy = 'name';

export function renderStudents() {
    let students = [...store.students];
    const query = store.searchQuery.toLowerCase().trim();

    // Global Search Filter
    if (query) {
        students = students.filter(s =>
            s.firstName.toLowerCase().includes(query) ||
            s.lastName.toLowerCase().includes(query) ||
            s.email.toLowerCase().includes(query) ||
            s.id.toLowerCase().includes(query) ||
            s.department.toLowerCase().includes(query)
        );
    }

    // Select Filters
    if (selectedDept !== 'ALL') {
        students = students.filter(s => s.department === selectedDept);
    }
    if (selectedGrade !== 'ALL') {
        students = students.filter(s => s.gradeLevel === selectedGrade);
    }
    if (selectedStatus !== 'ALL') {
        students = students.filter(s => s.status === selectedStatus);
    }

    // Sorting
    students.sort((a, b) => {
        if (sortBy === 'name') return a.firstName.localeCompare(b.firstName);
        if (sortBy === 'gpa') return calculateGPA(b.grades) - calculateGPA(a.grades);
        if (sortBy === 'attendance') return (b.attendanceRate || 0) - (a.attendanceRate || 0);
        return 0;
    });

    const departments = Array.from(new Set(store.students.map(s => s.department)));
    const gradeLevels = ['Freshman', 'Sophomore', 'Junior', 'Senior'];

    return `
        <div class="glass-card">
            <div class="section-header">
                <div class="section-title">
                    <h3>Student Directory</h3>
                    <p>Manage enrolled students, academic standing, profiles and records</p>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="btn btn-secondary btn-sm" id="export-students-csv-btn">
                        <i class="fa-solid fa-file-csv"></i> Export CSV
                    </button>
                    <button class="btn btn-primary btn-sm" id="add-student-btn">
                        <i class="fa-solid fa-user-plus"></i> Add New Student
                    </button>
                </div>
            </div>

            <!-- Filter Controls Bar -->
            <div class="controls-bar">
                <div class="filter-group">
                    <label style="font-size: 12px; font-weight: 700; color: var(--text-muted);">Department:</label>
                    <select class="select-input" id="filter-dept">
                        <option value="ALL" ${selectedDept === 'ALL' ? 'selected' : ''}>All Departments</option>
                        ${departments.map(d => `<option value="${d}" ${selectedDept === d ? 'selected' : ''}>${d}</option>`).join('')}
                    </select>

                    <label style="font-size: 12px; font-weight: 700; color: var(--text-muted);">Year Level:</label>
                    <select class="select-input" id="filter-grade">
                        <option value="ALL" ${selectedGrade === 'ALL' ? 'selected' : ''}>All Years</option>
                        ${gradeLevels.map(g => `<option value="${g}" ${selectedGrade === g ? 'selected' : ''}>${g}</option>`).join('')}
                    </select>

                    <label style="font-size: 12px; font-weight: 700; color: var(--text-muted);">Status:</label>
                    <select class="select-input" id="filter-status">
                        <option value="ALL" ${selectedStatus === 'ALL' ? 'selected' : ''}>All Statuses</option>
                        <option value="Active" ${selectedStatus === 'Active' ? 'selected' : ''}>Active</option>
                        <option value="On Leave" ${selectedStatus === 'On Leave' ? 'selected' : ''}>On Leave</option>
                        <option value="Graduated" ${selectedStatus === 'Graduated' ? 'selected' : ''}>Graduated</option>
                    </select>
                </div>

                <div class="filter-group">
                    <label style="font-size: 12px; font-weight: 700; color: var(--text-muted);">Sort By:</label>
                    <select class="select-input" id="filter-sort">
                        <option value="name" ${sortBy === 'name' ? 'selected' : ''}>Student Name</option>
                        <option value="gpa" ${sortBy === 'gpa' ? 'selected' : ''}>GPA (Highest First)</option>
                        <option value="attendance" ${sortBy === 'attendance' ? 'selected' : ''}>Attendance Rate</option>
                    </select>
                </div>
            </div>

            <!-- Student Directory Table -->
            <div class="table-responsive">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>ID Code</th>
                            <th>Department</th>
                            <th>Year Level</th>
                            <th>Status</th>
                            <th>GPA</th>
                            <th>Attendance</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${students.length === 0 ? `
                            <tr>
                                <td colspan="8" style="text-align: center; padding: 40px; color: var(--text-muted);">
                                    <i class="fa-solid fa-user-slash" style="font-size: 32px; margin-bottom: 10px; display: block;"></i>
                                    No students matching the current filters.
                                </td>
                            </tr>
                        ` : students.map(s => {
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
                                    <td>
                                        <span class="badge ${s.status === 'Active' ? 'badge-success' : 'badge-warning'}">${s.status}</span>
                                    </td>
                                    <td><span class="badge ${getGPABadgeClass(gpa)}">${gpa} / 4.0</span></td>
                                    <td>
                                        <span class="badge ${getAttendanceBadgeClass(s.attendanceRate)}">${s.attendanceRate}%</span>
                                    </td>
                                    <td>
                                        <div style="display: flex; gap: 6px;">
                                            <button class="btn btn-secondary btn-sm view-profile-btn" data-id="${s.id}" title="View Details">
                                                <i class="fa-solid fa-eye"></i> Profile
                                            </button>
                                            <button class="btn btn-secondary btn-sm edit-student-btn" data-id="${s.id}" title="Edit Student">
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button class="btn btn-secondary btn-sm delete-student-btn" data-id="${s.id}" style="color: var(--danger);" title="Delete Student">
                                                <i class="fa-solid fa-trash-can"></i>
                                            </button>
                                        </div>
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

export function bindStudentsEvents(container) {
    // Filters
    const deptSelect = container.querySelector('#filter-dept');
    if (deptSelect) deptSelect.addEventListener('change', (e) => { selectedDept = e.target.value; store.notify(); });

    const gradeSelect = container.querySelector('#filter-grade');
    if (gradeSelect) gradeSelect.addEventListener('change', (e) => { selectedGrade = e.target.value; store.notify(); });

    const statusSelect = container.querySelector('#filter-status');
    if (statusSelect) statusSelect.addEventListener('change', (e) => { selectedStatus = e.target.value; store.notify(); });

    const sortSelect = container.querySelector('#filter-sort');
    if (sortSelect) sortSelect.addEventListener('change', (e) => { sortBy = e.target.value; store.notify(); });

    // Export CSV
    const exportBtn = container.querySelector('#export-students-csv-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const data = store.students.map(s => ({
                ID: s.id,
                FirstName: s.firstName,
                LastName: s.lastName,
                Email: s.email,
                Phone: s.phone,
                Department: s.department,
                YearLevel: s.gradeLevel,
                Status: s.status,
                GPA: calculateGPA(s.grades),
                Attendance: s.attendanceRate + '%',
                FeeStatus: s.feeStatus
            }));
            exportToCSV('edupulse_students.csv', data);
            showToast('Student directory exported to CSV!', 'success');
        });
    }

    // Add Student Button
    const addBtn = container.querySelector('#add-student-btn');
    if (addBtn) addBtn.addEventListener('click', () => openStudentModal());

    // Row Actions
    container.querySelectorAll('.view-profile-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            openStudentDetailModal(id);
        });
    });

    container.querySelectorAll('.edit-student-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            const student = store.students.find(s => s.id === id);
            if (student) openStudentModal(student);
        });
    });

    container.querySelectorAll('.delete-student-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            const student = store.students.find(s => s.id === id);
            if (student && confirm(`Are you sure you want to remove ${student.firstName} ${student.lastName}?`)) {
                store.deleteStudent(id);
                showToast(`Student ${student.firstName} removed successfully.`, 'warning');
            }
        });
    });
}

// Add/Edit Student Modal
export function openStudentModal(studentToEdit = null) {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return;

    const isEdit = !!studentToEdit;
    const modalHTML = `
        <div class="modal-overlay" id="student-form-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${isEdit ? 'Edit Student Details' : 'Enroll New Student'}</h3>
                    <button class="icon-btn close-modal-btn"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <form id="student-form">
                    <div class="modal-body">
                        <div class="form-grid">
                            <div class="form-group">
                                <label>First Name *</label>
                                <input type="text" name="firstName" class="text-input" value="${studentToEdit ? studentToEdit.firstName : ''}" required>
                            </div>
                            <div class="form-group">
                                <label>Last Name *</label>
                                <input type="text" name="lastName" class="text-input" value="${studentToEdit ? studentToEdit.lastName : ''}" required>
                            </div>
                            <div class="form-group">
                                <label>Email Address *</label>
                                <input type="email" name="email" class="text-input" value="${studentToEdit ? studentToEdit.email : ''}" required>
                            </div>
                            <div class="form-group">
                                <label>Phone Number</label>
                                <input type="text" name="phone" class="text-input" value="${studentToEdit ? studentToEdit.phone || '' : '+1 (555) '}">
                            </div>
                            <div class="form-group">
                                <label>Gender</label>
                                <select name="gender" class="select-input">
                                    <option value="Female" ${studentToEdit && studentToEdit.gender === 'Female' ? 'selected' : ''}>Female</option>
                                    <option value="Male" ${studentToEdit && studentToEdit.gender === 'Male' ? 'selected' : ''}>Male</option>
                                    <option value="Other" ${studentToEdit && studentToEdit.gender === 'Other' ? 'selected' : ''}>Other</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Department *</label>
                                <select name="department" class="select-input" required>
                                    <option value="Computer Science" ${studentToEdit && studentToEdit.department === 'Computer Science' ? 'selected' : ''}>Computer Science</option>
                                    <option value="Artificial Intelligence" ${studentToEdit && studentToEdit.department === 'Artificial Intelligence' ? 'selected' : ''}>Artificial Intelligence</option>
                                    <option value="Data Science" ${studentToEdit && studentToEdit.department === 'Data Science' ? 'selected' : ''}>Data Science</option>
                                    <option value="Cybersecurity" ${studentToEdit && studentToEdit.department === 'Cybersecurity' ? 'selected' : ''}>Cybersecurity</option>
                                    <option value="Software Engineering" ${studentToEdit && studentToEdit.department === 'Software Engineering' ? 'selected' : ''}>Software Engineering</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Grade Level</label>
                                <select name="gradeLevel" class="select-input">
                                    <option value="Freshman" ${studentToEdit && studentToEdit.gradeLevel === 'Freshman' ? 'selected' : ''}>Freshman</option>
                                    <option value="Sophomore" ${studentToEdit && studentToEdit.gradeLevel === 'Sophomore' ? 'selected' : ''}>Sophomore</option>
                                    <option value="Junior" ${studentToEdit && studentToEdit.gradeLevel === 'Junior' ? 'selected' : ''}>Junior</option>
                                    <option value="Senior" ${studentToEdit && studentToEdit.gradeLevel === 'Senior' ? 'selected' : ''}>Senior</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Status</label>
                                <select name="status" class="select-input">
                                    <option value="Active" ${studentToEdit && studentToEdit.status === 'Active' ? 'selected' : ''}>Active</option>
                                    <option value="On Leave" ${studentToEdit && studentToEdit.status === 'On Leave' ? 'selected' : ''}>On Leave</option>
                                    <option value="Graduated" ${studentToEdit && studentToEdit.status === 'Graduated' ? 'selected' : ''}>Graduated</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary close-modal-btn">Cancel</button>
                        <button type="submit" class="btn btn-primary">${isEdit ? 'Save Changes' : 'Enroll Student'}</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    modalRoot.innerHTML = modalHTML;

    const modalOverlay = document.getElementById('student-form-modal');
    modalOverlay.querySelectorAll('.close-modal-btn').forEach(b => b.addEventListener('click', () => modalRoot.innerHTML = ''));

    const form = document.getElementById('student-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (isEdit) {
            store.updateStudent(studentToEdit.id, data);
            showToast(`Updated student profile for ${data.firstName}!`, 'success');
        } else {
            const created = store.addStudent(data);
            showToast(`Successfully enrolled ${created.firstName} ${created.lastName}!`, 'success');
        }

        modalRoot.innerHTML = '';
    });
}
