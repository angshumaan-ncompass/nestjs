import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {

  constructor(
    @InjectRepository(Report) 
    private reportRepository: Repository<Report>
  ){}

  async create(createReportDto: CreateReportDto, session: Record<string, any>) {
    const userId = session.passport.id;
    createReportDto["userId"] = userId;
    const data = await this.reportRepository.save(createReportDto)
    return {
      message: "Report saved sucessfully! Admin approval required",
      data:data
    }
  }

  async findAll() {
    const reports = await this.reportRepository.find();
    let approvedReports = [];
    if(reports.length === 0){
      throw new NotFoundException("No reports available")
    }
    await reports.forEach(data => {if(data.approved){
      approvedReports.push(data)
    }})
    if(!approvedReports){
      throw new NotFoundException("There is no reports approved by admin")
    }
    return {
      message: 'Reports retrived sucessfully',
      data: approvedReports
    }
  }

  async approveReport(id: number,userInput: any) {
    const reportData = await this.reportRepository.findOne({where: {id: id}});
    reportData.approved = userInput.approved
    const result = await this.reportRepository.save(reportData);
    return{
      message:"Report Approved",
      data: result
    }
  }

}
