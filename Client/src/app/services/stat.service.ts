import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Stat } from '../models/stat';
import { NewSalaryDto } from '../models/newSalaryDto';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(private http: HttpClient) { }

  public getStat(username: string) : Observable<Stat>{
    return this.http.get<Stat>(
      `https://localhost:7152/api/Stat/${username}`
    )
  }

  public setSalary(salary: NewSalaryDto): Observable<any> {
    return this.http.put<any>(
      'https://localhost:7152/api/Stat/set',
      salary
    )
  }

  public addDayWorked(member: Member): Observable<any> {
    return this.http.put<any>(
      'https://localhost:7152/api/Stat/addworked', member
    )
  }

  public addDayPaid(member: Member): Observable<any> {
    return this.http.put<any>(
      'https://localhost:7152/api/Stat/addpaid', member
    )
  }
}
