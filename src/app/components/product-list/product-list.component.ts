import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products: any = [];
  filteredProducts: any = [];
  isEdit: boolean = false
  selectedProduct: object = {};
  displayedColumns: string[] = ['logo', 'name', 'description', 'datelib', 'dateres', 'menu'];
  isCreateModalOpen = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.start()
  }
  start() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredProducts = this.products.filter((product: any) =>
      product.name.toLowerCase().includes(filterValue.trim().toLowerCase()) ||
      product.description.toLowerCase().includes(filterValue.trim().toLowerCase()) ||
      product.datelib.toLowerCase().includes(filterValue.trim().toLowerCase()) ||
      product.dateres.toLowerCase().includes(filterValue.trim().toLowerCase())
    );
  }
  editProduct(product: Product) {
    this.selectedProduct = product;
    this.isCreateModalOpen = true;
    this.isEdit = true
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.uid).subscribe((data) => {
      this.start()
    });
  }

  openCreateModal() {
    this.isEdit = false
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
    this.start()
  }

  onProductCreated(product: Product) {
    this.closeCreateModal();
  }
}
