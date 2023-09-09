export declare class FindFeatureRequestDto {
    feature_name: string;
    price: string;
    category_id: number;
}
export declare class FindFeatureResponseDto {
    category_id: number;
    category_name: string;
    feature_list: FeatureProperty[];
}
export declare class FeatureProperty {
    feature_id: number;
    feature_name: string;
    price: number;
}
