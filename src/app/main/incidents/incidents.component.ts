import { Component } from '@angular/core';
import {
  EmergencyCardReportedComponent
} from "../../components/emergency-card-reported/emergency-card-reported.component";

@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [
    EmergencyCardReportedComponent
  ],
  templateUrl: './incidents.component.html',
  styleUrl: './incidents.component.css'
})
export class IncidentsComponent {

}
