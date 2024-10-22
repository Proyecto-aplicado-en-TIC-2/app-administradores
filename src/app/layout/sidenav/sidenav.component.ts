import { Component } from '@angular/core';
import {FilledButtonComponent} from "../../components/filled-button/filled-button.component";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    FilledButtonComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

}
