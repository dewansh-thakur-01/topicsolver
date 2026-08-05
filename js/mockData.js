// Mock Initial Data Seed for EduPulse

export const INITIAL_COURSES = [
    {
        id: 'CS101',
        title: 'Introduction to Computer Science',
        department: 'Computer Science',
        instructor: 'Dr. Sarah Jenkins',
        credits: 4,
        schedule: 'Mon/Wed 09:00 AM - 10:30 AM',
        room: 'Lab A-102',
        capacity: 40
    },
    {
        id: 'CS302',
        title: 'Data Structures & Algorithms',
        department: 'Computer Science',
        instructor: 'Prof. Michael Chang',
        credits: 4,
        schedule: 'Tue/Thu 11:00 AM - 12:30 PM',
        room: 'Hall B-204',
        capacity: 35
    },
    {
        id: 'AI401',
        title: 'Artificial Intelligence & Machine Learning',
        department: 'Artificial Intelligence',
        instructor: 'Dr. Elena Rostova',
        credits: 3,
        schedule: 'Mon/Fri 02:00 PM - 03:30 PM',
        room: 'Tech Hub 301',
        capacity: 30
    },
    {
        id: 'DS205',
        title: 'Applied Data Analytics & Visualization',
        department: 'Data Science',
        instructor: 'Prof. David Miller',
        credits: 3,
        schedule: 'Wed/Fri 10:00 AM - 11:30 AM',
        room: 'Lab C-105',
        capacity: 35
    },
    {
        id: 'CYB310',
        title: 'Cybersecurity Fundamentals & Cryptography',
        department: 'Cybersecurity',
        instructor: 'Dr. Marcus Vance',
        credits: 4,
        schedule: 'Tue/Thu 03:00 PM - 04:30 PM',
        room: 'Cyber Lab 2',
        capacity: 25
    },
    {
        id: 'SE450',
        title: 'Full Stack Software Architecture',
        department: 'Software Engineering',
        instructor: 'Prof. Alicia Gomez',
        credits: 4,
        schedule: 'Mon/Wed 01:00 PM - 02:30 PM',
        room: 'Hall A-101',
        capacity: 30
    }
];

