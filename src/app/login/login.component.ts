import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.development';
import { LoginService } from '../_service/login.service';
import { MenuService } from '../_service/menu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario!: string;
  clave!: string;
  mensaje: string = "";
  error: string = "";

  constructor(private loginService: LoginService, private menuService: MenuService, private router: Router) { }

  ngOnInit() {
  }

  iniciarSesion() {
    this.loginService.login(this.usuario, this.clave).subscribe(data => {
      if (data) {

        const helper = new JwtHelperService();
        sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);

        let token = sessionStorage.getItem(environment.TOKEN_NAME);
        if (token) {
          let decodedToken = helper.decodeToken(token);

          this.menuService.listarPorUsuario(decodedToken.user_name).subscribe(data => {
            this.menuService.menuCambio.next(data);
              //console.log(data);
              this.router.navigate(['paciente']);
          });
      } else {
          console.error('Token is null');
      }
        
      }
    });
  }

  ngAfterViewInit() {
    (window as any).initialize();
  }

}
