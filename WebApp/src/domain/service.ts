import type { InfoService } from './information';
import type { Possibility } from './possibility';

export type Service = {
    information: InfoService,
    reactions: Possibility[],
    actions: Possibility[]
};