import { Pipe, PipeTransform } from '@angular/core';
import { Chat } from '../entidades/chat';

@Pipe({
  name: 'filtroChat'
})
export class FiltroChatPipe implements PipeTransform {

  transform(chats:Chat[], fechaDesde:number): Chat[] {
    return chats.filter((c) => c.fecha >= fechaDesde); 
  }

}
