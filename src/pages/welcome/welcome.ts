import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Ionic pages imported for signup and login from WelcomePage
// import { SignupPage } from '../signup/signup';
// import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  signup(){
    this.navCtrl.push('SignupPage')
  }

  login(){
    this.navCtrl.push('LoginPage')
  }

}
