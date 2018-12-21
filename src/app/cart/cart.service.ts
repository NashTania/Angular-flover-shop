import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../product';
import { Headers, RequestOptions, RequestMethod } from '@angular/http';
import { ShopService } from '../shop/shop.service';

type ResultWithProduct = {
  result: string
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsInCart: Product[] = [];
  private productUrl = 'http://localhost:4200/api';
  private readonly options = {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  };
  private _cartProducts: Product[];
  public userId: string = this.getUserId();
  private product: Product;
  private _dataPromise: Promise<CartService>;
  private _data: Product[];

  constructor(
    private http: HttpClient,
    private shopService: ShopService
  ) { }

  loadData() {
    const body = new URLSearchParams();
    body.set('f', 'READ');
    body.set('n', 'tatiana_tkachenko_FD2_flover_cart_products_' + this.userId);
    if (this._dataPromise === undefined) {
     return this._dataPromise = this.http.post<ResultWithProduct>(this.productUrl, body.toString(), this.options).toPromise()
        .then((data) => {
          return this._data = JSON.parse(data.result);
        }
      );
    }
    return this._dataPromise;
  }

  setServerData(value) {
    this._data = value;
        if (this._data !== undefined) {
          const body = new URLSearchParams();
          body.set('f', 'LOCKGET');
          body.set('n', 'tatiana_tkachenko_FD2_flover_cart_products_' + this.userId);
          body.set('p', '111');
          this.http.post<Product[]>(this.productUrl, body.toString(), this.options)
            .toPromise().then(_ => {
              const body = new URLSearchParams();
              body.set('f', 'UPDATE');
              body.set('n', 'tatiana_tkachenko_FD2_flover_cart_products_' + this.userId);
              body.set('p', '111');
              body.set('v', JSON.stringify(this._data));
              this.http.post<Product[]>(this.productUrl, body.toString(), this.options)
                .toPromise();
            });
        } else {
          const body = new URLSearchParams();
          body.set('f', 'INSERT');
          body.set('n', 'tatiana_tkachenko_FD2_flover_cart_products_' + this.userId);
          body.set('v', JSON.stringify(this._data));
          this.http.post<Product[]>(this.productUrl, body.toString(), this.options)
            .toPromise();
        }

  }

  makeId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }


  getUserId() {
    if (!this.userId) {
      this.userId = localStorage.getItem('tatiana_tkachenko_FD2_flover_cart_products');
      if (!this.userId) {
        this.userId = this.makeId();
        localStorage.setItem('tatiana_tkachenko_FD2_flover_cart_products', this.userId);
      }
    }
    return this.userId;
  }

  getData() {
    return this._data;
  }
}
