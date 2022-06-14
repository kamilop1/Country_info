function updateDisplay(fetched_stuff){
    if(!Array.isArray(fetched_stuff)){
        document.querySelector("#noResults").style.display="block";
        document.querySelector("#countries").innerHTML="";
    } else {
        document.querySelector("#noResults").style.display="none";
        let countries = document.querySelector("#countries");
        countries.innerHTML="";
        fetched_stuff.sort((a,b) => (a.name.common > b.name.common) ? 1 : ((b.name.common > a.name.common) ? -1 : 0))
        fetched_stuff.forEach(country => {
            let link = document.createElement("a");
            link.setAttribute("class","searchResult");
            link.setAttribute("href","./country.html?"+country.ccn3);
            link.innerText=country.name.common;
            countries.appendChild(link)
        })
    }
}
function fetchCountries(search_value){
    if(search_value == ""){
        search_value = "all"
    } else {
        search_value = "name/"+search_value;
    }
    fetch('https://restcountries.com/v3.1/'+search_value)
    .then(res => res.json())
    .then(out => updateDisplay(out))
    .catch(err => {alert("load error: "+err)})
}
window.addEventListener("load", evt => {
    let search = document.querySelector("#search");
    fetchCountries(search.value)
    search.addEventListener("input",evt => {
        fetchCountries(search.value)
    })
})