import { Component } from '@angular/core';
import {
  CardGlobalEmergencyActiveComponent
} from "../../components/card-global-emergency-active/card-global-emergency-active.component";
import {FilledButtonComponent} from "../../components/filled-button/filled-button.component";
import {CardGlobalEmergencyComponent} from "../../components/card-global-emergency/card-global-emergency.component";

@Component({
  selector: 'app-global-alerts',
  standalone: true,
  imports: [
    CardGlobalEmergencyActiveComponent,
    FilledButtonComponent,
    CardGlobalEmergencyComponent
  ],
  templateUrl: './global-alerts.component.html',
  styleUrl: './global-alerts.component.css'
})
export class GlobalAlertsComponent {

}
