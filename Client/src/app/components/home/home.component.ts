import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team';
import { TeamRequest } from 'src/app/models/teamRequest';
import { RequestService } from 'src/app/services/request.service';
import { TeamService } from 'src/app/services/team.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  teams: Team[] = [];
  request = new TeamRequest();
  errorMessage: string = '';

  constructor(private teamService: TeamService,
    private tokenService: TokenService,
    private router: Router,
    private requestService: RequestService){
    this.loadTeams();
  }

  loadTeams(){
    this.teamService
      .getTeams()
      .subscribe((result: Team[]) => this.teams = result)
  }

  getDisplayNumber(index: number): number {
    return index + 1;
  }

  requestToJoin(team: Team){
    this.request.team = team.name;
    this.request.user = this.tokenService.getUsernameFromToken();
    this.requestService.createRequest(this.request).subscribe(() => {
        console.log("Success");
        this.router.navigate(['home']);
      },
      (error) => {
        if (error.status === 400){
          this.errorMessage = error.error;
        }
        else {
          this.errorMessage = 'Undefined error. Please, try again later.'
        }
      }
    );
  }

}
