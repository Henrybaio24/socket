import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { PermissionsService } from './permisos.service';

@Injectable()
export class SocketJwtService extends Socket {
  constructor(private permissions: PermissionsService) {
    // const token = sessionStorage.getItem('token');
    super({
      url: 'http://localhost:3500',
      options: {
        query: `token=${permissions.getToken()}&sessionID=${permissions.getSessionID()}`,
      },
    });
  }
}
