import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  accessDenied(){
    this.toastr.warning("You don`t have permission to access this page");
    return;
  }

  memberFired(username: string){
    this.toastr.info(`${username} was fired. Fuck him.`);
  }

  requestSent(team: string){
    this.toastr.success(`You've applied to join ${team}.`);
  }

  requestDeclined(){
    this.toastr.warning("Request declined.")
  }

  dayWorkedAdded(username: string){
    this.toastr.info(`1 day of work added for ${username}.`)
  }

  dayPaidAdded(username: string){
    this.toastr.info(`1 day paid added for ${username}.`)
  }

  salarySet(user: string, salary: number){
    this.toastr.info(`Salary for ${user} was set to ${salary}`);
  }

  memberJoined(user?: string, team?: string){
    this.toastr.info(`${user} joined the ${team}.`);
  }

  teamCreated(team?: string | null){
    this.toastr.success(`Team ${team} was created.`);
  }

  userRegistered(){
    this.toastr.success("You've registered successfully. Please, log in.");
  }

  definedError(errorMessage: string){
    this.toastr.warning(errorMessage);
  }

  undefinedError(){
    this.toastr.error("Undefined error. Please, try again later.");
  }
}
