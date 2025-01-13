import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//FormsModule manual imported as its needed in 
//template-form-controls.component.html
import { FormsModule } from '@angular/forms';

import { SignInComponent } from './sign-in/sign-in/sign-in.component';
import { TemplateFormControlsComponent } from './template-form-controls/template-form-controls.component';


//This is a Feature module for user components 

@NgModule({
  declarations: [
    SignInComponent,
    TemplateFormControlsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class UserModule { }
