import { Component, OnInit } from '@angular/core';
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
  public products: Product[] = [];
  private subProduct!: Subscription;
  private skip = 0;  // Se iniciará con el primer lote de productos
  private limit = 30;  // Número de productos por carga
  private total = 0;  // Total de productos disponibles
  constructor(
    private prdS: ProductService,
  ) {}

  ionViewDidLeave(): void {
    if (this.subProduct) {
      this.subProduct.unsubscribe();
    }
  }

  ionViewWillEnter(): void {
    this.loadProducts();  // Cargar productos al entrar en la vista
  }

  // Método para cargar productos y paginación
  loadProducts(): void {
    this.prdS.getProducts(this.skip, this.limit).subscribe(response => {
      // Añadir los nuevos productos al array de productos existentes
      this.products = [...this.products, ...response.products];
      this.total = response.total;  // Guardar el total de productos
      this.skip += this.limit;  // Aumentar el valor de skip para la siguiente carga
    });
  }

  // Método para manejar el evento de scroll infinito
  loadData(event: Event) {
    if (this.products.length < this.total) {
      this.loadProducts();  // Cargar más productos
      (event.target as HTMLIonInfiniteScrollElement).complete();  // Completar el evento del scroll infinito
    } else {
      (event.target as HTMLIonInfiniteScrollElement).disabled = true;  // Deshabilitar el scroll infinito si ya se cargaron todos los productos
    }
  }
}
