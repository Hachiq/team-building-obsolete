import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Member } from 'src/app/models/member';
import { Team } from 'src/app/models/team';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedService } from 'src/app/services/shared.service';
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
    private sharedService: SharedService,
    private notificationService: NotificationService){
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

  fire(username: string){
    this.teamService.removeUser(username).subscribe(() => {
      this.notificationService.memberFired(username);
      this.loadMembers();
    })
  }

  goToUserStat(username: string) {
    this.router.navigate(['/stat', username]);
  }

  goToPendingUsers() {
    this.router.navigate(['pending']);
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
        this.sharedService.updateSelectedMembers(this.selectedMembers);
        console.log(this.selectedMembers);
      } else {
        this.selectedMembers.push(member);
        this.sharedService.updateSelectedMembers(this.selectedMembers);
        console.log(this.selectedMembers);
      }
    }
    return;
  }

  clearSelection() {
    this.selectedMembers = [];
    console.log(this.selectedMembers);
    
  }

  isSelected(member: Member): boolean{
    return this.selectedMembers.includes(member);
  }

  userIsChief(): boolean{
    return this.tokenService.userIsInRole('Chief');
  }

  getDisplayNumber(index: number): number {
    return index + 1;
  }

}
