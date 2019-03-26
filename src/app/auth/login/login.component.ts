import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import * as firebase from "firebase";
import { Router } from "@angular/router"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type: string = null;
  msg: string = null;
  constructor(private _router: Router) { }

  ngOnInit() {
  }
  LoginUser(form : NgForm){
    const email = form.value.email
    const password = form.value.password; 
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(userData =>{
      if(userData.emailVerified){
        console.log("nextr");
        // this.SetUID(userData.uid);
        localStorage.setItem("userUID",userData.uid);
        this._router.navigate(["/success",userData.uid]);
      }else{
        localStorage.removeItem("userUID");
        this.type ="error";
        this.msg ="Email Verification Pending!!!";
      }
    })
    .catch(userData =>{
      localStorage.removeItem("userUID");
      this.type ="error";
      this.msg ="Wrong User Credentials";
    })
  }

  fblogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result =>{
      if(result.user.emailVerified){
        console.log("nextr");
        // this.SetUID(result.user.uid);
        localStorage.setItem("userUID",result.user.uid);
        this._router.navigate(["/success",result.user.uid]);
      }else{
        this.type ="error";
        this.msg ="Email Verification Pending!!!";
      }
    })
    .catch(userData =>{
      localStorage.removeItem("userUID");
       this.type ="error";
        this.msg ="Wrong User Credentials";
    })
  }

  ggllogin(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      debugger;
      if(result.user.emailVerified){
        console.log("nextr");
        // this.SetUID(result.user.uid)
        localStorage.setItem("userUID",result.user.uid);;
        this._router.navigate(["/success",result.user.uid]);
      }else{
        this.type ="error";
        this.msg ="Email Verification Pending";
      }
    })
    .catch(userData =>{
      localStorage.removeItem("userUID");
      this.type ="error";
      this.msg ="Wrong User Credentials";
    })
  }

}