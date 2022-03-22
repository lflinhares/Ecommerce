import pecas from "./data.js";

const buyElement = document.getElementsByClassName("buy");
const carrinhoContent = document.getElementById("dropdownContent");
const productContainer = document.getElementById("productContainer");
const filtros = document.getElementsByClassName("filter");

let itensToRender = [];
let carItems = [];
let filterList = [];
let parcel = 0;
boot();

function boot() {
  gerarPecas();
  addEventListenersFilters();
  addEventListenerBuyButton();
  CarRender();
}

function addEventListenerBuyButton() {
  for (let i = 0; i < buyElement.length; i++) {
    buyElement[i].addEventListener("click", addCarArray);
  }
}

function addCarArray(event) {
  const id = parseInt(event.target.dataset.id);
  const peca = pecas.filter((peca) => peca.id === id);
  carItems.push(peca[0]);

  checkPecasDuplicadasCar();
  CarRender();
}

function checkPecasDuplicadasCar() {
  const filteredArray = carItems.filter(function (peca, posicao) {
    return carItems.indexOf(peca) == posicao;
  });
  carItems = filteredArray;
}

function CarRender() {
  carrinhoContent.innerHTML = '<p id="carTitle">Carrinho</p>';
  for (let i = 0; i < carItems.length; i++) {
    carrinhoContent.innerHTML += `<div class="carrinhoItem"><div class="imgContainer"><img class="carItemPic" src="./assets/${
      carItems[i].pic
    }.png"></div><div class="infoContainer"><p class="carItemName">${
      carItems[i].name
    }</p><p class="carPrice">R$${carItems[i].price.toFixed(
      2
    )}</p><p class="carParcel">Em até ${parcel} vezes de R$${(
      carItems[i].price / parcel
    ).toFixed(2)}</p><button class="removeCarItem" data-id="${
      carItems[i].id
    }">Remover</button></div>`;
  }
  addEventListenersRemoveCarItem();
}

function addEventListenersRemoveCarItem() {
  const removeCarItemButtonElements =
    document.getElementsByClassName("removeCarItem");
  for (let i = 0; i < carItems.length; i++) {
    removeCarItemButtonElements[i].addEventListener("click", removeCarArray);
  }
}

function removeCarArray(event) {
  const id = parseInt(event.target.dataset.id);
  const newCarItems = carItems.filter((peca) => peca.id !== id);
  carItems = newCarItems;
  CarRender();
}

function gerarPecas(pecasToRender = pecas) {
  productContainer.innerHTML = "";

  for (let i = 0; i < pecasToRender.length; i++) {
    if (pecasToRender[i].price > 170) {
      parcel = 4;
    } else {
      parcel = 2;
    }

    productContainer.innerHTML += `<div class="productInfo">
    <div class="product"><img class="productPic" src="assets/${
      pecasToRender[i].pic
    }.png"></div>
    <p class="pecaName">${pecasToRender[i].name}</p>
    <h1 class="price">R$${pecasToRender[i].price.toFixed(2)}</h1>
    <p class="parcelamento">Em até ${parcel} vezes de R$${(
      pecasToRender[i].price / parcel
    ).toFixed(2)}</p>
    <button class="buy" data-id="${pecasToRender[i].id}">COMPRAR</button>
    </div>`;
  }
  addEventListenerBuyButton();
}

function addEventListenersFilters() {
  for (let i = 0; i < filtros.length; i++) {
    filtros[i].addEventListener("click", filterAll);
  }
}

function filterAll(event) {
  if (event.target.dataset.type === "color") {
    filterColor(event);
  }
  if (event.target.dataset.type === "sizes") {
    filterSizes(event);
  }

  if (event.target.dataset.type === "price") {
    filterPrice(event);
  }
}

function filterListSelector(event) {
  const filterType = event.target.dataset.type;
  const filterValue = event.target.dataset.filter;
  const filterValueMin = event.target.dataset.min;
  const filterValueMax = event.target.dataset.max;
  if (!event.target.checked) {
    filterList = filterList.filter(
      (filtro) =>
        !(filtro.type === filterType && filtro.value === filterValue) ||
        !(filtro.type === filterType && filtro.valueMin === filterValueMin)
    );
    itensToRender = [];
    filterLoopColor();
    filterLoopSizes();
    filterLoopPrice();
    gerarPecas(filterList.length > 0 ? itensToRender : pecas);
  } else {
    filterList = [
      ...filterList,
      {
        type: filterType,
        value: filterValue,
        valueMin: filterValueMin,
        valueMax: filterValueMax,
      },
    ];
  }
}
function filterColor(event) {
  filterListSelector(event);
  filterLoopColor();
  checkPecasDuplicadas();
  gerarPecas(filterList.length > 0 ? itensToRender : pecas);
}

function filterSizes(event) {
  filterListSelector(event);
  filterLoopSizes();
  checkPecasDuplicadas();
  gerarPecas(filterList.length > 0 ? itensToRender : pecas);
}

function filterPrice(event) {
  filterListSelector(event);
  filterLoopPrice();

  checkPecasDuplicadas();
  gerarPecas(filterList.length > 0 ? itensToRender : pecas);
}

function checkPecasDuplicadas() {
  console.log(itensToRender);
  const filteredArray = itensToRender.filter(function (peca, pos) {
    return itensToRender.indexOf(peca) == pos;
  });
  itensToRender = filteredArray;
  console.log(itensToRender);
}

function filterLoopColor() {
  for (let i = 0; i < filterList.length; i++) {
    const newPecasFiltradas = pecas.filter(
      (peca) => peca.color === filterList[i].value
    );
    itensToRender = [...itensToRender, ...newPecasFiltradas];
  }
}
function filterLoopSizes() {
  for (let i = 0; i < filterList.length; i++) {
    const newPecasFiltradas = pecas.filter((peca) =>
      peca.sizes.includes(filterList[i].value)
    );
    itensToRender = [...itensToRender, ...newPecasFiltradas];
  }
}

function filterLoopPrice() {
  for (let i = 0; i < filterList.length; i++) {
    const newPecasFiltradas = pecas.filter(
      (peca) =>
        peca.price > filterList[i].valueMin &&
        peca.price < filterList[i].valueMax
    );
    itensToRender = [...itensToRender, ...newPecasFiltradas];
  }
}
