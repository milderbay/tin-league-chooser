import { Injectable } from '@angular/core';
import { Player } from '../classes/player';
import { PLAYERS } from '../mock-players';

@Injectable()
export class PlayerService {
  getPlayers(): Promise<Player[]> {
    return Promise.resolve(PLAYERS);
  }

  getPlayer(id: number): Promise<Player> {
    return this.getPlayers()
               .then(players => players.find(player => player.id === id));
  }
}
