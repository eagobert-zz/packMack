import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//add import {} from ''; for page to push from login

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup(){
    //Add how to connect with firebase???
    //Add page to push to 
    this.navCtrl.push('');
  }

}
