import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { WelcomePage } from '../welcome/welcome';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public afAuth: AngularFireAuth,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // this.afAuth.authState.subscribe(data => console.log(data))
  }

  logoutUser(): Promise<any> {
    return this.afAuth.auth.signOut().then(() => {
      this.navCtrl.push(WelcomePage)
    });
  }

}
