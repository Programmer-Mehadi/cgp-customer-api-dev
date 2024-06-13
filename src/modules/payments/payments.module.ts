import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@config/config.module';
import { PaymentToken } from './entities/payment-token.entity';
import { PaymentService } from './payments.service';
import { PaymentController } from './payments.controller';
import { DeliveryService } from '@modules/delivery/delivery.service';
import { LocationService } from '@modules/location/location.service';
import { LocationSchema } from '@modules/location/schemas/location.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationService } from '@modules/notification/notification.service';
import { NotificationSchema } from '@modules/notification/notification.schema';
import { DeliveryRequestNotificationSchema } from '@modules/notification/delivery-request-notification.schema';
import { FirebaseAdminService } from '@services/firebase-admin.service';
import { FirebaseAdminModule } from '@services/firebase-admin.module';
import { NotificationsModule } from '@modules/notification/notification.module';
import { LocationModule } from '@modules/location/location.module';
import { DeliveryModule } from '@modules/delivery/delivery.module';
import { Deliveries } from '@modules/delivery/deliveries.entity';
import { Orders } from '@modules/orders/entities/orders.entity';
import { UserAddressBook } from '@modules/user-address-book/user-address-book.entity';

@Module({
  imports: [
    ConfigModule,
    FirebaseAdminModule,
    NotificationsModule,
    LocationModule,
    DeliveryModule,
    TypeOrmModule.forFeature([
      PaymentToken,
      Deliveries,
      Orders,
      UserAddressBook,
    ]),
    // MongooseModule.forFeature([
    //   { name: 'Location', schema: LocationSchema },
    //   { name: 'Notification', schema: NotificationSchema },
    //   {
    //     name: 'DeliveryRequestNotification',
    //     schema: DeliveryRequestNotificationSchema,
    //   },
    // ]),
  ],
  exports: [PaymentService],
  providers: [
    PaymentService,
    DeliveryService,
    // NotificationService,
    // LocationService,
    // FirebaseAdminService,
  ],
  controllers: [PaymentController],
})
export class PaymentModule {}
