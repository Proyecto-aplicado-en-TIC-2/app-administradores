import { Component } from '@angular/core';
import {FilledButtonComponent} from "../../components/filled-button/filled-button.component";
import {TableAphUsersComponent} from "../../components/table-users/table-aph-users.component";
import {TableAphBrigadiersComponent} from "../../components/table-users/table-aph-brigadiers.component";
import {TableAphUpbCommunityComponent} from "../../components/table-users/table-aph-upb-community.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    FilledButtonComponent,
    TableAphUsersComponent,
    TableAphBrigadiersComponent,
    TableAphUpbCommunityComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

}
