import {createAction, props} from "@ngrx/store"
import { Token } from "../../modules/interfaces"

export const signin = createAction('[AUTH] signin', props<{token: Token}>())
export const logout = createAction('[AUTH] logout')