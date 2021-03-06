import { IsActive } from 'src/service/isactive';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export class Master {
  @Column({
    unique: true,
    nullable: false,
  })
  slug: string;
  @Column()
  isActive: IsActive;
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    select: false,
  })
  createdAt: Date;
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    select: false,
  })
  updatedAt: Date;
}
