import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from '../models/request';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  public getRequests(teamId: number) : Observable<Request[]>{
    return this.http.get<Request[]>(
      `https://localhost:7152/api/Request/get/${teamId}`
    ).pipe(map(
      requests => requests.map(
        request => ({
          id: request.id,
          userId: request.userId,
          teamId: request.teamId,
          status: request.status,
          dateOfRequest: request.dateOfRequest
        })
      )
    ))
  }
}
