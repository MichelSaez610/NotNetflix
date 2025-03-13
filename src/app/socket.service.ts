import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket = io('http://localhost:3333');
  private isPremium: boolean = false; // Store the premium status

  constructor(private http: HttpClient) {
    // Optionally fetch premium status when the service initializes
    this.fetchPremiumStatus();
  }

  // Fetch premium status from the server
  fetchPremiumStatus(): void {
    // Assuming there's an API endpoint that returns premium status
    this.http.get<{ isPremium: boolean }>('http://localhost:3333/api/user/status', { withCredentials: true })
      .subscribe(response => {
        this.isPremium = response.isPremium;
      });
  }

  // Get the premium status
  getPremiumStatus(): boolean {
    return this.isPremium;
  }

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
    // If the user is premium, fetch all videos
    if (this.isPremium) {
      return this.http.get<any[]>('http://localhost:3333/api/video/getAllVideos', { withCredentials: true });
    } else {
      // If not premium, fetch only the first video or a default video list
      return this.http.get<any[]>('http://localhost:3333/api/video/getLimitedVideos', { withCredentials: true });
    }
  }
}
