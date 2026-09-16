const urlKommune = "https://api.dataforsyningen.dk/kommuner";

const pbFetchKommuner = document.getElementById("pbFetchKommuner");
const kommunePopover = document.getElementById("kommunePopover");


async function actionFetch() {
    const response = await fetch(urlKommune);
    const kommuner = await response.json();

    kommuner.sort((a, b) => a.navn.localeCompare(b.navn));

    kommunePopover.replaceChildren();

    kommuner.forEach(kommune => {
        const li = document.createElement("li");
        const link = document.createElement("a");

        link.textContent = kommune.navn;
        link.href = kommune.href;

        li.appendChild(link);
        kommunePopover.appendChild(li);
    });
}


pbFetchKommuner.addEventListener("click", actionFetch);