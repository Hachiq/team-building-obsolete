import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TeamRequest } from '../models/teamRequest';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  public getTeams() : Observable<Team[]>{
    return this.http.get<Team[]>(
      'https://localhost:7152/api/Team/get'
    )
  }

  public getTeam(username: string) : Observable<Team>{
    return this.http.get<Team>(
      `https://localhost:7152/api/Team/single/${username}`
    )
  }

  public create(request: TeamRequest): Observable<any> {
    return this.http.post<any>(
      'https://localhost:7152/api/Team/add',
      request
    );
  }

  public join(request: TeamRequest): Observable<any> {
    return this.http.put<any>(
      'https://localhost:7152/api/Team/join', 
      request
    )
  }
}
