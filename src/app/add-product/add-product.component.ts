import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from '../cart/cart.service';
import { ShopService } from '../shop/shop.service'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  typeProduct = ['Выберите категорию', 'bouquet', 'wedding', 'box', 'decor']

  addProductForm = new FormGroup({
    name: new FormControl(''),
    id: new FormControl(''),
    type: new FormControl(''),
    src: new FormControl(''),
    price: new FormControl(''),
  });

  public products: []

  private product: Product

  constructor(
    private cartService: CartService,
    private shopService: ShopService,
  ) { }

  ngOnInit(): void {
    this.product = new Product()
    this.addProductForm = new FormGroup({
      'name': new FormControl(this.product.name,[
        Validators.required,
        Validators.minLength(4)
      ])
      'id': new FormControl(this.product.id)
      'type': new FormControl(this.product.type,
        Validators.required
      )
      'src': new FormControl(this.product.src,
        Validators.required
      )
      'price': new FormControl(this.product.price,
        Validators.required
      )
    })
  }

  get name() {
    return this.addProductForm.get('name');
  }

  get id() {
    return this.addProductForm.get('id');
  }

  get type() {
    return this.addProductForm.get('type')
  }

  get src() {
    return this.addProductForm.get('src')
  }

  get price() {
    return this.addProductForm.get('price')
  }

  onSubmit() {
    this.shopService.getProduct().toPromise()
      .then((data) => {
      this.products = JSON.parse(data.result);
      this.products.push(this.addProductForm.value);
      console.log(this.products);
      //this.cartService.setServerData('tatiana_tkachenko_FD2_flover_shop_products', this.products)
      alert('товар добавлен')
      this.addProductForm.reset()
    })
  }

}
