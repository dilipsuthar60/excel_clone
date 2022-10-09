let downloadbtn = document.querySelector(".download");
let openbtn = document.querySelector(".open");

downloadbtn.addEventListener("click", (e) => {
    console.log("yes");
    let jsonData = JSON.stringify([sheetDB, graphComponentMatrix]);
    let file = new Blob([jsonData], { type: "application/json" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "sheetData.json";
    a.click();
});



openbtn.addEventListener("click", (e) => {
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();
    input.addEventListener("change", (e) => {
        let fr = new FileReader();
        let files = input.files;
        let fileobj = files[0];

        fr.readAsText(fileobj);
        fr.addEventListener("load", (e) => {

            let readsheetdata=JSON.parse(fr.result);
            addSheetBtn.click();

            sheetDB=readsheetdata[0];
            graphComponentMatrix=readsheetdata[1];
            collectedSheetDB[collectedSheetDB.length-1]=sheetDB;
            collectedGraphComponent[collectedGraphComponent.length-1]=graphComponentMatrix;
          
            handleSheetProperties();
        });
    })
});