import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  transform(items: any, searchText: string): any {
      if(!items) return null;
     if(!searchText) return items;
      
     searchText=searchText.toLowerCase();

     return items.filter(data=>{
        return JSON.stringify(data).toLowerCase().includes(searchText);
        // return data.name.toLowerCase().includes(searchText);
     });
  }

}
