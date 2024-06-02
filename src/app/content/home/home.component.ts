import { Component, OnInit } from '@angular/core';
import { Solicitud, SolicitudVista } from './models/solicitud';
import { HomeService } from './home.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/pages/login/services/auth.service';
import { User } from '../../auth/pages/login/models/auth';
import { AppearanceAnimation, DisappearanceAnimation, ToastTypeEnum } from '@ng-vibe/toastify';
import { DialogRemoteControl } from '@ng-vibe/dialog';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

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

  cerrar(solicitud: SolicitudVista) {

    const dialog = new DialogRemoteControl(ConfirmModalComponent);
    dialog.options = {
      showOverlay: true,
      animationIn: AppearanceAnimation.BOUNCE_IN,
      animationOut: DisappearanceAnimation.BOUNCE_OUT,
    };

    dialog.openDialog({ title: null, content: '¿Está seguro(a) de querer borrar el registro?', textConfirm: null }).subscribe((res) => {
      if (res.result) {

        this._service.putCerrar({agenteAsignado: this._auth.user?._id!, idSolicitud: solicitud._id}).subscribe(() =>{
          this._service.sendMessage({ parqueoSolicitado: solicitud.parqueoSolicitado, usuarioSolicitud: solicitud.usuarioSolicitud });
          this.getPendientes();
        })
      }
    });

 
  }


  logout(){
    this._auth.logOut();
  }


}
