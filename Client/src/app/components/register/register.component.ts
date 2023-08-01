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

  constructor(private authService: AuthService,
    private router: Router) { }

  register(){
    this.authService.register(this.user).subscribe();
    this.router.navigate(['login']);
  }

}
