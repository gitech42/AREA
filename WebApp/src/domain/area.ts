import type { Possibility } from "./possibility";

export type Area = {
    id?: number;
    action: Possibility,
    reaction: Possibility,
    dateCreated?: Date,
    active: boolean
}

/**
 * Function to check if area is not empty
 * @param area Area that the user wants to create
 * @return {boolean}
 */
export function isEmpty(area: Area): boolean {
    if (area.action.fromService.name == "" || area.action.name == "")
        return true;
    if (area.reaction.fromService.name == "" || area.reaction.name == "")
        return true;
    return false;
}

/**
 * Function set default value when user create area
 * @return {Area}
 */
export function setDefaultArea(): Area {
    return {
        action: {
            fromService: {
                logo: "",
                name: "",
            },
            require_param: false,
            name: "",
            parameters: [],
            param: []
        },
        reaction: {
            fromService: {
                logo: "",
                name: "",
            },
            require_param: false,
            name: "",
            parameters: [],
            param: [""]
        },
        active: true
    };
}