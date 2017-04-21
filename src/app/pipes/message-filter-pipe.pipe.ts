import { Pipe, PipeTransform } from '@angular/core';

import { AppComponent } from '../app.component';

@Pipe({
  name: 'messageFilterPipe'
})
// Custom pipe that takes the string inputed and filters through the messages object
export class MessageFilterPipe implements PipeTransform {
 transform(messages: AppComponent[], inputText: string) {
    if (messages === null) {
      return null;
    }
    return messages.filter( message => new RegExp(inputText, 'i').test( (<any>Object).values( message ).join() ) );
  }
}
