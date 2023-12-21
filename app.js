console.log("Hello B2S");

let viz;

// 1. Create a Variable to store the vizCOntainer

const vizContainer = document.getElementById("vizContainer");

//2. Create a variable to store the dashboards options

const options = {
  device: "desktop",
  height: "800px",
  width: "1100px",
};

//3. Create a variable to store the URL of dashboard

const url =
  "https://public.tableau.com/views/EmbeddingWorkbookProfitsAcrossME-Asia/OfficeSupplyProfitsacrossMEandAsia";

function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
}

initViz();

//4. Create const for buttons
const exportPdfButton = document.getElementById("exportPdf"); //PDF
const exportPptButton = document.getElementById("exportPpt"); //PPT

//5. Create a function which is run when we click
//PDF
function exportPdfFunction() {
  viz.showExportPDFDialog();
}
//PPT
function exportPptFunction() {
  viz.showExportPowerPointDialog();
}

//6. Create event listener for button on click
exportPdfButton.addEventListener("click", exportPdfFunction); //PDF
exportPptButton.addEventListener("click", exportPptFunction); //PPT

// 7. Adding filters
const filterButton = document.getElementById("FilterButton");
filterButton.addEventListener("click", getRangeValues);
function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  // need to get active sheet, but this could be a dashboard or a worksheet
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  //inspect the sheets you need to filter
  console.log(sheets);
  // index of the sheet you want to filter
  const sheetToFilter = sheets[0];
  // do the actual filtering
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alert("viz filtered"));
}
