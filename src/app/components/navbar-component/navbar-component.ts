import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar-component.html',
  styleUrls: ['./navbar-component.css']
})

export class NavbarComponent {
  @Output("logout") logoutEvent = new EventEmitter<boolean>(false);
  @Output() inputEvent = new EventEmitter<string>(this.filterValue);
  @Input() logoutSuccess: boolean;
  @Input() name: boolean;
  @Input() displayName: string;
  @Input() displayImageUrl: string;
  @Input() filterValue: any;

  constructor() { }

  logout() {
    this.logoutEvent.emit(true);
  }

  ngDoCheck() {
    this.inputEvent.emit(this.filterValue);
  }
 
}
