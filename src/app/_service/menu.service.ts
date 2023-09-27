import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Menu } from '../_model/menu';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuCambio = new Subject<Menu[]>();
  url: string = `${environment.HOST}`;

  constructor(private http: HttpClient) { }

  listar(){
   //de forma manual
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    //de forma automatica ya que la libreria lo hace internamente
    return this.http.get<Menu[]>(`${this.url}/menus`, {
      //de forma manual
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  listarPorUsuario(nombre: string){
    //de forma manual
    let token = sessionStorage.getItem(environment.TOKEN_NAME);   
     //de forma automatica ya que la libreria lo hace internamente 
    return this.http.post<Menu[]>(`${this.url}/menus/usuario`, { nombre: nombre }, {
      //de forma manual
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

}
