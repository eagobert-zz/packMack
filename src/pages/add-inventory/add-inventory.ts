import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, // Validators
} from '@angular/forms';
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';
import { Item } from '../../models/item.model';
import { ItemService } from '../../providers/item-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { storage } from 'firebase';
import { HTTP } from '@ionic-native/http';




@IonicPage()
@Component({
  selector: 'page-add-inventory',
  templateUrl: 'add-inventory.html',
})
export class AddInventoryPage {

  public addItemForm: FormGroup;
  public loading: Loading;

  scanData: any = {};
  item: any = {};
  products: any = {};
  productName: any = "";
  productMsrp: any = "";


  public picData: any;
  public picUrl: any;
  public picRef: any;



  constructor(
    // public http: HttpClient,
    private http: HTTP,
    public afDB: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private camera: Camera,
    private barcode: BarcodeScanner, 
    // private toast: Toast,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private inventory: ItemService,
    // private dataService: DataServiceProvider
  ) {
    this.picRef=storage().ref('/');

    this.addItemForm = formBuilder.group({
      imageUrl: [''],
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
    return this.inventory.addItem(
      this.addItemForm.value.imageUrl,
      this.addItemForm.value.categoryId,
      this.addItemForm.value.itemId,
      this.addItemForm.value.name,
      this.addItemForm.value.description,
      this.addItemForm.value.estValue,
      this.addItemForm.value.quantity,
      this.addItemForm.value.inputDate 
    )
    .then((item) => {
      console.log("Item #: " + item.key + " has been stored.");
      this.addItemForm.reset();
    });

  }

  // Function to get barcode data.  Note: to use async and await, in tsconfig.json "target" must be set to ES6 to work
  scanBarcode(){
 
    this.barcode.scan().then((barcodeData) => {
      this.scanData = barcodeData;
      console.log("Scanned Barcode #: " + this.scanData.text);
      return this.scanData;
    
    }).then((scanData) => {
            
      console.log(`http://api.walmartlabs.com/v1/items?apiKey=48h2dej9htyvzqzs6ab5rc8p&upc=${this.scanData.text}`)



      this.http.get(`http://api.walmartlabs.com/v1/items?apiKey=48h2dej9htyvzqzs6ab5rc8p&upc=${this.scanData.text}`, {}, {})
      .then((data) => {
        this.productName = JSON.parse(data.data).items[0].name;
        this.productMsrp = JSON.parse(data.data).items[0].msrp;

        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);
      })
      .catch((error) =>{
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
  

    });
  }

  // Function to take photos...
  takePic(){
    this.camera.getPicture({
      quality: 100,
      targetHeight: 300,
      targetWidth: 300,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }).then(imgData => {
      this.picData = imgData;
      this.uploadPic();
  
    })
  }

  //Function to upload to firebase and return valid url
  uploadPic(){
    //Define variable for use
    const user = this.afAuth.auth.currentUser;
    const filename = Math.floor(Date.now() / 1000);

    //Store image to firebase storage
    const imageRef = this.picRef.child(`${user.uid}/photos/${filename}.png`);
    
    imageRef.putString(this.picData, 'base64', {contentType: 'image/png'})
    .then((savedImage) => {
      this.picUrl = savedImage.downloadURL;
      console.log(this.picUrl);
    })
    }

    

  //End export
}