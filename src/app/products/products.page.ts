import { Component } from '@angular/core';
import { ProductService } from '../service/product/product.service';
import { Product } from '../interfaces/Product';
import { ViewWillEnter, ViewDidLeave } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements ViewWillEnter, ViewDidLeave {
  public products: Product [] = [];
  private subProduct!: Subscription;
  constructor(
    private prdS: ProductService,
  ) {

  }

  ionViewDidLeave(): void {
    if(this.subProduct){
      this.subProduct.unsubscribe();
    }
  }

  ionViewWillEnter(): void {
    this.subProduct = this.prdS.products.subscribe(products => {
      this.products = products;
    })
    this.prdS.listProducts();
  }

}
