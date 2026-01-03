import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class Units {
  constructor(private storage: Storage) {
    this.init();
  };
  private async init() {
    const storage = await this.storage.create();
    this.storage = storage;
  }

  async setUnitPreference(unit: 'Metric' | 'Imperial') {
    await this.storage.set('unitPreference', unit ?? 'Metric');
  }

  async getUnitPreferences(): Promise<'Metric' | 'Imperial'> {
    const current = await this.storage.get('unitPreference');
    if (current === 'Metric' || current === 'Imperial') {
      return current;
    }
    // Default to metric if not set
    await this.storage.set('unitPreference', 'Metric');
    return 'Metric';
  }
}
