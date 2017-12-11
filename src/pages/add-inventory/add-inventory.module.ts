import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddInventoryPage } from './add-inventory';

@NgModule({
  declarations: [
    AddInventoryPage,
  ],
  imports: [
    IonicPageModule.forChild(AddInventoryPage),
  ],
})
export class AddInventoryPageModule {}
