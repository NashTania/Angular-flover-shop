import { Pipe, PipeTransform } from '@angular/core';
import { ShopComponent } from './shop/shop.component';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(products, value) {
    const types = [];
    for (const key in value) {
      if (value[key] === true) {
        types.push(key);
      }
    }
    if (types.length === 0) {
      return products;
    } else {
      return products.filter(product => types.indexOf(product.type) !== -1);
    }
  }
}
