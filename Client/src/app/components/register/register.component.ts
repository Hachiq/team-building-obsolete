import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/models/loginDto';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user = new User();
  errorMessage: string = '';

  constructor(private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private tokenService: TokenService) { }

  register(){
    this.authService.register(this.user).subscribe(() => {
      this.notificationService.userRegistered();

      const loginDto: LoginDto = {
        username: this.user.username,
        password: this.user.password
      };

      this.authService.login(loginDto).subscribe((token: string) => {
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
    },
    (error) => {
      if (error.status === 400){
        this.errorMessage = error.error;
      }
      else {
        this.errorMessage = 'Undefined error. Please, try again later.'
      }
    });
  }

}
