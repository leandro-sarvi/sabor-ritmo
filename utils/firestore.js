import firebaseApp from "../utils/credenciales.js";
import {
  getFirestore,
  onSnapshot,
  deleteDoc,
  getDocs,
  doc,
  addDoc,
  collection,
  updateDoc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";
let firestore = getFirestore(firebaseApp);
export {
  getFirestore,
  deleteDoc,
  doc,
  addDoc,
  collection,
  onSnapshot,
  getDocs,
  updateDoc,
  getDoc,
  setDoc,
};
/*Traemos todos los productos y retornamos un array */
export async function getAllProduc(email) {
  const productos = [];
  const snapShot = await getDocs(collection(firestore, `${email}`));
  snapShot.forEach((doc) => {
    //Destructuring doc.data()
    productos.push({
      id: doc.id,
      title: doc.data().title,
      imagen: doc.data().imagen,
      precio: doc.data().precio,
      categoria: doc.data().categoria,
    });
  });
  return productos;
}
