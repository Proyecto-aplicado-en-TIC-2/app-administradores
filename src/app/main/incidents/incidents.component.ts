import { Component } from '@angular/core';
import { EmergencyCardReportedComponent } from '../../components/incidents/emergency-card-reported.component';
import { FilledButtonComponent } from '../../components/filled-button/filled-button.component';
import { TableAssignedEmergenciesComponent } from '../../components/incidents/table-assigned-emergencies.component';
import { TableAphsServiceComponent } from '../../components/incidents/table-aphs-service.component';
import { TableAvailableBrigadeMembersComponent } from '../../components/incidents/table-available-brigade-members.component';
import { TableEmergencyHistoryComponent } from '../../components/global-alerts/table-emergency-history.component';
import { TableAphsHelpComponent } from '../../components/incidents/table-aphs-help.component';

@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [
    EmergencyCardReportedComponent,
    FilledButtonComponent,
    TableAssignedEmergenciesComponent,
    TableAphsServiceComponent,
    TableAvailableBrigadeMembersComponent,
    TableEmergencyHistoryComponent,
    TableAphsHelpComponent,
  ],
  templateUrl: './incidents.component.html',
  styleUrl: './incidents.component.css',
})
export class IncidentsComponent {}
