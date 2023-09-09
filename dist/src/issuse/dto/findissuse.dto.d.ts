export declare class FindIssuseRequestDto {
    issuse_info: string;
    status: string;
    user_id: string;
    project_id: string;
}
export declare class FindIssuseResponseByProjectIdDto {
    project_id: string;
    project_name: string;
    issuse_list: IssuseProperty[];
}
export declare class IssuseProperty {
    issuse_id: number;
    issuse_info: string;
    status: string;
    user_id: number;
    user_name: string;
}
export declare class FindIssuseResponseDto {
    issuse_id: number;
    issuse_info: string;
    status: string;
    user_id: number;
    user_name: string;
    project_id: number;
    project_name: string;
}
