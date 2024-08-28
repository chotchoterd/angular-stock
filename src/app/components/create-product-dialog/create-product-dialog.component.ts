import { Component, inject, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
} from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {
  MatDialog,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-create-product-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatInput,
    MatFormField,
    MatLabel,
    MatButton,
    MatIconButton,
    MatIcon,
    MatSelectModule,
    MatDialogContent,
  ],
  templateUrl: './create-product-dialog.component.html',
  styleUrl: './create-product-dialog.component.scss',
})
export class CreateProductDialogComponent {
  private formBuilder = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<CreateProductDialogComponent>);
  private dialog = inject(MatDialog);
  private http = inject(ProductService);

  formProduct!: FormGroup;
  submitted: boolean = false;
  imageURL = null;
  imageFile = null;

  categories = [
    { value: '1', viewValue: 'Mobile' },
    { value: '2', viewValue: 'Tablet' },
    { value: '3', viewValue: 'Smart Watch' },
    { value: '4', viewValue: 'Labtop' },
  ];

  onChangeImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageURL = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.imageFile = event.target.files[0];
    }
  }

  removeImage() {
    this.imageURL = null;
    this.imageFile = null;

    const input = document.getElementById('image') as HTMLInputElement;
    input.value = '';
  }

  initForm() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const dateNow = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    this.formProduct = this.formBuilder.group({
      productname: ['', [Validators.required, Validators.minLength(3)]],
      unitprice: ['', [Validators.required]],
      unitinstock: ['', [Validators.required]],
      productpicture: [''],
      categoryid: ['', [Validators.required]],
      createddate: [dateNow],
      modifieddate: [dateNow],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    this.submitted = true;
    if (this.formProduct.invalid) {
      return;
    } else {
      const formData: any = new FormData();

      for (let key in this.formProduct.value) {
        formData.append(key, this.formProduct.value[key]);
      }

      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }

      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      this.http.createProduct(formData).subscribe({
        next: (data) => {
          console.log(data);
          this.dialog.open(AlertDialogComponent, {
            data: {
              title: 'Product Create',
              icon: 'check_circle',
              iconColor: 'green',
              subtitle: 'Product created successfully',
            },
          });
          this.formProduct.reset();
          this.dialogRef.close(true);

          this.onCreateSuccess();
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  productCreated = new EventEmitter<boolean>();

  onCreateSuccess() {
    this.productCreated.emit(true);
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
