import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {

  constructor(public af: AngularFire) { }

    googleLogin() {
      this.af.auth.login({
        provider: AuthProviders.Google,
        method: AuthMethods.Popup
      });
    }

}
