import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

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
    private notificationService: NotificationService) { }

  register(){
    this.authService.register(this.user).subscribe(() => {
      this.notificationService.userRegistered();
      this.router.navigate(['login']);
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
