import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-new-team-item',
  templateUrl: './new-team-item.component.html',
  styleUrls: ['./new-team-item.component.scss']
})
export class NewTeamItemComponent {

  constructor(private tokenService: TokenService){}

 getRoute(): string{
  if(this.tokenService.userIsInRole('Chief')){
    return 'new';
  }
  return 'login';
 }
}
