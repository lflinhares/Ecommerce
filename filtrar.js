const lista = [
  { name: "din", id: 1 },
  { name: "din", id: 1 },
];
let itensToRender = [];
function filterLoop() {
  for (let i = 0; i < lista.length; i++) {
    const newPecasFiltradas = lista.filter((peca) =>
      lista.includes(lista[i].id)
    );
    itensToRender = [...itensToRender, ...newPecasFiltradas];
  }
  checkPecasDuplicadas();
}

function checkPecasDuplicadas() {
  const filteredArray = itensToRender.filter(function (peca, pos) {
    return itensToRender.indexOf(peca) == pos;
  });
  itensToRender = filteredArray;
  console.log(itensToRender);
}

filterLoop();
