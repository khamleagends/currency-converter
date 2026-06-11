const currencies=document.getElementsByClassName("Currency");
import list from './codes.js';
let code="IN"
var flag1=document.querySelector("#flag1");
var flag2=document.querySelector("#flag2");

// Dynamically populate currency options from codes.js
const currencyCodes = Object.keys(list);
Array.from(currencies).forEach((select) => {
    currencyCodes.forEach((currencyCode) => {
        const option = document.createElement("option");
        option.value = currencyCode;
        option.textContent = currencyCode;
        select.appendChild(option);
    });
});

// Event listener for currency change
Array.from(currencies).forEach((currency)=>{//first converted to array then for each loop is applied
   currency.addEventListener("change",()=>{
        console.log("Selected Currency:",currency.value);
        code=list[currency.value];
        if(currency.id=="from")
            flag1.src=`https://flagsapi.com/${code}/flat/64.png`;
        if(currency.id=="to")
            flag2.src=`https://flagsapi.com/${code}/flat/64.png`;
    })
})
//for converting currency
// Grab the new elements we added to the HTML
const btn = document.querySelector("#convertBtn");
const amountInput = document.querySelector("#amount");
const fromCurr = document.querySelector("#from");
const toCurr = document.querySelector("#to");
const msg = document.querySelector(".msg");

// Set default dropdown values so they match your initial US and IN flags
window.addEventListener("load", () => {
    document.querySelector("#from").value = "USD";
    document.querySelector("#to").value = "INR";
});

// The core conversion logic
btn.addEventListener("click", async (evt) => {
    // Prevent the default form submission behavior (which refreshes the page)
    evt.preventDefault(); 
    
    let amountVal = amountInput.value;
    
    // If the user leaves it blank or enters a negative number, default to 1
    if (amountVal === "" || amountVal < 1) {
        amountVal = 1;
        amountInput.value = "1";
    }

    // Using a free, public exchange rate API
    const URL = `https://api.exchangerate-api.com/v4/latest/${fromCurr.value}`;
    
    msg.innerText = "Getting exchange rate...";

    try {
        // Fetch the data from the API
        let response = await fetch(URL);
        let data = await response.json();
        
        // Get the specific rate for the target currency
        let rate = data.rates[toCurr.value];
        
        // Calculate the final amount and round to 2 decimal places
        let finalAmount = (amountVal * rate).toFixed(2);
        
        // Display the result
        msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } catch (error) {
        msg.innerText = "Error fetching exchange rate. Check your internet connection.";
        console.error(error);
    }
});