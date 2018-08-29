import { Component, OnInit } from '@angular/core';
import { CART } from '../mock-products';
import { CartService } from './cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartProducts = []
  public totalSum: number

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.cartService.getCartProducts().toPromise()
      .then((data) => this.cartProducts = JSON.parse(data.result))
      .then((_ => this.totalSum = this.getTotalCost())
      )
  }

  getTotalCost() {
    let totalSum = 0;
    for (let i = 0; i < this.cartProducts.length; i++) {
      totalSum += +this.cartProducts[i].price
    }
    return totalSum;
  }

  removeProduct(item: Product) {
    let userId = this.cartService.getCartId()
    let id = item.id;
    for (let i = 0; i < this.cartProducts.length; i++) {
      if (this.cartProducts[i].id === id) {
        this.cartProducts.splice(i, 1);
        break;
      }
    }
    this.cartService.setServerData('tatiana_tkachenko_FD2_flover_cart_products_' + userId, this.cartProducts)
  }
}
