import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar-component.html',
  styleUrls: ['./navbar-component.css']
})

export class NavbarComponent {
  @Input() filterValue: any;
  @Output("logout") logoutEvent = new EventEmitter<boolean>(false);
  @Output() inputEvent = new EventEmitter<string>(this.filterValue);
  @Input() logoutSuccess: boolean;
  @Input() name: boolean;
  @Input() displayName: string;
  @Input() displayImageUrl: string;
  
  // Constructor not needed as we're emitting events
  constructor() { }
  // Logout event
  logout() {
    this.logoutEvent.emit(true);
  }
  // Handles filtering messages, emitting the value typed
  ngDoCheck() {
    this.inputEvent.emit(this.filterValue);
  }
 
}
