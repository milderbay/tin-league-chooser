import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetPlayerComponent } from './components/set-player.component';
import { DashboardComponent } from './components/dashboard.component';
import { PlayersComponent } from './components/players.component';
import { PlayerDetailComponent } from './components/player-detail.component';

const appRoutes: Routes = [
  {
    path: 'detail/:id',
    component: PlayerDetailComponent
  },{
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },{
    path: 'login',
    component: SetPlayerComponent
  },{
    path: 'dashboard',
    component: DashboardComponent
  },{
    path: 'players',
    component: PlayersComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
