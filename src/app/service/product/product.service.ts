import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces/Product';
import { ProductAnswer } from 'src/app/interfaces/ProductAnswer';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly URL_PRODUCTS = 'https://dummyjson.com/auth/products';
  private total = 0;  // Total de productos
  private $products = new BehaviorSubject<Product[]>([]);  // Para mantener el estado de los productos cargados
  private skip = 0;  // Inicializamos el parámetro skip
  private limit = 30;  // Número de productos por carga

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  // Método para exponer el BehaviorSubject como un Observable
  get products(): Observable<Product[]> {
    return this.$products.asObservable();
  }

  // Método para obtener productos con paginación
  public getProducts(skip: number, limit: number): Observable<ProductAnswer> {
    const url = `${this.URL_PRODUCTS}?skip=${skip}&limit=${limit}`;
    return this.http.get<ProductAnswer>(url, {
      headers: {
        'Authorization': "Bearer " + this.auth.accessToken,
        'Content-Type': 'application/json'
      }
    });
  }

  // Método para cargar los productos y paginación
  public loadProducts(): void {
    this.getProducts(this.skip, this.limit).subscribe(data => {
      this.$products.next([...this.$products.getValue(), ...data.products]);  // Añadimos nuevos productos al array
      this.total = data.total;  // Actualizamos total de productos
      this.skip += this.limit;  // Aumentamos valor de skip para la siguiente carga
    });
  }

  // Obtener el total de productos disponibles
  get totalProducts(): number {
    return this.total;
  }
}
