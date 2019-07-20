import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/productos.interface';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];
  error = 'Sin resultados';

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise( ( resolve, reject ) => {
      this.http.get('https://angular-html-badbb.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) => {

        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });
  }

  getProducto(id: string) {
    return this.http.get(`https://angular-html-badbb.firebaseio.com/productos/${id}.json`);

  }

  buscarProducto(termino: string) {

    if ( this.productos.length === 0 ) {
      // cargar los productos
      this.cargarProductos().then( () => {
        // ejecutar despues de tener los prodcutos
        // aplicar filtros
        this.filtrarProductos( termino );
      });

    } else {
      // aplica el filtro
      this.filtrarProductos( termino );
    }

  }

  private filtrarProductos( termino: string) {
    console.log(this.productos);
    this.productosFiltrado = [];

    this.productos.forEach( prod => {

      if ( prod.categoria.indexOf( termino ) >= 0 ) {
        this.productosFiltrado.push( prod );
      }
    });
  }
}
