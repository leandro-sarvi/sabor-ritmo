import { html, render } from "../utils/lit.js";
import firebaseApp from "../utils/credenciales.js";
import {
  getFirestore,
  doc,
  getAllProduc,
  getDoc,
} from "../utils/firestore.js";
import viewProduct from "./viewProduct.js";
import cart from "./cart.js";
import viewVacio from "./viewVacio.js";
import { mail, tel, ig } from "../utils/variables.js";
const firestore = getFirestore(firebaseApp);
export default function home(email) {
  let root = document.getElementById('app');
  let productos = [];
  let total = 0, cantidad = 0;
  root.addEventListener('click', eventPedir);
  cargarProductos();
  cantidadTotal();
  window.addEventListener('DOMContentLoaded', cargarP(productos));
  return html`
  <nav class="navMenu">
  <i class="fa-solid fa-bars-staggered menu" @click=${viewFixedMenu}></i>
  
  <button @click=${renderCart} class="hidden" id="btnCarrito">
  <i class="fa-solid fa-basket-shopping"></i>
  <span class="cant" id="totalCant">${cantidad}</span>
  </button>
  </nav>
  <div id="carouselExampleControls" class="carousel  slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="/img/burritos.jfif" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="/img/burritos-carne.jfif" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="/img/hamburguesa.jfif" class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  
<div class="navB p-3"> 

<div class="d-flex align-items-center justify-content-around p-2">
<div class="col-35">
<img src="/img/s&r.jpg" alt="">
</div>
<div class="col-60">
<h3>Sabor & Ritmo</h3>
<span>Cocina fusión</span>
</div>
</div>
<hr>
<div class="d-flex align-items-center justify-content-evenly p-2">
<a href="https://api.whatsapp.com/send/?phone=${tel}&text&type=phone_number&app_absent=0" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
<a href="${ig}" target="_blank"><i class="fa-brands fa-instagram"></i></a>
<a href='http://api.qrserver.com/v1/create-qr-code/?data=${window.location.origin}&margin=50&size=300x300&ecc=L' target='_blank'><i class="fa-solid fa-qrcode"></i></a>
<a @click=${share}><i class="fa-solid fa-share-nodes"></i></a>
</div>
 </div>
 <div class="accordion accordion-flush" id="accordionFlushExample">

          </div>
          <div class="viewMenu shadow-lg" id="vM">
          <div class="container-menu">
          <div class="menu-link">
          <span @click=${viewFixedMenu}><i class="fa-solid fa-xmark"></i> cerrar</span>
          <a href="https://api.whatsapp.com/send/?phone=${tel}&text&type=phone_number&app_absent=0" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
<a href="${ig}" target="_blank"><i class="fa-brands fa-instagram"></i></a>
<a href='http://api.qrserver.com/v1/create-qr-code/?data=${window.location.origin}&margin=50&size=300x300&ecc=L' target='_blank'><i class="fa-solid fa-qrcode"></i></a>
<a @click=${share}><i class="fa-solid fa-share-nodes"></i></a>
          </div>
          <a class="cg" href="https://unicodev.com.ar/" target="_blank">Unicodev</a>
          </div>
          </div>
  `;
  /******************************* FUNCTIONs *********************/
  async function cargarProductos() {
    let p = await getAllProduc(email);
    p.filter((e) => {
      if (e.id !== "categorias") {
        productos.push(e);
      }
    });
  }
  function cantidadTotal() {
    let productoLS;
    productoLS = obtenerProductosLocalStorage();
    if (productoLS !== null) {
      for (let i = 0; i < productoLS.length; i++) {
        let element = Number(productoLS[i].precio * productoLS[i].cantidad);
        total = total + element;
        cantidad = Number(cantidad) + Number(productoLS[i].cantidad);
      }
    } else {
    }
  }
  function obtenerProductosLocalStorage() {
    let productoLS;
    //Comprobamos LocalStorage
    if (localStorage.getItem(mail) === null) {
      productoLS = [];
    } else {
      productoLS = JSON.parse(localStorage.getItem(mail));
    }
    return productoLS;
  }
  function eventPedir(e) {
    if (e.target.classList.contains("badge")) {
      render(viewProduct(e.target.getAttribute("data-id")), root);
    }
  }
  async function share() {
    const shareData = {
      title: 'Sabor & Ritmo',
      text: 'Cocina fusión',
      url: `${window.location.origin}`
    }
    await navigator.share(shareData);
  }
  function renderCart() {
    let productoLS = JSON.parse(localStorage.getItem(mail));
    if (productoLS.length === 0) {
      render(viewVacio(),root);
    } else {
      render(cart(), root);
    }

  }
  function viewFixedMenu(){
    let viewFixedMenu = document.getElementById('vM');
    console.log(viewFixedMenu)
    viewFixedMenu.classList.toggle('left');
  }
  async function cargarP(productos) {
    const consulta = await getDoc(doc(firestore, mail, "categorias"));
    if (consulta.exists()) {
      let categorias = consulta.data().categorias;
      categorias.map((e) => {
        let accordionFlushExample = document.getElementById('accordionFlushExample');
        accordionFlushExample.innerHTML += `<div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne">
          <button
            class="accordion-button collapsed cat"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-${e.title}"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            <h5>${e.title}</h5>
          </button>
        </h2>
        <div
          id="flush-${e.title}"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body" id="${e.title}"></div>
        </div>
      </div>`;
        productos.map((doc) => {
          if (doc.categoria === e.title) {
            const rows = document.createElement("div");
            if (doc.precio === "0") {
              rows.innerHTML = `
            <div class="d-flex align-items-center cardPro shadow">
            <div class="">
            <img src="${doc.imagen}"  alt="">
            </div>
              <div class="alignC">
              <div class="titleCard">
              <span>${doc.title}</span>
              </div>
              <div class="descripcion">
              <span>Descripcion</span>
              <span>4.8<i class="fa-solid fa-star-sharp"></i></span>
              </div>
              <div class="d-flex justify-content-between align-items-center w-100 mt-2">
              <span id="price" data-pr="${doc.precio}">Consultar</span>
              <button class="btn badge" data-id="${doc.id}">Pedir <i class="fa-solid fa-plus"></i></button>
              </div>
              </div>
            </div>
            `;
              let a = document.getElementById(doc.categoria);
              a.appendChild(rows);
            } else {
              rows.innerHTML = `
              <div class="d-flex  align-items-center cardPro shadow">
              <div>
              <img src="${doc.imagen}"  alt="">
              </div>
                <div class="alignC">
                <div class="titleCard">
              <span>${doc.title}</span>
              </div>
              <div class="descripcion">
              <span>Descripcion</span>
              </div>
              <div class="start">
              <span><i class="fas fa-star"></i> 4.8</span>
              </div>
                <div class="d-flex justify-content-between align-items-center w-100 mt-2">
                <span id="price" data-pr="${doc.precio}">$${doc.precio}</span>
                <button class="btn badge" data-id="${doc.id}" id="pedir">Pedir <i class="fa-solid fa-plus"></i></button>
                </div>
                </div>
              </div>
            `;
              let a = document.getElementById(doc.categoria);
              a.appendChild(rows);
            }
          }
        });
      });
    }
let btnCarrito = document.getElementById('btnCarrito');
btnCarrito.classList.remove("hidden");  
}
}
