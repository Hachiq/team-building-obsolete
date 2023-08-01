import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  tokenExists(): boolean{
    const token = localStorage.getItem('authToken');
    return !!token;
  }
}
