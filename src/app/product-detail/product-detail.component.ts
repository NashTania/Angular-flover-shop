import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop/shop.service';
import { Product } from '../product';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public product: Product;
  private _paramId: number

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.getParamsId()
      this.shopService.getProductById(this._paramId)
      .then(product => this.product = product

      );
    }

  getParamsId(){
    return this.route.params.subscribe(params => {
      this._paramId = +params['id']
    })
  }

  addProductToCart(item: Product) {
    let value = this.cartService.getData()
      if (value === undefined) {
        this.cartService.loadData()
          .then((value) => {
            const cartProducts = value ? value : [];
            cartProducts.push(item);
            this.cartService.setServerData(cartProducts);
            alert('товар добавлен');
          });
      } else {
        const cartProducts = value ? value : [];
        cartProducts.push(item);
        this.cartService.setServerData(cartProducts);
        alert('товар добавлен');
      }
  }

}
