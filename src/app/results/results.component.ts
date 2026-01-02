import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {IngredientsSearch} from "../services/ingredients-search";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent  implements OnInit {

  constructor(private httpService: IngredientsSearch) { }

  ngOnInit(): void {
        console.log("huh")
    }

  private router = inject(Router);

  ionViewWillEnter() {
    // Access navigation state immediately
    const navigation = this.router.getCurrentNavigation();
    const ingredients = navigation?.extras?.state?.['ingredients'] || [];

    // Alternative: check history state if navigation is null
    const state = history.state?.ingredients || ingredients;

    if (state.length > 0) {
      this.fetchRecipes(state);
    }
  }

  async fetchRecipes(ingredients: string[]) {
    const result = await this.httpService.searchFunction(ingredients);
    console.log(result);
  }
}
