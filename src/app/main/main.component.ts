import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from '../layout/sidenav/sidenav.component';
import { Router, RouterOutlet } from '@angular/router';
import { WebSocketService } from '../service/web-socket.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SidenavComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  constructor(
    private router: Router,
    private webSocketService: WebSocketService,
  ) {}

  ngOnInit(): void {
    console.log('MainComponent', 'Se inicio');
    this.router.navigate(['incidents']).then();

    //inicializar la escucha
    this.webSocketService.mensajes();
  }
}
