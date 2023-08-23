import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from 'src/app/models/member';
import { Team } from 'src/app/models/team';
import { StatService } from 'src/app/services/stat.service';
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
  errorMessage: string = '';

  constructor(private teamService: TeamService,
    private tokenService: TokenService,
    private router: Router,
    private statService: StatService){
      this.loadTeam()
      this.loadMembers()
    }

  loadTeam(){
    this.teamService
      .getTeam(this.tokenService.getUsernameFromToken())
      .subscribe((result: Team) => this.team = result)
  }

  loadMembers(){
    this.teamService
      .getMembers(this.tokenService.getTeamIdFromToken())
      .subscribe((result: Member[]) => this.members = result)
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
    if(this.userIsChief()){
      if (this.isSelected(member)) {
        this.selectedMembers = this.selectedMembers.filter(selectedMember => selectedMember !== member);
        console.log(this.selectedMembers);
      } else {
        this.selectedMembers.push(member);
        console.log(this.selectedMembers);
      }
    }
    return;
  }

  isSelected(member: Member): boolean{
    return this.selectedMembers.includes(member);
  }

  addDaysWorked() {
    for (const member of this.selectedMembers) {      
      this.statService.addDayWorked(member)
      .subscribe(() => {
        console.log(`Success with ${member.username}`);
        this.loadMembers();
      },
      (error) => {
        if (error.status === 404){
          this.errorMessage = error.message;
        }
        else {
          this.errorMessage = "Undefined error. Please, try again later.";
        }
      }
      )
    }
  }

  addDaysPaid() {
    for (const member of this.selectedMembers) {      
      this.statService.addDayPaid(member)
      .subscribe(() => {
        console.log(`Success with ${member.username}`);
        this.loadMembers();
      },
      (error) => {
        if (error.status === 404){
          this.errorMessage = error.message;
        }
        else {
          this.errorMessage = "Undefined error. Please, try again later.";
        }
      }
      )
    }
  }

  userIsChief(): boolean{
    return this.tokenService.userIsInRole('Chief');
  }

  getDisplayNumber(index: number): number {
    return index + 1;
  }

}
