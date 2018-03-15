import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

export interface ComponentModalView {
  header?: string;
  component: 'rpe-calculator';
}

@IonicPage()
@Component({
  selector: 'page-display-component-modal',
  templateUrl: 'display-component-modal.html',
})
export class DisplayComponentModalPage {

  data: ComponentModalView;

  constructor(private navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController) {
    
  }

  ionViewWillEnter() {
    this.data = this.navParams.get('data');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
