import { Component } from '@angular/core';
import { Request } from 'src/app/models/request';
import { RequestService } from 'src/app/services/request.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-pending-users',
  templateUrl: './pending-users.component.html',
  styleUrls: ['./pending-users.component.scss']
})
export class PendingUsersComponent {
  requests?: Request[];

  constructor(private requestService: RequestService, 
    private tokenService: TokenService){
      this.loadRequests();
    }

  loadRequests(){
    this.requestService
      .getRequests(this.tokenService.getTeamIdFromToken())
      .subscribe((result: Request[]) => this.requests = result)
  }

  getDisplayNumber(index: number): number {
    return index + 1;
  }
}
