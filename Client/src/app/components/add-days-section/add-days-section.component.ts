import { Component } from '@angular/core';
import { Member } from 'src/app/models/member';
import { StatService } from 'src/app/services/stat.service';

@Component({
  selector: 'app-add-days-section',
  templateUrl: './add-days-section.component.html',
  styleUrls: ['./add-days-section.component.scss']
})
export class AddDaysSectionComponent {
  selectedMembers: Member[] = [];

  constructor(private statService: StatService){}

  addDaysWorked() {
    for (const member of this.selectedMembers) {      
      this.statService.addDayWorked(member)
      .subscribe(() => {
        console.log(`Success with ${member.username}`);
      },
      (error) => {
        if (error.status === 404){
          console.log(error.message);
          
        }
        else {
          console.log("Undefined error. Please, try again later.");
          ;
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
      },
      (error) => {
        if (error.status === 404){
          console.log(error.message);
          
        }
        else {
          console.log("Undefined error. Please, try again later.");
          ;
        }
      }
      )
    }
  }
}
