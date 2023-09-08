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

  public joinRequest(request: TeamRequest): Observable<any> {
    return this.http.post<any>(
      'https://localhost:7152/api/Request/create', 
      request
    )
  }
}
