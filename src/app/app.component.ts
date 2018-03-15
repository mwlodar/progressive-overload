import { AuthService } from './../providers/auth/auth.service';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';


export var Global = {
  uid: '' as string
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  constructor(network: Network, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, auth: AuthService) {
    platform.ready().then(() => {
      let disconnectSub = network.onDisconnect().subscribe(() => {
        alert('you are offline');
      });
      
      let connectSub = network.onConnect().subscribe(()=> {
        console.log('you are online');
      });
      auth.getAuthenticatedUser().subscribe(user => {
        if (user) {
          console.log("FROM APP COMPONENT:", user.uid);
          Global.uid = user.uid;
          this.nav.setRoot('TabsPage');
        } else {
          this.nav.setRoot('LoginPage');
        }
        statusBar.styleDefault();
        splashScreen.hide();
      });
    });
  }
}
