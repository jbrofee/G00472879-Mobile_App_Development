import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class Units {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    this._storage = await this.storage.create();
  }

  async setUnitPreference(unit: 'Metric' | 'Imperial') {
    console.log("pong")
    if (!this._storage) {
      await this.init();
    }
    await this._storage!.set('unitPreference', unit);
  }

  async getUnitPreferences(): Promise<'Metric' | 'Imperial'> {
    if (!this._storage) {
      await this.init();
    }

    const current = await this._storage!.get('unitPreference');
    if (current === 'Metric' || current === 'Imperial') {
      return current;
    }
    await this._storage!.set('unitPreference', 'Metric');
    return 'Metric';
  }
}