export const INITIAL_STUDENTS = [
    {
        id: 'STU-2024-001',
        firstName: 'Alexander',
        lastName: 'Wright',
        email: 'alexander.w@university.edu',
        phone: '+1 (555) 234-5678',
        gender: 'Male',
        department: 'Computer Science',
        gradeLevel: 'Junior',
        status: 'Active',
        enrollmentDate: '2022-09-01',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        courses: ['CS101', 'CS302', 'SE450'],
        grades: [
            { courseId: 'CS101', percentage: 92, credits: 4 },
            { courseId: 'CS302', percentage: 88, credits: 4 },
            { courseId: 'SE450', percentage: 95, credits: 4 }
        ],
        attendanceRate: 96,
        tuitionFee: 12500,
        paidFee: 12500,
        feeStatus: 'Paid'
    },
    {
        id: 'STU-2024-002',
        firstName: 'Sophia',
        lastName: 'Chen',
        email: 'sophia.c@university.edu',
        phone: '+1 (555) 345-6789',
        gender: 'Female',
        department: 'Artificial Intelligence',
        gradeLevel: 'Senior',
        status: 'Active',
        enrollmentDate: '2021-09-01',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        courses: ['AI401', 'DS205', 'CS302'],
        grades: [
            { courseId: 'AI401', percentage: 96, credits: 3 },
            { courseId: 'DS205', percentage: 94, credits: 3 },
            { courseId: 'CS302', percentage: 91, credits: 4 }
        ],
        attendanceRate: 98,
        tuitionFee: 12500,
        paidFee: 12500,
        feeStatus: 'Paid'
    },
    {
        id: 'STU-2024-003',
        firstName: 'Liam',
        lastName: 'Gallagher',
        email: 'liam.g@university.edu',
        phone: '+1 (555) 456-7890',
        gender: 'Male',
        department: 'Cybersecurity',
        gradeLevel: 'Sophomore',
        status: 'Active',
        enrollmentDate: '2023-09-01',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        courses: ['CYB310', 'CS101'],
        grades: [
            { courseId: 'CYB310', percentage: 78, credits: 4 },
            { courseId: 'CS101', percentage: 82, credits: 4 }
        ],
        attendanceRate: 84,
        tuitionFee: 12500,
        paidFee: 6250,
        feeStatus: 'Partial'
    },
    {
        id: 'STU-2024-004',
        firstName: 'Emma',
        lastName: 'Watson',
        email: 'emma.w@university.edu',
        phone: '+1 (555) 567-8901',
        gender: 'Female',
        department: 'Data Science',
        gradeLevel: 'Freshman',
        status: 'Active',
        enrollmentDate: '2024-01-15',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        courses: ['DS205', 'CS101'],
        grades: [
            { courseId: 'DS205', percentage: 89, credits: 3 },
            { courseId: 'CS101', percentage: 86, credits: 4 }
        ],
        attendanceRate: 92,
        tuitionFee: 12500,
        paidFee: 12500,
        feeStatus: 'Paid'
    },
    {
        id: 'STU-2024-005',
        firstName: 'Noah',
        lastName: 'Patel',
        email: 'noah.p@university.edu',
        phone: '+1 (555) 678-9012',
        gender: 'Male',
        department: 'Software Engineering',
        gradeLevel: 'Junior',
        status: 'On Leave',
        enrollmentDate: '2022-09-01',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        courses: ['SE450', 'CS302'],
        grades: [
            { courseId: 'SE450', percentage: 68, credits: 4 },
            { courseId: 'CS302', percentage: 72, credits: 4 }
        ],
        attendanceRate: 71,
        tuitionFee: 12500,
        paidFee: 0,
        feeStatus: 'Overdue'
    },
    {
        id: 'STU-2024-006',
        firstName: 'Olivia',
        lastName: 'Martinez',
        email: 'olivia.m@university.edu',
        phone: '+1 (555) 789-0123',
        gender: 'Female',
        department: 'Artificial Intelligence',
        gradeLevel: 'Senior',
        status: 'Active',
        enrollmentDate: '2021-09-01',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        courses: ['AI401', 'DS205'],
        grades: [
            { courseId: 'AI401', percentage: 91, credits: 3 },
            { courseId: 'DS205', percentage: 87, credits: 3 }
        ],
        attendanceRate: 95,
        tuitionFee: 12500,
        paidFee: 12500,
        feeStatus: 'Paid'
    },
    {
        id: 'STU-2024-007',
        firstName: 'Ethan',
        lastName: 'Brown',
        email: 'ethan.b@university.edu',
        phone: '+1 (555) 890-1234',
        gender: 'Male',
        department: 'Computer Science',
        gradeLevel: 'Sophomore',
        status: 'Active',
        enrollmentDate: '2023-09-01',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        courses: ['CS101', 'CS302'],
        grades: [
            { courseId: 'CS101', percentage: 61, credits: 4 },
            { courseId: 'CS302', percentage: 58, credits: 4 }
        ],
        attendanceRate: 68,
        tuitionFee: 12500,
        paidFee: 3000,
        feeStatus: 'Partial'
    },
    {
        id: 'STU-2024-008',
        firstName: 'Ava',
        lastName: 'Taylor',
        email: 'ava.t@university.edu',
        phone: '+1 (555) 901-2345',
        gender: 'Female',
        department: 'Cybersecurity',
        gradeLevel: 'Junior',
        status: 'Active',
        enrollmentDate: '2022-09-01',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        courses: ['CYB310', 'CS302'],
        grades: [
            { courseId: 'CYB310', percentage: 93, credits: 4 },
            { courseId: 'CS302', percentage: 89, credits: 4 }
        ],
        attendanceRate: 97,
        tuitionFee: 12500,
        paidFee: 12500,
        feeStatus: 'Paid'
    }
];

export const INITIAL_ATTENDANCE_LOGS = [
    { id: 'LOG-001', date: '2026-08-01', courseId: 'CS101', presentCount: 15, absentCount: 1, lateCount: 0 },
    { id: 'LOG-002', date: '2026-08-02', courseId: 'CS302', presentCount: 14, absentCount: 2, lateCount: 1 },
    { id: 'LOG-003', date: '2026-08-03', courseId: 'AI401', presentCount: 12, absentCount: 0, lateCount: 1 },
    { id: 'LOG-004', date: '2026-08-04', courseId: 'CYB310', presentCount: 10, absentCount: 1, lateCount: 1 }
];
