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
    
    // this.filteredCategory = new BehaviorSubject(undefined);

    this.af.auth.subscribe(auth => {
      if (auth) {
       this.items = af.database.list('/users/' + auth.uid + '/messages', {
          query: {
            orderByChild: 'category',
            equalTo: this.filteredCategory
          }
       });
        this.name = auth;
        this.displayName = auth.google.displayName;
        this.displayImageUrl = auth.google.photoURL;

        this.categories = af.database.list('/users/' + auth.uid + '/categories/', {
          query: {
            orderByKey: true,
            preserveSnapshot: true
          }
        });

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
  
  logout() {
    this.logoutSuccess = true;
    this.name = null;
    return this.af.auth.logout();
  }

  send(messageValue: string) {
    this.items.push( { message: messageValue, category:  'default', color: '#333'} );
    this.message = '';
  }

  delete(messageKey: string) {
    this.items.remove( messageKey );
  }
  
  // addCategory(pickedColor: string, categoryValue: string) {
  //   this.categories.push( { color: pickedColor, category: categoryValue } );
  //   this.category = '';
  //   this.addingCategory = false;
  // }

  updateCategory(key: string, chosenColor: string) {
    this.items.update(key, { category: chosenColor });
  }

  // filterCategory(filteredColor: string) {
  //   this.filteredCategory.next(filteredColor);
  // }

  // deleteCategory(passedKey: string, passedCategory: string, passedColor: string) {
  //   this.confirmPassedKey = passedKey;
  //   this.confirmPassedCategory = passedCategory;
  //   this.confirmPassedColor = passedColor;
  // }

  // confirmDeleteCategory(key: string) {
  //   this.categories.remove(key);
  //   this.items.subscribe(item => {
  //     for (let i in item) {
  //       if (this.confirmPassedColor === item[i].category) {
  //         this.items.update(item[i].$key, { category: this.color });
  //       }
  //     }
  //   });
  // }

  inputEvent(filter) {
    this.filterValue = filter;
  }










}
