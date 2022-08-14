import { Pipe, PipeTransform } from '@angular/core';
import { EntityList } from 'src/app/models/common.model';

@Pipe({ name: 'entityToString', pure: false })
export class EntityToStringPipe implements PipeTransform {
  constructor() { }
  transform(val: number, list: EntityList[]): string {
    let res: EntityList = null;
    if (list && list.length > 0) {
      res = list.find(x => x.id === val);
      if(res){
        return res.name;
      }
    }
    return '';
  }
}