import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor(private http: HttpClient ) {
    this.socket = io('http://localhost:3333');

    // Debugging logs to check if connection is successful
    this.socket.on('connect', () => {
      console.log('Successfully connected to WebSocket');
    });

    this.socket.on('connect_error', (err) => {
      console.error('WebSocket connection error:', err);
    });
  }

  public sendMessage(message: string) {
    console.log('Emitting message:', message);
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('message', (message: string) => {
        observer.next(message);
      });
    });
  }

  public onGeneratedCode(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('generatedCode', (code: string) => {
        observer.next(code);
      });
    });
  }

  public getVideos(): Observable<any> {
    return this.http.get<any>('http://localhost:3333/api/video/getAllVideos');
  }
}
