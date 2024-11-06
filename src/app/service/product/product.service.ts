import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces/Product';
import { ProductAnswer } from 'src/app/interfaces/ProductAnswer';
// Observador
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly URL_PRODUCTS = 'https://dummyjson.com/auth/products';
  private total = 0;
  private $products = new BehaviorSubject<Product[]>([]);
  constructor(
    private http: HttpClient,
		private auth: AuthService
  ) { }

  // Método para exponer el BehaviorSubject como un Observable
  get products(): Observable<Product[]> {
    return this.$products.asObservable();
  }

  public listProducts(){
    const url_new = `${this.URL_PRODUCTS}`;
    this.http.get<ProductAnswer>(url_new, {
      headers: {
        'Authorization': "Bearer "+this.auth.accessToken,
        'Content-Type': 'application/json'
      }
    })
    .subscribe(data => {
      this.$products.next(data.products);
      this.total = data.total;
    })
  }
}
