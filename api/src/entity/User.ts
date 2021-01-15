import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    handle: string; 

    @Field()
    @Column()
    password: string;

    @Field()
    @Column({ nullable: true })
    imageUrl: string;

    @Field()
    @Column()
    bio: string;

    @Field(() => Int)
    @Column("int")
    points: number;

    @Field(() => [String])
    @Column("simple-array")
    awards: Array<String>;

    @Field(() => Int)
    @Column("int", { default: 0 })
    supporters: number;

    @Field(() => [String])
    @Column("simple-array")
    supported: Array<String>

    @Field(() => [String])
    @Column("simple-array")
    supporting: Array<String>

    @Field(() => Int)
    @Column("int", { default: 0 })
    layout: number;

    @Field(() => [String])
    @Column("simple-array")
    messages: Array<String>

    @Field(() => [Int])
    @Column("simple-array")
    liked: number[];
};