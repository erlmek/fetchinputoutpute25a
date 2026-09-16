const urlKommune = "https://api.dataforsyningen.dk/kommuner";

const pbFetchKommuner = document.getElementById("pbFetchKommuner")
const ddKommuner = document.getElementById("ddKommuner")
const divTag = document.getElementById("atags")

function fetchAnyUrl(any) {
    return fetch(any).then(response => response.json()).catch(error => console.error(error));
}

function fillDropdown(kommune) {
    const el = document.createElement("option")
    el.textContent = kommune.navn
    el.value = kommune.kode
    ddKommuner.appendChild(el)
}

function createKommuneHref() {
    const selindex = ddKommuner.selectedIndex;
    const kommunekode = ddKommuner.options[selindex].value;
    const kommune = kommuneMap.get(kommunekode)
    console.log(kommunekode)
    const el = document.createElement("a")
    el.innerText = kommune.navn
    el.setAttribute("href", kommune.href)
    divTag.appendChild(el)
}

const kommuneMap = new Map();

function fillKommuneMap(kommuneArr) {
    kommuneArr.forEach(kommune => kommuneMap.set(kommune.kode, kommune))
}

async function actionFetch() {
    const kommuner = await fetchAnyUrl(urlKommune);
    kommuner.sort((a,b) => a.navn > b.navn ? 1 : -1)
    fillKommuneMap(kommuner)
    console.log(kommuneMap)
    kommuner.forEach(kommune => fillDropdown(kommune))
    //console.log(kommuner)
}

pbFetchKommuner.addEventListener('click', actionFetch)
ddKommuner.addEventListener('change', createKommuneHref)


