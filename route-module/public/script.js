const API_GRAPH = "http://localhost:3000";  // servidor Node/Express


function requestRoute(type) {
  const from = document.getElementById("fromSelect").value;
  const to = document.getElementById("toSelect").value;

  let url = "";

  if (type === "simple") url = `${API_GRAPH}/route?from=${from}&to=${to}`;
  if (type === "details") url = `${API_GRAPH}/route/details?from=${from}&to=${to}`;
  if (type === "transfer") url = `${API_GRAPH}/route/with-transfer?from=${from}&to=${to}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("routeData", JSON.stringify(data));
      window.location.href = "result.html";
    })
    .catch(err => alert("Erro ao obter rota: " + err));
}
