import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';

export const firebaseConfig = {
  apiKey: "AIzaSyB7W5NYhphz2y4tEdMOgzgq_8xMYf1M28Q",
  authDomain: "pin-board-20cff.firebaseapp.com",
  databaseURL: "https://pin-board-20cff.firebaseio.com",
  storageBucket: "pin-board-20cff.appspot.com",
  messagingSenderId: "789538035078"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }