import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {io} from 'socket.io-client';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket = io('http://localhost:3333');

  constructor(private http: HttpClient) {}

  // Enviar un mensaje con la opción seleccionada (video)
  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  // Obtener el código generado
  onGeneratedCode(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('generatedCode', (code: string) => {
        observer.next(code);
      });
    });
  }

  // Enviar el código introducido para validarlo
  validateCode(code: string): void {
    this.socket.emit('validateCode', code); // Envía el código al servidor
  }

  // Escuchar el resultado de la validación del código
  onCodeValidationResult(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('codeValidationResult', (response: any) => {
        observer.next(response);
      });
    });
  }

  // Obtener la lista de videos desde el servidor
  getVideos(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3333/api/video/getAllVideos');
  }
}
