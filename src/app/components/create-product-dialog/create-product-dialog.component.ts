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
  ],
  templateUrl: './create-product-dialog.component.html',
  styleUrl: './create-product-dialog.component.scss',
})
export class CreateProductDialogComponent {}
