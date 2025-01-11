import { Injectable } from '@angular/core';
import { IProduct } from './catalog/product.model';
import { ILineItem } from './catalog/line-item.model';
import { HttpClient } from '@angular/common/http';

//@Injectable marks a item as a service. 
//There is no @service decorator
//It really only takes one thing providedIn: 'root'
//This means this service is available anywhere in 
//the Angular application  
//It does have a couple of other options
@Injectable({
  providedIn: 'root'
})

//Core of a service is just a class
export class CartService {
  cart: IProduct[] = [];

  constructor(private http: HttpClient) { }

  add(product: IProduct) {
    this.cart.push(product);
    
    //1st param is the url
    //2nd param is the data we want to sent which in this case is
    //a JS object that contains the data. When passed the JS object
    //to a POST ir converts it into JSON and sends it in request to server  
    //The line will not execute until someone subscribes to the POST method
    //Don't want to return the observable from service and force consumer 
    //(Component) to subcribe. Instead subscribe from this service. 
    this.http.post('/api/cart', this.cart).subscribe(() => {
      console.log(`product ${product.name} added to cart`);
    })    
  }

  // //More complex business logic to demostrate encapsulating 
  // //business logic into a service
  // private cart: ILineItem[] = [];

  // constructor() {}

  // //Total price of cart by ierating through the cart,
  // //counting up the items, multiplying the price by the 
  // //quantity, the reporting that out. 
  // getTotalPrice() {
  //   return (
  //     Math.round(
  //       this.cart.reduce<number>((prev, cur) => {
  //         return (
  //           prev + cur.qty * (cur.product.price * (1 - cur.product.discount))
  //         );
  //       }, 0) * 100
  //     ) / 100
  //   ); 
  // }

  // //helper method to find the product 
  // findLineItem(product: IProduct) {
  //   return this.cart.find((li) => li.product.id === product.id);
  // }

  // //Check to see if product exists before adding it
  // add(product: IProduct) {
  //   let lineItem = this.findLineItem(product);
  //   if (lineItem !== undefined) {
  //     lineItem.qty++;
  //   } else {
  //     lineItem = {product: product, qty: 1};
  //     this.cart.push(lineItem);
  //   } 
    
  //   console.log('added ' + product.name + ' to cart!');
  //   console.log('Total price: $' + this.getTotalPrice());
  // }
}
