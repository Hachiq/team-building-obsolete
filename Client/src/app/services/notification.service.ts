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
}
