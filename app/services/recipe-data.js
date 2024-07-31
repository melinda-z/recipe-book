import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class RecipeDataService extends Service {
  @service store;

  async loadRecipes() {
    let response = await fetch('/api/recipes.json');
    let data = await response.json();
    return data.recipes.map((recipe) => {
      let existingRecipe = this.store.peekRecord('recipe', recipe.id);
      if (!existingRecipe) {
        return this.store.createRecord('recipe', {
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
        });
      }
    });
  }
}
