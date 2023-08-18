import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stat } from 'src/app/models/stat';
import { StatService } from 'src/app/services/stat.service';

@Component({
  selector: 'app-stat-panel',
  templateUrl: './stat-panel.component.html',
  styleUrls: ['./stat-panel.component.scss']
})
export class StatPanelComponent {
  stat: Stat = new Stat();
  user: string = '';

  constructor(private route: ActivatedRoute,
    private statService: StatService) {
    this.route.params.subscribe(params => {
      const username = params['username'];
      this.user = username;
      this.statService.getStat(username).subscribe((result: Stat) => this.stat = result);
    });
  }
}
