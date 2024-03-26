import {
    type ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

// discard
@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value, { metatype }: ArgumentMetadata) {
        if (!(metatype && this.toValidate(metatype))) {
            return value;
        }
        const object = plainToInstance(metatype, value);
        const errors = await validate(object);

        if (errors.length > 0) {
            //TODO: all errors
            throw new BadRequestException(
                Object.values(errors[0]?.constraints)[0],
            );
        }
        return value;
    }

    private toValidate(metatype: object): boolean {
        const types: object[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
