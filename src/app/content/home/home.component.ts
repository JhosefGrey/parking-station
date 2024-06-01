import { Component, OnInit } from '@angular/core';
import { Solicitud } from './models/solicitud';
import { HomeService } from '../../home.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {

  solicitudes: Solicitud[] = [];

  constructor(private _service: HomeService) { }


  ngOnInit(): void {
    this._service.getMessages().subscribe((res) => this.solicitudes.push(res));
  }

  getPendientes(){
    let total = 0;
    this.solicitudes.forEach((x) => {
      if(x.entregado === false){
        total++
      }
    })

    return total;
  }

  cerrar(solicitud: Solicitud){
    solicitud.entregado = true;
    // this._service.sendMessage(solicitud);
  }
 

}
