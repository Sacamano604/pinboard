import { Component, Input } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

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
    this.items.push( { message: messageValue, category:  '#333'} );
    this.message = '';
  }

  addCategory(categoryValue: string) {
    this.categories.push( { category: categoryValue } );
    this.category = '';
  }

  delete(messageKey: string) {
    this.items.remove( messageKey );
  }


}
