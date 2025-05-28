async function search() {
  const input = document.getElementById("searchInput").value.toLowerCase();

  try {
    const res = await fetch("data.json");
    const data = await res.json();

    const filtered = data.filter(item =>
      item.title.toLowerCase().includes(input) ||
      item.description.toLowerCase().includes(input) ||
      item.location.toLowerCase().includes(input)
    );

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (filtered.length === 0) {
      resultsDiv.innerHTML = "<p>No results found.</p>";
    } else {
      filtered.forEach(item => {
        resultsDiv.innerHTML += `
          <div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <p><strong>Location:</strong> ${item.location}</p>
          </div>
          <hr/>
        `;
      });
    }
  } catch (err) {
    console.error("Failed to load data:", err);
    document.getElementById("results").innerHTML =
      "<p style='color: red;'>Failed to load data.json</p>";
  }
}