import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Int)
    @Column("int")
    postId: number;

    @Field()
    @Column()
    body: string;

    @Field()
    @Column()
    author: string;
}