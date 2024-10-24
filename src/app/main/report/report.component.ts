import { Component } from '@angular/core';
import {FilledButtonComponent} from "../../components/filled-button/filled-button.component";
import {TableOpenReportsComponent} from "../../components/table-open-reports/table-open-reports.component";
import {
  TableHistoryClosedReportsComponent
} from "../../components/table-history-closed-reports/table-history-closed-reports.component";

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    FilledButtonComponent,
    TableOpenReportsComponent,
    TableHistoryClosedReportsComponent
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {

}
