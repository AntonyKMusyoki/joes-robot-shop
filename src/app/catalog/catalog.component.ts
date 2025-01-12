import { Component, inject } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
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
    });
    //This snapshot is a single point in time snapshot of the current URL information
    //route.snapshot has a params object. The params object as properties for each 
    //route parameter on the URL that we define in our routes. 
    //snapshot is set when the catalog component is first loaded and it works when 
    //linking to this component from another component like from the home page. It 
    //runs into trouble if we link from the component from itself because the 
    //component is already loaded. When you link to the component from itself it 
    //will not reload the component, whic means this snapshot will be stale.
//    this.filter = this.route.snapshot.params['filter'];   
    
        
    //Alternative it using snapshots due to its shortcomings is to setup a 
    //subscription that listens to changes to the route parameters. Therefore 
    //access the route params directly with route.params subscribe. 
    //Params is an observable and that subscription publishes a param object. 
    //When a new params object is published we will call a function. Each time 
    //URL changes a new params will be published and filter can be set from it.  
    //If filter is not provided set filter to empty string   
//    this.route.params.subscribe((params) => {
//      this.filter = params['filter'] ?? '';
//    });

    //Update catalog to read query params instead of route params
    this.route.queryParams.subscribe((params) => {
      this.filter = params['filter'] ?? '';
    });


  }

  // addToCart(product: IProduct) {
  //   this.cart.push(product);
  //   console.log(`product ${product.name} added to cart`);
  // }
  addToCart(product: IProduct) {
    this.cartSvc.add(product);
    
    //Navigate to cart page after adding item to cart
    //Navigate() function accepts an array param that works
    //like the routerLink parameter. Simply provide URL segments
    //as selements of the array
    this.router.navigate(['/cart']);
  }

  getFilterProducts() {
    return this.filter === '' 
    ? this.products
    : this.products.filter((product: any) => product.category === this.filter);  
  }
}
