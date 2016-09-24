import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PlayerService } from '../services/player.service';

@Component({
  selector: 'set-player',
  templateUrl: './set-player.component.html',
  styleUrls: ['./set-player.component.css']
})
export class SetPlayerComponent {

  playerName: string;

  constructor(
    private router: Router,
    private playerService: PlayerService
  ) { }

  save(): void {
    this.playerService.create(this.playerName).then(
      player => {
        this.playerService.setCurrentPlayer(player);
        this.router.navigate(['/players']);
      }
    );
  }
}