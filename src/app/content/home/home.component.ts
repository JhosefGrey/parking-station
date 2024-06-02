import { Component, OnInit } from '@angular/core';
import { Solicitud, SolicitudVista } from './models/solicitud';
import { HomeService } from './home.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/pages/login/services/auth.service';
import { User } from '../../auth/pages/login/models/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {

  solicitudes: SolicitudVista[] = [];
  user: User | null = null;

  constructor(private _service: HomeService, private _auth: AuthService) { }

  ngOnInit(): void {
    this._service.getMessages().subscribe((res) => this.getPendientes());
    this.user = this._auth.user;
    this.getPendientes();
  }

  getPendientes() {
    this._service.getSolicitudes().subscribe((res) => this.solicitudes = res)
  }

  cerrar(solicitud: Solicitud) {
    // solicitud.entregado = true;
  }


  logout(){
    this._auth.logOut();
  }


}
