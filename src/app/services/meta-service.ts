import { Injectable, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Meta } from '../models/meta.model';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private dbPath = '/metas';
  metasRef: AngularFirestoreCollection<Meta>;

  constructor(private db: AngularFirestore, private injector: EnvironmentInjector) {
    this.metasRef = db.collection(this.dbPath);
  }

  getMetas(): AngularFirestoreCollection<Meta> {
    return this.metasRef;
  }

  addMeta(meta: Meta): Promise<any> {
    return runInInjectionContext(this.injector, () =>
      this.metasRef.add({ meta: meta.meta })
    );
  }

  deleteMeta(id: string): Promise<void> {
    return runInInjectionContext(this.injector, () =>
      this.metasRef.doc(id).delete()
    );
  }
}