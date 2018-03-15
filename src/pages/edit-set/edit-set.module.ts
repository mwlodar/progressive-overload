import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditSetPage } from './edit-set';

@NgModule({
  declarations: [
    EditSetPage,
  ],
  imports: [
    IonicPageModule.forChild(EditSetPage),
    ComponentsModule
  ],
})
export class EditSetPageModule {}
