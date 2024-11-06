import { Injectable } from '@angular/core';
// Importación de servicio HTTP
import { HttpClient } from '@angular/common/http';
// Importación de interfaces
import { BodyLogin } from 'src/app/interfaces/BodyLogin';
import { LoggedUser } from 'src/app/interfaces/LoggedUser';

@Injectable({ // Lo que se inyecta
  providedIn: 'root' /* Vive una vez, por lo que si se guarda una variable va a
                    poder ser accedida (restacada) desde cualquier aplicación */
})
export class AuthService {
  // Solicitud a URL
  private readonly URL_LOGIN: string = 'https://dummyjson.com/auth/login';

  // Variables públicas
  public loggedUser: LoggedUser | null = null; // Tipo usuario logueado o NULL. Inicia en NULL
	public accessToken: string | null = null // Guardar Token

  constructor(
    private http: HttpClient, // Variable HTTP para ocupar
  ) {

  }

  // Método para iniciar sesión
  public loggingIn(user: string, pass: string){ // Recibe usuario y contraseña
    // Petición
    const body: BodyLogin = { // Lo que me exige
        username: user,
        password: pass
    }
    // Objeto generado al ejecutar (lo que retorna)
    this.http.post<LoggedUser>(this.URL_LOGIN, JSON.stringify(body), {
        // Cabeceras que recibe
        headers: {
          'Content-Type': 'application/json'
        }
    })
    // Suscripción (entrega resultado)
    .subscribe(result =>{
      this.loggedUser = result; // Que el usuario logueado sea igual al resultado
      this.accessToken = result.accessToken;
      console.log(result);
    })
  }

  // Método para cerrar sesión
  public logOut(){
    if(this.loggedUser){ // Si usuario logueado tiene un dato
      this.loggedUser = null; // Vuelven a estar vacíos
      this.accessToken = null;
    }
  }

}
