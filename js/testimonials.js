const changeSlider = (name) => {
    const stageValue = document.querySelector("#stage-value");
    const startupTitle = document.querySelector("#startup-title");
    const startupDesc = document.querySelector("#startup-desc");
    const startupBtn = document.querySelector("#startup-btn");

    if(name === 'Acceleration') {
        stageValue.innerHTML = "Stage 1";
        startupTitle.innerHTML = "Acceleration";
        startupDesc.innerHTML = "This is the very beginning of the Startup lifecycle, before your start up is even officially in existence. You've got your business idea and you are ready to take the first steps as a founder.";
        startupBtn.innerHTML = "Show Stage 1 Information";
        startupBtn.setAttribute("data-bs-target", "#rangemodal1")
    } else if(name === 'Ideation') {
        stageValue.innerHTML = "Stage 2";
        startupTitle.innerHTML = "Ideation";
        startupDesc.innerHTML = "This is the very beginning of the Startup lifecycle, before your start up is even officially in existence. You've got your business idea and you are ready to take the first steps as a founder.";
        startupBtn.innerHTML = "Show Stage 2 Information";
        startupBtn.setAttribute("data-bs-target", "#rangemodal2")
    } else if(name === 'Traction') {
        stageValue.innerHTML = "Stage 3";
        startupTitle.innerHTML = "Traction";
        startupDesc.innerHTML = "This is the very beginning of the Startup lifecycle, before your start up is even officially in existence. You've got your business idea and you are ready to take the first steps as a founder.";
        startupBtn.innerHTML = "Show Stage 3 Information";
        startupBtn.setAttribute("data-bs-target", "#rangemodal3")
    } else if(name === 'Validation') {
        stageValue.innerHTML = "Stage 4";
        startupTitle.innerHTML = "Validation";
        startupDesc.innerHTML = "This is the very beginning of the Startup lifecycle, before your start up is even officially in existence. You've got your business idea and you are ready to take the first steps as a founder.";
        startupBtn.innerHTML = "Show Stage 4 Information";
        startupBtn.setAttribute("data-bs-target", "#rangemodal4")
    }
}