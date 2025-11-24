const data_paths = {
    "en": "src/articles/games.en.json",
    "pt-br": "src/articles/games.ptbr.json",
};
const cfg_git = "https://raw.githubusercontent.com/Tom-Bruise/PS2-OPL-CFG-Database/refs/heads/master/CFG_en/"


let data = {};

async function buscar() {
    let response = await fetch(
        data_paths[document.documentElement.lang.toLowerCase()]
    )
    data = await response.json();

    const search_input = document.querySelector("#search")
    let search_str = search_input.value.toLowerCase();

    console.log(search_str);


    filtered = data.filter(i =>
        i.Title && i.Title.toLowerCase().includes(search_str) ||
        i.Serial && i.Serial.toLowerCase().includes(search_str)
    )

    clearResult()
    if (filtered.length > 0) {
        filtered.forEach(function (json) {
            document.querySelector(".search-result")
                .appendChild(buildArticle(json))
        })
    }
    else {
        document.querySelector(".search-result").innerHTML = `
        <p class="placeholder">
            Nenhum resultado encontrado
        </p>        `
    }
}

function clearResult() {
    document.querySelector(".search-result").innerHTML = ""
}

function buildArticle(json) {
    let main = document.createElement("article")
    main.classList.add("card")

    let title = document.createElement("h2")
    let subtitle = document.createElement("h4")
    let text = document.createElement("p")

    // Set title and Serial ()

    title.textContent = (json.Title) ? `${json.Title} (${json.Serial})` : json.Serial;
    main.appendChild(title)

    // Set tags
    release = json["Release"]
    release = (release) ? release : ""

    dev = json["Developer"]
    dev = (dev) ? dev : ""

    if (release && dev) {
        subtitle.textContent = `${release} - ${dev}`
    }
    else {
        subtitle.textContent = release + dev
    }

    main.appendChild(subtitle)

    // Set description
    desc = json["Description"]
    if (desc) {
        text.textContent = desc
    }
    else {
        text.textContent = "Descrição não está disponível"
    }

    main.appendChild(text)

    let download = document.createElement("div")
    download.innerHTML = createDownloadLinks(json.Serial)

    main.appendChild(download)

    return main
}

function createDownloadLinks(Serial) {
    let flink = cfg_git + Serial + ".cfg"

    return `<a href="${flink}" target="_blank" class="file-download">
        <span class="material-symbols-outlined">file_present</span>
        <span>CFG</span>
    </a>`
}

addEventListener("DOMContentLoaded", function () {
    this.document.querySelectorAll("a").forEach(function (tag) {
        tag.setAttribute("target", "_blank")
    });

    document.querySelector("#search").addEventListener('keypress', function(event) {
        if (event.key === 'Enter') buscar();
    });
});

