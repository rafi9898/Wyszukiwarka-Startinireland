const exportCsvBtn = document.querySelector("div.export-btn-container a");

var csvFileData = [  
    
 ];  


    function prepareData() {
        csvFileData = [['Name','Website','Purpose','Funding_amound','Industry_sector','Startup_stage','Location','Type_grant', 'Servis','Source','Minority','How Apply','Cover']]
        let finallData = finallResult;
        finallData.map(item => {
            const arr = [];
            arr.push(item.title.rendered.replace(/[^a-zA-Z ]/g, ""))
            arr.push(item.website)
            arr.push(item.purpose.join().replace(",", " ").replace(/[^a-zA-Z ]/g, ""));
            arr.push(item.funding_amound.join())
            arr.push(item.industry_sector.join("   "))
            arr.push(item.startup_stage.join("   "))
            arr.push(item.location.join("   "))
            arr.push(item.type_grant.join("   "))
            arr.push(item.services.join("   "))
            arr.push(item.source.join("   ").replace(",", " ").replace(/[^a-zA-Z ]/g, ""))
            arr.push(item.minority.join("   ").replace(",", " ").replace(/[^a-zA-Z ]/g, ""))
            arr.push(item.how_apply.join("   ").replace(",", " ").replace(/[^a-zA-Z ]/g, ""))
            arr.push(item.cover.join("   ").replace(",", " "))
             csvFileData.push(arr)
        })

        exportReadyFile();
    }

    function exportReadyFile() {
    //     var csv = ;  
      
    //     csvFileData.forEach(function(row) {  
    //         csv += row.join(',');  
    //         csv += "\n";  
    // });  

    //     exportCsvBtn.href = 'data:text/xls;charset=utf-8,' + encodeURI(csv);  
    //     exportCsvBtn.target = '_blank';  
    //     exportCsvBtn.download = 'data.xls';  
    //     exportCsvBtn.click();

    const wb = XLSX.utils.book_new();
    const ke = XLSX.utils.aoa_to_sheet(csvFileData);
    XLSX.utils.book_append_sheet(wb, ke, 'Sheet1');
    XLSX.writeFile(wb, 'data.xlsx');
    }

    exportCsvBtn.addEventListener("click", () => {
        prepareData();
    })