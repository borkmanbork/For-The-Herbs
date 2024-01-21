// Function to populate the HTML table with data and enable column sorting
function populateTable(csvData) {
  const tableBody = document.querySelector('tbody');
  const dataRows = csvData.split("\n");

  // Extract column headers
  const headers = dataRows[0].split(",");

  // Create an array to store table data
  const tableData = [];

  for (let i = 1; i < dataRows.length; i++) {
    const rowData = dataRows[i].split(",");
    if (rowData.length === 4) {
      const [herb, level, contribution, conquest] = rowData;
      tableData.push({ herb, level, contribution, conquest });
    }
  }

  // Sort the table data by column when a table heading is clicked
  const table = document.querySelector('table');
  const tableHead = table.querySelector('thead');

  tableHead.addEventListener('click', (e) => {
    if (e.target.tagName === 'TH') {
      const column = e.target.textContent.toLowerCase();
      const isAscending = !e.target.classList.contains('asc');

      // Toggle sorting order class
      tableHead.querySelectorAll('th').forEach((th) => {
        th.classList.remove('asc', 'desc');
      });
      e.target.classList.toggle(isAscending ? 'asc' : 'desc');

      // Sort the table data
      tableData.sort((a, b) => {
        return isAscending ? (a[column] > b[column] ? 1 : -1) : (a[column] < b[column] ? 1 : -1);
      });

      // Clear the table body
      tableBody.innerHTML = '';

      // Populate the table with sorted data
      tableData.forEach((rowData) => {
        const row = document.createElement("tr");

        const herbCell = document.createElement("td");
        herbCell.textContent = rowData.herb;
        row.appendChild(herbCell);

        const levelCell = document.createElement("td");
        levelCell.textContent = rowData.level;
        row.appendChild(levelCell);

        const contributionCell = document.createElement("td");
        contributionCell.textContent = rowData.contribution;
        row.appendChild(contributionCell);

        const conquestCell = document.createElement("td");
        conquestCell.textContent = rowData.conquest;
        row.appendChild(conquestCell);

        tableBody.appendChild(row);
      });
    }
  });

  // Initial population of the table
  tableData.forEach((rowData) => {
    const row = document.createElement("tr");

    const herbCell = document.createElement("td");
    herbCell.textContent = rowData.herb;
    row.appendChild(herbCell);

    const levelCell = document.createElement("td");
    levelCell.textContent = rowData.level;
    row.appendChild(levelCell);

    const contributionCell = document.createElement("td");
    contributionCell.textContent = rowData.contribution;
    row.appendChild(contributionCell);

    const conquestCell = document.createElement("td");
    conquestCell.textContent = rowData.conquest;
    row.appendChild(conquestCell);

    tableBody.appendChild(row);
  });
}

// Modify this part to load your CSV data
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

// Call the function to populate the table with data and enable sorting
populateTable(csvData);
