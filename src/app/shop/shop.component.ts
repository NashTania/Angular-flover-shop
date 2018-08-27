import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { PRODUCTS } from '../mock-products';
import { ShopService } from './shop.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions, RequestMethod } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CartService } from '../cart/cart.service',
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { FilterPipe } from '../filter.pipe'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  public products = []
  private checked = {
    forBirds: false
  }
  private userId: string
  public productJSON = {
    "id": 'number',
    "name": 'string',
    "type": 'string',
    "src": 'string',
    "price": 'number'
  }
  public selectedTypes = [];


  constructor(
    private shopService: ShopService,
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.shopService.getProduct()
      .subscribe((data) => this.products = JSON.parse(data.result));
  }


  addProductToCart(item: Product) {
    this.userId = this.cartService.getCartId()
    this.cartService.loadCartProducts()
      .then((value) => {
        console.log(value)
        let cartProducts = value ? value : [];
        cartProducts.push(item);
        console.log(cartProducts);
        this.cartService.setServerData('tatiana_tkachenko_FD2_flover_cart_products_' + this.userId, cartProducts);
        console.log('товар добавлен')
      })
  }

  filterProducts() {
    if (this.selectedTypes.length === 0) {
      return this.products
    }
    else {
      let result = []
      for (let g = 0; g < this.products.length; g++) {
        for (let i = 0; i < this.selectedTypes.length; i++) {
          if (this.products[g].type === this.selectedTypes[i]) {
            result.push(this.products[g])
          }
        }
      }
      console.log(result)
      return this.products === result
    }
  }


  checkType(event, element: HTMLInputElement): void {
    if (event.target.checked) {
      this.selectedTypes.push(element.value)
      //this.filterProducts()
    }
    else if (!event.target.checked) {
      this.selectedTypes = this.selectedTypes.filter(type => type != element.value)
      //this.filterProducts()

    }
    console.log(this.selectedTypes)
    return this.selectedTypes
  }

  getSelectedTypes() {
    return this.selectedTypes
  }
}
