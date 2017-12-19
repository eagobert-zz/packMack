import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, 
  // Validators
 } from '@angular/forms';
// import { Item } from '../../models/item.model';
// import { InventoryListService } from '../../providers/inventory-list';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-add-inventory',
  templateUrl: 'add-inventory.html',
})
export class AddInventoryPage {

  options: BarcodeScannerOptions;
  public addItemForm: FormGroup;
  public loading: Loading;
  scanData: any = {};


  constructor(
    private barcode: BarcodeScanner, 
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    // private inventory: InventoryListService
  ) {
    this.scanData.text = '',

    this.addItemForm = formBuilder.group({
      // image: undefined;
      categoryId: [''],
      itemId: [''],
      name: [''],
      description: [''],
      estValue: [undefined],
      quantity: [undefined],
      inputDate: ['']
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddInventoryPage');
  }

  // addItem(item: Item) {
  //   this.inventory.addItem(item).then(ref => {
  //     this.navCtrl.setRoot('HomePage')
  //     console.log(ref.key);
  //   });

  // }

  // To use async and await, in tsconfig.json "target" must be set to ES6 to work
  async scanBarcode(scanData){
    this.scanData = await this.barcode.scan();
    console.log(this.scanData)
    return this.scanData;
  }

}