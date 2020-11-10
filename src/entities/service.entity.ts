import { Entity, Column } from 'typeorm';
import { BaseModel } from './models/base.model';

@Entity('services')
export class ServiceEntity extends BaseModel<ServiceEntity> {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'category' })
  category: string;

  @Column({ name: 'subCategory' })
  subCategory: string;

  @Column({ name: 'example' })
  example: string;

  @Column({ name: 'spotlight', default: false })
  spotlight: boolean;

  @Column({ name: 'country' })
  country: string;

  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'hasRefill', default: false })
  hasRefill: boolean;

  @Column({ name: 'hasComments', default: false })
  hasComments: boolean;

  @Column({ name: 'serviceID' })
  serviceID: number;

  @Column({ name: 'max' })
  max: number;

  @Column({ name: 'min' })
  min: number;
}
