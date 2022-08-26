import { html } from '../utils/lit.js';

export default function err404(){

  return html`
  <div class="p1">
  <div class="header">
  <h1 class="fw600 s3">Estudio Digital </h1>
    <h1 class="fw900 s5">404 no se encontro la pagina</h1>
  </div>
  <div class="img-gif">
    <a href="#home" class="cool-btn">¡Redirigir a Home!</a>
  </div>
</div>
  `;
}