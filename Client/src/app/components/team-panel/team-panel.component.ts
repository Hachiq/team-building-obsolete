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
  selectedMembers: Member[] = [];

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

  canReview(member: Member){
    if(member.username == this.tokenService.getUsernameFromToken() || this.tokenService.userIsInRole('Chief')){
      return true;
    }
    return false;
  }

  toggleSelection(member: Member) {
    if (this.isSelected(member)) {
      this.selectedMembers = this.selectedMembers.filter(selectedMember => selectedMember !== member);
      console.log(this.selectedMembers);
      
    } else {
      this.selectedMembers.push(member);
      console.log(this.selectedMembers);
      
    }
  }

  isSelected(member: Member): boolean{
    return this.selectedMembers.includes(member);
  }

  getDisplayNumber(index: number): number {
    return index + 1;
  }

}
