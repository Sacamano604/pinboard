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
  message: string = '';
  
  constructor(public af: AngularFire) {
    this.items = af.database.list('/messages', {
      query: {
        limitToLast: 50
      }
    });

    this.af.auth.subscribe(auth => {
      if (auth) {
        this.name = auth;
      }
    });
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous
    });
  }

  Send(desc: string) {
    this.items.push({ message: desc });
    this.message = '';
  }
}




 login() {
    this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous
    });
  }

  Send(desc: string) {
      this.items.push({ message: desc});
      this.msgVal = '';
  }