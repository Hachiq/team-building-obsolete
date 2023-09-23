import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from '../models/request';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { TeamRequest } from '../models/teamRequest';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  public getRequests(teamId: number) : Observable<Request[]>{
    return this.http.get<Request[]>(
      `https://localhost:7152/api/Request/get/${teamId}`
    )
  }

  public createRequest(request: TeamRequest): Observable<any> {
    return this.http.post<any>(
      'https://localhost:7152/api/Request/create', 
      request
    )
  }

  public acceptRequest(id: number): Observable<any> {
    return this.http.put<any>(
      `https://localhost:7152/api/Request/accept/${id}`,
      null
    )
  }

  public declineRequest(id: number): Observable<any> {
    return this.http.put<any>(
      `https://localhost:7152/api/Request/decline/${id}`,
      null
    )
  }
}
