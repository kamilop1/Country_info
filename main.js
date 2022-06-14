fetch('https://restcountries.com/v3.1/all')
.then(res => res.json())
.then(out => readAllCountries(out))
.catch(err => {alert("load error: "+err)})

let allCountryNames = [], allCountryPolishNames = [];

function readAllCountries(countries){
    for(cnt of countries){
        allCountryPolishNames.push(cnt.translations.pol.common)
        allCountryNames.push(cnt.name.common)
    }
    updateDisplay([...allCountryNames,...allCountryPolishNames])
}
function updateDisplay(arr){
    arr.sort()
    let countries = document.querySelector("#countries");
    countries.innerHTML="";
    arr.forEach(el => {
        let div = document.createElement("div");
        div.setAttribute("class","searchResult");
        div.innerText=el;
        countries.appendChild(div)
    })
}
let search;
window.addEventListener("load", evt => {
    search = document.querySelector("#search");
    search.addEventListener("input",evt => {
        let regex = new RegExp(`${search.value}`,"i")
        let filtered_eng = allCountryNames.filter(el => el.match(regex))
        let filtered_pol = allCountryPolishNames.filter(el => el.match(regex))
        updateDisplay([...filtered_eng,...filtered_pol])
    })
})