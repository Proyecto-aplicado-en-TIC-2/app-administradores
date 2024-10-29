import { Component } from '@angular/core';
import { FilledButtonComponent } from '../../components/filled-button/filled-button.component';
import { TableAphComponent } from '../../components/table-users/table-aph.component';
import { TableBrigadiersComponent } from '../../components/table-users/table-brigadiers.component';
import { TableUpbCommunityComponent } from '../../components/table-users/table-upb-community.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    FilledButtonComponent,
    TableAphComponent,
    TableBrigadiersComponent,
    TableUpbCommunityComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {}
