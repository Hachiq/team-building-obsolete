import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/models/loginDto';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user = new LoginDto();
  errorMessage: string = '';

  constructor(private authService: AuthService,
    private router: Router,
    private tokenService: TokenService) { }

  login() {
    this.authService.login(this.user).subscribe((token: string) => {
      localStorage.setItem('authToken', token);
      if(this.tokenService.userIsTeamMember()){
        this.router.navigate(['panel']);
        return;
      }
      this.router.navigate(['home']);
    }, (error) => {
      if (error.status === 400){
        this.errorMessage = error.error;
      }
      else {
        this.errorMessage = 'Undefined error. Please, try again later.'
      }
    });
  }
}
