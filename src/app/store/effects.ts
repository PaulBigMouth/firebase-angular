import { HeroesEffects } from './../shared/effects/heroes.effects';
import { ChatEffects } from './../shared/effects/chat.effects';
import { AuthEffects } from './../shared/effects/auth.effects';
import { CommunityEffects } from './../shared/effects/community.effects';
import { ProfileEffects } from './../shared/effects/profile.effects';


export const appEffects = [
    ProfileEffects,
    CommunityEffects,
    AuthEffects,
    ChatEffects,
    HeroesEffects
]