import { Component } from '@angular/core';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  teams: Team[] = [];

  constructor(private teamService: TeamService){
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

}
