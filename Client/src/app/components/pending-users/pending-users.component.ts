import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Request } from 'src/app/models/request';
import { TeamRequest } from 'src/app/models/teamRequest';
import { NotificationService } from 'src/app/services/notification.service';
import { RequestService } from 'src/app/services/request.service';
import { TeamService } from 'src/app/services/team.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-pending-users',
  templateUrl: './pending-users.component.html',
  styleUrls: ['./pending-users.component.scss']
})
export class PendingUsersComponent {
  requests: Request[] | any[] = [];
  isAscending = false;

  constructor(private requestService: RequestService, 
    private tokenService: TokenService,
    private location: Location,
    private teamService: TeamService,
    private notificationservice: NotificationService){
      this.loadRequests();
    }

  loadRequests(){
    this.requestService
      .getRequests(this.tokenService.getTeamIdFromToken())
      .subscribe((result: Request[]) => {
        this.requests = result
        this.sortOn('statusId');
      })
  }

  accept(id: number, user?: string, team?: string){
    this.requestService
      .acceptRequest(id)
      .subscribe(() => {
        console.log(`Request for ${user} accepted`);
        this.teamService
        .join(new TeamRequest(team, user))
        .subscribe(() => {
          this.notificationservice.memberJoined(user, team);
          this.loadRequests();
        }
        );
      },
      (error) => {
        if (error.status === 400){
          this.notificationservice.definedError(error.error);
        }
        else {
          this.notificationservice.undefinedError();
        }
      }
    );
  }
  
  decline(id: number){
    this.requestService
      .declineRequest(id)
      .subscribe(() => {
        this.notificationservice.requestDeclined();
        this.loadRequests();
      },
      (error) => {
        if (error.status === 400){
          this.notificationservice.definedError(error.error);
        }
        else {
          this.notificationservice.undefinedError();
        }
      });
  }

  sortOn(property: string): void{
    this.isAscending = !this.isAscending;
    const order = this.isAscending ? 1 : -1;

    // this.requests.sort((a, b) => (a[property] > b[property] ? order : -order));

    this.requests.sort((a,b) => {
      if(a[property] > b[property]) { return order; }
      if(a[property] < b[property]) { return -order; }
      return 0;
    })
  }

  getDisplayNumber(index: number): number {
    return index + 1;
  }

  back(){
    this.location.back();
  }
}
