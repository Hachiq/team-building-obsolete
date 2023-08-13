import { Component } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-new-team-item',
  templateUrl: './new-team-item.component.html',
  styleUrls: ['./new-team-item.component.scss']
})
export class NewTeamItemComponent {

  constructor(private tokenService: TokenService,
    private notificationService: NotificationService){}

 getRoute(): string{
  if(this.tokenService.userIsInRole('Chief')){
    return 'new';
  }
  return 'login';
 }
}
