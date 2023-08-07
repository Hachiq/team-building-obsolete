import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team';
import { TeamRequest } from 'src/app/models/teamRequest';
import { TeamService } from 'src/app/services/team.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent {
  request = new TeamRequest();
  errorMessage: string = '';

  constructor(private teamService: TeamService, 
    private router: Router,
    private tokenService: TokenService){}

    create(){
      this.request.user = this.tokenService.getUsernameFromToken();
      this.teamService.create(this.request).subscribe(() => {
        console.log('Success');
        this.router.navigate(['panel']);
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
