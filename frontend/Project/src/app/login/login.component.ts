import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private configService: ConfigService) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.configService.loginUser(loginData).subscribe(
        response => {
          console.log('Đăng nhập thành công:', response);
          // Xử lý sau khi đăng nhập thành công (ví dụ: lưu token, chuyển hướng)
        },
        error => {
          console.error('Lỗi khi đăng nhập:', error);
        }
      );
    }
  }
}
