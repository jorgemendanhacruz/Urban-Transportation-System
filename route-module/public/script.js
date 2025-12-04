function requestRoute(type) {
  const from = document.getElementById("fromSelect").value;
  const to = document.getElementById("toSelect").value;

  let url = "";

  if (type === "simple") url = `/route?from=${from}&to=${to}`;
  if (type === "details") url = `/route/details?from=${from}&to=${to}`;
  if (type === "transfer") url = `/route/with-transfer?from=${from}&to=${to}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("routeData", JSON.stringify(data));
      window.location.href = "result.html";
    })
    .catch(err => alert("Erro ao obter rota: " + err));
}
