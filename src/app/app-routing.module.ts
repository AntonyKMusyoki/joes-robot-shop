import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';
import { SignInComponent } from './user/sign-in/sign-in/sign-in.component';
import { TemplateFormControlsComponent } from './user/template-form-controls/template-form-controls.component';

//Create array to hold route defininitaitons
//Routes are objects that map a URL to a component
const routes: Routes = [
  {path: 'home', component: HomeComponent, title: "Home -  Joes Robot Shop"},
  //colon (:) signals to Angular router that this part of the URL path will 
  //actually be a route parameter. Name of the route parameter is filter
  // {path: 'catalog/:filter', component: CatalogComponent, title: "Catalog -  Joes Robot Shop"},
  //Query String Parameters do not meed to be defined. So filter param from above 
  //has been removed below
  {path: 'catalog', component: CatalogComponent, title: "Catalog -  Joes Robot Shop"},
  {path: 'cart', component: CartComponent, title: "Cart -  Joes Robot Shop"},
  {path: 'sign-in', component: SignInComponent},
  {path: 'form-controls', component: TemplateFormControlsComponent},
  {path: '', redirectTo: '/home', pathMatch: 'prefix'}
];


@NgModule({
  declarations: [],
  imports: [
    //When we import a RouterModule we use a special 
    //syntax that allows us to pass routes to the router    
    //forRoot() function provides the routes for the root
    //of the application. 
    RouterModule.forRoot(routes) 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
