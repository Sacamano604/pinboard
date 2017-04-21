import { Component, Input, Output } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'sidebar-component',
  templateUrl: './sidebar-component.html',
  styleUrls: ['./sidebar-component.css']
})

export class SidebarComponent {
  @Input() filteredCategory: BehaviorSubject<any>;
  @Input() categories: FirebaseListObservable<any>;
  @Input() items: FirebaseListObservable<any>;
  @Input() categoriesPresent;
  @Input() color;
  confirmPassedKey: string;
  confirmPassedCategory: string;
  confirmPassedColor: string;
  category: string = '';
  addingCategory: boolean;
  
  constructor() {  }
  // Adds category to the list
  addCategory(pickedColor: string, categoryValue: string) {
    this.categories.push( { color: pickedColor, category: categoryValue } );
    this.category = '';
    this.addingCategory = false;
  }
  // Click event to filter messages to only show the chosen category
  filterCategory(filteredColor: string) {
    this.filteredCategory.next(filteredColor);
  }
  // Passing the category chosen's values to the confirm modal
  deleteCategory(passedKey: string, passedCategory: string, passedColor: string) {
    this.confirmPassedKey = passedKey;
    this.confirmPassedCategory = passedCategory;
    this.confirmPassedColor = passedColor;
  }
  // Deleting the category chosen but also resetting any existing messages with the category back to default
  confirmDeleteCategory(key: string) {
    this.categories.remove(key);
    this.items.subscribe(item => {
      for (let i in item) {
        if (this.confirmPassedColor === item[i].category) {
          this.items.update(item[i].$key, { category: this.color });
        }
      }
    });
  }

}
