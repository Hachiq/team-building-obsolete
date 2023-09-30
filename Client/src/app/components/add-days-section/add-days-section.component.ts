import { Component } from '@angular/core';
import { Member } from 'src/app/models/member';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedService } from 'src/app/services/shared.service';
import { StatService } from 'src/app/services/stat.service';

@Component({
  selector: 'app-add-days-section',
  templateUrl: './add-days-section.component.html',
  styleUrls: ['./add-days-section.component.scss']
})
export class AddDaysSectionComponent {
  selectedMembers: Member[] = [];

  constructor(private statService: StatService,
    private sharedService: SharedService,
    private notificationService: NotificationService){ }

  ngOnInit(){
    this.sharedService.selectedMembers$.subscribe((members) => {
      this.selectedMembers = members;
    })
  }

  addDaysWorked() {
    for (const member of this.selectedMembers) {      
      this.statService.addDayWorked(member)
      .subscribe(() => {
        this.notificationService.dayWorkedAdded(member.username);
      },
      (error) => {
        if (error.status === 404){
          this.notificationService.definedError(error.error);
        }
        else {
          this.notificationService.undefinedError();
        }
      }
      )
    }
  }

  addDaysPaid() {
    for (const member of this.selectedMembers) {      
      this.statService.addDayPaid(member)
      .subscribe(() => {
        this.notificationService.dayPaidAdded(member.username);
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
