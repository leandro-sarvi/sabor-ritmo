import { render } from './lit.js';
import home from "../views/home.js"
import principal from "../views/principal.js"
import viewProduct from '../views/viewProduct.js';
export async function router(){
  const root = document.getElementById('app'); 
  let { hash } = window.location; // desestructuracion
  if(hash !==''){
    let idProduct = hash.replace("#/", "");
  render(viewProduct(idProduct),root);
  }else{
    switch(hash){
      case '': 
      render(principal(), root);
        break;
    }
  }
}