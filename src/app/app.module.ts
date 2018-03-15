import { PipesModule } from './../pipes/pipes.module';
import { Network } from '@ionic-native/network';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthService } from './../providers/auth/auth.service';
import { FirebaseConfigDev, FirebaseConfigProd } from './firebase.credentials';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { DatabaseService } from '../providers/database/database.service';
import { CommonModule, DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHighlight: true,
      tabsHideOnSubPages: true
    }),
    AngularFireModule.initializeApp(FirebaseConfigProd),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CommonModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    DatabaseService,
    Network,
    DatePipe
  ]
})
export class AppModule {}
