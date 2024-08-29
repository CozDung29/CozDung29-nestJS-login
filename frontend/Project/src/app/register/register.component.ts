import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    role: new FormControl<number | null>(null, Validators.required)
  });

  constructor(private configService: ConfigService) {}

  handleSubmit() {
    if (this.profileForm.valid) {
      const userData = this.profileForm.value;
      this.configService.registerUser(userData).subscribe(
        response => {
          console.log('Đăng ký thành công:', response);
          // Xử lý sau khi đăng ký thành công (ví dụ: chuyển hướng đến trang đăng nhập)
        },
        error => {
          console.error('Lỗi khi đăng ký:', error);
          // Xử lý lỗi khi đăng ký (ví dụ: hiển thị thông báo lỗi)
        }
      );
    } else {
      console.error('Form không hợp lệ');
    }
  }
}
