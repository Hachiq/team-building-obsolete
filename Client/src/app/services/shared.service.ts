import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private selectedMembersSubject = new BehaviorSubject<Member[]>([]);
  selectedMembers$ = this.selectedMembersSubject.asObservable();

  updateSelectedMembers(members: Member[]) {
    this.selectedMembersSubject.next(members);
  }
}
