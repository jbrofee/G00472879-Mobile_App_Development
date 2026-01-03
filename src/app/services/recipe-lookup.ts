import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class RecipeLookup {
  constructor() {}

  async recipeSearch(id: string) {
      const options: HttpOptions = {
        url: `https://api.spoonacular.com/recipes/${id}/information`,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '70759a4f7911402abcc53d3c51d3b759',
        }
      }
  
      return await CapacitorHttp.get(options);
    }
}
