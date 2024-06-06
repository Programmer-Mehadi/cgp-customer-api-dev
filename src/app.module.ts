import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ConfigModule } from '@config/config.module';
import { MysqlModule } from '@database/mysql.module';
import { MongoModule } from '@database/mongo.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ProductsModule } from '@modules/products/products.module';
import { WarehouseModule } from '@modules/warehouse/warehouses.module';
import { ApplicationModule } from '@modules/application/application.module';
import { CustomersModule } from '@modules/customers/customers.module';
import { UserAddressBookModule } from '@modules/user-address-book/user-address-book-module';
import { GeoLocationModule } from '@modules/geolocation/geolocation.module';
import { SearchModule } from '@modules/search/search.module';
import { WishListModule } from '@modules/wishlist/wishlist.module';
import { CartModule } from '@modules/cart/cart.module';
import { OrderModule } from '@modules/orders/order.module';
import { PaymentModule } from '@modules/payments/payments.module';
import { LocationModule } from '@modules/location/location.module';
import { NotificationsModule } from '@modules/notification/notification.module';
import { ChatModule } from '@modules/chat/chat.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DeliveryService } from './modules/delivery/delivery.service';
import { DeliveryController } from './modules/delivery/delivery.controller';
import { DeliveryModule } from './modules/delivery/delivery.module';

@Module({
  imports: [
    ConfigModule,
    MysqlModule,
    MongoModule,
    ApplicationModule,
    SearchModule,
    AuthModule,
    CustomersModule,
    UserAddressBookModule,
    WarehouseModule,
    ProductsModule,
    WishListModule,
    CartModule,
    OrderModule,
    LocationModule,
    GeoLocationModule,
    NotificationsModule,
    PaymentModule,
    ChatModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    DeliveryModule,
  ],
  providers: [AppService, DeliveryService],
  controllers: [AppController, DeliveryController],
})
export class AppModule {}
