import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../product';
import { Headers, RequestOptions, RequestMethod } from '@angular/http';
import { of } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CartService } from '../cart/cart.service'


@Injectable({
  providedIn: 'root'
})
export class ShopService {

  public productUrl = 'http://localhost:4200/api'

  public httpOptions = new RequestOptions({
    method: 'POST'
  })

  public body = new URLSearchParams();

  public options = {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  }

  public products = [];
  public product: Product;
  private productJSON = {
    "id": 'number',
    "name":'string',
    "type":'string',
    "src":'string',
    "price":'number'
  }

  constructor(private http: HttpClient) { }


  getProduct() {
    this.body.set('f', 'READ');
    this.body.set('n', 'tatiana_tkachenko_FD2_flover_shop_products');
    return this.http.post<Product>(this.productUrl, this.body.toString(), this.options)
  }


  getProductId(id) {
    return this.load()
      .then(_ => this.products.find(object => object.id === id))
  }

  load() {
    return this.getProduct().toPromise()
      .then(data => {
        this.products = JSON.parse(data.result);
      })
  }

}
