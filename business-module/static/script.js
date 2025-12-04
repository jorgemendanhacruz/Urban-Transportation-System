const API_BASE = "http://127.0.0.1:3000";  // servidor Node/Express

function requestRoute(type) {
  const from = document.getElementById("fromSelect").value;
  const to = document.getElementById("toSelect").value;

  let url = "";

  if (type === "simple")   url = `${API_BASE}/route?from=${from}&to=${to}`;
  if (type === "details")  url = `${API_BASE}/route/details?from=${from}&to=${to}`;
  if (type === "transfer") url = `${API_BASE}/route/with-transfer?from=${from}&to=${to}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("routeData", JSON.stringify(data));
      window.location.href = "/result";   // rota Flask
    })
    .catch(err => alert("Erro ao obter rota: " + err));
}
