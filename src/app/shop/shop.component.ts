import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { PRODUCTS } from '../mock-products';
import { ShopService } from './shop.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions, RequestMethod } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { FormGroup, FormControl, FormBuilder, NgForm } from '@angular/forms';
import { FilterPipe } from '../filter.pipe'
import { ChangeDetectorRef } from '@angular/core'

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

  public type = {
    'bouquet': '',
    'wedding': '',
    'box': '',
    'decor': ''
  }

  typesForm = new FormGroup({
    bouquet: new FormControl(),
    wedding: new FormControl(),
    box: new FormControl(),
    decor: new FormControl()
  })

  constructor(
    private shopService: ShopService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
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

  addType(event) {
      this.type = {
      bouquet: this.typesForm.get('bouquet').value,
      wedding: this.typesForm.get('wedding').value,
      box: this.typesForm.get('box').value,
      decor: this.typesForm.get('decor').value
    }
  }

  getSelectedTypes() {
    return this.selectedTypes
  }
}
