import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, 
  // Validators
 } from '@angular/forms';
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';
import { Item } from '../../models/item.model';
import { InventoryListService } from '../../providers/inventory-list';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
// import { storage } from 'firebase';


@IonicPage()
@Component({
  selector: 'page-add-inventory',
  templateUrl: 'add-inventory.html',
})
export class AddInventoryPage {

  public addItemForm: FormGroup;
  public loading: Loading;
  scanData: any = {};

  base64Image: string;


  constructor(

    public afDB: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public camera: Camera,
    private barcode: BarcodeScanner, 
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private inventory: InventoryListService
  ) {

    this.addItemForm = formBuilder.group({
      imageUpload: [''],
      categoryId: [''],
      itemId: [''],
      name: [''],
      description: [''],
      estValue: [''],
      quantity: [''],
      inputDate: ['']
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddInventoryPage');
  }

  addItem(item: Item) {
    this.inventory.addItem(item).then(ref => {
      this.navCtrl.setRoot('HomePage')
      console.log(ref.key);
    });

  }

  // Function to get barcode data.  Note: to use async and await, in tsconfig.json "target" must be set to ES6 to work
  async scanBarcode(scanData){
    this.scanData = await this.barcode.scan();
    console.log(this.scanData)
    return this.scanData;
  }

  //Function to take photo.
  capture() {
      
      const options: CameraOptions = {
      quality: 45,
      targetHeight: 300,
      targetWidth: 300,
      destinationType: this.camera.DestinationType.NATIVE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }

    this.camera.getPicture(options).then((imageData) => {

      //Note:  worry about uploading video to firebase storage and then displaying after being added to a user's pack.  the unsafe url is too complicated to override here...
      this.base64Image = 'data:image/jpeg;' + imageData;

    }, (err) => {
      console.log(err);

    });

}


  //End export
}