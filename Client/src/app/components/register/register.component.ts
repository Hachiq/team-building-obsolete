import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user = new User();
  errorMessage: string = '';

  constructor(private authService: AuthService,
    private router: Router) { }

  register(){
    this.authService.register(this.user).subscribe(() => {
      console.log('Success');
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
