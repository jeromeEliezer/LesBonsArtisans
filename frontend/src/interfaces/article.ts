
export interface Article {
    _id?: string;
    name: string;
    type: string;
    price: number;
    rating: number;
    warranty_years: number;
    available?: boolean
}

export interface ArticleFormType {
    name: string;
    type: string;
    price: string;
    rating: string;
    warranty_years: string;
    available: "Yes"| "No" ;
}

