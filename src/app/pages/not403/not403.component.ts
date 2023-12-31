import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-not403',
  templateUrl: './not403.component.html',
  styleUrls: ['./not403.component.css']
})
export class Not403Component implements OnInit {

  usuario!: string;

  constructor() { }

  ngOnInit() {
    const helper = new JwtHelperService();
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    // Comprueba que token no es null antes de decodificarlo
    if (token) {
      const decodedToken = helper.decodeToken(token);
      this.usuario = decodedToken.user_name;
    } else {
      // Maneja el caso en el que token es null, si es necesario
      console.error("No token found in sessionStorage");
    }
  }

}
