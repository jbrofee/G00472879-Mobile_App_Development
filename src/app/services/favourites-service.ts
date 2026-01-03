import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }
  private async init() {
    this._storage = await this.storage.create();
  }

  // Keeping it simple; favourites are just an array of recipe IDs
  async addFavourite(recipeId: string): Promise<void> {
    if (!this._storage) {
      await this.init();
    }
    let favourites: string[] = (await this._storage!.get('favourites')) || [];
    if (!favourites.includes(recipeId)) {
      favourites.push(recipeId);
      await this._storage!.set('favourites', favourites);
    }
  }

  async removeFavourite(recipeId: string): Promise<void> {
    if (!this._storage) {
      await this.init();
    }
    let favourites: string[] = (await this._storage!.get('favourites')) || [];
    favourites = favourites.filter(id => id !== recipeId);
    await this._storage!.set('favourites', favourites);
  }

  async getFavourites(): Promise<string[]> {
    if (!this._storage) {
      await this.init();
    }
    return (await this._storage!.get('favourites')) || [];
  }

  async isFavorited(recipeId: string): Promise<boolean> {
    if (!this._storage) {
      await this.init();
    }
    const favourites: string[] = (await this._storage!.get('favourites')) || [];
    return favourites.includes(recipeId);
  }
}
