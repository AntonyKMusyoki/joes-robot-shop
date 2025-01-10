import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../catalog/product.model';

@Component({
  selector: 'bot-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  //"!" tells TS to ignore that it is not initialized
  // productDetails!: IProduct;
  //@input tells child component and any components that 
  //utilize this child component that it does have a 
  //productDetails memmber that can receive data from a parent
  @Input() productDetails!: IProduct;

  @Output() buy = new EventEmitter();

  getImageUrl (productDetails: IProduct) {
    if (!productDetails) return '';
    return '/assets/images/robot-parts/' + productDetails.imageName;
  }  

  getDiscountedClasses(productDetails: IProduct) {
    if (productDetails.discount > 0 ) return ['strikethrough', 'bold'];
    else return [];
  }

  buyButtonClicked(productDetails: IProduct) {
    this.buy.emit();
  }
}
