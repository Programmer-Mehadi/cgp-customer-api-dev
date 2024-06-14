import { ApiProperty } from '@nestjs/swagger';

export class SendNotificationDto {
  @ApiProperty({
    description: 'User ID of the recipient',
    example: '123',
  })
  userId: number;

  @ApiProperty({
    description: 'Device tokens to send the notification to',
    example: ['device_token1', 'device_token2'],
    type: [String],
  })
  deviceTokens: string[];

  @ApiProperty({
    description: 'Title of the notification',
    example: 'Personal Notification',
  })
  title: string;

  @ApiProperty({
    description: 'Message body of the notification',
    example: 'Your order has been accepted by warehouse!',
  })
  message: string;

  @ApiProperty({
    description: 'Additional data as a JSON object for the notification',
    example:
      '{"target": "customer", "customerId": "123", "type": "order", "orderId": "123"}',
    required: false,
  })
  data?: { [key: string]: string };
}
