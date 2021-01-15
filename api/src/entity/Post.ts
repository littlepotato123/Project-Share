import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Field()
    title: string;

    @Column()
    @Field()
    author: string;

    @Column()
    @Field()
    category: string;

    @Column()
    @Field()
    body: string;

    @Column()
    @Field()
    createdAt: string;

    @Column("int")
    @Field(() => Int)
    likes: number;

    @Column("simple-array")
    @Field(() => [String])
    liked: Array<String>
}