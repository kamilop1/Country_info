fetch('https://restcountries.com/v3.1/all')
.then(res => res.json())
.then(out => readAllCountries(out))
.catch(err => {alert("load error")})

let allCountryNames = [];

function readAllCountries(countries){
    for(cnt of countries)[
        allCountryNames.push(cnt.name.common)
    ]
    allCountryNames.sort()
    updateDisplay(allCountryNames)
}
function updateDisplay(arr){
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
    console.log(search)
    search.addEventListener("input",evt => {
        let regex = new RegExp(`${search.value}`,"i")
        console.log(allCountryNames)
        let filtered = allCountryNames.filter(el => el.match(regex))
        updateDisplay(filtered)
    })
})