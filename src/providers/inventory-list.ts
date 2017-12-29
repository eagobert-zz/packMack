import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database'; 
import { Item } from '../models/item.model';
import { AngularFireAuth } from "angularfire2/auth";



@Injectable()

export class ItemService {

    //Create reference to firebase database.  With model type "Item"
    private user = this.afAuth.auth.currentUser;
    private itemListRef = this.afDB.list<Item>(`items/${this.user.uid}`)

    
    constructor(private afDB: AngularFireDatabase,
    private afAuth: AngularFireAuth){}

    getItemList() {
        return this.itemListRef;
    }

    addItem( imageUrl: string, categoryId: string, itemId: number, name: string, description: string, estValue: number, quantity: number, inputDate: string ) {

        return this.itemListRef.push({
            imageUrl: imageUrl,
            categoryId: categoryId,
            itemId: itemId,
            name: name,
            description: description,
            estValue: estValue,
            quantity: quantity,
            inputDate: inputDate 
        });
    }

}