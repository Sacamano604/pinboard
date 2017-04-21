import { Component, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { ColorPickerService } from 'angular2-color-picker';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  message: string = '';
  @Output() items: FirebaseListObservable<any>;
  @Output() categories: FirebaseListObservable<any>;
  @Output() color: string = '#333';
  @Output() filteredCategory: BehaviorSubject<any>;
  @Output() categoriesPresent: boolean;
  @Output() logoutSuccess: boolean;
  @Output() name: any;
  @Output() displayName: string;
  @Output() displayImageUrl: string;
  @Output() filterValue: string = '';

  constructor(public af: AngularFire) {
    // If the user is authenticated, display their messages.
    // Currently ordering by category for the filter to work correctly.
    // Would like to find a way around this by displaying the messages by date added
    this.af.auth.subscribe(auth => {
      if (auth) {
       this.items = af.database.list('/users/' + auth.uid + '/messages', {
          query: {
            orderByChild: 'category',
            equalTo: this.filteredCategory
          }
       });
        // Setting variables to be used in the template
        this.name = auth;
        this.displayName = auth.google.displayName;
        this.displayImageUrl = auth.google.photoURL;
        // Displaying the user's categories
        this.categories = af.database.list('/users/' + auth.uid + '/categories/', {
          query: {
            orderByKey: true,
            preserveSnapshot: true
          }
        });
        // Finding out if the user even has any categories.
        this.categories.subscribe(category => {
          if (category.length < 1) {
            this.categoriesPresent = false;
          } else {
            this.categoriesPresent = true;
          }
        });
      }
    });
  }
  // Built in firebase logout functionality.
  logout() {
    this.logoutSuccess = true;
    this.name = null;
    return this.af.auth.logout();
  }
  // Pushing new messages to the DB and resetting the message input
  send(messageValue: string) {
    this.items.push( { message: messageValue, category:  'default', color: '#333'} );
    this.message = '';
  }
  // Deleting a message
  delete(messageKey: string) {
    this.items.remove( messageKey );
  }
  // Updaing a message's category
  updateCategory(key: string, chosenColor: string) {
    this.items.update(key, { category: chosenColor });
  }
  // Grabbing the filter value from the navbar-component
  inputEvent(filter) {
    this.filterValue = filter;
  }

}
