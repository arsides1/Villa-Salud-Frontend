import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { MaterialModule } from './material/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { EspecialComponent } from './pages/consulta/especial/especial.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { MedicoDialogoComponent } from './pages/medico/medico-dialogo/medico-dialogo.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { DialogoDetalleComponent } from './pages/buscar/dialogo-detalle/dialogo-detalle.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.development';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ServerErrorsInterceptor } from './_shared/server-errors.interceptor';
import { LoginComponent } from './login/login.component';
import { RecuperarComponent } from './login/recuperar/recuperar.component';
import { TokenComponent } from './login/recuperar/token/token.component';

export function tokenGetter() {
  let tk = sessionStorage.getItem(environment.TOKEN_NAME);
  let token = tk != null ? tk : '';
  //console.log(token);
  return token;
}
@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    PacienteEdicionComponent,
    MedicoComponent,
    ExamenComponent,
    ConsultaComponent,
    EspecialidadComponent,
    EspecialComponent,
    EspecialidadEdicionComponent,
    ExamenEdicionComponent,
    MedicoDialogoComponent,
    BuscarComponent,
    DialogoDetalleComponent,
    ReporteComponent,
    LoginComponent,
    RecuperarComponent,
    TokenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['http://localhost:8080/login/enviarCorreo']
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true,
    },
     {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }