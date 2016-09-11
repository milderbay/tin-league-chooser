import { Component } from '@angular/core';
import { }

@Component({
  selector: "my-app",
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/players" routerLinkActive="active">Players</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app/components/app.component.css']
})
export class AppComponent {
  title = 'Tin League Chooser';
}