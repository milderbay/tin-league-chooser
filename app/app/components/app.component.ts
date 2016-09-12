import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Player } from '../classes/player';
import { PlayerService } from '../services/player.service';

@Component({
  selector: "my-app",
  templateUrl: "app/components/app.component.html",
  styleUrls: ['app/components/app.component.css']
})
export class AppComponent {
  title = 'Tin League Chooser';
  currentPlayer: Player;

  constructor(
    private router: Router,
    private playerService: PlayerService
  ) { }

  logout(): void {
    this.playerService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}