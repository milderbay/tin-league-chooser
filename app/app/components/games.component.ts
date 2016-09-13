import { Component, OnInit } from '@angular/core';

//import { Game } from '../classes/game';
//import { GameService } from '../services/game.service';

@Component({
  selector: 'game-list',
  templateUrl: 'app/components/games.component.html',
  styleUrls: ['app/components/games.component.css']
})
export class GamesComponent implements OnInit {

  //games: Game[] = [];

  constructor()
  { }

  ngOnInit(): void { }

}