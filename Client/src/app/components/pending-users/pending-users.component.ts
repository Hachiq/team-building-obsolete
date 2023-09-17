import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Request } from 'src/app/models/request';
import { TeamRequest } from 'src/app/models/teamRequest';
import { RequestService } from 'src/app/services/request.service';
import { TeamService } from 'src/app/services/team.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-pending-users',
  templateUrl: './pending-users.component.html',
  styleUrls: ['./pending-users.component.scss']
})
export class PendingUsersComponent {
  requests?: Request[];

  constructor(private requestService: RequestService, 
    private tokenService: TokenService,
    private location: Location,
    private teamService: TeamService){
      this.loadRequests();
    }

  loadRequests(){
    this.requestService
      .getRequests(this.tokenService.getTeamIdFromToken())
      .subscribe((result: Request[]) => this.requests = result)
  }

  accept(id: number, user?: string, team?: string){
    this.teamService
      .join(new TeamRequest(team, user))
      .subscribe(() => {
        console.log("Success");
      });
    
    this.requestService
      .acceptRequest(id)
      .subscribe(() => {
        console.log("Request accepted");
      })
  }
  
  decline(id: number){
    this.requestService
      .declineRequest(id)
      .subscribe(() => {
        console.log("Request declined");
      });
  }

  getDisplayNumber(index: number): number {
    return index + 1;
  }

  back(){
    this.location.back();
  }
}
