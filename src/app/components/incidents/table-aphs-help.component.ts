import { Component, EventEmitter, Output } from '@angular/core';
import { ListCasesNeedAph } from '../../service/list/list-cases-need-aph.service';
import { CasesService } from '../../service/cases.service';
import { CaseModel } from '../../models/case';
import { FilledButtonComponent } from '../filled-button/filled-button.component';
import { WebSocketService } from '../../service/web-socket.service';
import { AphService } from '../../service/aph.service';
import { AphModel } from '../../models/aph';
import { CommunityModel } from '../../models/community';
import { CommunityUpbService } from '../../service/community-upb.service';

@Component({
  selector: 'app-table-aphs-help',
  standalone: true,
  imports: [FilledButtonComponent],
  template: `
    <section id="content">
      <!--   Información de las listas   -->
      @if (listCases.length != 0) {
        <div class="roboto-regular header_info">
          <p>
            Aph que necesitan ayuda <b>{{ listCases.length }}</b>
          </p>
        </div>
      }

      <!--   Lista de los casos   -->
      <div class="list">
        <div class="body roboto-regular">
          @for (item of listCases; track item.id) {
            <section class="cards">
              <div class="box_info">
                <h5>Nombre Aph</h5>
                <p>
                  {{
                    getAphList(item.aphThatTakeCare_Id).names +
                      ' ' +
                      getAphList(item.aphThatTakeCare_Id).last_names
                  }}
                </p>
              </div>

              <div class="box_info">
                <h5>Nombre Usuario</h5>
                <p>
                  {{
                    getCommunityList(item.reporter_Id).names +
                      ' ' +
                      getCommunityList(item.reporter_Id).last_names
                  }}
                </p>
              </div>
              <div class="buttons">
                <app-filled-button texto="Asignar brigadista" />
              </div>
            </section>
          } @empty {
            <p>Sin novedades</p>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .header_info {
      padding-left: 20px;
      p {
        margin: 0;
      }
    }

    #content {
      width: 100%;

      .list {
        width: 100%;
        overflow-x: auto;
        scroll-behavior: smooth;
      }
    }

    /* Diseño del slider */
    .body {
      display: flex;
      flex-direction: row;
      padding: 20px;
      gap: 30px;
      width: max-content;

      .cards {
        min-width: 200px;
        background: var(--md-sys-color-primary-container);
        padding: 20px 20px;
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
        gap: 10px;
        border-radius: 8px;
        box-shadow: 0 4px 4px 0 var(--md-sys-color-shadow);

        .box_info {
          h5 {
            margin: 0;
          }
          p {
            margin: 0;
            padding-top: 5px;
          }
        }

        .buttons {
          display: flex;
          justify-content: center;
        }
      }
    }
  `,
})
export class TableAphsHelpComponent {
  listCases: CaseModel[] = [];
  listAph: AphModel[] = [];
  listCommunity: CommunityModel[] = [];

  constructor(
    protected listCasesNeedAph: ListCasesNeedAph, // lista con los aph que necesitan un brigadista
    private casesService: CasesService,
    private webSocketService: WebSocketService,
    private aphService: AphService,
    private communityUpbService: CommunityUpbService,
  ) {
    // Consultamos a la base de datos para que no se quede ningún aph sin ayuda
    if (this.listCasesNeedAph.lengthCase() == 0) {
      // Consultamos en la base de datos
      this.fillList();
    } else {
      // Llenamos las listas locales
      this.fillListLocal();
    }

    this.webSocketService.outAphHelp.subscribe((value) => {
      // Consultamos él casó y lo añadimos a la lista
      this.getCaseService(
        value.case_info.case_id,
        value.case_info.partition_key,
      );
      const caseTemp = this.getCaseList(value.case_info.case_id);
      this.getAphService(caseTemp.aphThatTakeCare_Id);
      this.getCommunityService(caseTemp.reporter_Id);

      // Actualizamos los cambios
      this.fillListLocal();
    });
  }

  // lLenar la lista de los casos
  fillList() {
    // Obtenemos los casos que necesitan un aph
    this.casesService.getCasesNeedHelp().subscribe((value) => {
      this.listCasesNeedAph.fillCase(value);

      // Realizamos la extraccion de los datos necesarios
      // lista de ids Aph
      const listAphId: string[] = [];
      value.forEach((item) => {
        listAphId.push(item.aphThatTakeCare_Id);
      });

      // lista de ids Community
      const listCommunityId: string[] = [];
      value.forEach((item) => {
        listCommunityId.push(item.reporter_Id);
      });

      // Realizamos la consulta
      this.aphService.getFromList(listAphId).subscribe((value) => {
        this.listCasesNeedAph.fillAph(value);

        // Realizamos la consulta
        this.communityUpbService
          .getFromList(listCommunityId)
          .subscribe((value) => {
            this.listCasesNeedAph.fillCommunity(value);

            // LLenar listas locales
            this.fillListLocal();
          });
      });
    });
  }

  fillListLocal() {
    this.listCases = this.listCasesNeedAph.getCase();
    this.listAph = this.listCasesNeedAph.getAph();
    this.listCommunity = this.listCasesNeedAph.getCommunity();
  }

  // Extraer dato por id cuando el Socket agrega un nuevo item
  getCaseService(id: string, key: string) {
    this.casesService.getCaseById(id, key).subscribe((value) => {
      this.listCasesNeedAph.pushCase(value);
    });
  }

  getAphService(id: string) {
    this.aphService.getAphById(id).subscribe((value) => {
      this.listCasesNeedAph.pushAph(value);
    });
  }

  getCommunityService(id: string) {
    this.communityUpbService.getById(id).subscribe((value) => {
      this.listCasesNeedAph.pushCommunity(value);
    });
  }

  // Buscar un item por Id de las listas locales
  getCaseList(id: string) {
    return this.listCases.find((value) => (value.id = id)) || new CaseModel();
  }

  getAphList(id: string) {
    return this.listAph.find((value) => (value.id = id)) || new AphModel();
  }

  getCommunityList(id: string) {
    return (
      this.listCommunity.find((value) => (value.id = id)) ||
      new CommunityModel()
    );
  }
}
