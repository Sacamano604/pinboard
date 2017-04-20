import { Component, Input, Output } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'sidebar-component',
  templateUrl: './sidebar-component.html',
  styleUrls: ['./sidebar-component.css']
})

export class SidebarComponent {
  @Input() categories: FirebaseListObservable<any>;
  @Input() categoriesPresent;
  
  
  
  constructor(public af: AngularFire) {}



}
