import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-new-team-item',
  templateUrl: './new-team-item.component.html',
  styleUrls: ['./new-team-item.component.scss']
})
export class NewTeamItemComponent {

  constructor(private tokenService: TokenService,
    private notificationService: NotificationService,
    private router: Router){}

 redirect(){
  if(this.tokenService.userIsInRole('Chief')){
    this.router.navigate(['new']);
    return;
  }
  this.notificationService.accessDenied();
  this.router.navigate(['login']);
  return;
 }
}
