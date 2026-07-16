import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CertificatesService } from './certificates.service';

@ApiTags('Certificates')
@Controller()
export class CertificatesController {
  constructor(private readonly service: CertificatesService) {}

  @Get('me/certificates') @ApiOperation({ summary: 'Mening sertifikatlarim' })
  my() { return this.service.list(); }

  @Get('certificates/:certId') @ApiOperation({ summary: 'Sertifikat tafsiloti' })
  detail(@Param('certId') id: string) { return this.service.detail(id); }

  @Get('certificates/:certId/download') @ApiOperation({ summary: 'PDF ko\'rinishida yuklab olish' })
  download(@Param('certId') id: string) { return this.service.download(id); }
}
