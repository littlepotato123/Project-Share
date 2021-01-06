import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;
}