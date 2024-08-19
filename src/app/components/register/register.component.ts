import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import {
  MatCard,
  MatCardImage,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
  MatCardActions,
} from '@angular/material/card';
import { Meta } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  imports: [
    MatCard,
    MatCardImage,
    MatCardHeader,
    MatCardTitle,
    FormsModule,
    ReactiveFormsModule,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    MatSuffix,
    MatIconButton,
    MatCardActions,
    MatButton,
  ],
})
export class RegisterComponent implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private meta = inject(Meta);
  private http = inject(UserService);
  private dialog = inject(MatDialog);

  registerForm!: FormGroup;
  submitted: boolean = false;

  // Variables สำหรับรับค่าจากฟอร์ม
  userData = {
    username: '',
    email: '',
    password: '',
  };

  // สำหรับซ่อนแสดง password
  hide = true;

  ngOnInit(): void {
    // กำหนด Meta Tag description
    this.meta.addTag({
      name: 'description',
      content: 'Login page for Stock Management',
    });

    // Validate form
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // ฟังก์ชัน Submit สำหรับ Register
  submitRegister() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.userData.username = this.registerForm.value.username;
      this.userData.email = this.registerForm.value.email;
      this.userData.password = this.registerForm.value.password;

      this.http.Register(this.userData).subscribe({
        next: (data: any) => {
          this.dialog.open(AlertDialogComponent, {
            data: {
              title: 'สมัครสมาชิกสำเร็จ',
              icon: 'check_circle',
              iconColor: 'green',
              subtitle: 'กลับสู่หน้า Login...',
              showButtons: false,
            },
            disableClose: true,
          });

          setTimeout(() => {
            window.location.href = '/login';
          }, 1500);
        },
        error: (error) => {
          this.dialog.open(AlertDialogComponent, {
            data: {
              title: 'สมัครสมาชิกไม่สำเร็จ',
              icon: 'error',
              iconColor: 'red',
              subtitle:
                'มีสมาชิกนี้อยู่แล้วหรือการกรอกรหัสไม่ตรง Format Ex. Xxxx@1234',
            },
            disableClose: true,
          });
          console.log(error);
        },
      });
      console.log(this.userData);
    }
  }

  onClickCancel() {
    this.router.navigate(['/login']);
  }
}
