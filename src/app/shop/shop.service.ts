import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Product } from '../product';
import { CartService } from '../cart/cart.service';


@Injectable({
  providedIn: 'root'
})
export class ShopService {
  public productUrl = 'http://localhost:4200/api';
  public body = new URLSearchParams();
  public products: Product[] = [];
  private readonly options = {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  };
  private _data: Product[];
  private _dataPromise: Promise<ShopService>;

  constructor(private http: HttpClient) { }

  loadDataProducts() {
    this.body.set('f', 'READ');
    this.body.set('n', 'tatiana_tkachenko_FD2_flover_shop_products');
    if (this._dataPromise === undefined) {
      return this._dataPromise =
      this.http.post<Product[]>(this.productUrl, this.body.toString(), this.options)
        .toPromise().then((data, error) => {
          return this._data = JSON.parse(data.result);
      });
    }
    return this._dataPromise;
  }

  loadList() {
    this.body.set('f', 'READ');
    this.body.set('n', 'tatiana_tkachenko_FD2_flover_shop_products');
    return this.http.post<Product[]>(this.productUrl, this.body.toString(), this.options);
  }

  getProductById(id) {
      return this.loadDataProducts()
      .then(_ => {
        return this._data.find(object => object.id === id);
      });
  }

  getData() {
    return this._data;
  }

  addData(data) {
    this._data = data;
  }

}
