import { Injectable } from '@angular/core';
import { Docs } from '../models/docs';
import { SocketJwtService } from './socket-jwt.service';

@Injectable({
  providedIn: 'root',
})
export class DocsService {
  actualDoc = this.socket.fromEvent<Docs>('gestionDato');
  docs = this.socket.fromEvent<string[]>('gestionDatos');

  constructor(private socket: SocketJwtService) {}

  getDoc(id: string): void {
    this.socket.emit('getDoc', id);
  }

  addDoc(doc): void {
    if (this.socket.ioSocket.connected) {
      this.socket.emit('addDoc', doc);
    } else {
      alert('token invalido');
    }
  }

  editDoc(doc: Docs): void {
    this.socket.emit('editDoc', doc);
  }
}
