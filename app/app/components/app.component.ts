import { Component } from '@angular/core';
import { Player } from '../classes/player';

const PLAYERS: Player[] = [
  { id: 1, name: 'BrAwny' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

@Component({
  selector: 'my-app',
  template:`
    <h1>{{title}}</h1>
    <h2>All Players</h2>
    <ul class="players">
      <li *ngFor="let player of players"
        [class.selected]="player===selectedPlayer"
        (click)="onSelect(player)">
        <span class="badge">{{player.id}}</span> {{player.name}}
      </li>
    </ul>
    <player-detail [player]="selectedPlayer"></player-detail>
  `,
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .players {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .players li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .players li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .players li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .players .text {
      position: relative;
      top: -3px;
    }
    .players .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `]
})
export class AppComponent {

  title = 'Tin League Chooser';
  players = PLAYERS;
  selectedPlayer: Player;

  onSelect(player: Player): void {
    this.selectedPlayer = player;
  }
}
