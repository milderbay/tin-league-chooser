import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Player } from '../classes/player';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  players: Player[] = [];

  constructor(
    private router: Router,
    private playerService: PlayerService)
  { }

  ngOnInit(): void {
    this.playerService.getPlayers()
      .then(players => this.players = players.slice(1, 5));
  }

  gotoDetail(player: Player): void {
    let link = ['/detail', player.id];
    this.router.navigate(link);
  }
}