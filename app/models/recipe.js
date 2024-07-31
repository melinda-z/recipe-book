import Model, { attr } from '@ember-data/model';

export default class RecipeModel extends Model {
  @attr('string') title;
  @attr('string') descriptions;
  @attr('string') ingredients;
  @attr('string') instructions;
}
