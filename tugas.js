let currentPage = 1;
const rowsPerPage = 10;
let globalData = [];

fetch("data_pengunjung_wisata_sultra.json")
  .then((response) => response.json())
  .then((data) => {
    globalData = data;
    renderTable(currentPage);
    renderPagination();
  })
  .catch((error) => {
    console.error("Gagal memuat data:", error);
    document.getElementById("tabel-pariwisata").textContent = "Gagal memuat data.";
  });

function renderTable(page) {
  const tableContainer = document.getElementById("tabel-pariwisata");
  tableContainer.innerHTML = "";

  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";

  const header = table.insertRow();
  const headers = ["No", "Visitor ID", "Nama", "Gender", "Kota Asal", "Tujuan", "Tanggal", "Transportasi"];
  headers.forEach((text) => {
    const cell = header.insertCell();
    cell.outerHTML = `<th style="background:#fc77d0;color:white;padding:8px">${text}</th>`;
  });

  const start = (page - 1) * rowsPerPage;
  const end = Math.min(start + rowsPerPage, globalData.length);

  for (let i = start; i < end; i++) {
    const item = globalData[i];
    const row = table.insertRow();
    row.innerHTML = `
      <td style="padding:8px">${i + 1}</td>
      <td style="padding:8px">${item.visitor_id}</td>
      <td style="padding:8px">${item.name}</td>
      <td style="padding:8px">${item.gender}</td>
      <td style="padding:8px">${item.origin_city}</td>
      <td style="padding:8px">${item.destination}</td>
      <td style="padding:8px">${new Date(item.visit_date).toLocaleDateString()}</td>
      <td style="padding:8px">${item.transport}</td>
    `;
  }

  tableContainer.appendChild(table);
}

function renderPagination() {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(globalData.length / rowsPerPage);

  const prevButton = document.createElement("button");
  prevButton.textContent = "Sebelumnya";
  prevButton.disabled = currentPage === 1;
  prevButton.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable(currentPage);
      renderPagination();
    }
  };

  const nextButton = document.createElement("button");
  nextButton.textContent = "Berikutnya";
  nextButton.disabled = currentPage === totalPages;
  nextButton.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderTable(currentPage);
      renderPagination();
    }
  };

  const pageInfo = document.createElement("span");
  pageInfo.textContent = ` Halaman ${currentPage} dari ${totalPages} `;
  pageInfo.style.margin = "0 10px";

  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(pageInfo);
  paginationContainer.appendChild(nextButton);
}
