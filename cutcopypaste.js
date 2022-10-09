let copybtn = document.querySelector(".copy");
let cutbtn = document.querySelector(".cut");
let pastebtn = document.querySelector(".paste");





let ctrlkey;
document.addEventListener("keydown", (e) => {
    ctrlkey = e.ctrlKey;

})
document.addEventListener("keyup", (e) => {
    ctrlkey = e.ctrlKey;

})
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        handleselectedcells(cell)
    }
}
let rangestorange = [];
function handleselectedcells(cell) {
    cell.addEventListener("click", (e) => {
        //select cell range work
        if (!ctrlkey) {
            return;
        }
        if (rangestorange.length >= 2) {
            defaultselectedcellui();
            rangestorange = [];
        }
        cell.style.border = "3px solid #218c74"

        let rid = Number(cell.getAttribute("rid"));
        let cid = Number(cell.getAttribute("cid"));
        rangestorange.push([rid, cid]);

    });
}
function defaultselectedcellui() {
    for (let i = 0; i < rangestorange.length; i++) {
        let cell = document.querySelector(`.cell[rid="${rangestorange[i][0]}"][cid="${rangestorange[i][1]}"]`);
        cell.style.border = "1px solid lightgrey";

    }
}
let copydata = [];
copybtn.addEventListener("click", (e) => {

    copydata = [];
    for (let i = rangestorange[0][0]; i <= rangestorange[1][0]; i++) {
        let copyrow = [];
        for (let j = rangestorange[0][1]; j <= rangestorange[1][1]; j++) {
            let cellprop = sheetDB[i][j];
            copyrow.push(cellprop);

        }
        copydata.push(copyrow);
    }
    defaultselectedcellui();
});

cutbtn.addEventListener("click", (e) => {
    if (rangestorange.length < 2)
        return;
    for (let i = rangestorange[0][0]; i <= rangestorange[1][0]; i++) {
        for (let j = rangestorange[0][1]; j <= rangestorange[1][1]; j++) {


            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);


            let cellprop = sheetDB[i][j];
            cellprop.value = "";

            cellprop.bold = false;
            cellprop.italic = false;
            cellprop.underline = false;
            cellprop.fontSize = 14;
            cellprop.fontFamily = "monospace";
            cellprop.fontColor = "#000000";
            cellprop.BGcolor = "#000000";
            cellprop.alignment = "left";

            cell.click();
        }
    }
    defaultselectedcellui();
});


pastebtn.addEventListener("click", (e) => {


    if (rangestorange.length < 2) {
        return;
    }

    let rowdiff = Math.abs(rangestorange[0][0] - rangestorange[1][0]);
    let coldiff = Math.abs(rangestorange[0][1] - rangestorange[1][1]);


    let address = addressBar.value;
    let [strow, stcol] = decodeRIDCIDFromAddress(address);


    for (let i = strow, r = 0; i <= strow + rowdiff; i++, r++) {
        for (let j = stcol, c = 0; j <= stcol + coldiff; j++, c++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            if (!cell)
                continue;


            let data = copydata[r][c];
            let cellprop = sheetDB[i][j];
            cellprop.value = data.value;

            cellprop.bold = data.bold;
            cellprop.italic = data.italic;
            cellprop.underline = data.underline;
            cellprop.fontSize = data.fontSize;
            cellprop.fontFamily = data.fontFamily;
            cellprop.fontColor = data.fontColor;
            cellprop.BGcolor = data.BGcolor;
            cellprop.alignment = data.alignment;

            cell.click();
        }
    }

});