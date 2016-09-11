import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Player } from '../classes/player';

@Injectable()
export class PlayerService {
  private playersURL = 'http://localhost:5050/players';

  constructor(private http: Http) { }

  getPlayers(): Promise<Player[]> {
    return this.http.get(this.playersURL)
               .toPromise()
               .then(response => response.json() as Player[])
               .catch(this.handleError);
  }

  getPlayer(id: number): Promise<Player> {
    return this.http.get(this.playersURL + `/${id}`)
               .toPromise()
               .then(response => response.json() as Player)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
