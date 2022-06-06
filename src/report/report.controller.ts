import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ApproveReportDto } from './dto/approve-report.dto';
import { Roles } from 'src/user/roles.decorator';
import { Role } from 'src/user/entities/role.enum';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('/create')
  create(@Body() createReportDto: CreateReportDto, @Session() session: Record<string , any>) {
    return this.reportService.create(createReportDto, session);
  }

  @Get('/reports')
  findAll() {
    return this.reportService.findAll();
  }

  // @Roles(Role.ADMIN)
  @Patch('/approvereport/:id')
  approveReport(@Param('id') id: string, @Body() approve: ApproveReportDto) {
    return this.reportService.approveReport(+id,approve);
  }

}
