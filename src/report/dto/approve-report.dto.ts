import { IsBoolean, IsNotEmpty } from "class-validator";
export class ApproveReportDto {
    @IsBoolean()
    approved?: boolean
}