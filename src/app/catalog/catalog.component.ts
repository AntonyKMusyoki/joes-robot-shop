import { Component, inject } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart.service';
import { ProductService } from './product.service';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  //product is a public propery in catalogue component class
  //Class properties in TS are public by default
  //To access the property in the template it needs to be public
  products: any
  //Array does not allow for null
  //products: IProduct[]; 
  filter: string = '';
  //cart: IProduct[] = [];

  //Alternative to constructor injection is inject Function
  //This method has advantage of being easier to read
  //It has drawback during writing unit tests as this could be in 
  //certain situations limited in how those unit tests are written
  //As a result the contructor syntax is recommended over inject function
  private CartSvs2: CartService = inject(CartService);

  //Can make the service variable 'protected' which will make sure
  //that the variable gets put onto the class. This gives the component
  //a handle through the cartSvc variable to the CartService
  //This is dependency injection thought the constructor
  constructor(
    private cartSvc: CartService, 
    private productSvc: ProductService
  ) { }

  //ngOnInit is lifecycle method that runs when component initializes
  //This is typically where you make HTTP calls
  ngOnInit() {
    //getProducts() returns an observable
    //Very Important: When dealing with HTTP calls that return observables
    //you must subscrive to the HTTP call and when you do that actually
    //executes the HTTP call. Just calling the methods not not actually do 
    //anything yet. The method returns an observable that we need to subscribe to
    this.productSvc.getProducts().subscribe(products => {
      this.products = products;
    })
  }

  // addToCart(product: IProduct) {
  //   this.cart.push(product);
  //   console.log(`product ${product.name} added to cart`);
  // }
  addToCart(product: IProduct) {
    this.cartSvc.add(product);
  }

  getFilterProducts() {
    return this.filter === '' 
    ? this.products
    : this.products.filter((product: any) => product.category === this.filter);  
  }
}
