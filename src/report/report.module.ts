import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { VerifyUserMiddleware } from './middleware/verifyUser.middleware';
import { CheckAdminMiddleware } from './middleware/checkAdmin.middleware';


@Module({
  imports: [TypeOrmModule.forFeature([Report]),],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService]
})
export class ReportModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(VerifyUserMiddleware).forRoutes(ReportController),
    consumer.apply(CheckAdminMiddleware).forRoutes("report/approvereport");
  }
  
}
