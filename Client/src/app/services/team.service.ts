import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  public create(team: Team): Observable<any> {
    return this.http.post<any>(
      'https://localhost:7152/api/Team/add',
      team
    );
  }
}
