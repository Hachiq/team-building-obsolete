import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from 'src/app/models/member';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-team-panel',
  templateUrl: './team-panel.component.html',
  styleUrls: ['./team-panel.component.scss']
})
export class TeamPanelComponent {
  team: Team = new Team()
  members?: Member[];

  constructor(private teamService: TeamService,
    private tokenService: TokenService,
    private router: Router){
      this.loadTeam()
      this.loadMembers()
    }

  loadTeam(){
    this.teamService
      .getTeam(this.tokenService.getUsernameFromToken())
      .subscribe((result: Team) => this.team = result)
    console.log("Team was initialized");
  }

  loadMembers(){
    this.teamService.getMembers(this.tokenService.getTeamIdFromToken())
    .subscribe((result: Member[]) => this.members = result)
    console.log(this.tokenService.getTeamIdFromToken());
    
    console.log("Members were initialized");
  }

  goToUserStat(username: string) {
    this.router.navigate(['/stat', username]);
  }

  getDisplayNumber(index: number): number {
    return index + 1;
  }

}
