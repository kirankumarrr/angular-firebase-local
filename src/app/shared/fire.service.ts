import { Injectable } from '@angular/core';

import * as firebase from "firebase";

@Injectable()
export class FireService {
 
  constructor() { }

  getUserFromDatabase(uid){
    const ref = firebase.database().ref("users/"+uid);
    return ref.once('value')
              .then( snapshot => {
               return snapshot.val();
                console.log(snapshot.val())
              })
  }

}