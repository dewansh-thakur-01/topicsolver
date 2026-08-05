// Tuition & Fee Management Component

import { store } from '../state.js';
import { formatCurrency, getFeeBadgeClass, getStudentAvatar } from '../utils/helpers.js';
import { showToast } from '../utils/toast.js';

let statusFilter = 'ALL';

export function renderFees() {
    let students = [...store.students];

    if (statusFilter !== 'ALL') {
        students = students.filter(s => s.feeStatus === statusFilter);
    }

    const totalBilled = store.students.reduce((acc, s) => acc + (s.tuitionFee || 12500), 0);
    const totalCollected = store.students.reduce((acc, s) => acc + (s.paidFee || 0), 0);
    const totalOutstanding = totalBilled - totalCollected;

    return `
        <div class="metrics-grid" style="margin-bottom: 24px;">
            <div class="glass-card metric-card">
                <div class="metric-icon" style="background: rgba(99, 102, 241, 0.15); color: var(--primary);">
                    <i class="fa-solid fa-file-invoice-dollar"></i>
                </div>
                <div class="metric-info">
                    <span class="metric-label">Total Billed Tuition</span>
                    <span class="metric-value">${formatCurrency(totalBilled)}</span>
                </div>
            </div>

            <div class="glass-card metric-card">
                <div class="metric-icon" style="background: rgba(16, 185, 129, 0.15); color: var(--success);">
                    <i class="fa-solid fa-circle-dollar-to-slot"></i>
                </div>
                <div class="metric-info">
                    <span class="metric-label">Total Fee Collected</span>
                    <span class="metric-value" style="color: var(--success);">${formatCurrency(totalCollected)}</span>
                </div>
            </div>

            <div class="glass-card metric-card">
                <div class="metric-icon" style="background: rgba(239, 68, 68, 0.15); color: var(--danger);">
                    <i class="fa-solid fa-hand-holding-dollar"></i>
                </div>
                <div class="metric-info">
                    <span class="metric-label">Outstanding Tuition Balance</span>
                    <span class="metric-value" style="color: var(--danger);">${formatCurrency(totalOutstanding)}</span>
                </div>
            </div>
        </div>

        <div class="glass-card">
            <div class="section-header">
                <div class="section-title">
                    <h3>Student Tuition Accounts</h3>
                    <p>Track payments, log fees, and issue digital tuition payment receipts</p>
                </div>
            </div>

            <div class="controls-bar">
                <div class="filter-group">
                    <label style="font-size: 12px; font-weight: 700; color: var(--text-muted);">Payment Status:</label>
                    <select class="select-input" id="fee-status-filter">
                        <option value="ALL" ${statusFilter === 'ALL' ? 'selected' : ''}>All Accounts</option>
                        <option value="Paid" ${statusFilter === 'Paid' ? 'selected' : ''}>Paid</option>
                        <option value="Partial" ${statusFilter === 'Partial' ? 'selected' : ''}>Partial</option>
                        <option value="Overdue" ${statusFilter === 'Overdue' ? 'selected' : ''}>Overdue</option>
                    </select>
                </div>
            </div>

            <div class="table-responsive">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Total Tuition</th>
                            <th>Amount Paid</th>
                            <th>Balance Due</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${students.map(s => {
                            const balance = (s.tuitionFee || 12500) - (s.paidFee || 0);
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
                                    <td>${formatCurrency(s.tuitionFee || 12500)}</td>
                                    <td style="color: var(--success); font-weight: 700;">${formatCurrency(s.paidFee || 0)}</td>
                                    <td style="color: ${balance > 0 ? 'var(--danger)' : 'var(--text-muted)'}; font-weight: 700;">${formatCurrency(balance)}</td>
                                    <td><span class="badge ${getFeeBadgeClass(s.feeStatus)}">${s.feeStatus}</span></td>
                                    <td>
                                        <button class="btn btn-secondary btn-sm record-fee-btn" data-id="${s.id}">
                                            <i class="fa-solid fa-plus-circle"></i> Record Payment
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

export function bindFeesEvents(container) {
    const filter = container.querySelector('#fee-status-filter');
    if (filter) {
        filter.addEventListener('change', (e) => {
            statusFilter = e.target.value;
            store.notify();
        });
    }

    container.querySelectorAll('.record-fee-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const studentId = e.currentTarget.getAttribute('data-id');
            const student = store.students.find(s => s.id === studentId);
            if (!student) return;

            const balance = (student.tuitionFee || 12500) - (student.paidFee || 0);
            if (balance <= 0) {
                showToast('Tuition fee is already fully paid for this student!', 'info');
                return;
            }

            const amountStr = prompt(`Enter payment amount for ${student.firstName} (Max ${formatCurrency(balance)}):`, balance);
            if (amountStr && !isNaN(amountStr)) {
                store.recordFeePayment(studentId, amountStr);
                showToast(`Payment of ${formatCurrency(amountStr)} recorded!`, 'success');
            }
        });
    });
}
