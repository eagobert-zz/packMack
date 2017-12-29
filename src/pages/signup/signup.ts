import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth';
import { EmailValidator } from '../../validators/email-validator';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {

  public signupForm: FormGroup;
  public loading: Loading;

  constructor(
    public afAuth: AngularFireAuth,
    public authData: AuthProvider,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController 
    ) {

      this.signupForm = formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(
        this.signupForm.value.firstName,
        this.signupForm.value.lastName,
        this.signupForm.value.email, 
        this.signupForm.value.password)
      .then(() => {
        this.navCtrl.push(HomePage);
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }
}
