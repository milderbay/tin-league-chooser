import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PlayerService } from '../services/player.service';
import { Player } from '../classes/player'

@Component({
  selector: 'player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  player: Player;

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.playerService.getPlayer(id)
        .then(player => this.player = player);
    });
  }

  goBack(): void {
    window.history.back();
  }

  save(): void {
    this.playerService.update(this.player)
      .then(this.goBack);
  }
}
