import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../product';
import { Headers, RequestOptions, RequestMethod } from '@angular/http';
import { ShopService } from '../shop/shop.service';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CART } from '../mock-products';
import { Component } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsInCart: Product[] = [];
  public productUrl = 'http://localhost:4200/api';
  public httpOptions = new RequestOptions({
    method: 'POST'
  });

  public options = {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  }
  public cartProducts = [];
  public userId: string;
  public product: Product;
  public productJSON = {
    "id": 'number',
    "name": 'string',
    "type": 'string',
    "src": 'string',
    "price": 'number'
  }


  constructor(
    private http: HttpClient,
    private shopService: ShopService
  ) { }

  getCartProducts() {
    this.userId = this.getCartId()
    let bodyRead = new URLSearchParams();
    bodyRead.set('f', 'READ');
    bodyRead.set('n', 'tatiana_tkachenko_FD2_flover_cart_products_' + this.userId);
    return this.http.post<Product>(this.productUrl, bodyRead.toString(), this.options)
  }

  loadCartProducts() {
    return this.getCartProducts().toPromise()
      .then(data => {
        if (data.result) {
          console.log(data)
          return this.cartProducts = JSON.parse(data.result)
        }
      })
  }

  setServerData(key, value) {
    this.getCartProducts().toPromise()
      .then(data => {
        if (data.result) {
          let bodyLockget = new URLSearchParams();
          bodyLockget.set('f', 'LOCKGET');
          bodyLockget.set('n', key);
          bodyLockget.set('p', '111');
          this.http.post<Product>(this.productUrl, bodyLockget.toString(), this.options)
            .toPromise().then(_ => {
              let bodyUpdate = new URLSearchParams();
              bodyUpdate.set('f', 'UPDATE');
              bodyUpdate.set('n', key);
              bodyUpdate.set('p', '111');
              bodyUpdate.set('v', JSON.stringify(value));
              this.http.post<Product>(this.productUrl, bodyUpdate.toString(), this.options)
                .toPromise()
            });
        } else {
          let bodyInsert = new URLSearchParams();
          bodyInsert.set('f', 'INSERT');
          bodyInsert.set('n', key);
          bodyInsert.set('v', JSON.stringify(value));
          this.http.post<Product>(this.productUrl, bodyInsert.toString(), this.options)
            .toPromise()
        }
      }
      )
  }

  makeId() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }


  getCartId() {
    this.userId = localStorage.getItem('tatiana_tkachenko_FD2_flover_cart_products')
    if (!this.userId) {
      this.userId = this.makeId();
      localStorage.setItem('tatiana_tkachenko_FD2_flover_cart_products', this.userId)
    }
    return this.userId
  }
}
