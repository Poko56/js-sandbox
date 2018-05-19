// set initial value for debugging
setInitialValue();

const loadngTime = 1000;

// listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';

    calculateResults();

    e.preventDefault();
});

// calculate results
function calculateResults() {

    // UI vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('results').style.display = 'block';
        }, loadngTime);
    } else {
        showError('Please check your numbers');
    }
}

// show error
function showError(error) {
    // hide results
    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'none';

    // create a div
    const errorDiv = document.createElement('div');
    // get element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    // add class
    errorDiv.className = 'alert alert-danger';
    // create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // insert error above heading
    card.insertBefore(errorDiv, heading);

    setTimeout(() => {
        // clear error after few seconds
        clearError();
    }, loadngTime);
}

// clear error
function clearError() {
    document.querySelector('.alert').remove();
}


// set initial value for development
function setInitialValue() {
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    amount.value = 87.38;
    interest.value = 25.4445;
    years.value = 13;
}