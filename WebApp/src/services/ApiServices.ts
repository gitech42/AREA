import axios from "axios";
import type { InfoService } from "../domain/information";
import type { Service } from "../domain/service";
import type { Area } from "../domain/area";

class ApiService {
    /** 
     * Function to know if user si connected
     * @return {boolean}
    */
    public static getUserStatus(): boolean {
        console.log(localStorage.getItem("user")?.localeCompare("true"));
        if (localStorage.getItem("user")?.localeCompare("true") === 0)
            return true;
        return false;
    }

    /** 
     * Function to send request to server for login user
     * @param email email of user
     * @param password password of user
     * @return {any} return any to display server message if it catch error
    */
    public static async login(email: string, password: string): Promise<any> {
        try {
            const res = await axios.post("http://localhost:8080/api/auth/login", {
                "email": email,
                "password": password
            });
            localStorage.setItem("user", "true");
            localStorage.setItem("token", res.data.access_token.toString());
            return res;
        } catch (e: any) {
            console.log(e);
            return e;
        }
    }

    /** 
     * Function to send request to server for logout user
     * @return {number}
    */
    public static async logout(): Promise<number> {
        try {
            const res = await axios.post("http://localhost:8080/api/auth/logout",{
                headers : {
                    'accept' :'application/json',
                    'Content-Type': 'application/json'
                }
            });
            localStorage.setItem("user", "false");
            localStorage.setItem("token", "");
            window.location.href = "/login";
            return res.status;
        } catch (e: any) {
            console.log(e);
            return e.status;
        }
    }

    /** 
     * Function to send request to server for register new user
     * @param username username of user
     * @param email email of user
     * @param password password of user
     * @return {any} return any to display server message if it catch error
    */
    public static async register(username: string, email: string, password: string): Promise<any> {
        try {
            const res = await axios.post("http://localhost:8080/api/auth/register", {
                "username": username,
                "password": password,
                "email": email
            },{
                headers : {
                    'accept' :'application/json',
                    'Content-Type': 'application/json'
                }
            });
            return res;
        } catch (e: any) {
            console.log(e);
            return e.status;
        }
    }
    
    /** 
     * Function to send request to server if user forget password
     * @param email The password will send to this email
     * @return {number}
    */
    public static async forgetPassword(email: string): Promise<number> {
        try {
            const res = await axios.post("http://localhost:8080/api/auth/forget-password", {
                "email": email
            }, {
                headers : {
                    'accept' :'application/json',
                    'Content-Type': 'application/json'
                }
            });
            return res.status;
        } catch (e: any) {
            console.log(e);
            return e.status;
        }
    }
    
    /** 
     * Function to send request to server if user want to be connect with google
     * @return {string} return redirection to google auth page
    */
    public static async googleAuth(): Promise<string> {
        try {
        const res = await axios.get('http://localhost:8080/api/auth/google', {
            withCredentials: true,
            headers : {
                'accept' :'application/json',
                'Content-Type': 'application/json'
            }
        });
        localStorage.setItem("user", "true");
        return res.data;
        } catch (e: any) {
            console.log(e);
            return "error";
        }
    }
    
    /** 
     * Function to send request to server if user want to be connect with google
     * @return {string} return redirection to github auth page
    */
    public static async githubAuth(): Promise<string> {
        try {
        const res = await axios.get('http://localhost:8080/api/auth/github', {
            withCredentials: true,
            headers : {
                'accept' :'application/json',
                'Content-Type': 'application/json'
            }
        });
        localStorage.setItem("user", "true");
        return res.data;
        } catch (e: any) {
            console.log(e);
            return "error";
        }
    }

    /** 
     * Function to get all area of user connected
     * @return {Area[]} return list of area
    */
    public static async getAreas(): Promise<Area[]> {
        try {
            const res = await axios.get("http://localhost:8080/api/user/areas", {
                headers : {
                    'accept' :'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token") || ''}`
                }
            });
            let areas: Area[] = [];

            console.log("Je get mes areas : ", res.data.areas);
            res.data.areas.forEach((area: any) => {
                let newArea: Area = {
                    id: area.id,
                    action: {
                        fromService :{
                            logo: area.Service_action.file,
                            name: area.Service_action.name
                        },
                        name: area.action.name,
                        require_param: true,
                        parameters: area.action.param,
                        param: area.param_action
                    },
                    reaction: {
                        fromService :{
                            logo: area.Service_reaction.file,
                            name: area.Service_reaction.name
                        },
                        name: area.reaction.name,
                        require_param: true,
                        parameters: area.reaction.param,
                        param: area.param_reaction
                    },
                    active: area.active,
                    dateCreated: area.date
                };
                areas.push(newArea);
            });
            return areas;
        } catch (e: any) {
            console.log(e);
            return [];
        }
    }

    /** 
     * Function to post area created by user
     * @param area area created by user 
     * @return {number}
    */
    public static async postArea(area: Area): Promise<number> {
        try {
            const res = await axios.post("http://localhost:8080/api/user/area", {
                "area" :area
            }, {
                headers : {
                    'accept' :'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token") || ''}`
                }
            });
            return res.status;
        } catch (e: any) {
            console.log(e);
            return e.status;
        }
    }

    /** 
     * Function to delete area
     * @param area that the user wants to delete
     * @return {number}
    */
    public static async deleteArea(area: Area): Promise<number> {
        try {
            const res = await axios.delete("http://localhost:8080/api/user/area/" + area.id, {
                headers : {
                    'accept' :'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token") || ''}`
                }
            })
            return res.status;
        } catch (e: any) {
            console.log(e);
            return e.status;
        }
    }

    /** 
     * Function to get all services available by server
     * @return {Service[]} return list of service
    */
    public static async getServices(): Promise<Service[]> {
        try {
            const res = await axios.get("http://localhost:8080/api/service", {
                headers : {
                    'accept' :'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token") || ''}`
                }
            });
            let services: Service[] = [];

            res.data.services.forEach((service: any) => {
                let fromService: InfoService = {
                    name: service.name,
                    logo: service.file
                };
                let newService: Service = {
                    information : fromService,
                    actions: [],
                    reactions: []
                };
                service.actions.forEach((action: any) => {
                    let param: boolean = action.param > 0 ? false : true;
                    
                    newService.actions.push({
                        fromService: fromService,
                        name: action.name,
                        require_param: param,
                        parameters: action.param,
                        param: []
                    });                
                });
                service.reactions.forEach((reaction: any) => {
                    let param: boolean = reaction.param > 0 ? false : true;
                    newService.reactions.push({
                        fromService: fromService,
                        name: reaction.name,
                        require_param: param,
                        parameters: reaction.param,
                        param: []
                    });
                });
                services.push(newService);
            });
            return services;
        } catch (e: any) {
            console.log(e);
            return [];
        }
    }
}

export default ApiService;