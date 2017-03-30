import { Pipe, PipeTransform } from '@angular/core';
import { AppComponent } from '../app.component'

@Pipe({
  name: 'messageFilterPipe'
})
export class MessageFilterPipePipe implements PipeTransform {
 transform(records : AppComponent[], inputText : string) {
    if (records === null) {
      return null;
    }
    return records.filter( record => new RegExp(inputText, 'i').test( (<any>Object).values( record ).join() ) );
  }
}
