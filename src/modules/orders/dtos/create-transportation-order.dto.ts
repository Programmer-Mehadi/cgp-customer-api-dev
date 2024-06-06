import { ApiProperty } from '@nestjs/swagger';
import { CreateUserAddressDto } from '@modules/user-address-book/create-user-address.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateTransportationOrderDto {
  @ApiProperty({ type: CreateUserAddressDto, required: false })
  pickup_address?: CreateUserAddressDto;

  @ApiProperty({ type: CreateUserAddressDto, required: false })
  shipping_address?: CreateUserAddressDto;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  distance?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  duration?: number;

  @ApiProperty({ required: false })
  vehicle_type_id: number;

  @ApiProperty({ required: false })
  total_cost: number;

  @ApiProperty({ required: false })
  gst: number;

  @ApiProperty({ required: false })
  payable_amount: number;
}
