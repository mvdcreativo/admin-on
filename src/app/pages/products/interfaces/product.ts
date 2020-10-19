

export interface Response {
    message?: string;
    data?: any;
    success?: boolean;
}


export interface PivotCategoryCourse {
    course_id: number;
    category_id: number;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    ico?: string;
    color?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: any;
    courses?: Product[];
}

export interface LengthUnit {
    id: number;
    name: string;
    value: number;
    length_unit_id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at?: any;
}

export interface UserInstructor {
    id: number;
    name: string;
    email: string;
    email_verified_at?: any;
    created_at: Date;
    updated_at: Date;
    account: Account;
}

export interface Account {
    user_id: number;
    bio?: string;
    certificated: string;
    rating_up?: number;
    rating_down?: number;
    n_identification?: string;
    phone_one?: string;
    phone_two?: any;
    address_one?: string;
    address_two?: any;
    image?: string;
    role_id: number;
    birth?: Date;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: any;
}

export interface Product {
    id: number;
    title: string;
    slug: string;
    cupos: number;
    image?: string;
    schedules?: Schedule[];
    date_ini?: Date;
    length: number;
    length_unit_id: number;
    effort: string;
    level_id: number;
    user_instructor_id: number;
    certificate: string;
    discount_uno: string;
    discount_dos: string;
    discount_tres: string;
    title_certificate: string;
    description: string;
    requirements: number;
    price: string;
    currency: Currency;
    currency_id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at?: any;
    categories: Category[];
    length_unit: LengthUnit;
    user_instructor: UserInstructor;
    course_sections: CourseSection[];
    adquired_skills?: AdquiredSkills[];
    level?: Level;
    status_id:number;
}

export interface Level {
    id:number;
    name:string;
    slug:string;
    description?:string;
}

export interface Schedule {
    id: number,
    day: string,
    h_ini: string,
    h_end: string,
    course_id: number
}

export interface AdquiredSkills {
    id?: number;
    title: string;
    slug: string;
    course_id: number;
}

export interface Currency {
    id?: number;
    name?: string;
    symbol?: string;
    value?: number;
}


export interface PivotCourseSection {
    course_id: number;
    course_section_id: number;
}

export interface CourseSection {
    id: number;
    title: string;
    slug?: string;
    init_date?: Date;
    description?: any;
    status_id?: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: any;
    position?:number;
    pivot: PivotCourseSection;
    lessons?: Lesson[];
}
export interface Lesson {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    video?: any;
    duration: string;
    position?:number;
    currency_id: number;
    course_section_id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at?: any;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: any;
    account?: Account; 
    created_at: Date;
    updated_at: Date;
}

export interface Image {
    id?: number;
    url: string;
    url_small: string;
    url_medium: string;
    title?: string;
    subtitle?: string;
    description?: string;

}

export interface Feature {
    id?: number;
    name: string;
    slug: string;
    feature_id?: number;
    type?: string;
    value?: string;
    created_at?: any;
    updated_at?: any;
    feature?: Feature;
    features?: Feature[];
    pivot?: {
        property_id: number;
        feature_id: number;
        value: any;
    }

}

export interface Neighborhood {
    id?: number;
    name: string;
    code?: string;
    municipality_id: number;
    created_at?: any;
    updated_at?: any;
    municipality: Municipality;

}
export interface Municipality {
    id?: number;
    name: string;
    code?: string;
    city_id: number;
    city: City;
    created_at?: any;
    updated_at?: any;

}

export interface City {
    id?: number;
    name: string;
    code?: string;
    province_id: number;
    province: Province;
    created_at?: any;
    updated_at?: any;

}
export interface Province {
    id?: number;
    name: string;
    code?: string;
    country_id: number;
    // country: Country;
    created_at?: any;
    updated_at?: any;

}

export interface PropertyTypes {
    id?: number;
    name: string;
    description?: string;
    status_id?: number;
}

export interface OptionSelect {
    value?: any;
    name?: string;
}