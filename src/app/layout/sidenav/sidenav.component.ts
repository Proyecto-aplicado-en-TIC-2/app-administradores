import { Component } from '@angular/core';
import {FilledButtonComponent} from "../../components/filled-button/filled-button.component";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../service/auth.service";

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

  constructor(private autService: AuthService, private router: Router) {
  }

  logOut(){
    this.autService.deleteToken()
    this.router.navigate(['/login'])
  }
}
