import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemService } from '../../providers/item-service';
import { Item } from '../../models/item.model';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the InventoryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventory-list',
  templateUrl: 'inventory-list.html',
})
export class InventoryListPage {

  ItemService$: Observable<Item[]>

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private itemService: ItemService
  ) {
    this.ItemService$ = this.itemService
    .getItemList() //DB List
    .snapshotChanges() //Access to Key/Value pairs
    .map((changes) => {

      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryListPage');
  }

}
