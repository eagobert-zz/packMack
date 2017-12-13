import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database'
import { Item } from './../models/item.model'


@Injectable()

export class InventoryListService {

    private inventoryListRef = this.afDB.list<Item>('user-inventory')
    
    constructor(private afDB: AngularFireDatabase){}

    getInventoryList(){
        return this.inventoryListRef;
    }

    addItem(item: Item) {
        return this.inventoryListRef.push(item);
    }

}