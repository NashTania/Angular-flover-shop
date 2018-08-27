import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ShopService } from '../shop/shop.service';
//import { ShopComponent } from './shop/shop.component';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public product: Product

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.shopService.getProductId(id).then(product => this.product = product)
    })
  }
}


/*private route: ActivatedRoute,
private shopService: ShopService,
private location: Location*/
