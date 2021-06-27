import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TareaComponent } from './tarea/tarea.component';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { UiSwitchModule } from 'ngx-ui-switch';

const routes: Route[] = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'form', component: TareaComponent},
  {path: 'form/:id', component: TareaComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    TareaComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule,
    UiSwitchModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
