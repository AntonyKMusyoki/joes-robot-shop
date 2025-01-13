import { Component, OnInit } from '@angular/core';

import { IUser } from '../user/user.module';
import { UserService } from '../user/user.service';


@Component({
  selector: 'bot-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
//in the components OnInit() method we want to subscribe 
//to the User state
export class SiteHeaderComponent implements OnInit {

  //Need to user object to detect if user is signed in
  //Default tp null
  user: IUser | null = null;
  showSignOutMenu: boolean = false;
  
  constructor(
    //Import UserService
    private userSvc: UserService) { }

  ngOnInit(): void {
    //Call UserService's getUser() method to get current user
    //which is an observable as the user changes after user
    //logs in
    this.userSvc.getUser().subscribe({
      //Whenever user value is updated, we will set our user
      //property
      next: (user) => {this.user = user}
    });
  }

  //toggle signOutMenu 
  toggleSignOutMenu() {
    this.showSignOutMenu = !this.showSignOutMenu;
  }

  signOut() {
    this.userSvc.signOut();
    this.showSignOutMenu = false;
  }
}
