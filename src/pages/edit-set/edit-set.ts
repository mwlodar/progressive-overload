import { SetLogFormComponent } from './../../components/set-log-form/set-log-form.component';
import { DatabaseService } from './../../providers/database/database.service';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { Set } from './../../models/exercise-log/exercise-log-entry.interface';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-edit-set',
  templateUrl: 'edit-set.html',
})
export class EditSetPage {

  set: Set;

  setRef: AngularFireList<Set>;

  @ViewChild(SetLogFormComponent) setForm: SetLogFormComponent;

  constructor(private navCtrl: NavController, private navParams: NavParams, private database: DatabaseService) {
  }

  ionViewWillEnter() {
    this.setForm.showForm = true;
    this.set = this.navParams.get('data');
    this.setRef = this.navParams.get('ref')
  }

  retrieveSetData(set:Set) {
    if (set.key) {
      this.setRef.update(set.key, set);
    } else {
      this.database.setListData(this.setRef, set);
    }
  }

}
