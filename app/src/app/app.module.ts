import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { routing } from './app.routing';
import { AppComponent }  from './components/app.component';
import { SetPlayerComponent } from './components/set-player.component';
import { DashboardComponent } from './components/dashboard.component';
import { PlayersComponent } from './components/players.component';
import { PlayerDetailComponent } from './components/player-detail.component';
import { PlayerService } from './services/player.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    SetPlayerComponent,
    DashboardComponent,
    PlayersComponent,
    PlayerDetailComponent
  ],
  providers: [ PlayerService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
