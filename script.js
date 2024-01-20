document.addEventListener("DOMContentLoaded", function () {
    const leaderboardTable = document.getElementById("leaderboard-table");
    const tbody = leaderboardTable.querySelector("tbody");

    fetch("leaderboard.csv")
        .then((response) => response.text())
        .then((data) => {
            const rows = data.trim().split("\n");
            const header = rows.shift().split(",");
            const leaderboardData = rows.map((row) => row.split(","));

            // Create table rows based on CSV data
            leaderboardData.forEach((entry) => {
                const row = document.createElement("tr");
                header.forEach((key, index) => {
                    const cell = document.createElement(index === 0 ? "th" : "td");
                    cell.textContent = entry[index];
                    row.appendChild(cell);
                });
                tbody.appendChild(row);
            });
        })
        .catch((error) => {
            console.error("Error fetching leaderboard data:", error);
        });
});
