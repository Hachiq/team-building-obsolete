import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent {
  team = new Team();
  errorMessage: string = '';

  constructor(private teamService: TeamService, 
    private router: Router){}

    create(){
      this.teamService.create(this.team).subscribe(() => {
        console.log('Success');
        this.router.navigate(['home']);
      },
      (error) => {
        if (error.status === 400){
          this.errorMessage = error.error;
        }
        else {
          this.errorMessage = 'Undefined error. Please, try again later.'
        }
      });
    }
}
