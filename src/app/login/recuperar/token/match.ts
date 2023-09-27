import { AbstractControl } from '@angular/forms';

export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        let passwordControl = AC.get('password');
        let confirmPasswordControl = AC.get('confirmPassword');
        
        if (!passwordControl || !confirmPasswordControl) {
            // Los controles no existen
            return null;  // o maneja el error adecuadamente
        }

        let password = passwordControl.value;
        let confirmPassword = confirmPasswordControl.value;

        if (password !== confirmPassword) {
            confirmPasswordControl.setErrors({ MatchPassword: true })
        } else {
            return null;
        }

        return null;  // Asegura que todas las ramas tienen un retorno
    }
}

