import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {IncidentsComponent} from "./main/incidents/incidents.component";

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: '', component: MainComponent, children: [
      {path: 'incidents', component: IncidentsComponent},
    ]},
];

