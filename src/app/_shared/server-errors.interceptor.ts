import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, retry, tap, catchError, EMPTY } from "rxjs";
import { environment } from "src/environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class ServerErrorsInterceptor implements HttpInterceptor {

    constructor(private snackBar: MatSnackBar) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(retry(environment.REINTENTOS)).
            pipe(tap(event => {
                if (event instanceof HttpResponse) {
                    if (event.body && event.body.error === true && event.body.errorMessage) {
                        throw new Error(event.body.errorMessage);
                    }/*else{
                        this.snackBar.open("EXITO", 'AVISO', { duration: 5000 });    
                    }*/
                }
            })).pipe(catchError((err) => {
                console.log(err);
                //https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
                if (err.status === 400) {
                    this.snackBar.open(err.message, 'ERROR 400', { duration: 5000 });
                }
                else if (err.status === 401) {
                    //console.log(err.message);
                    this.snackBar.open(err.message, 'ERROR 401', { duration: 5000 });
                    //this.router.navigate(['/login']);
                }
                else if (err.status === 500) {
                    this.snackBar.open(err.error.mensaje, 'ERROR 500', { duration: 5000 });
                } else {
                    this.snackBar.open(err.error.mensaje, 'ERROR', { duration: 5000 });
                }
                return EMPTY;
            }));
    }
}