import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ApproveReportDto } from './dto/approve-report.dto';
import { Roles } from 'src/user/roles.decorator';
import { Role } from 'src/user/entities/role.enum';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) { }

  @Post('/createReport')
  create(@Body() createReportDto: CreateReportDto, @Session() session: Record<string, any>) {
    return this.reportService.create(createReportDto, session);
  }

  @Get('/getAllReports')
  findAll() {
    return this.reportService.findAll();
  }

  // @Roles(Role.ADMIN)
  @Patch('/approveReposrt/:id')
  approveReport(@Param('id') id: string, @Body() approve: ApproveReportDto, @Session() session: Record<string, any>) {
    return this.reportService.approveReport(+id, approve, session);
  }

}