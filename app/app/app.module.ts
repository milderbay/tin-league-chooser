import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './components/app.component';
import { PlayerDetailComponent } from './components/player-detail.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    PlayerDetailComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
