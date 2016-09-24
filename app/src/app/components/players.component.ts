import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../classes/player';
import { PlayerService } from '../services/player.service'

@Component({
  selector: 'players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  players: Player[];
  selectedPlayer: Player;

  constructor(
    private router: Router,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService.getPlayers().then(players => this.players = players);
  }

  onSelect(player: Player): void {
    this.selectedPlayer = player;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedPlayer.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.playerService.create(name)
      .then(player => {
        this.players.push(player);
        this.selectedPlayer = null;
      });
  }

  delete(player: Player): void {
    this.playerService
        .delete(player.id)
        .then(() => {
          this.players = this.players.filter(p => p !== player);
          if (this.selectedPlayer === player) { this.selectedPlayer = null; }
        });
  }
}
