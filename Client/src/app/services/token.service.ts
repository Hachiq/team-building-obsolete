import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public getUsernameFromToken(): string {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode<any>(token);
      return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    }
    return '';
  }

  public getRoleFromToken(): string {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode<any>(token);
      return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }
    return '';
  }

  public userIsInRole(role: string): boolean{
    const token: any = localStorage.getItem('authToken');
    try {
      const decodedToken: any = jwtDecode(token);
      const userRoles: string[] = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  
      return userRoles && userRoles.includes(role);
    } catch (error) {
      return false; // Return false on error (invalid token, decoding error, etc.)
    }
  }
}
