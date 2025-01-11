import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from './product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //HttpClient is a service build within Angular
  //You can inject services into components and into services
  constructor(private http: HttpClient) { }

  //It good idea to explicitly define what is getting returned 
  //by the function. The HTTP methods return an observable over the 
  //type of data that is getting returned.
  getProducts (): Observable<IProduct[]>  {
    //The url for the get could include queury parameters 
    //like "/api/products?sort=name"
    return this.http.get<IProduct[]>('/api/products');
  }
}
