import { Component, ChangeDetectorRef } from '@angular/core';
import { MetaService } from '../services/meta-service';
import { Meta } from '../models/meta.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: false,
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  metas: Meta[] = [];
  nuevaMeta: string = '';

  constructor(private metaService: MetaService, private cdr: ChangeDetectorRef) {
    this.metaService.getMetas().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.metas = data;
      this.cdr.markForCheck();
    });
  }

  agregarMeta() {
    if (this.nuevaMeta.trim() === '') {
      return;
    }
    this.metaService.addMeta({ meta: this.nuevaMeta });
    this.nuevaMeta = '';
  }

  eliminarMeta(id: string | undefined) {
  if (!id) {
    return;
  }
  this.metaService.deleteMeta(id);
}
}