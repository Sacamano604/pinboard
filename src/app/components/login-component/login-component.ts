import { Component, Input } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'login-component',
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css']
})
export class LoginComponent {

  @Input() logoutSuccess: boolean;

  constructor(public af: AngularFire) { }
    // Built in firebase authentication
    googleLogin() {
      this.af.auth.login({
        provider: AuthProviders.Google,
        method: AuthMethods.Popup
      });
    }

}
