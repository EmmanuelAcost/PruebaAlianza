import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl + 'product';

  constructor(private http: HttpClient) { }

  createProduct(productData: Product) {
    return this.http.post(this.apiUrl, productData);
  }
  getAllProducts() {
    return this.http.get(this.apiUrl);
  }
  updateProduct(product: Product) {
    return this.http.patch(this.apiUrl + '/' + product.uid, product);
  }
  deleteProduct(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
