import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule, HttpService } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule } from '@config/config.module';
import { CloudflareMediaService } from '@services/cloudflare-media-upload.service';
import { Preferences } from '@modules/application/entities/preferences.entity';
import { Customers } from './entities/customers.entity';
import { CustomersService } from './services/customers.service';
import { CustomerController } from './controllers/customers.controller';
import { PaymentMethodService } from '@modules/payments/services/payment-method.service';
import { UserDeleted } from './entities/user-deleted.entity';

@Module({
  imports: [
    ConfigModule,
    JwtModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forFeature([Customers, Preferences, UserDeleted]),
  ],
  exports: [CustomersService],
  providers: [CustomersService, CloudflareMediaService, PaymentMethodService],
  controllers: [CustomerController],
})
export class CustomersModule {}
