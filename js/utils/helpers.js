// Helper Utilities

// Formats currency ($ USD)
export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

// Format date nicely
export function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Convert percentage grade to letter grade and 4.0 scale points
export function gradeToPoints(percentage) {
    if (percentage >= 90) return { letter: 'A', points: 4.0 };
    if (percentage >= 85) return { letter: 'A-', points: 3.7 };
    if (percentage >= 80) return { letter: 'B+', points: 3.3 };
    if (percentage >= 75) return { letter: 'B', points: 3.0 };
    if (percentage >= 70) return { letter: 'B-', points: 2.7 };
    if (percentage >= 65) return { letter: 'C+', points: 2.3 };
    if (percentage >= 60) return { letter: 'C', points: 2.0 };
    if (percentage >= 55) return { letter: 'D', points: 1.0 };
    return { letter: 'F', points: 0.0 };
}

// Calculate GPA from array of course grades [{ credits: 3, percentage: 88 }]
export function calculateGPA(gradesList) {
    if (!gradesList || gradesList.length === 0) return 0.0;
    let totalPoints = 0;
    let totalCredits = 0;

    gradesList.forEach(item => {
        const credits = item.credits || 3;
        const { points } = gradeToPoints(item.percentage);
        totalPoints += points * credits;
        totalCredits += credits;
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0.0;
}

// GPA Badge Class
export function getGPABadgeClass(gpa) {
    const val = parseFloat(gpa);
    if (val >= 3.5) return 'badge-success';
    if (val >= 2.8) return 'badge-info';
    if (val >= 2.0) return 'badge-warning';
    return 'badge-danger';
}

// Attendance Badge Class
export function getAttendanceBadgeClass(rate) {
    if (rate >= 90) return 'badge-success';
    if (rate >= 75) return 'badge-warning';
    return 'badge-danger';
}

// Fee Status Badge Class
export function getFeeBadgeClass(status) {
    if (status === 'Paid') return 'badge-success';
    if (status === 'Partial') return 'badge-warning';
    return 'badge-danger';
}

// Avatar generator using UI Avatars or Unsplash fallback
export function getStudentAvatar(student) {
    if (student.avatar) return student.avatar;
    const name = encodeURIComponent(`${student.firstName} ${student.lastName}`);
    return `https://ui-avatars.com/api/?name=${name}&background=6366f1&color=fff&bold=true`;
}

// Export array of objects to CSV file download
export function exportToCSV(filename, rows) {
    if (!rows || !rows.length) return;
    const separator = ',';
    const keys = Object.keys(rows[0]);
    const csvContent =
        keys.join(separator) +
        '\n' +
        rows.map(row => {
            return keys.map(k => {
                let cell = row[k] === null || row[k] === undefined ? '' : row[k];
                cell = cell instanceof Date ? cell.toLocaleString() : cell.toString();
                cell = cell.replace(/"/g, '""');
                if (cell.search(/("|,|\n)/g) >= 0) cell = `"${cell}"`;
                return cell;
            }).join(separator);
        }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
