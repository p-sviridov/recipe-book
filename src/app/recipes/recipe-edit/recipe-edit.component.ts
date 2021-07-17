import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '@app/core/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  recipeId: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  get ingredientsControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  submitForm() {
    if (this.editMode) {
      this.recipeService.udpateRecipe(this.recipeId, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.cancel();
  }

  addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  deleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id'];
      this.editMode = !!params['id'];
      this.initForm();
    }); // Angular cleans up this subscription
  }

  private initForm() {
    let recipeName = '';
    let imagePath = '';
    let description = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.recipeId);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: recipeIngredients,
    });
  }
}
