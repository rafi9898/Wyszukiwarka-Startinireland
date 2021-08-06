$(document).ready(function(){

    var multipleCancelButton = new Choices('#choices-multiple-remove-button', {
    removeItemButton: true,
    maxItemCount:5,
    searchResultLimit:5,
    renderChoiceLimit:5
    });
    
    
    });

    const searchResultBox = document.querySelector("#search-results");
    const wheelBox = document.querySelector("#wheel-container");
    const mainBox = document.querySelector("#sectors");
    const viewResultBtn = document.querySelector("#view-results");
    const viewResultBtn2 = document.querySelector("#view-result2");
    const startAgainBtn = document.querySelector("#start-again");

    viewResultBtn.addEventListener("click", () => {
        mainBox.style = "display: none;"
        searchResultBox.style = "display: block;"
        wheelBox.style = "display: none;"
    })

    viewResultBtn2.addEventListener("click", () => {
        mainBox.style = "display: none;"
        searchResultBox.style = "display: block;"
        wheelBox.style = "display: none;"
    })

    startAgainBtn.addEventListener("click", () => {
        mainBox.style = "display: inline-block;"
        searchResultBox.style = "display: none;"
        wheelBox.style = "display: block;"
    })



