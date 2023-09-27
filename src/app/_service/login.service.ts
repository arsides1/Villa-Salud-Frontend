import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = `${environment.HOST}/oauth/token`;

  constructor(private http: HttpClient, private router: Router) { }

 /* login(usuario: string, contrasena: string) {
    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;

    return this.http.post<any>(this.url, body, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .set('Authorization', 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD))
    });
  }*/
  enviarCorreo(correo: string) {
    return this.http.post<number>(`${environment.HOST}/login/enviarCorreo`, correo, {
      //cadena de texto
      headers: new HttpHeaders().set('Content-Type', 'text/plain')
    });
  }

  login(usuario: string, contrasena: string) {
    const body = new HttpParams()
        .set('grant_type', 'password')
        .set('username', usuario)
        .set('password', contrasena);
        
    return this.http.post<any>(this.url, body.toString(), {
        headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
            .set('Authorization', 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD))
    }).pipe(
        catchError(this.handleError)
    );
}

private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
      // Un error del lado del cliente o de la red.
      console.error('An error occurred:', error.error.message);
  } else {
      // El backend devolvió un código de respuesta no exitoso.
      // El cuerpo de la respuesta puede contener pistas sobre qué salió mal.
      console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
  }
  // Devuelve un observable con un mensaje de error orientado al usuario.
  const err = new Error('Something bad happened; please try again later.');
  return throwError(() => err);
}
  cerrarSesion() {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    this.http.get(`${environment.HOST}/tokens/anular/${token}`).subscribe(() => {
      sessionStorage.clear();
      this.router.navigate(['login']);
    });
  }
  verificarTokenReset(token: string) {  
    return this.http.get<number>(`${environment.HOST}/login/restablecer/verificar/${token}`);
  }

  restablecer(token: string, clave: string) {
    return this.http.post<number>(`${environment.HOST}/login/restablecer/${token}`, clave, {
      headers: new HttpHeaders().set('Content-Type', 'text/plain')
    });
  }
  estaLogeado() {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return token != null;
  }

}