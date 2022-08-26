import { html, render } from "../utils/lit.js";
import firebaseApp from "../utils/credenciales.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "../utils/storage.js";
import {
  getFirestore,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  collection,
  getAllProduc,
  getDoc,
  setDoc,
} from "../utils/firestore.js";
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
export default async function cateP(){
    let categorias = [];
    const consulta = await getDoc(doc(firestore, `losbetos@losbetos.online`, "categorias"));
    if (consulta.exists()) {
      let categorias = consulta.data().categorias;
      categorias.map((e) =>{
        console.log(e.title);
        let accordionFlushExample = document.getElementById('accordionFlushExample');
        accordionFlushExample.innerHTML+=`<div class="accordion-item">
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
       })
    }
}