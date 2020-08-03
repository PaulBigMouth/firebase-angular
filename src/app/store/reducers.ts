import { HeroesState } from '../modules/heroes/store/reducers';
import { AuthState } from '../modules/authorization/store/reducers';
export interface AppState {
  auth: AuthState;
  heroes: HeroesState;
}
