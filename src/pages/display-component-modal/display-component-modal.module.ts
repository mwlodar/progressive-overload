import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayComponentModalPage } from './display-component-modal';

@NgModule({
  declarations: [
    DisplayComponentModalPage,
  ],
  imports: [
    IonicPageModule.forChild(DisplayComponentModalPage),
    ComponentsModule
  ],
})
export class DisplayComponentModalPageModule {}
