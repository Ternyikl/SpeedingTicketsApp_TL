import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsPositive, Matches, Min } from "class-validator";

export class CreateTicketDto {


    @IsNotEmpty()
    @Matches(/^(?:[A-Z]{2}-[A-Z]{2}|[A-Z]{3})-[0-9]{3}$/)
    licencePlate: string;

    @IsPositive()
    @IsInt()
    speed: number;

    @IsInt()
    @Min(0)
    fine: number;

    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
