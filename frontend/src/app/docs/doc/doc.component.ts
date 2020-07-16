import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { DocsService } from '../../services/documentos.service';
import { Docs } from '../../models/docs';
import jwt_decode from 'jwt-decode';
import { PermissionsService } from '../../services/permisos.service';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss'],
})
export class DocComponent implements OnInit, OnDestroy {
  actualtUserName: Observable<string>;
  documento: Docs;
  // tslint:disable-next-line:variable-name
  private _docSubscribe: Subscription;

  constructor(
    private docsService: DocsService,
    private permissions: PermissionsService
  ) { }

  ngOnInit(): void {
    this._docSubscribe = this.docsService.actualDoc
      .pipe(
        startWith({
          id: '',
          doc: 'Seleccione o crea un documento',
          nombreUsuario: '',
          passwordSala: '',
        })
      )
      .subscribe((documento) => (this.documento = documento));
  }

  ngOnDestroy(): void {
    this._docSubscribe.unsubscribe();
  }

  editDoc(): void {
    this.getUsuario();
    this.docsService.editDoc(this.documento);
  }


  private getUsuario(): void {
    const token = this.permissions.getToken();
    const decoded = jwt_decode(token);

    this.documento.nombreUsuario = decoded.data.nombre;
  }
}
