import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(items: any[], field: string, value: any): any[] {
        if (!items) return [];
        return items.filter(it => it[field] == value);
    }
}
