import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewSalaryDto } from 'src/app/models/newSalaryDto';
import { Stat } from 'src/app/models/stat';
import { StatService } from 'src/app/services/stat.service';

@Component({
  selector: 'app-stat-panel',
  templateUrl: './stat-panel.component.html',
  styleUrls: ['./stat-panel.component.scss']
})
export class StatPanelComponent {
  stat: Stat = new Stat();
  user: string = '';
  newSalaryDto: NewSalaryDto = new NewSalaryDto();
  errorMessage: string = '';

  constructor(private route: ActivatedRoute,
    private statService: StatService) {
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
      console.log("Success");
      this.loadStats();
    },
    (error) => {
      if (error.status === 404){
        this.errorMessage = error.message;
      }
      else {
        this.errorMessage = "Undefined error. Please, try again later.";
      }
    })
  }
}
