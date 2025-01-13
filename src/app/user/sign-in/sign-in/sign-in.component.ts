import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IUserCredentials } from '../../user.model';
import { UserService } from '../../user.service';


@Component({
  selector: 'bot-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  //create credentials object and initialize to empty email and password
  //from the template (html) bind the form inputs to this object
  credentials: IUserCredentials = {email: '', password: ''}
  signInError: boolean = false;

  constructor(
    private userSvc: UserService,
    private router: Router
  ) {}

  //Call in signIn() method from userService from this signIn() method
  //in sign-in component which is called when user clicks submit button.  
  //after succcesul signin we want to redirect used to catalog page 
  //UserServices signIn() method returns an obsevable which we can
  //subscribe to.
  signIn() {
    //Everytime we signin we want to set the signInError to false
    this.signInError = false;
    this.userSvc.signIn(this.credentials).subscribe({
      //when obsevable successfully returns a value (user signed in)
      //the navigate to the catalog page. Navigate() call takes in
      //an array of strings which it used to build the URL
      next: () => this.router.navigate(['/catalog']),
      //Tap into error event in observable if user signin failed
      error: () => (this.signInError = true)
    });
  }

  

}
