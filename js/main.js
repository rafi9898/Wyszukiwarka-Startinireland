const optionsSector = document.querySelector("#sector-one-box > div.options");
const optionsStartupStage = document.querySelector("#startup-stage .range-box > .container");
const optionsServices = document.querySelector("#services-required-box > div.options");
const locationSelect = document.querySelector(".location-select");

const getIndustrySector = () => {
    fetch("https://ftbi.siteon.pl/wp-json/wp/v2/industry_sector?per_page=100")
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
      const industryList = data;
      industryList.map(industry => {
          const label = document.createElement("label");
          const input = document.createElement("input");
          const span = document.createElement("span");
          input.className = 'sector-1';
          input.setAttribute("type", 'checkbox');
          input.setAttribute("key", industry.id);
          input.setAttribute("value", industry.id);
          input.setAttribute("onchange", `setSector('${industry.id}')`)
          label.appendChild(input);
          span.innerHTML = `${industry.name}`
          label.appendChild(span);

          optionsSector.appendChild(label);
        
      })
      })
      
}


const getServices = () => {
    fetch("https://ftbi.siteon.pl/wp-json/wp/v2/services?per_page=100")
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
      const servicesList = data;
      servicesList.map(service => {
          const label = document.createElement("label");
          const input = document.createElement("input");
          const span = document.createElement("span");
          input.className = 'services-1';
          input.setAttribute("type", 'checkbox');
          input.setAttribute("key", service.id);
          input.setAttribute("value", service.id);
          input.setAttribute("onchange", `setServices('${service.id}')`)
          label.appendChild(input);
          span.innerHTML = `${service.name}`
          label.appendChild(span);

          optionsServices.appendChild(label);
        
      })
      })
      
}

const getLocation = () => {
    fetch("https://ftbi.siteon.pl/wp-json/wp/v2/location?per_page=100")
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
      const locationsList = data;
      console.log(locationsList)
      const listSelect = document.querySelector("#choices-multiple-remove-button-1");
      locationsList.map(location => {
          let optionItem = document.createElement("option");
          optionItem.innerHTML = location.name;
          optionItem.setAttribute("value", location.id)
          listSelect.appendChild(optionItem);
      })
      })
      
}



const getStartupStage = () => {
    fetch("https://ftbi.siteon.pl/wp-json/wp/v2/startup_stage?per_page=100")
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
      const startupList = data;
      let count = 1;
      startupList.map(startup => {
          const itemBox = document.createElement("div");
          const input = document.createElement("input");
          const label = document.createElement("label");
          input.setAttribute("onclick", `changeSlider('${startup.name}')`)
          input.setAttribute("onchange", `setStartup('${startup.id}')`)
          itemBox.className = 'range-box-item';
          input.setAttribute("name", "startup-stage");
          input.setAttribute("type", "radio");
          input.setAttribute("key", startup.id);
          input.setAttribute("value", startup.id);
          label.innerHTML = ` <label>Stage ${count} <br /> <strong>${startup.name}</strong></label>
          </input>`;
          itemBox.appendChild(input);
          itemBox.appendChild(label);
          optionsStartupStage.appendChild(itemBox);
          count++;
          
      })
      })
      
}


document.addEventListener('DOMContentLoaded', () => {
    getIndustrySector();
    getStartupStage();
    getServices();
    getLocation();
    setTimeout(() => {
        var multipleCancelButton = new Choices('#choices-multiple-remove-button-1', {
            removeItemButton: true,
            maxItemCount:824,
            searchResultLimit:535,
            renderChoiceLimit:535
            });
    }, 6000)
    
}, false);