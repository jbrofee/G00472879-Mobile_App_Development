import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {IngredientsSearch} from "../services/ingredients-search";
import {NgForOf} from "@angular/common";
import {IonCard, IonCardHeader, IonCardTitle, IonContent} from "@ionic/angular/standalone";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  imports: [
    NgForOf,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonContent
  ]
})
export class ResultsComponent  implements OnInit {
  resultsList: any;

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private httpService: IngredientsSearch) { }

  ngOnInit(): void {
        console.log("huh")
    }

  private router = inject(Router);

  ionViewWillEnter() {
    // Access navigation state immediately
    const navigation = this.router.currentNavigation();
    const ingredients = navigation?.extras?.state?.['ingredients'] || [];

    // Alternative: check history state if navigation is null
    const state = history.state?.ingredients || ingredients;

    if (state.length > 0) {
      this.fetchRecipes(state);
    }
  }

  async fetchRecipes(ingredients: string[]) {
    const response = await this.httpService.searchFunction(ingredients);
    this.resultsList = response?.data.results;
    console.log(this.resultsList.results);
  }
}
