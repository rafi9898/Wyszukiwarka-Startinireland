const selectAllSector = document.querySelector("#select-all-sectors");
const selectAllServices = document.querySelector("#select-all-services");
const selectPrice = document.querySelector("select#choices-multiple-remove-button");
const selectLocation = document.querySelector("select.location-select");
const numberOfResultsSpan = document.querySelector("#number-of-current-item");
const minorityCheckbox = document.querySelector("#minority-checkbox");
let minorityId;
let checkedSector = false;
let checkedServices = false;
 
 
//SEARCH ATTRIBUTE
let selectedSectors = [];
let selectedStartUp = [];
let selectedServices = [];
let selectedFounding = [];
let selectedLocation = [];
let selectedMinority = false;
 
 
//Correct List
let correctGrantList = 0;
let grants = []
let prices = {
    "1": [],
    "2": [],
    "3": [],
    "4": []
}
 
//Types
const typeWheel = document.querySelector("div.chart-details-2 > div.containers")



const renderChartNew = () => {
    renderChartGlobal(selectedSectors.length > 0 ? '#34254A' : '#563769', selectedStartUp.length > 0 ? '#34254A' : '#563769', selectedServices.length > 0 ? '#34254A' : '#563769', selectedFounding.length > 0 ? '#34254A' : '#563769', selectedLocation.length > 0 ? '#34254A' : '#563769');
    let selectedCounter = 0;
    if(selectedSectors.length > 0)  selectedCounter++
    if(selectedStartUp.length > 0)  selectedCounter++
    if(selectedServices.length > 0)  selectedCounter++
    if(selectedFounding.length > 0)  selectedCounter++
    if(selectedLocation.length > 0)  selectedCounter++
    document.querySelector("#number-active-options").innerHTML = selectedCounter
}
 
fetchGrants()
 
function fetchGrants() {
    fetch("https://ftbi.siteon.pl/wp-json/wp/v2/grants?per_page=100")
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            grants = data;
            correctGrantList = data;
            numberOfResultsSpan.innerHTML = correctGrantList.length;
        })
      
}
 
function fetchPrices() {
    fetch("https://ftbi.siteon.pl/wp-json/wp/v2/funding_amound?per_page=100")
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            const pricesObj = {
                "1": data.filter(d => d.slug >=0 && d.slug < 50000),
                "2": data.filter(d => d.slug >=50000 && d.slug < 250000),
                "3": data.filter(d => d.slug >=250000 && d.slug < 1000000),
                "4": data.filter(d => d.slug >=1000000)
            }
 
            prices = pricesObj
        })
}
fetchPrices()
 
 
const filter = () => {
    let filtered = grants
 
 
    if (selectedSectors.length !== 0) {
        filtered = filtered.filter(grant => selectedSectors.some(i => grant.industry_sector.includes(Number(i))))
    }
    if (selectedMinority) {
        filtered = filtered.filter(grant => grant.minority.includes(minorityId))
    }

    if(selectedStartUp.length !== 0) {
        filtered = filtered.filter(grant => selectedStartUp.some(i => grant.startup_stage.includes(Number(i))))
    }
    if(selectedServices.length !== 0) {
        filtered = filtered.filter(grant => selectedServices.some(i => grant.services.includes(Number(i))))
    }
 
    if(selectedFounding.length !== 0) {
        filtered = filtered.filter(grant => selectedFounding.some(i => prices[String(i)].find(price => grant.funding_amound.includes(Number(price.id))) ))
    }
 
    if(selectedLocation.length !== 0 && !selectedLocation.includes('All')) {
        filtered = filtered.filter(grant => selectedLocation.some(i => grant.location.includes(Number(i))))
    }
    correctGrantList = filtered
    numberOfResultsSpan.innerHTML = correctGrantList.length;
    renderChartNew();
    renderChartData();
}


function renderChartData() {
    fetch("https://ftbi.siteon.pl/wp-json/wp/v2/type_grant")
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            const mapData = data;
            typeWheel.innerHTML = "";
            mapData.map(tData  => {
               const lengthType = correctGrantList.filter(grant => grant.type_grant.includes(tData.id)).length;

                const spanElement = document.createElement("span");
                spanElement.innerHTML = `${tData.name}: ${lengthType}`;
                typeWheel.appendChild(spanElement);
                
            })
            
        })


}

 
const setStartup = (id) => {
    selectedStartUp = [id];
    filter()
}
 
minorityCheckbox.addEventListener("change", (e) => {
     fetch(`https://ftbi.siteon.pl/wp-json/wp/v2/minority`)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
        data.map(item => {
            if(item.name === "Yes") {
                minorityId = item.id;
            }
        })
        selectedMinority = e.target.checked;
        filter()
    });
})
 
selectLocation.addEventListener("change", (e) => {
    selectedLocation = [];
    const options = document.querySelectorAll("select.location-select > option");
    options.forEach(item => {
        selectedLocation.push(item.value)
    })
    filter()
})
 
selectPrice.addEventListener("change", (e) => {
    selectedFounding = [];
    const options = document.querySelectorAll("select#choices-multiple-remove-button > option");
    options.forEach(item => {
        selectedFounding.push(item.value)
    })
    filter()
})
 
const setServices = (id) => {
    const index = selectedServices.indexOf(id);
    if (index > -1) {
        selectedServices.splice(index, 1);
    } else {
        selectedServices.push(id)
    }
    filter()
}
 
const setSector = (id) => {
    const index = selectedSectors.indexOf(id);
    if (index > -1) {
        selectedSectors.splice(index, 1);
    } else {
        selectedSectors.push(id)
    }
    filter()
}
 
 
selectAllSector.addEventListener("change", (e) => {
    const allSelects = document.querySelectorAll("#sector-one-box > div.options > label > input");
    if (!checkedSector) {
        selectedSectors = [];
        allSelects.forEach(item => {
            item.checked = "true"
            checkedSector = !checkedSector;
            selectedSectors.push(item.value);
        });
    } else {
        selectedSectors = [];
        allSelects.forEach(item => {
            item.checked = ""
            checkedSector = !checkedSector;
        });
    }
    filter()
})
 
selectAllServices.addEventListener("change", (e) => {
    const allSelects = document.querySelectorAll("#services-required-box > div.options > label > input");
    if (!checkedServices) {
        selectedServices = [];
        allSelects.forEach(item => {
            item.checked = "true"
            checkedServices = !checkedServices;
            selectedServices.push(item.value);
        });
    } else {
        selectedServices = [];
        allSelects.forEach(item => {
            item.checked = ""
            checkedServices = !checkedServices;
        });
    }
    filter()
})
 