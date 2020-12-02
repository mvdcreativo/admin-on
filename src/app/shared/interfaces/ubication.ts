export interface State {
    id?: number;
    name: string;
    code?: string;
    created_at?: any;
    updated_at?: any;
    
}
export interface City {
    id?: number;
    name: string;
    code?: string;
    state_id: number;
    // province: Province;
    created_at?: any;
    updated_at?: any;
    state?: State;

}
export interface Neighborhood {
    id?: number;
    name: string;
    code?: string;
    city_id: number;
    created_at?: any;
    updated_at?: any;
    city: City;

}
