import { HeroesActions, HeroesUnion } from './actions';
import { HeroResponseResult } from '../../../../interfaces';


const initialState = {
  heroes: {},
};

export interface HeroesState {
  heroes?: Object;
}

export function heroesReducer(
  state: HeroesState = initialState,
  action: HeroesUnion
) {
  switch (action.type) {
    case HeroesActions.HeroesLoadSuccess:
      console.log(action.payload);
      
      return {
        ...state,
        heroes: {
          ...state.heroes,
          ...action.payload.reduce((previous, current) => {
            return { ...previous, [current.id]: current }
         }, {})
        }
      };
  }

  return state;
}
