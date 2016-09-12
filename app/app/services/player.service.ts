import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Player } from '../classes/player';

@Injectable()
export class PlayerService {
  private playersURL = 'http://localhost:5050/players';
  private headers = new Headers({'Content-Type': 'application/json'});
  
  constructor(private http: Http) { }

  getPlayers(): Promise<Player[]> {
    return this.http.get(this.playersURL)
               .toPromise()
               .then(response => response.json() as Player[])
               .catch(this.handleError);
  }

  getPlayer(id: number): Promise<Player> {
    return this.http.get(`${this.playersURL}/${id}`)
               .toPromise()
               .then(response => response.json() as Player)
               .catch(this.handleError);
  }

  update(player: Player): Promise<Player> {
    const url = `${this.playersURL}/${player.id}`;
    return this.http
      .put(url, JSON.stringify(player), {headers: this.headers})
      .toPromise()
      .then(() => player)
      .catch(this.handleError);
  }

  create(name: string): Promise<Player> {
    return this.http
      .post(this.playersURL, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    let url = `${this.playersURL}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
