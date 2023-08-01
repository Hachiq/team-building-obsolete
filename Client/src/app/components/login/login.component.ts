import { Component } from '@angular/core';
import { LoginDto } from 'src/app/models/loginDto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user = new LoginDto();

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.user).subscribe((token: string) => {
      localStorage.setItem('authToken', token);
    });
  }
}
