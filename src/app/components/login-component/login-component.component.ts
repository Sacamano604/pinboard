import { Component, Input } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

import { AppComponent } from '../../app.component';

@Component({
  selector: 'login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponent {
  @Input() logoutSuccess: boolean;

  constructor(public af: AngularFire) { }

    googleLogin() {
      this.af.auth.login({
        provider: AuthProviders.Google,
        method: AuthMethods.Popup
      });
    }

}
