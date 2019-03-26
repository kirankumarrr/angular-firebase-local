import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { ActivatedRoute,  Router } from "@angular/router"
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  LoggedIn: boolean = false;
  UserUid: any;
  constructor(private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.UserUid = localStorage.getItem("userUID");
    //ask firebase wheather user is loggedin or not
    firebase.auth().onAuthStateChanged(userDate => {
      if (userDate && userDate.emailVerified) {
        this.LoggedIn = true;
      }
      else {
        this.LoggedIn = false;
        //  firebase.auth().signOut();
      }
    })

  }
  logoutEvent() {
    firebase.auth().signOut();
    console.log("User Logout!!!");
    this._router.navigate(["/"]);
  }
  successbtn(){
    this._router.navigate(["/success",this.UserUid ]);
  }
}