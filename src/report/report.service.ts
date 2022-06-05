import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {

  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>
  ) { }

  async create(createReportDto: CreateReportDto, session: Record<string, any>) {
    if (!session.passport) {
      throw new UnauthorizedException("Sign in first")

    }
    const userId = session.passport.user.id;
    createReportDto["userId"] = userId;
    const data = await this.reportRepository.save(createReportDto)
    return {
      message: "Report saved sucessfully! Admin approval required",
      data: data
    }
  }

  async findAll() {
    const reports = await this.reportRepository.find();
    let approvedReports;
    if (reports.length === 0) {
      throw new NotFoundException("No reports available")
    }
    reports.forEach(data => {
      if (data.approved) {
        approvedReports = data
      }
    })
    console.log(approvedReports)
    if (!approvedReports) {
      throw new NotFoundException("There is no reports approved by admin")
    }
    return {
      message: 'Reports retrived sucessfully',
      data: approvedReports
    }
  }

  async approveReport(id: number, userInput: any, session: Record<string, any>) {
    if (!session.passport) {
      throw new UnauthorizedException("Sign in first")
    }
    const isAdmin = session.passport.user.isAdmin
    if (!isAdmin) {
      throw new UnauthorizedException("Only admin can approve reports");
    }
    console.log(userInput.approved)
    const reportData = await this.reportRepository.findOne({ where: { id: id } });
    reportData.approved = userInput.approved
    console.log(reportData)
    const result = await this.reportRepository.save(reportData);
    console.log(result)
    return `This action returns a #${id} report`;
  }

}