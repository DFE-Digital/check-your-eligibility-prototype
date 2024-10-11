
// tableFunctions.js
const updateVisibleRowCount = () => {
  const table = document.querySelector("table");
  const rows = table.querySelectorAll("tbody tr");

  const visibleRows = Array.from(rows).filter(row => {
    return row.style.display !== "none";
  });

  const visibleRowCount = visibleRows.length;
  document.getElementById("resultCount").innerText = visibleRowCount;

  return visibleRows; // Return the visible rows for CSV export
};

// Call this function to update the count (e.g., after filtering)
updateVisibleRowCount();




// // tableFunctions.js

// const updateVisibleRowCount = () => {
//   const table = document.querySelector("table");
//   const rows = table.querySelectorAll("tbody tr");

//   console.log(rows);

//   const visibleRows = Array.from(rows).filter(row => {
//     return row.style.display !== "none";
//   });

//   const visibleRowCount = visibleRows.length;
//   document.getElementById("resultCount").innerText = visibleRowCount;

//   return visibleRows; // Return the visible rows for CSV export
// };

// const exportVisibleRowsToCSV = (rows) => {
//   let csvContent = "data:text/csv;charset=utf-8,";

//   rows.forEach(row => {
//     const cells = Array.from(row.querySelectorAll("td")).map(cell => cell.innerText);
//     csvContent += cells.join(",") + "\n";
//   });

//   const encodedUri = encodeURI(csvContent);
//   const link = document.createElement("a");
//   link.setAttribute("href", encodedUri);
//   link.setAttribute("download", "visible_rows.csv");
//   document.body.appendChild(link);

//   link.click();
//   document.body.removeChild(link);
// };

// document.getElementById("exportCsvButton").addEventListener("click", () => {
//   const visibleRows = updateVisibleRowCount();
//   exportVisibleRowsToCSV(visibleRows);
// });

// // Call this function to update the count (e.g., after filtering)
// updateVisibleRowCount();


