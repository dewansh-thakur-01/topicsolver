// Central Reactive State Store with LocalStorage Persistence

import { INITIAL_COURSES, INITIAL_STUDENTS, INITIAL_ATTENDANCE_LOGS } from './mockData.js';

const STORAGE_KEY_STUDENTS = 'edupulse_students_v1';
const STORAGE_KEY_COURSES = 'edupulse_courses_v1';
const STORAGE_KEY_ATTENDANCE = 'edupulse_attendance_v1';

class Store {
    constructor() {
        this.listeners = [];
        this.students = this.load(STORAGE_KEY_STUDENTS, INITIAL_STUDENTS);
        this.courses = this.load(STORAGE_KEY_COURSES, INITIAL_COURSES);
        this.attendanceLogs = this.load(STORAGE_KEY_ATTENDANCE, INITIAL_ATTENDANCE_LOGS);
        this.currentView = 'dashboard';
        this.searchQuery = '';
    }

    load(key, fallback) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : fallback;
        } catch (e) {
            console.error('Failed loading state from LocalStorage:', e);
            return fallback;
        }
    }

    save() {
        try {
            localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(this.students));
            localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(this.courses));
            localStorage.setItem(STORAGE_KEY_ATTENDANCE, JSON.stringify(this.attendanceLogs));
            this.notify();
        } catch (e) {
            console.error('Failed saving state to LocalStorage:', e);
        }
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(listener => listener(this));
    }

    // View Navigation State
    setView(viewName) {
        this.currentView = viewName;
        this.notify();
    }

    setSearchQuery(query) {
        this.searchQuery = query;
        this.notify();
    }

    // Student CRUD
    addStudent(studentData) {
        const idNumber = Math.floor(100 + Math.random() * 900);
        const newStudent = {
            id: `STU-2024-${idNumber}`,
            enrollmentDate: new Date().toISOString().split('T')[0],
            courses: [],
            grades: [],
            attendanceRate: 100,
            paidFee: 0,
            feeStatus: 'Overdue',
            tuitionFee: 12500,
            ...studentData
        };

        this.students.unshift(newStudent);
        this.save();
        return newStudent;
    }

    updateStudent(id, updatedFields) {
        this.students = this.students.map(s => s.id === id ? { ...s, ...updatedFields } : s);
        this.save();
    }

    deleteStudent(id) {
        this.students = this.students.filter(s => s.id !== id);
        this.save();
    }

    // Course Enrollments
    enrollStudentInCourse(studentId, courseId) {
        const student = this.students.find(s => s.id === studentId);
        if (!student) return;
        if (!student.courses.includes(courseId)) {
            student.courses.push(courseId);
            student.grades.push({ courseId, percentage: 85, credits: 3 });
            this.save();
        }
    }

    unenrollStudentFromCourse(studentId, courseId) {
        const student = this.students.find(s => s.id === studentId);
        if (!student) return;
        student.courses = student.courses.filter(c => c !== courseId);
        student.grades = student.grades.filter(g => g.courseId !== courseId);
        this.save();
    }

    // Grade Management
    updateStudentGrade(studentId, courseId, newPercentage) {
        const student = this.students.find(s => s.id === studentId);
        if (!student) return;

        const gradeItem = student.grades.find(g => g.courseId === courseId);
        if (gradeItem) {
            gradeItem.percentage = Math.min(100, Math.max(0, parseFloat(newPercentage)));
        } else {
            student.grades.push({ courseId, percentage: parseFloat(newPercentage), credits: 3 });
        }
        this.save();
    }

    // Attendance Log
    addAttendanceLog(logData) {
        const newLog = {
            id: `LOG-${Date.now()}`,
            ...logData
        };
        this.attendanceLogs.unshift(newLog);
        this.save();
    }

    // Fee Payments
    recordFeePayment(studentId, amount) {
        const student = this.students.find(s => s.id === studentId);
        if (!student) return;

        student.paidFee = Math.min(student.tuitionFee, (student.paidFee || 0) + parseFloat(amount));
        if (student.paidFee >= student.tuitionFee) {
            student.feeStatus = 'Paid';
        } else if (student.paidFee > 0) {
            student.feeStatus = 'Partial';
        } else {
            student.feeStatus = 'Overdue';
        }
        this.save();
    }

    // Reset Data
    resetToDemoData() {
        this.students = [...INITIAL_STUDENTS];
        this.courses = [...INITIAL_COURSES];
        this.attendanceLogs = [...INITIAL_ATTENDANCE_LOGS];
        this.save();
    }

    // Export Data JSON
    exportJSON() {
        const payload = {
            version: '2.5',
            exportDate: new Date().toISOString(),
            students: this.students,
            courses: this.courses,
            attendanceLogs: this.attendanceLogs
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `edupulse_backup_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }
}

export const store = new Store();
