import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { Solicitud, SolicitudVista } from './models/solicitud';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private socket = io('http://localhost:3500');
  constructor(private _http: HttpClient) { }

  getMessages() {
    let observable = new Observable<Solicitud>(observer => {
      this.socket.on('message', (data: Solicitud) => {
        console.log(data, 'holaa')
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };
    });
    return observable;
  }

  getSolicitudes() {
    return this._http.get<SolicitudVista[]>(`${environment.API_URL}solicitud/pendientes`)
  }

  sendMessage(message: Solicitud) {
    this.socket.emit('solicitud', message);
  }
}
