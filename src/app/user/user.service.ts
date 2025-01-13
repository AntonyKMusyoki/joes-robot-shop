import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IUser, IUserCredentials } from './user.module';
import { HttpClient } from '@angular/common/http';

//This service used to send data from signin form to 
//the API to validate and sign in the user

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //This is caching the current user in the UserService
  private user: BehaviorSubject<IUser | null>;

  constructor(private http: HttpClient) {
    //(null) means the cached user starts out as null
    this.user = new BehaviorSubject<IUser | null>(null);
   }

   //get current user
   getUser(): Observable<IUser | null> {
    return this.user;
   }

   //signIn takes in UserCredentials object and posts to the API. 
   //When sign-in form is wired up it will gather data and sent
   //the data to signIn() method to sign in the user. 
   //If passed in credentials not correct then the observable will 
   //return an error. 
   //UserCredentials is same object used in form to gather credentials
   signIn(credentials: IUserCredentials): Observable<IUser> {
    return this.http
      //post credentials to API
      .post<IUser>('/api/sign-in', credentials)
      //RxJs map function typically used to allow you to map over all 
      //the items in an observable and possibly change their shape.
      //Can also be used like below to grab any emited values from the 
      //observable while still allowing us to return the observable to
      //subscribers   
      //If post is successful use RxJs map function to grab and ..
      .pipe(map((user: IUser) => {
        //.. cache the returned used object locally
        //We are caching the user value by emitting the returned user
        //from our API to our user observable, which is a behavior subject
        //so it will cache and always admit the current value of the user
        this.user.next(user);
        //observable returned here is same observable returned by http 
        //post method above [.post<IUser>('/api/sign-in', credentials)]
        return user;
      }));
   }

   signOut() {
    this.user.next(null);
   }
}
