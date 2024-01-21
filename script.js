document.addEventListener('DOMContentLoaded', () => {
  // Sample CSV data for initial table population
  const csvData = `Herb,Level,Guild Contribution,Guild Conquest
Senrik,13625,45776,73
Rosumi,12744,1200,54
PiroTree,12705,25160,54
Mikmik,12928,24187,54
Bigmuff,12803,32687,53
Waifuwu,13217,11403,51
Deeny,12721,14469,51
오유스,12890,10957,51
z4rt,12839,25889,51
MoldyMeat,12652,29537,50
cupkayc,13001,23261,50
Bryanthe,12612,2600,48
TonTon,12497,14182,48
Tankcat,12380,1600,47
orbitGor,12744,6165,47
Satoshi,12616,21039,47
hijklmno,12525,17324,46
Royalbanana,11904,20544,45
Anhjew,12124,800,44
Kaza,11640,17797,41
Bobertson,9294,13470,31
Imhim,7493,12837,24`;

  // Function to populate the table with CSV data
  function populateTable(csvData) {
    const tableBody = document.querySelector('tbody');
    const dataRows = csvData.split("\n").slice(1); // Skip headers
    tableBody.innerHTML = ''; // Clear existing rows

    dataRows.forEach(row => {
      const rowData = row.split(",");
      const rowElement = document.createElement("tr");
      rowData.forEach(cellData => {
        const cell = document.createElement("td");
        cell.textContent = cellData;
        rowElement.appendChild(cell);
      });
      tableBody.appendChild(rowElement);
    });
  }

  // Initial population of the table
  populateTable(csvData);

  // Function to sort and update the table
  function sortTable(column, isAscending) {
    const tableBody = document.querySelector('tbody');
    const rowsArray = Array.from(tableBody.querySelectorAll('tr'));
    const columnIndex = Array.from(tableBody.closest('table').querySelectorAll('thead th')).findIndex(th => th.textContent.trim().toLowerCase() === column);

    rowsArray.sort((a, b) => {
      const cellA = a.querySelectorAll('td')[columnIndex].textContent;
      const cellB = b.querySelectorAll('td')[columnIndex].textContent;
      const valueA = isNaN(Number(cellA)) ? cellA.toUpperCase() : Number(cellA);
      const valueB = isNaN(Number(cellB)) ? cellB.toUpperCase() : Number(cellB);

      if (valueA < valueB) return isAscending ? -1 : 1;
      if (valueA > valueB) return isAscending ? 1 : -1;
      return 0;
    });

    // Re-append rows in sorted order
    rowsArray.forEach(row => tableBody.appendChild(row));
  }

  // Add event listener to all table headers for sorting
  document.querySelectorAll('thead th').forEach(th => {
    th.addEventListener('click', () => {
      const column = th.textContent.trim().toLowerCase();
      const isAscending = !th.classList.contains('asc');
      document.querySelectorAll('thead th').forEach(header => {
        header.classList.remove('asc', 'desc'); // Remove classes from all headers
      });
      th.classList.add(isAscending ? 'asc' : 'desc'); // Add class to the current header
      sortTable(column, isAscending);
    });
  });
});
