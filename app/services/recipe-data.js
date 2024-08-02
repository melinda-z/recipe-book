import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class RecipeDataService extends Service {
  @service store;

  async loadRecipes() {
    let response = await fetch('/api/recipes.json');
    let data = await response.json();

    let storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];

    const addRecipeToStore = (recipe) => {
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
    };
    storedRecipes.forEach(addRecipeToStore);
    return data.recipes.map(addRecipeToStore);
  }

  async saveRecipe(recipe) {
    let storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];

    storedRecipes.push(recipe);

    localStorage.setItem('recipes', JSON.stringify(storedRecipes));
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  }

  isFavorite(recipeId) {
    let favorites = this.getFavorites();
    return favorites.includes(recipeId);
  }

  toggleFavorite(recipeId, isFavorite) {
    let favorites = this.getFavorites();
    if (isFavorite) {
      if (!favorites.includes(recipeId)) {
        favorites.push(recipeId);
      } else {
        favorites = favorites.filter((id) => id !== recipeId);
      }
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }
}
