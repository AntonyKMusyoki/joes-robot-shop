import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { IProduct } from '../catalog/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //Cache cart in the service. Storing copy of teh cart in the service
  //as well as on the server via API calls 
  //BehaviorSubject is an RxJs observable used to always emit the 
  //latest value to new subscribers 
  private cart: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);

  constructor(private http: HttpClient) {
    //Load cart from API into the cart variable
    this.http.get<IProduct[]>('/api/cart').subscribe({
      next: (cart) => this.cart.next(cart),
    });
  }

  //Retrieve cart to show on the cart page
  getCart(): Observable<IProduct[]> {
    return this.cart.asObservable();
  }

  add(product: IProduct) {
    const newCart = [...this.cart.getValue(), product];
    this.cart.next(newCart);
    this.http.post('/api/cart', newCart).subscribe(() => {
      console.log('added ' + product.name + ' to cart!');
    });
  }

  remove(product: IProduct) {
    let newCart = this.cart.getValue().filter((i) => i !== product);
    this.cart.next(newCart);
    this.http.post('/api/cart', newCart).subscribe(() => {
      console.log('removed ' + product.name + ' from cart!');
    });
  }
}
