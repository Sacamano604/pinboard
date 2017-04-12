import { Pipe, PipeTransform } from '@angular/core';

import { AppComponent } from '../app.component';


@Pipe({
  name: 'messageFilterPipe'
})
export class MessageFilterPipe implements PipeTransform {
 transform(messages: AppComponent[], inputText: string) {
    if (messages === null) {
      return null;
    }
    return messages.filter( message => new RegExp(inputText, 'i').test( (<any>Object).values( message ).join() ) );
  }
}
