import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  equipo: any[] = [];

  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    // console.log('servicio de infoPagina listo');
    // Leer archivo JSON
    this.http.get('assets/data/data-paginas.json')
    .subscribe( (resp: InfoPagina) => {

      this.cargada = true;
      this.info = resp;
      console.log(resp);

    });
  }

  private cargarEquipo() {
    // console.log('servicio de infoPagina listo');
    // Leer archivo JSON
    this.http.get('https://angular-html-badbb.firebaseio.com/equipo.json')
    .subscribe( (resp: any[]) => {

      this.equipo = resp;
      console.log(resp);

    });
  }
}
