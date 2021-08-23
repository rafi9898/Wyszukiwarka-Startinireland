const searchResultBox2 = document.querySelector("#search-results");
const mainContainer = document.querySelector("#main-container");
const viewResultBtn1 = document.querySelector("#view-result2");
const viewResultBtn22 = document.querySelector("#wheel-container button");
const startAgainBtn = document.querySelector("#start-again");
 
const finallResult = [];
 
//Options Tab
const allOptions = document.querySelector("#all-options");
const foundingOptions = document.querySelector("#founding-options");
const supportOptions = document.querySelector("#support-options");
const servicesOptions = document.querySelector("#services-options");
const eventsOptions = document.querySelector("#events-options");
 
 
startAgainBtn.addEventListener("click", () => {
    window.location.reload(true);
})
 
allOptions.addEventListener("click", () => {
    allOptions.style = 'border-color: #fff !important;';
    foundingOptions.style = 'border-color: transparent !important;';
    supportOptions.style = 'border-color: transparent !important;';
    servicesOptions.style = 'border-color: transparent !important;';
    eventsOptions.style = 'border-color: transparent !important;';
    renderTabList("All");
})
 
foundingOptions.addEventListener("click", () => {
    allOptions.style = 'border-color: transparent !important;';
    foundingOptions.style = 'border-color: #fff !important;';
    supportOptions.style = 'border-color: transparent !important;';
    servicesOptions.style = 'border-color: transparent !important;';
    eventsOptions.style = 'border-color: transparent !important;';
    renderTabList("Funding");
})
 
supportOptions.addEventListener("click", () => {
    allOptions.style = 'border-color: transparent !important;';
    foundingOptions.style = 'border-color: transparent !important;';
    supportOptions.style = 'border-color: #fff !important;';
    servicesOptions.style = 'border-color: transparent !important;';
    eventsOptions.style = 'border-color: transparent !important;';
    renderTabList("Support");
})
 
servicesOptions.addEventListener("click", () => {
    allOptions.style = 'border-color: transparent !important;';
    foundingOptions.style = 'border-color: transparent !important;';
    supportOptions.style = 'border-color: transparent !important;';
    servicesOptions.style = 'border-color: #fff !important;';
    eventsOptions.style = 'border-color: transparent !important;';
    renderTabList("Services");
})
 
eventsOptions.addEventListener("click", () => {
    allOptions.style = 'border-color: transparent !important;';
    foundingOptions.style = 'border-color: transparent !important;';
    supportOptions.style = 'border-color: transparent !important;';
    servicesOptions.style = 'border-color: transparent !important;';
    eventsOptions.style = 'border-color: #fff !important;';
    renderTabList("Events");
})
 
function renderTabList(search) {
    let resultSearch = search === 'All' ? finallResult : finallResult.filter(item => item.type_grant.some(i => i.includes(`${search}`)));
 
    let containerResultBox = document.querySelector("div.results-box > div.container-box");
    containerResultBox.innerHTML = '';
    document.querySelector("#results-score").innerHTML = `${correctGrantList.length} Results`
    resultSearch.map(item => {
        const resultItem = document.createElement("div");
        resultItem.className = "result-item";
        resultItem.innerHTML = `<div class="result-item-header">
        ${item.type_grant.map(type => {
            return `<span>${type}</span> `
        })}
    </div>
 
    <div class="result-item-title">
        <h3>${item.title.rendered}</h3>
    </div>
 
    <div style="text-align:center" class="result-item-content">
    <p class="${item.slug}result-content">${item.content.rendered.length < 180 ? item.content.rendered.substr() : item.content.rendered.substr().slice(0, 180)}</p><span key='${item.content.rendered}' style="color: blue; cursor: pointer;" onclick="showMore(this)" class="show-more-text">...More</span>
    </div>
 
    <div class="result-item-footer">
    ${item.website.length > 0 ? `<a target="_blank" href="${item.website}"><i class="fas fa-external-link-alt"></i> Visit website</a>` : ""}
    </div>`;
 
        containerResultBox.appendChild(resultItem);
    })
 
}
 
