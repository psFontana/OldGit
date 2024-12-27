document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("inscricoes-table");
    const feedback = document.getElementById("feedback");
  
    let data = JSON.parse(localStorage.getItem("formData")) || [];
  
    if (data.length === 0) {
      feedback.className = "alert alert-warning mt-3";
      feedback.innerText = "Nenhuma inscrição encontrada.";
      return;
    }
  
    function renderTable(sortedData) {
      tableBody.innerHTML = ""; 
      sortedData.forEach((entry, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${entry.id}</td>
          <td>${entry.nome}</td>
          <td>${entry.telefone}</td>
          <td>${entry.email}</td>
          <td>${entry.quarto}</td>
          <td>${entry.pessoas}</td>
          <td>${entry.valor}</td>
          <td>${entry.comprovanteNome}</td>
        `;
        tableBody.appendChild(row);
      });
    }
  
    renderTable(data);
  
    function sortData(column, order) {
      return data.sort((a, b) => {
        const valueA = column === "index" ? data.indexOf(a) : a[column]?.toLowerCase();
        const valueB = column === "index" ? data.indexOf(b) : b[column]?.toLowerCase();
  
        if (valueA < valueB) return order === "asc" ? -1 : 1;
        if (valueA > valueB) return order === "asc" ? 1 : -1;
        return 0;
      });
    }
  
    document.querySelectorAll("th[data-column]").forEach((header) => {
      header.addEventListener("click", () => {
        const column = header.getAttribute("data-column");
        const currentSort = header.getAttribute("data-sort");
        const newSort = currentSort === "asc" ? "desc" : "asc";
  
        const sortedData = sortData(column, newSort);
        header.setAttribute("data-sort", newSort);
  
        renderTable(sortedData);
      });
    });
  });
  