const urlKommune = "https://api.dataforsyningen.dk/kommuner";

const pbFetchKommuner = document.getElementById("pbFetchKommuner")
const ddKommuner = document.getElementById("ddKommuner")
const divTag = document.getElementById("atags")

function fetchAnyUrl(any) {
    return fetch(any).then(response => response.json()).catch(error => console.error(error));
}


function createKommuneHref() {
    const option = ddKommuner.selectedOptions[0];

    const el = document.createElement("a");
    el.textContent = option.textContent;
    el.href = option.dataset.href;

    divTag.appendChild(el);
}

function fillDropdown(kommune) {
    const option = document.createElement("option");

    option.textContent = kommune.navn;
    option.value = kommune.kode;
    option.dataset.href = kommune.href; // gemmer blot datasættet som link

    ddKommuner.appendChild(option);
}

// map var her - den var overflødig

async function actionFetch() {
    const kommuner = await fetchAnyUrl(urlKommune);

    kommuner.sort((a, b) => a.navn > b.navn ? 1 : -1);

    kommuner.forEach(kommune => fillDropdown(kommune));
}

pbFetchKommuner.addEventListener('click', actionFetch)
ddKommuner.addEventListener('change', createKommuneHref)


