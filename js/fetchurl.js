console.log("im in fetchurl")

const inpUrl = document.getElementById("inpUrl")
const textArea = document.getElementById("txt")
const pbFetch = document.getElementById("pbFetchUrl")

function fetchAnyUrl(url) {
    console.log("inside fetch url=" + url)
    return  fetch(url).then(response => response.json());
}

function fetchAnyUrlText(url) {
    console.log("inside fetch text url=" + url)
    return  fetch(url).then(response => response.text());
}

function getKeysAndValuesFromObj(obj) {
    const keys = Object.keys(obj)
    const keyAndValueStr = keys.map(key => `${key} : ${obj[key]}`)
    return keyAndValueStr;
}


function actionFetchUrldum(btn) {
    const url = inpUrl.value;
    console.log(url)
    textArea.textContent = url
}

function skrivJsonUd(json) {
    debugger
    const keys = Object.keys(json)
    let outtxt = ""
    //keys.forEach(key => {outtxt += key + ": " + json[key] + "\n"})
    keys.forEach(key => outtxt += key + ": ")
    textArea.textContent = outtxt
}

async function actionFetchUrl(btn) {
    const url = inpUrl.value
    console.log(url)
    const jsonOutput = await fetchAnyUrl(url)
    //Her har vi json som kan være både array eller et enkelt object.
    //Vi starter med at teste om det er et array.
    let showTxt = ""
    if (Array.isArray(jsonOutput)) {
        showTxt = getKeysAndValuesFromObj(jsonOutput[0])
    } else {
        showTxt = getKeysAndValuesFromObj(jsonOutput)
    }
    textArea.textContent = showTxt
    console.log(jsonOutput)
}



pbFetch.addEventListener('click', actionFetchUrl)
