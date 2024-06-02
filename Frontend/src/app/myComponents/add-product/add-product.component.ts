import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddProductService } from './add-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private addProductService: AddProductService) {
    this.productForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      discountPercentage: ['', Validators.required],
      rating: ['', Validators.required],
      stock: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      thumbnail: [null, Validators.required],
      images: [null, Validators.required]
    });
  }

  onFileChange(event: any, field: string) {
    const file = event.target.files[0];
    this.productForm.patchValue({
      [field]: file
    });
  }

  onFilesChange(event: any, field: string) {
    const files = event.target.files;
    this.productForm.patchValue({
      [field]: files
    });
  }

  submit() {
    const formData = new FormData();
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
      if (control) {
        if (key === 'images') {
          const files: FileList = control.value;
          for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
          }
        } else {
          formData.append(key, control.value);
        }
      }
    });

    this.addProductService.addProduct(formData).subscribe(response => {
      console.log('Product added successfully:', response);
      
      alert('Product Added Successfully')
    }, error => {
      console.error('Error adding product:', error);
      alert('Error in adding product');
    });
  }
}
