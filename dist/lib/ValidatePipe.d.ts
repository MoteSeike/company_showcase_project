import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { ValidationOptions } from "class-validator";
export declare class ValidatePipe implements PipeTransform {
    private readonly logger;
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
    private toValidate;
}
export declare function IsOnlyOne(property: string, validateOption?: ValidationOptions): PropertyDecorator;
