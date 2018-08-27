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
    if (value.length === 0) {
      return products;
    }
    else {
      return products.filter(product => value.indexOf(product.type) != -1)
    }
  }
}
