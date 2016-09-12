import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Locker } from 'angular2-locker';

import { PlayerService } from '../services/player.service';

@Component({
  selector: 'set-player',
  templateUrl: 'app/components/set-player.component.html',
  styleUrls: ['app/components/set-player.component.css']
})
export class SetPlayerComponent {

  playerName: string;

  constructor(
    private router: Router,
    private playerService: PlayerService,
    private locker: Locker
  ) { }

  save(): void {
    this.playerService.create(this.playerName).then(
      player => {
        this.locker.set('currentPlayerId', player);
        this.router.navigate(['/players']);
      }
    );
  }
}