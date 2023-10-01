import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewSalaryDto } from 'src/app/models/newSalaryDto';
import { Stat } from 'src/app/models/stat';
import { NotificationService } from 'src/app/services/notification.service';
import { StatService } from 'src/app/services/stat.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-stat-panel',
  templateUrl: './stat-panel.component.html',
  styleUrls: ['./stat-panel.component.scss']
})
export class StatPanelComponent {
  stat: Stat = new Stat();
  user: string = '';
  newSalaryDto: NewSalaryDto = new NewSalaryDto();

  constructor(private route: ActivatedRoute,
    private location: Location,
    private statService: StatService,
    private tokenService: TokenService,
    private notificationService: NotificationService) {
    this.loadStats();
  }

  loadStats(){
    this.route.params.subscribe(params => {
      const username = params['username'];
      this.user = username;
      this.statService.getStat(username).subscribe((result: Stat) => this.stat = result);
    });
  }

  setSalary(){
    this.newSalaryDto.username = this.user;
    this.statService.setSalary(this.newSalaryDto).subscribe(() => {
      this.notificationService.salarySet(this.newSalaryDto.username, this.newSalaryDto.newSalary);
      this.loadStats();
    },
    (error) => {
      if (error.status === 404){
        this.notificationService.definedError(error.error);
      }
      else {
        this.notificationService.undefinedError();
      }
    })
  }

  userIsChief(): boolean{
    return this.tokenService.userIsInRole('Chief');
  }

  back(){
    this.location.back();
  }
}
