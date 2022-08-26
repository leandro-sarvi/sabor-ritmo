import { html, render } from "../utils/lit.js";
import firebaseApp from "../utils/credenciales.js";
import { getFirestore, doc, getDoc } from "../utils/firestore.js";
const firestore = getFirestore(firebaseApp);
import home from "../views/home.js"
export default function viewProduct(id) {
  let root = document.getElementById('app');
  ss(id);
  async function ss(id) {
    let consulta = await getDoc(doc(firestore, `laboutique@laboutique.online`, id));
    let p = consulta.data();
    render(html`
         <div class="viewContent">
         <nav class="navAtras">
         <i class="fa-solid fa-angle-left" @click=${renderHome}></i>
        <div>
        <a @click=${share}><i class="fa-solid fa-share-nodes"></i></a>
        <i class="fa-solid fa-link" @click=${urlQr}></i>
        </div>
         </nav>
         <img src="${p.imagen}" class="d-block w-100" alt="...">
         <div class="viewP">
         <div class="shop-title">
         <span>${p.title}</span>
         </div>
         <div class="descripcion">
         <span>${p.title}</span>
         </div>
         <div class="shop-price">
         <span>$${p.precio}</span>
         </div>
         <div class="next">
        <button class="btn menos" data-price="${p.precio}"><i class="fa-solid fa-minus menos" data-price="${p.precio}"></i></button>
        <input type="number" min="1" value="1" id="inputCant">
        <button class="btn mas" data-price="${p.precio}"><i class="fa-solid fa-plus mas" data-price="${p.precio}"></i></button>
      </div>
      <div class="shop-attributes-title-section">
         <span>NOTAS ADICIONALES</span>
         </div>
         <textarea placeholder="Escribe toda la información adicional sobre tu pedido" class="resizable shop-attributes-attribute-selection shop-textarea" id="textArea"></textarea>
         </div>
         </div>
         <div class="d-flex align-items-center justify-content-between total">
         <div class="col-50">
         <span id="price" data-price="${p.precio}">$${p.precio}</span>
         </div>
         <div class="hacer-pedido">
         <button class="btn agregarProduc" data-id="${id}"> Añadir <i class="fas fa-shopping-cart"></i></button>
         </div>
         </div>
         `, root)
  }

  function urlQr() {
    let url = new URL(`${window.location.origin}#/${id}`);
    let href = url.href;
    var inputFalso = document.createElement("input");
    inputFalso.setAttribute("value", href);
    document.body.appendChild(inputFalso);
    inputFalso.select();
    document.execCommand("copy");
    document.body.removeChild(inputFalso);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: `Enlace copiado`,
    });

  }
  async function share() {
    const shareData = {
      title: 'Sabor & Ritmo',
      text: 'Cocina fusión',
      url: `${window.location.origin}#/${id}`
    }
    await navigator.share(shareData);
  }
}
window.addEventListener('DOMContentLoaded', () => {
  let root = document.getElementById('app');
  root.addEventListener('click', events);
  async function events(e) {

    if (e.target.classList.contains("menos")) {
      let inputCant = document.getElementById('inputCant');
      if (inputCant.value > 1) {
        let precioTotal = e.target.getAttribute('data-price');
        inputCant.value = inputCant.value - 1;
        price.innerHTML = `$${inputCant.value * precioTotal}`;
        price.setAttribute("data-price", (inputCant.value * precioTotal));
      }
    }
    if (e.target.classList.contains("mas")) {
      let precioTotal = e.target.getAttribute('data-price');
      let inputCant = document.getElementById('inputCant');
      let price = document.getElementById('price');
      inputCant.value++;
      price.innerHTML = `$${inputCant.value * precioTotal}`;
      price.setAttribute("data-price", (inputCant.value * precioTotal));
    }
    if (e.target.classList.contains('agregarProduc')) {
      let consulta = await getDoc(doc(firestore, `laboutique@laboutique.online`, e.target.getAttribute('data-id')));
      let p = consulta.data();
      let inputCant = document.getElementById('inputCant');
      let totalPro = document.getElementById('price');
      let shopTextarea = document.getElementById('textArea');
      let producto = {
        id: e.target.getAttribute('data-id'),
        title: p.title,
        cantidad: inputCant.value,
        total: totalPro.getAttribute('data-price'),
        notas: shopTextarea.value
      }
      //Comprabamos el producto en la local storage
      let idFakeProd;
      let localStorage = obtenerProductosLocalStorage();
      localStorage.map((p) => {
        if (p.id === e.target.getAttribute('data-id')) {
          idFakeProd = p.id;
        }
      });
      if (idFakeProd === e.target.getAttribute('data-id')) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "error",
          title: `El producto ya esta añadido`,
        });
        renderHome();
      } else {
        guardarProductosLocalStorage(producto);
        renderHome();
      }

    }
  }
});
//LOCAL STORAGE
function guardarProductosLocalStorage(producto) {
  let productos;
  productos = obtenerProductosLocalStorage();
  productos.push(producto);
  localStorage.setItem("productos", JSON.stringify(productos));
}
function obtenerProductosLocalStorage() {
  let productoLS;
  //Comprobamos LocalStorage
  if (localStorage.getItem("productos") === null) {
    productoLS = [];
  } else {
    productoLS = JSON.parse(localStorage.getItem("productos"));
  }
  return productoLS;
}
function renderHome() {
  const root = document.getElementById('app');
  render(home("laboutique@laboutique.online"), root);
}
