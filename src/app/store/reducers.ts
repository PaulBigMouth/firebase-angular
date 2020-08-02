import { HeroesState } from './../modules/home/modules/heroes/store/reducers';
import { AuthState } from '../modules/authorization/store/reducers';
export interface AppStore {
  auth: AuthState;
  heroes: HeroesState;
}
