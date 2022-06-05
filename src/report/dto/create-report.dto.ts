import { IsNotEmpty } from 'class-validator'
export class CreateReportDto {
    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    make: string;

    @IsNotEmpty()
    model: string;

    @IsNotEmpty()
    year: number;

    @IsNotEmpty()
    mileage: number;
}


