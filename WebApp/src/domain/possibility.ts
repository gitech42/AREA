import type { InfoService } from './information';

export type Possibility = {
    fromService: InfoService,
    name: string,
    require_param: boolean
    parameters: string[],
    param: string[];
}