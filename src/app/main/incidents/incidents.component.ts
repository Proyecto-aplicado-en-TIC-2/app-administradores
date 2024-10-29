import { Component } from '@angular/core';
import { EmergencyCardReportedComponent } from '../../components/emergency-card-reported/emergency-card-reported.component';
import { FilledButtonComponent } from '../../components/filled-button/filled-button.component';
import { TableAssignedEmergenciesComponent } from '../../components/table-assigned-emergencies/table-assigned-emergencies.component';
import { TableAphsServiceComponent } from '../../components/table-aphs-service/table-aphs-service.component';
import { TableAvailableBrigadeMembersComponent } from '../../components/table-available-brigade-members/table-available-brigade-members.component';
import { TableEmergencyHistoryComponent } from '../../components/table-emergency-history/table-emergency-history.component';

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
  ],
  templateUrl: './incidents.component.html',
  styleUrl: './incidents.component.css',
})
export class IncidentsComponent {}