function hideMainBox() {
    mainContainer.style = "display: none";
    searchResultBox2.style = "display: block";
    convert();
}
 
 
async function convert() {
    let newArray = correctGrantList;
    const tasks = Promise.all([
        // startup_stage:
        fetch(`https://ftbi.siteon.pl/wp-json/wp/v2/startup_stage?per_page=100`),
        // services:
        fetch(`https://ftbi.siteon.pl/wp-json/wp/v2/services?per_page=100`),
        // cover:
        fetch(`https://ftbi.siteon.pl/wp-json/wp/v2/cover?per_page=100`),
        // how_apply:
        fetch(`https://ftbi.siteon.pl/wp-json/wp/v2/how_apply?per_page=100`),
        // source:
        fetch(`https://ftbi.siteon.pl/wp-json/wp/v2/source?per_page=100`),
        // purpose:
        fetch(`https://ftbi.siteon.pl/wp-json/wp/v2/purpose?per_page=100`),
        // minority:
        fetch(`https://ftbi.siteon.pl/wp-json/wp/v2/minority?per_page=100`),
        // industry_sector:
        fetch(`https://ftbi.siteon.pl/wp-json/wp/v2/industry_sector?per_page=100`),
        // funding_amound:
        fetch(`https://ftbi.siteon.pl/wp-json/wp/v2/funding_amound?per_page=100`),
        // location:
        fetch(`https://ftbi.siteon.pl/wp-json/wp/v2/location?per_page=100`),
        // type_grant:
        fetch(`https://ftbi.siteon.pl/wp-json/wp/v2/type_grant?per_page=100`),
        //Website
        fetch(`https://ftbi.siteon.pl/wp-json/wp/v2/website?per_page=100`),
    ])
 
    const data = await tasks
    const startup_stage = await data[0].json()
    const services = await data[1].json()
    const cover = await data[2].json()
    const how_apply = await data[3].json()
    const source = await data[4].json()
    const purpose = await data[5].json()
    const minority = await data[6].json()
    const industry_sector = await data[7].json()
    const funding_amound = await data[8].json()
    const location = await data[9].json()
    const type_grant = await data[10].json()
    const website = await data[11].json()
 
    newArray.map(async item => {
 
        item.startup_stage = item.startup_stage.map((id) => startup_stage.find(s => s.id == id)).filter(Boolean).map(i => i.name)
        item.services = item.services.map((id) => services.find(s => s.id == id)).filter(Boolean).map(i => i.name)
        item.website = item.website.map((id) => website.find(s => s.id == id)).filter(Boolean).map(i => i.name)
        item.cover = item.cover.map((id) => cover.find(s => s.id == id)).filter(Boolean).map(i => i.name)
        item.how_apply = item.how_apply.map((id) => how_apply.find(s => s.id == id)).filter(Boolean).map(i => i.name)
        item.source = item.source.map((id) => source.find(s => s.id == id)).filter(Boolean).map(i => i.name)
        item.purpose =  item.purpose.map((id) => purpose.find(s => s.id == id)).filter(Boolean).map(i => i.name)
        item.minority = item.minority.map((id) => minority.find(s => s.id == id)).filter(Boolean).map(i => i.name)
        item.industry_sector = item.industry_sector.map((id) => industry_sector.find(s => s.id == id)).filter(Boolean).map(i => i.name)
        item.funding_amound = item.funding_amound.map((id) => funding_amound.find(s => s.id == id)).filter(Boolean).map(i => i.name)
        item.location = item.location.map((id) => location.find(s => s.id == id)).filter(Boolean).map(i => i.name)
        item.type_grant = item.type_grant.map((id) => type_grant.find(s => s.id == id)).filter(Boolean).map(i => i.name)
 
        finallResult.push(item);
        renderResults();
    })
}

function showMore(e) {
    const value = e.getAttribute("key");
    e.style = "color: #333"
    e.innerHTML = value.slice(180, value.length)
}

 
function renderResults() {
    let mainDoneList = finallResult;
    let containerResultBox = document.querySelector("div.results-box > div.container-box");
    containerResultBox.innerHTML = '';
    document.querySelector("#results-score").innerHTML = `${correctGrantList.length} Results`
    mainDoneList.map(item => {
        const resultItem = document.createElement("div");
        resultItem.className = "result-item";
        resultItem.innerHTML = `<div class="result-item-header">
        ${item.type_grant.map(type => {
            return `<span></i> ${type}</span> `
        })}
    </div>
 
    <div class="result-item-title">
        <h3>${item.title.rendered}</h3>
    </div>
 
    <div style="text-align:center" class="result-item-content">
    <p class="${item.slug}result-content">${item.content.rendered.length < 180 ? item.content.rendered : item.content.rendered.slice(0, 180)}</p><span key='${item.content.rendered}' style="color: blue; cursor: pointer;" onclick="showMore(this)" class="show-more-text">...More</span>
    </div>
 
    <div class="result-item-footer">
        ${item.website.length > 0 ? `<a target="_blank" href="${item.website}"><i class="fas fa-external-link-alt"></i> Visit website</a>` : ""}
    </div>`;
 
        containerResultBox.appendChild(resultItem);
    })
 
}
 
viewResultBtn1.addEventListener("click", hideMainBox);
viewResultBtn22.addEventListener("click", hideMainBox);