import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { routes } from './components/animus/animus.routes';
import { AppComponent } from './app.component';
import { AnimusComponent } from './components/animus/animus.component';
import { DataService } from './services/data.service';
import { ApartmentComponent } from './components/animus/apartments/apartment/apartment.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimusComponent,
    ApartmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
