import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private tokenService: TokenService){}

  tokenExists(): boolean{
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  userIsTeamMember(): boolean{
    return this.tokenService.userIsTeamMember()
  }
}
