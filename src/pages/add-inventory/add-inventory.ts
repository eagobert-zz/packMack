import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from '../../models/item.model';
import { InventoryListService } from '../../providers/inventory-list';
// import { BarcodeScanner} from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-add-inventory',
  templateUrl: 'add-inventory.html',
})
export class AddInventoryPage {

  item: Item = {
        // image: undefined;
        categoryId: '',
        itemId: '',
        name: '',
        description: '',
        estValue: undefined,
        quantity: undefined,
        inputDate: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private inventory: InventoryListService) {
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

}
