import { ValidationRule } from '@/app/interfaces/validation';

export class Validator {
    private rules: ValidationRule[];

    constructor(rules: ValidationRule[]) {
        this.rules = rules;
    }

    validate(formData: { [key: string]: any }): { field: string, message: string }[] {
        const errors: { field: string, message: string }[] = [];
        this.rules.forEach(rule => {
            if (!rule.method(formData[rule.field])) {
                errors.push({ field: rule.field, message: rule.message });
            }
        });
        return errors;
    }
}