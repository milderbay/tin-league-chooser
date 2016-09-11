import { Injectable } from '@angular/core';
import { Player } from '../classes/player';
import { PLAYERS } from '../mock-players';

@Injectable()
export class PlayerService {
  getPlayers(): Promise<Player[]> {
    return Promise.resolve(PLAYERS);
  }
}
