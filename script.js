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
