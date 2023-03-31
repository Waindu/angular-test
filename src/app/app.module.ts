import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CasComponent } from './cas/cas.component';
import { MiComponenteComponent } from './mi-componente/mi-componente.component';
import { NuevoComponentComponent } from './nuevo-component/nuevo-component.component';
import { PersonaComponent } from './persona/persona.component';
import { HolaDirective } from './hola.directive';

@NgModule({
	declarations: [AppComponent, CasComponent, MiComponenteComponent, NuevoComponentComponent, PersonaComponent, HolaDirective],
	imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
	bootstrap: [AppComponent]
})
export class AppModule {}
