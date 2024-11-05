import { Component, OnInit } from '@angular/core';
import { FilledButtonComponent } from '../filled-button/filled-button.component';
import { CasesService } from '../../service/cases.service';
import { CaseModel } from '../../models/case';
import { ReportsService } from '../../service/reports.service';
import { ReportModel } from '../../models/report';

@Component({
  selector: 'app-table-open-reports',
  standalone: true,
  imports: [FilledButtonComponent],
  template: `
    <table>
      <thead>
        <tr class="roboto-regular">
          <td><h3>Fecha de incidente</h3></td>
          <td><h3>Nombre completo</h3></td>
          <td><h3>Aph asignado</h3></td>
          <td><h3>Descripción</h3></td>
        </tr>
      </thead>
      <tbody class="roboto-regular">
        @for (item of Reportes; track item.id) {
          <tr>
            <td class="text">
              <p>{{ item.id }}</p>
            </td>
          </tr>
        } @empty {
          <p>Cargando datos</p>
        }
      </tbody>
    </table>
  `,
  styles: `
    table {
      width: 100%;
      border-spacing: 0 20px;
    }

    thead {
      h3 {
        margin: 0;
        padding: 0 20px;
      }
    }

    tbody {
      border-spacing: 10px 0;

      td {
        padding: 0 20px;
      }

      .text {
        border-right: 1px solid var(--md-sys-color-on-surface);
      }
    }
  `,
})
export class TableOpenReportsComponent implements OnInit {
  // lista temporal
  Reportes: ReportModel[] = [];
  Casos: CaseModel[] = [];

  constructor(
    private casesService: CasesService,
    private reportsService: ReportsService,
  ) {}

  ngOnInit(): void {
    // Consultamos los casos abiertos con un APH
    this.casesService.getOpenCases().subscribe((data) => {
      this.Casos = data;
    });

    // lista de ids
    const idsCasos: string[] = this.Casos.map((value) => value.id).filter(
      (value) => value != undefined,
    );

    // Consultamos los reportes
    this.reportsService.GetFromList(idsCasos).subscribe((value) => {
      this.Reportes = value;
    });

    // Consultamos los reportes completos
  }
}
