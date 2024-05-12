const homeValue = document.getElementById("homeValue");
const downPayment = document.getElementById("downPayment");
const loanAmount = document.getElementById("loanAmount");
const interestRate = document.getElementById("interestRate");
const loanDuration = document.getElementById("loanDuration");
const form = document.getElementById("mortgage");

downPayment.addEventListener("keyup", ()=>{
    loanAmount.value = homeValue.value - downPayment.value
    let loanAmountValue = loanAmount.value;
    return loanAmountValue;
});

function calculateMortgage(loanAmount, interestRate, numberOfMonthlyPayments){
    function percentageToDecimal(percent){
        return percent/12/100;
    }
    interestRate = percentageToDecimal(interestRate);

    function yearToMonth(year){
        return year * 12;
    }
    numberOfMonthlyPayments = yearToMonth(numberOfMonthlyPayments);

    let mortgage = (interestRate * loanAmount) / (1 - Math.pow(1 + interestRate, -numberOfMonthlyPayments));
    return parseFloat(mortgage.toFixed(2))
}

form.onsubmit = (e) => {
    e.preventDefault();
    if (validate()) {
        let loanAmount = homeValue.value - downPayment.value;
        let interestRateValue = parseFloat(interestRate.value); // Convert interest rate to a float
        if (!isNaN(interestRateValue)) { // Check if the conversion was successful
            let monthlyPayment = calculateMortgage(loanAmount, interestRateValue, loanDuration.value);

            document.getElementById("monthlyPayment").innerHTML = `<h4>Monthly Payment: $ ${monthlyPayment}</h4>`;
            document.getElementById("home").innerHTML = `<td>Home Value</td><td> $ ${homeValue.value}</td>`;
            document.getElementById("down").innerHTML = `<td>Down Payment</td><td> $ ${downPayment.value}</td>`;
            document.getElementById("loan").innerHTML = `<td>Loan Amount</td><td> $ ${loanAmount}</td>`;
            document.getElementById("interest").innerHTML = `<td>Interest Rate</td><td> ${interestRateValue} %</td>`;
            document.getElementById("duration").innerHTML = `<td>Loan Duration</td><td> ${loanDuration.value} years</td>`;
        } else {
            alert("Please enter a valid interest rate."); // Alert the user if the interest rate is invalid
        }
    }
};


function validate() {
    if (homeValue.value === "" || downPayment.value === "" || loanAmount.value === "" || interestRate.value === "" || loanDuration === "") {
        alert("Please complete all fields");
        return false; // Validation failed
    }
    return true; // Validation passed
}
