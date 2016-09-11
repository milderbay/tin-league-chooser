import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../classes/player';
import { PlayerService } from '../services/player.service'

@Component({
  selector: 'players',
  templateUrl: 'app/components/players.component.html',
  styleUrls: ['app/components/players.component.css']
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
}
