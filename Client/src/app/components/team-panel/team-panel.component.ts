import { Component } from '@angular/core';
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

  constructor(private teamService: TeamService,
    private tokenService: TokenService){
      this.loadTeam()
    }

  loadTeam(){
    this.teamService
      .getTeam(this.tokenService.getUsernameFromToken())
      .subscribe((result: Team) => this.team = result)
    console.log("I was initialized");
  }

}
