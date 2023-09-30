import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TeamRequest } from 'src/app/models/teamRequest';
import { NotificationService } from 'src/app/services/notification.service';
import { TeamService } from 'src/app/services/team.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent {
  request = new TeamRequest();

  constructor(private teamService: TeamService, 
    private router: Router,
    private tokenService: TokenService,
    private notificationService: NotificationService){}

    create(){
      this.request.user = this.tokenService.getUsernameFromToken();
      this.teamService.create(this.request).subscribe(() => {
          this.notificationService.teamCreated(this.request.team);
          this.router.navigate(['panel']);
        },
        (error) => {
          if (error.status === 400){
            this.notificationService.definedError(error.error);
          }
          else {
            this.notificationService.undefinedError();
          }
        }
      );
    }
}
