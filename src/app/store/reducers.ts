import { ProfileState } from './../shared/reducers/profile.reducers';
import { AuthState } from '../shared/reducers/auth.reducers';
import { HeroesState } from '../shared/reducers/heroes.reducers';

export interface AppState {
  auth: AuthState;
  heroes: HeroesState;
  profile: ProfileState
}
