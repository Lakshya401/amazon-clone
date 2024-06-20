const BASE_URL ="https://latest.currency-api.pages.dev/v1/currencies/inr.json";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button");
const fromcurr= document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const sg = document.querySelector(".msg");
for(let select of dropdowns){
    for (currcode in countryList){
    let newOption=document.createElement("option");
    newOption.innerText=currcode;
    newOption.value=currcode;
    if(select.name==="from"&& currcode ==="USD") {
        newOption.selected="selected";
    } else if (select.name==="to"&& currcode==="INR"){
        newOption.selected="selected"
    }
    select.append(newOption);
 }
 select.addEventListener("change", (evt) =>{
    updateFlag(evt.target); 
 });
}

const updateFlag =(element) => {
   let currcode =element.value;
   let countrycode = countryList[currcode];
   let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
   let img= element.parentElement.querySelector("img");
   img.src=newSrc;
};

btn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
  let amount=document.querySelector(".amount input");
  let amtval=amount.value;
  if(amtval==="" || amtval < 1){
    amtval=1;
    amount.value="1";
  }
  //console.log(fromcurr.value , tocurr.value);
  const URL= `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}`
  let response= await fetch(URL);
  let data = await response.json();
  let rate= data[tocurr.value.toLowerCase()];
  

    let finalAmount=amtval*rate;
    MessageChannel.innertext = `${amtval} ${fromcurr.value}= ${finalAmount} ${tocurr.val}`
});
