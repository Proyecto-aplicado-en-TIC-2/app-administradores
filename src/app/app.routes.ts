import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {IncidentsComponent} from "./main/incidents/incidents.component";
import {loginGuard} from "./login.guard";
import {GlobalAlertsComponent} from "./main/global-alerts/global-alerts.component";
import {ReportComponent} from "./main/report/report.component";
import {UsersComponent} from "./main/users/users.component";

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: '', component: MainComponent,canActivate: [loginGuard], children: [
      {path: 'incidents', component: IncidentsComponent},
      {path: 'global-alerts', component: GlobalAlertsComponent},
      {path: 'reports', component: ReportComponent},
      {path: 'users', component: UsersComponent},
    ]},
];

