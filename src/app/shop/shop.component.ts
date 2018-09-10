import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ShopService } from './shop.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartService } from '../cart/cart.service';
import { FormGroup, FormControl, FormBuilder, NgForm } from '@angular/forms';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  private products: Product[] = [];

  private _userId: string;

  public selectedTypes = []

  private _type = {
    'bouquet': '',
    'wedding': '',
    'box': '',
    'decor': ''
  };

  typesForm = new FormGroup({
    bouquet: new FormControl(),
    wedding: new FormControl(),
    box: new FormControl(),
    decor: new FormControl()
  });

  constructor(
    private shopService: ShopService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.shopService.loadDataProducts()
      .then(data => this.products = data)
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

  addType(event) {
    this._type = {
      bouquet: this.typesForm.get('bouquet').value,
      wedding: this.typesForm.get('wedding').value,
      box: this.typesForm.get('box').value,
      decor: this.typesForm.get('decor').value
    };
  }

}
