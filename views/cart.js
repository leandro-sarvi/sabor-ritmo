import { html, render } from "../utils/lit.js";
import firebaseApp from "../utils/credenciales.js";
import { getFirestore, doc, getDoc } from "../utils/firestore.js";
const firestore = getFirestore(firebaseApp);
import home from "../views/home.js"
import viewVacio from "./viewVacio.js";
import { mail, tel } from "../utils/variables.js";
export default function cart() {
    let root = document.getElementById('app');
    let productoLS = JSON.parse(localStorage.getItem(mail));
    let total=0;
    productoLS.map(p =>{
     total = total + Number( p.total);
    });
    return html`
    <nav class="viewCart">
         <i class="fa-solid fa-angle-left" @click=${renderHome}></i>
        <div>
        <a @click=${vaciarStorage}><i class="fa-solid fa-trash-can"></i></a>
        </div>
         </nav>
         <div class="miPedido">
         <span>Mi Pedido</span>
         </div>
         <div class="mainPedido shadow-lg">
         <div class="accordion accordion-flush" id="accordionFlushExample">
         <div class="accordion-item">
         <h2 class="accordion-header" id="flush-headingOne">
           <button
             class="accordion-button collapsed cat"
             type="button"
             data-bs-toggle="collapse"
             data-bs-target="#flush-pedido"
             aria-expanded="false"
             aria-controls="flush-collapseOne"
           >
             <h5>Detalle del pedido</h5>
           </button>
         </h2>
         <div
           id="flush-pedido"
           class="accordion-collapse collapse"
           aria-labelledby="flush-headingOne"
           data-bs-parent="#accordionFlushExample"
         >
           <div class="accordion-body" id="viewPedido">
           ${productoLS.map((p)=>{
            return html`
            <div class="cardPedido">
            <div class="cartPedido">
            <div>
            <span>${p.cantidad}x </span>
            <span>${p.title}</span>
            </div>
            <span class="cart-total">$${p.total}</price>
            </div>
            <button class="btn-pedido" id="${p.id}" data-id="${p.id}" @click=${vaciarProd}>x eliminar</button>
            </div>
            `
           })}
           </div>
         </div>
       </div>
          </div>
          <div class="title-separator">
          <span>DATOS DE ENTREGA</span>
          </div>
          <div class="form-group">
    <label for="nameClient">Nombre de quien lo recibe</label>
    <input type="text" class="form-control" id="nameClient" aria-describedby="emailHelp">
   </div>
   <div class="form-group">
   <label for="direccion">Dirección de envío completa</label>
   <input type="text" class="form-control" id="direccion" aria-describedby="emailHelp">
  </div>
  
  <div class="title-separator">
  <span>FORMA DE PAGO</span>
  </div>
          <div class="form-check">
  <input type="radio" class="form-check-input" id="radio1" name="optradio" value="Mercado Pago" checked>
  <label class="form-check-label" for="radio1">Mercado Pago</label>
</div>
<div class="form-check">
  <input type="radio" class="form-check-input" id="radio2" name="optradio" value="Efectivo">
  <label class="form-check-label" for="radio2">Efectivo</label>
</div>
<div class="d-flex align-items-center justify-content-between total-confirmar">
         <div class="col-50">
         <span id="price" data-price="${total}">$${total}</span>
         </div>
         <div class="hacer-pedido">
         <button class="btn" @click=${confirmar}><i class="fa-solid fa-check"></i> Confirmar pedido </button>
         </div>
         </div>
    `;
    function renderHome() {
        const root = document.getElementById('app');
        render(home(mail), root);
      }
      function vaciarStorage(){
        localStorage.clear();
        render(viewVacio(),root);
      }
      function vaciarProd(e){
          let viewPedido = document.getElementById('viewPedido');
          productoLS.forEach(function (LS, index) {
            if (LS.id === e.target.getAttribute('data-id')) {
              productoLS.splice(index, 1);
            }
          });
          localStorage.setItem(mail, JSON.stringify(productoLS));
          if(productoLS.length === 0){
            render(viewVacio(),root);
          }else{
            render(html`
          ${productoLS.map((p)=>{
            return html`
            <div class="cardPedido">
            <div class="cartPedido">
            <div>
            <span>${p.cantidad}x </span>
            <span>${p.title}</span>
            </div>
            <span class="cart-total">$${p.total}</price>
            </div>
            <button class="btn-pedido" id="${p.id}" data-id="${p.id}" @click=${vaciarProd}>x eliminar</button>
            </div>
            `
           })}
          `, viewPedido);
          total=0;
          productoLS.map(p =>{
            total = total + Number( p.total);
           });
           let idTotal = document.getElementById('price');
           idTotal.innerHTML=``;
           idTotal.innerHTML=`$${total}`;
          }
      }
      function confirmar(){
        let v = productoLS.map((element) => {
          return `%0D%0A%E2%9C%85($${element.total}) ${element.cantidad}X ${element.title} NOTAS:${element.notas}%0A`;
        });
        let nameClient = document.getElementById('nameClient');
        let direccion = document.getElementById('direccion');
        let metodo="";
        if (document.getElementById("radio1").checked) {
          metodo = document.getElementById("radio1").value;
        } else {
          metodo = document.getElementById("radio2").value;
        }
      
        if(nameClient.value==='' | direccion.value===''){
          Swal.fire({
            icon: "error",
            title: "Datos",
            text: "Completa los campos vacios",
            timer: 1500,
            showConfirmButton: false,
          });
        }else{
          let url = `https://wa.me/${tel}?text=http%3A%2F%2F${window.location.host}%2F%0D%0AHola+Sabor+%26+Ritmo%21%0D%0AQuiero+hacer+un+pedido%2C+este+es+el+detalle%3A${v.join("")}%0D%0A%0D%0AM%C3%A9todo+de+pago+%F0%9F%92%B5%3A%0D%0A%0D%0A%E2%98%91+${metodo}%0D%0A%0D%0ANombre+de+quien+lo+recibe+%F0%9F%98%81%3A+%0D%0A%0D%0A${nameClient.value}%0D%0A%0D%0ADirecci%C3%B3n%F0%9F%97%BA%3A%0D%0A%0D%0A${direccion.value}%0D%0A%0D%0ATotal%3A%0D%0A%0D%0A%24${total}`;
      window.open(url);
      vaciarStorage();
        }
        
}
}
