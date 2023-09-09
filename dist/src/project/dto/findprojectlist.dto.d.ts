export declare class FindProjectRequestDto {
    project_name: string;
    user_id: string;
}
export declare class FindProjectByUserIdResponseDto {
    user_id: string;
    user_name: string;
    project_list: ProjectProperty[];
}
export declare class ProjectProperty {
    project_id: number;
    project_name: string;
}
export declare class FindProjectResponseDto {
    project_id: number;
    project_name: string;
    user_id: number;
    user_name: string;
}
