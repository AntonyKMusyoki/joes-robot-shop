import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';
// import { SignInComponent } from './user/sign-in/sign-in/sign-in.component';
// import { TemplateFormControlsComponent } from './user/template-form-controls/template-form-controls.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CatalogComponent,
    SiteHeaderComponent,
    ProductDetailsComponent,
    CartComponent,
    // SignInComponent,
    // TemplateFormControlsComponent
  ],
  imports: [
    BrowserModule,
    //The HttpClient is in the HttpClientModule. We import it
    //to let Angular know we are using the service. The import
    //gives us access to the service
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
