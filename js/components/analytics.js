// Advanced Analytics View Component

import { store } from '../state.js';
import { calculateGPA } from '../utils/helpers.js';

export function renderAnalytics() {
    const students = store.students;

    // Department Stats Breakdown
    const deptStats = {};
    students.forEach(s => {
        if (!deptStats[s.department]) {
            deptStats[s.department] = { count: 0, totalGPA: 0, totalAtt: 0 };
        }
        const gpa = parseFloat(calculateGPA(s.grades));
        deptStats[s.department].count++;
        deptStats[s.department].totalGPA += gpa;
        deptStats[s.department].totalAtt += (s.attendanceRate || 90);
    });

    const depts = Object.keys(deptStats).map(d => ({
        name: d,
        count: deptStats[d].count,
        avgGPA: (deptStats[d].totalGPA / deptStats[d].count).toFixed(2),
        avgAtt: Math.round(deptStats[d].totalAtt / deptStats[d].count)
    }));

    return `
        <div class="glass-card">
            <div class="section-header">
                <div class="section-title">
                    <h3>Campus Analytics & Insights</h3>
                    <p>Departmental performance metrics, attendance averages, and academic standing</p>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 24px;">
                ${depts.map(d => `
                    <div class="glass-card" style="padding: 20px; background: var(--bg-input);">
                        <h4 style="font-size: 16px; margin-bottom: 8px; color: var(--primary);">${d.name}</h4>
                        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 13px;">
                            <div><strong>Enrolled Students:</strong> ${d.count}</div>
                            <div><strong>Avg Department GPA:</strong> <span class="badge badge-success">${d.avgGPA} / 4.0</span></div>
                            <div><strong>Avg Attendance:</strong> <span class="badge badge-info">${d.avgAtt}%</span></div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="glass-card">
                <h4>Year-Level Distribution</h4>
                <div style="display: flex; gap: 20px; margin-top: 16px; flex-wrap: wrap;">
                    ${['Freshman', 'Sophomore', 'Junior', 'Senior'].map(lvl => {
                        const cnt = students.filter(s => s.gradeLevel === lvl).length;
                        const pct = Math.round((cnt / students.length) * 100);
                        return `
                            <div style="flex: 1; min-width: 140px; background: var(--bg-input); padding: 14px; border-radius: 10px; text-align: center;">
                                <span style="font-size: 12px; color: var(--text-muted); font-weight: 700;">${lvl}s</span>
                                <div style="font-size: 22px; font-weight: 800; margin: 4px 0;">${cnt}</div>
                                <span class="badge badge-primary">${pct}% of Total</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
    `;
}

export function bindAnalyticsEvents(container) {
    // Analytics view events if needed
}
