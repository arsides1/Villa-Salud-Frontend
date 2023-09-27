import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from './login.service';
import { MenuService } from './menu.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.development';
import { Observable, map } from 'rxjs';
import { Menu } from '../_model/menu';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  
  constructor(private router: Router, private loginService: LoginService, private menuService: MenuService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Inicializa el servicio para JWT
    const helper = new JwtHelperService();

    // Si el usuario no está logeado, redirige al login
    if (!this.loginService.estaLogeado()) {
      this.redirectToLogin();
      return false;
    }

    // Obtiene el token del almacenamiento
    const token = sessionStorage.getItem(environment.TOKEN_NAME);

    // Si el token ha expirado, redirige al login
    if (helper.isTokenExpired(token!)) {
      this.redirectToLogin();
      return false;
    }

    // Obtiene la URL actual y decodifica el token para obtener el nombre de usuario
    const url = state.url;
    const decodedToken = helper.decodeToken(token!);

    // Retorna un observable que verifica los menús del usuario y valida si tiene acceso a la URL actual
    return this.menuService.listarPorUsuario(decodedToken.user_name).pipe(map((data: Menu[]) => {
      
      // Actualiza los menús actuales para otros componentes que estén escuchando
      this.menuService.menuCambio.next(data);

      // Verifica si el usuario tiene algún menú que coincida con la URL actual
      const isAuthorized = data.some(m => url.startsWith(m.url));
      
      // Si el usuario está autorizado, retorna true. Si no, redirige a la página de error 403
      if (isAuthorized) {
        return true;
      }

      this.router.navigate(['not-403']);
      return false;
    }));
  }

  // Método privado para manejar la redirección al login
  private redirectToLogin() {
    // Limpia la sesión y redirige al login
    sessionStorage.clear();
    this.router.navigate(['login']);
  }



  /*canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const helper = new JwtHelperService();
    let rpta = this.loginService.estaLogeado();
    if (!rpta) {
      sessionStorage.clear();
      this.router.navigate(['login']);
      return false;
    } else {
      let token = sessionStorage.getItem(environment.TOKEN_NAME);
      if (!helper.isTokenExpired(token!)) {
        let url = state.url;
        const decodedToken = helper.decodeToken(token!);

        return this.menuService.listarPorUsuario(decodedToken.user_name).pipe(map((data: Menu[]) => {
          this.menuService.menuCambio.next(data);

          let cont = 0;
          for (let m of data) {
            if (url.startsWith(m.url)) {
              cont++;
              break;
            }
          }

          if (cont > 0) {
            return true;
          } else {
            this.router.navigate(['not-403']);
            return false;
          }
        }));
      } else {
        sessionStorage.clear();
        this.router.navigate(['login']);
        return false;
      }
    }
  }



  /*constructor(private router: Router, private loginService: LoginService, private menuService: MenuService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const helper = new JwtHelperService();
    let rpta = this.loginService.estaLogeado();

    if (!rpta) {
      sessionStorage.clear();
      this.router.navigate(['login']);
      return false;
    } else {
      //si estas logueado
      let token = sessionStorage.getItem(environment.TOKEN_NAME);
      if (!helper.isTokenExpired(token)) {
        //verificar por roles

        //URL QUE EL USUARIO DESEA ENTRAR
        let url = state.url;
        //VERIFICAR SI ESA URL CORRESPONDE A UN ROL QUE EL USUARIO TENGA
        const decodedToken = helper.decodeToken(token);

        return this.menuService.listarPorUsuario(decodedToken.user_name).pipe(map((data: Menu[]) => {
          this.menuService.menuCambio.next(data);

          let cont = 0;
          for (let m of data) {
            if (url.startsWith(m.url)) {
              cont++;
              break;
            }
          }

          if (cont > 0) {
            return true;
          } else {
            this.router.navigate(['not-403']);
            return false;
          }
        }));
      } else {
        sessionStorage.clear();
        this.router.navigate(['login']);
        return false;
      }
    }
  }*/


}
