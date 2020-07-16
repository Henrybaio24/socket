import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DocsService } from '../../services/documentos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-docs-list',
  templateUrl: './docs-list.component.html',
  styleUrls: ['./docs-list.component.scss'],
})
export class DocsListComponent implements OnInit, OnDestroy {
  docs: Observable<string[]>;
  actualDoc: string;
  docAuth: any;
  // tslint:disable-next-line:variable-name
  private _docSubscribe: Subscription;

  constructor(private docsService: DocsService, private router: Router) {}

  ngOnInit(): void {
    this.docs = this.docsService.docs;
    this._docSubscribe = this.docsService.actualDoc.subscribe(
      (doc) => ((this.actualDoc = doc.id), (this.docAuth = doc))
    );
  }

  ngOnDestroy(): void {
    this._docSubscribe.unsubscribe();
  }

  getDoc = async (id: string) => {
    this.docsService.getDoc(id);

    const passwordSala = prompt('Sala password');
    if (this.docAuth.passwordSala === passwordSala) {
        this.docsService.getDoc(id);
      } else {
        alert('Contraseña incorrecta');
      }
  }

  addDoc(): void {
    // tslint:disable-next-line:one-variable-per-declaration

   const passwordSala = prompt('Escribe un password para tu documento');

   this.docsService.addDoc({
      id: '',
      doc: '',
      nombreUsuario: '',
      passwordSala,
    });
  }
}
