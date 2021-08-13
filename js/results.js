const searchResultBox2 = document.querySelector("#search-results");
const mainContainer = document.querySelector("#main-container");
const viewResultBtn1 = document.querySelector("#view-result2");
const viewResultBtn22 = document.querySelector("#wheel-container button");

const finallResult = [];

function hideMainBox() {
    mainContainer.style = "display: none";
    searchResultBox2.style = "display: block";
    renderResults();
    convert();
}

 function convert() {
    let newArray = correctGrantList;
    
    newArray.map(async item => {

        item.startup_stage = await Promise.all(
            item.startup_stage.map(async (karuzelaId) => {
            const startup_stage = await fetch(`https://ftbi.siteon.pl/wp-json/wp/v2/startup_stage/${karuzelaId}`)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                return data
            });
            return startup_stage.name;
            })
            )
            
        item.services = await Promise.all(
            item.services.map(async (karuzelaId) => {
            const services = await fetch(`https://ftbi.siteon.pl/wp-json/wp/v2/services/${karuzelaId}`)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                return data
            });
            return services.name;
            })
            )


            item.industry_sector = await Promise.all(
                item.industry_sector.map(async (karuzelaId) => {
                const industry_sector = await fetch(`https://ftbi.siteon.pl/wp-json/wp/v2/industry_sector/${karuzelaId}`)
                .then((resp) => resp.json()) // Transform the data into json
                .then(function (data) {
                    return data
                });
                return industry_sector.name;
                })
                )

                item.funding_amound = await Promise.all(
                    item.funding_amound.map(async (karuzelaId) => {
                    const funding_amound = await fetch(`https://ftbi.siteon.pl/wp-json/wp/v2/funding_amound/${karuzelaId}`)
                    .then((resp) => resp.json()) // Transform the data into json
                    .then(function (data) {
                        return data
                    });
                    return funding_amound.name;
                    })
                    )

                    item.location = await Promise.all(
                        item.location.map(async (karuzelaId) => {
                        const location = await fetch(`https://ftbi.siteon.pl/wp-json/wp/v2/location/${karuzelaId}`)
                        .then((resp) => resp.json()) // Transform the data into json
                        .then(function (data) {
                            return data
                        });
                        return location.name;
                        })
                        )

                        item.type_grant = await Promise.all(
                            item.type_grant.map(async (karuzelaId) => {
                            const type_grant = await fetch(`https://ftbi.siteon.pl/wp-json/wp/v2/type_grant/${karuzelaId}`)
                            .then((resp) => resp.json()) // Transform the data into json
                            .then(function (data) {
                                return data
                            });
                            return type_grant.name;
                            })
                            )
        
                            finallResult.push(item);
    })
}

function renderResults() {
    let mainDoneList = correctGrantList;
    let containerResultBox = document.querySelector("div.results-box > div.container-box");
    document.querySelector("#results-score").innerHTML = `${mainDoneList.length} Results`
    mainDoneList.map(item => {
        
        const resultItem = document.createElement("div");
        resultItem.className = "result-item";
        resultItem.innerHTML = `<div class="result-item-header">
        <span><i class="far fa-calendar-alt"></i> Support</span> 
        <span><i class="far fa-calendar-alt"></i> Events</span>
    </div>

    <div class="result-item-title">
        <h3>${item.title.rendered}</h3>
    </div>

    <div style="text-align:center" class="result-item-content">
        <p class="${item.slug}result-content">${item.content.rendered.length < 180 ? item.content.rendered : item.content.rendered.slice(0, 180) + `...<span onclick="document.querySelector('.${item.slug}result-content').innerHTML = 'sadsa'" style='color: blue'>more</span>`}</p>
    </div>

    <div class="result-item-footer">
        <a href="${item.link}"><i class="fas fa-external-link-alt"></i> Visit website</a>
    </div>`;

    containerResultBox.appendChild(resultItem);
    })
 
}

viewResultBtn1.addEventListener("click", hideMainBox);
viewResultBtn22.addEventListener("click", hideMainBox);

