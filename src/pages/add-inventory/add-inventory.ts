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
import { storage } from 'firebase';


@IonicPage()
@Component({
  selector: 'page-add-inventory',
  templateUrl: 'add-inventory.html',
})
export class AddInventoryPage {

  public addItemForm: FormGroup;
  public loading: Loading;
  scanData: any = {};

  image: string;



  constructor(

    public afDB: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private camera: Camera,
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
  async takePhoto(): Promise<any> {

    try {
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 500,
        targetWidth: 500,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    
      }

      const result = await this.camera.getPicture(options)
      const image = `data:image/jpeg;base64,${result}`;
      // const filename = Math.floor(Date.now() / 1000);
      const pictures = storage().ref('pictures/');
      pictures.putString(image, 'data_url');
    }
    catch(error){
      console.log(error);
    }

}


  //End export
}