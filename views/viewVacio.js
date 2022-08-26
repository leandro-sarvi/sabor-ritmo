import { html, render } from "../utils/lit.js";
import firebaseApp from "../utils/credenciales.js";
import { getFirestore, doc, getDoc } from "../utils/firestore.js";
const firestore = getFirestore(firebaseApp);
import home from "../views/home.js"
import { mail } from "../utils/variables.js";
export default function viewVacio() {
    return html`
   
    <section
       class="vh-100 d-flex justify-content-center align-items-center"
     >
       <div class="viewVacio">
       <div>
       <i class="fa-solid fa-basket-shopping"></i>
       </div>
       <div class="titlePrincipal">
       <h4>Su Carrito Esta Vacío</h4>
       <button type="button" class="btn" @click=${renderHome}><i class="fa-solid fa-arrow-left-long"></i> Volver al Menú</button>
       </div>
       </div>
     </section>
   `;
 }
 function renderHome() {
   const root = document.getElementById('app');
   window.location.hash = "";
   render(home(mail), root);
 }