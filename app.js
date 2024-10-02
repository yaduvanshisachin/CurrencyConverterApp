
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const api_key = '467bb8a7f6fc0db831767a09';

// Adding options for all currency codes in option
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

//Updating flags when specific contry is selected
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

async function updateExchangeRate(){
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const api_url = `https://v6.exchangerate-api.com/v6/${api_key}/latest/${fromCurr.value}`;
  let response = await fetch(api_url);
  let data = await response.json();
  const rate = data.conversion_rates;
  // console.log(rate);
  
  // console.log(rate[toCurr.value]);
  
  let finalAmount = amtVal * rate[toCurr.value];
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}


btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
