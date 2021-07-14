import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '@app/core/models/recipe.model';
import { ShoppingListService } from '@app/core/services/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {}

  addToShoppingList() {
    this.slService.addIngredients(this.recipe.ingredients);
  }
}
