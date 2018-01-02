import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { FirebaseConfig } from '../app/app.firebase.config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../providers/auth';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { Toast } from '@ionic-native/toast';
import { FormsModule } from "@angular/forms";
import { ItemService } from '../providers/item-service';
// import { DataServiceProvider } from '../providers/data-service';
// import {HttpModule} from'@angular/http'; 
// import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http'



@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
  ],
  imports: [
    BrowserModule,
    // HttpClientModule,
    // HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ItemService,
    AuthProvider,
    AngularFireDatabase,
    BarcodeScanner,
    Camera,
    Toast,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    // DataServiceProvider
  ]
})
export class AppModule {}
