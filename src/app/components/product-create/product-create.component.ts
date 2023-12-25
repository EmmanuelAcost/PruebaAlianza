import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() productCreated = new EventEmitter<Product>();
  @Input() editMode: boolean = false;
  @Input() product: any = {};
  productForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private productService: ProductService) {

  }
  ngOnInit() {
    this.start()
  }
  start() {
    if (this.editMode) {
      this.productForm = this.formBuilder.group(this.product);
    } else {
      this.productForm = this.formBuilder.group({
        id: [''],
        name: [''],
        description: [''],
        logo: [null],
        datelib: [null],
        dateres: [null]
      });
    }
  }
  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    if (this.productForm.valid) { //valida si la informacion ingresada es correcta
      const productData = this.productForm.value;
      if (this.editMode) { //valida si edicion o creacion
        this.productService.updateProduct(productData).subscribe({
          next: (updatedProduct) => {
            this.close.emit();
          },
          error: (error) => {
            console.error('Error al actualizar el producto:', error);
          }
        });
      } else {
        this.productService.createProduct(productData).subscribe({
          next: (product) => {
            this.close.emit();
          },
          error: (error) => {
            console.error('Error al crear el producto:', error);
          }
        });
      }
    }
  }
}
