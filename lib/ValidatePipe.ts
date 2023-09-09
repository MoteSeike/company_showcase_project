import { ArgumentMetadata, BadRequestException, Injectable, Logger, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { ValidateBy, ValidationArguments, ValidationOptions, buildMessage, validate } from "class-validator";

@Injectable()
export class ValidatePipe implements PipeTransform {
    private readonly logger = new Logger(ValidatePipe.name);
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype))
            return value;

        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            if (errors[0].contexts) {
                Object.keys(errors[0].contexts).map((key) => {
                    const errorResponse: ErrorResponse = errors[0].contexts[key];
                    throw new BadRequestException(errorResponse);
                });
            }
            else if (errors[0]?.children[0]?.children[0]?.contexts) {
                Object.keys(errors[0]?.children[0]?.children[0]?.contexts).map((key) => {
                    const errorResponse: ErrorResponse = errors[0]?.children[0]?.children[0]?.contexts[key];
                    throw new BadRequestException(errorResponse);
                });
            }

            else {
                const errorResponse: ErrorResponse = {
                    errorCode:'E1999',
                    errorMessage:'Internal Server Error'
                };
                throw new BadRequestException(errorResponse);
            }
        }
        
        return object;
    }
    private toValidate(metatype: Function): boolean {
        const type: Function[] = [Boolean, String, Number, Array, Object];
        return !type.includes(metatype);
    }

}
type ErrorResponse = {
    errorCode: string;
    errorMessage: string
}

export function IsOnlyOne(property: string, validateOption?: ValidationOptions): PropertyDecorator {
    return ValidateBy({
        name: 'IsOnlyOne',
        constraints: [property],
        validator: {
            validate(value, args: ValidationArguments): boolean {
                const [relatedPropertyName] = args.constraints;
                const relatedValue = (args.object as any)[relatedPropertyName];
                if (!value && !relatedValue)
                    return false
                else if (!value && !relatedValue)
                    return false;
                return true;
            },
            defaultMessage: buildMessage(
                (eachPrefix) => eachPrefix + 'hello', validateOption
            ),
        },
    },
        validateOption
    );
} 