const selectAllSector = document.querySelector("#select-all-sectors");
const selectAllServices = document.querySelector("#select-all-services");
const selectPrice = document.querySelector("select#choices-multiple-remove-button");
const selectLocation = document.querySelector("select.location-select");
let checkedSector = false;
let checkedServices = false;



//SEARCH ATTRIBUTE
let selectedSectors = [];
let selectedStartUp = [];
let selectedServices = [];
let selectedFounding = [];
let selectedLocation = [];


//Correct List
let correctGrantList = 0;


const allwaysSearch = () => {
    fetch("https://ftbi.siteon.pl/wp-json/wp/v2/grants")
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
      const grantsList = data;

        correctGrantList = grantsList.filter(grant => {
            let result =  selectedSectors.some(i => { return selectedSectors && selectedSectors.length < 1 ? !grant.industry_sector.includes("sadsad") : grant.industry_sector.includes(Number(i))}) && selectedStartUp.some(i => { return  grant.startup_stage.includes(Number(i))}) && selectedServices.some(i => { return  grant.services.includes(Number(i))}) &&  selectedLocation.some(i => { return  selectedLocation.includes("All") ? !grant.location.includes(Number(213123213)) : grant.location.includes(Number(i))})
            return result

          })  
      
      console.log(correctGrantList)
      //console.log(selectedLocation)
      })

     
}





const setStartup = (id) => {
    selectedStartUp = [id];
    allwaysSearch();
}


selectLocation.addEventListener("change", (e) => {
    selectedLocation = [];
    const options = document.querySelectorAll("select.location-select > option");
    options.forEach(item => {
        selectedLocation.push(item.value)
    })
    allwaysSearch();
})

selectPrice.addEventListener("change", (e) => {
    selectedFounding = [];
    const options = document.querySelectorAll("select#choices-multiple-remove-button > option");
    options.forEach(item => {
        selectedFounding.push(item.value)
    })

    allwaysSearch();
})

const setServices = (id) => {
    const index = selectedServices.indexOf(id);
    if (index > -1) {
        selectedServices.splice(index, 1);
    } else {
        selectedServices.push(id)
    }

    allwaysSearch();
}

const setSector = (id) => {
    const index = selectedSectors.indexOf(id);
    if (index > -1) {
        selectedSectors.splice(index, 1);
    } else {
        selectedSectors.push(id)
    }

    allwaysSearch();
}


selectAllSector.addEventListener("change", (e) => {
    const allSelects = document.querySelectorAll("#sector-one-box > div.options > label > input");
    if(!checkedSector) {
        selectedSectors = [];
        allSelects.forEach(item => {
            item.checked = "true"
            checkedSector = !checkedSector;
            selectedSectors.push(item.value);
        });
    }  else {
        selectedSectors = [];
        allSelects.forEach(item => {
            item.checked = ""
            checkedSector = !checkedSector;
        }); 
    }

    allwaysSearch();
})

selectAllServices.addEventListener("change", (e) => {
    const allSelects = document.querySelectorAll("#services-required-box > div.options > label > input");
    if(!checkedServices) {
        selectedServices = [];
        allSelects.forEach(item => {
            item.checked = "true"
            checkedServices = !checkedServices;
            selectedServices.push(item.value);
        });
    }  else {
        selectedServices = [];
        allSelects.forEach(item => {
            item.checked = ""
            checkedServices = !checkedServices;
        }); 
    }

    allwaysSearch();
})


