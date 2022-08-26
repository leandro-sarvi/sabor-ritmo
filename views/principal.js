import { html, render } from "../utils/lit.js";
import home from "./home.js";
export default function Principal() {
  return html`
   
   <section class="vh-100 d-flex align-item-center justify-content-center  vp">
    <img src="img/s&r.jpg">
      <div class="viewPrincipal">
      <div class="titlePrincipal">
      <h4>Bienvenido a Sabor & Ritmo!</h4>
      <span>Somos cocina fusión</span>
      <button type="button" class="btn" @click=${renderHome}>Menú <i class="fas fa-arrow-right"></i></button>
      </div>
      </div>
    </section>
  `;
}
function renderHome() {
  const root = document.getElementById('app');
  window.location.hash = "";
  render(home("laboutique@laboutique.online"), root);
}