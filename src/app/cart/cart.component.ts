import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartProducts = [];
  public totalSum: number;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.cartService.loadData()
      .then((data) => this.cartProducts = data)
      .then(_ => this.totalSum = this.getTotalCost());
  }


  getTotalCost() {
    const totalSum = this.cartProducts.reduce(function(sum, current) {
      return sum + current.price;
    }, 0);
    return totalSum;
  }

  removeProduct(item: Product) {
    this.cartProducts = this.cartProducts.filter(function(product) {
      return product.id !== item.id;
    });
    this.cartService.setServerData(this.cartProducts);
    this.totalSum = this.getTotalCost();
  }
}
