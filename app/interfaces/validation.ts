export interface ValidationRule {
    field: string;
    method: (value: any) => boolean;
    message: string;
}