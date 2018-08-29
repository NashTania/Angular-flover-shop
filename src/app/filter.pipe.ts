import { Pipe, PipeTransform } from '@angular/core';
import { ShopComponent } from './shop/shop.component'

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  constructor(
    private shopComponent: ShopComponent,
  ) { }

  transform(products, value) {
    let types = [];
    for (let key in value) {
      if (value[key] === true) {
        types.push(key)
      }
    }
    if (types.length === 0) {
      return products;
    }
    else {
      return products.filter(product => types.indexOf(product.type) != -1)
    }
  }
}
