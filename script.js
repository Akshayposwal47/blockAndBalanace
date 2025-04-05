document.addEventListener('DOMContentLoaded', () => {
    // Initialize calculator
    initializeCalculator();
    // Display any active loans
    displayActiveLoans();
});

function initializeCalculator() {
    // Add event listeners for real-time updates
    const inputs = ['amount', 'duration'];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('input', calculateLoan);
    });
    document.getElementById('purpose').addEventListener('change', calculateLoan);
}

function calculateLoan() {
    // Get input values
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const duration = parseInt(document.getElementById('duration').value) || 0;
    const purpose = document.getElementById('purpose').value;

    // Validate inputs
    if (!amount || !duration) {
        document.getElementById('loan-summary').innerHTML = 
            '<p style="color: red;">Please fill in all fields</p>';
        return;
    }

    // Calculate loan details (5% APR)
    const annualRate = 12.00;
    const monthlyRate = annualRate / 30;
    const totalInterest = amount * monthlyRate * duration;
    const totalRepayment = amount + totalInterest;
    const monthlyPayment = totalRepayment / duration;

    // Display results
    displayLoanSummary(amount, duration, annualRate, totalInterest, totalRepayment, dailyPayment, purpose);
}

function displayLoanSummary(amount, duration, rate, interest, total, monthly, purpose) {
    const loanSummary = document.getElementById('loan-summary');
    loanSummary.innerHTML = `
        <div class="summary-box">
            <h3>Loan Summary</h3>
            <div class="summary-details">
                <p><strong>Principal Amount:</strong> $${amount.toFixed(2)}</p>
                <p><strong>Duration:</strong> ${duration} months</p>
                <p><strong>Interest Rate:</strong> ${(rate * 100).toFixed(1)}% APR</p>
                <p><strong>Total Interest:</strong> $${interest.toFixed(2)}</p>
                <p><strong>Total Repayment:</strong> $${total.toFixed(2)}</p>
                <p><strong>Daily Payment:</strong> $${monthly.toFixed(2)}</p>
                <p><strong>Purpose:</strong> ${purpose}</p>
            </div>
        </div>
    `;
}

function displayActiveLoans() {
    const loansGrid = document.getElementById('loans-grid');
    // Sample active loans data
    const activeLoans = [
        {
            amount: 1000,
            duration: 30,
            purpose: 'Medical Emergency',
            funded: '80%'
        },
        {
            amount: 2000,
            duration: 60,
            purpose: 'Housing Emergency',
            funded: '40%'
        }
    ];

    loansGrid.innerHTML = activeLoans.map(loan => `
        <div class="loan-card">
            <h3>$${loan.amount}</h3>
            <p>Duration: ${loan.duration} days</p>
            <p>Purpose: ${loan.purpose}</p>
            <div class="progress-bar">
                <div class="progress" style="width: ${loan.funded}"></div>
            </div>
            <p>Funded: ${loan.funded}</p>
        </div>
    `).join('');
}