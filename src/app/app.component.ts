import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { ColorPickerService } from 'angular2-color-picker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  items: FirebaseListObservable<any>;
  categories: FirebaseListObservable<any>;
  displayName: string;
  displayImageUrl: string;
  message: string = '';
  category: string = '';
  addingCategory: boolean;
  color: string = "#333";

  @Input() logoutSuccess: boolean;
  @Input() name: any;

  constructor(public af: AngularFire) {

    this.af.auth.subscribe(auth => {
      if (auth) {
       this.items = af.database.list('/users/' + auth.uid + '/messages', {
          query: {
            limitToLast: 50
          }
       });
        this.name = auth;
        this.displayName = auth.google.displayName;
        this.displayImageUrl = auth.google.photoURL;

        this.categories = af.database.list('/users/' + auth.uid + '/categories/', {
          query: {
            limitToLast: 50
          }
        });
      }
    });
  }
  
  logout() {
    this.logoutSuccess = true;
    this.name = null;
    return this.af.auth.logout();
  }

  send(messageValue: string) {
    this.items.push( { message: messageValue, category:  'default', color: '#333'} );
    this.message = '';
  }

  delete(messageKey: string) {
    this.items.remove( messageKey );
  }
  
  
  
  
  
  
  addCategory(pickedColor: string, categoryValue: string) {
    this.categories.push( { color: pickedColor, category: categoryValue } );
    this.category = '';
    this.addingCategory = false;
  }

  updateCategory(key: string, chosenColor: string) {
    console.log('Item Key: ' + key);
    console.log('Color: ' + chosenColor);
    this.items.update(key, { category: chosenColor });
  }



}
