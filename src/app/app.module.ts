import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ActorComponent } from './actor/actor.component';
import { UseCaseComponent } from './use-case/use-case.component';
import { TechCoefficientComponent } from './tech-coefficient/tech-coefficient.component';
import { EnviromentCoefficientComponent } from './enviroment-coefficient/enviroment-coefficient.component';
import { SoftwareValueComponent } from './software-value/software-value.component';

@NgModule({
  declarations: [
    AppComponent,
    ActorComponent,
    UseCaseComponent,
    TechCoefficientComponent,
    EnviromentCoefficientComponent,
    SoftwareValueComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
