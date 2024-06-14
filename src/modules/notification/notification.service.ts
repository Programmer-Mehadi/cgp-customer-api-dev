import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FirebaseAdminService } from '@services/firebase-admin.service';
import { Notification } from './notification.schema';
import { DeliveryRequestNotification } from './delivery-request-notification.schema';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel('Notification') private notificationModel: Model<Notification>,
    @InjectModel('DeliveryRequestNotification')
    private deliveryRequestNotificationModel: Model<DeliveryRequestNotification>,
    private readonly firebaseAdminService: FirebaseAdminService,
  ) {}

  async createNotification(
    userId: number,
    deviceTokens: string[],
    title: string,
    message: string,
    data?: { [key: string]: string },
  ): Promise<Notification> {
    const newNotification = new this.notificationModel({
      userId,
      deviceTokens,
      title,
      message,
      data,
    });
    return await newNotification.save();
  }

  async sendAndStoreDeliveryRequestNotification(
    deviceToken: string,
    title: string,
    message: string,
    data: { [key: string]: string },
  ) {
    const messageId = uuidv4();
    const fcmData = {
      ...data,
      messageId: messageId, // Add the message ID to the data payload
    };

    const fcmMessageId =
      await this.firebaseAdminService.sendDeliveryRequestNotification(
        deviceToken,
        title,
        message,
        fcmData,
      );

    console.log('FCM Response:', fcmMessageId);

    await this.createDeliveryRequestNotification(messageId, deviceToken, data);

    return { fcmMessageId };
  }

  async createDeliveryRequestNotification(
    messageId: string,
    deviceToken: string,
    data: { [key: string]: string },
  ): Promise<DeliveryRequestNotification> {
    const newDeliveryRequestNotification =
      new this.deliveryRequestNotificationModel({
        messageId,
        deviceToken,
        data,
      });

    return await newDeliveryRequestNotification.save();
  }

  async markAsRead(notificationId: string): Promise<void> {
    await this.notificationModel.findByIdAndUpdate(notificationId, {
      isRead: true,
    });
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return await this.notificationModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .exec();
  }
}
