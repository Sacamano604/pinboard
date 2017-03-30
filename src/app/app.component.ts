import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  items: FirebaseListObservable<any>;
  name: any;
  displayName: string;
  displayImageUrl: string;
  message: string = '';
  logoutSuccess: any;

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
      }
    });
  }

  googleLogin() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  logout() {
    this.logoutSuccess = true;
    this.name = null;
    return this.af.auth.logout();
  }

  send(messageValue: string) {
    this.items.push( { message: messageValue } );
    this.message = '';
  }

  delete(messageKey: string) {
    this.items.remove( messageKey );
  }


}
