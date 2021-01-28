"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Category_1 = require("../../entity/Category");
const Post_1 = require("../../entity/Post");
let CreateCategoryInput = class CreateCategoryInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateCategoryInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateCategoryInput.prototype, "description", void 0);
CreateCategoryInput = __decorate([
    type_graphql_1.InputType()
], CreateCategoryInput);
let CategoryResolver = class CategoryResolver extends typeorm_1.BaseEntity {
    category_init() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield Category_1.Category.find();
            if (categories.length > 0) {
                return false;
            }
            else {
                yield Category_1.Category.create({ title: "Racism", description: "This is a category where anything that you feel is discriminating by race in politics, cities, or even your own job. You can feel free to be as detailed as you would like!" }).save();
                yield Category_1.Category.create({ title: "Politics", description: "This is a category where you can post to whenever you find news that you feel the need to share about. Whethere it is a national update, or a small city construction update, if you feel the need to put it online, put it on Project Sh@re!" }).save();
                yield Category_1.Category.create({ title: "Issues", description: "This is a category where you can post anything about any issues that you are facing, you see others facing, or even the nation or world facing. This can be as little as a small manifacture mistake, all the way to a global pandemic." }).save();
                yield Category_1.Category.create({ title: "Campaigning", description: "Feel free to post anything that promotes your channel, accounts, or political status on Project Sh@are using this category!" }).save();
                yield Category_1.Category.create({ title: "Introduction", description: "Project Sh@re is a online world, just like any other, and usually it helps to introduce yourself before trying to get famous or even post anything online. In this category, you can post anything about yourself or anything you feel the need to share with others about yourself!" }).save();
                yield Category_1.Category.create({ title: "Anything", description: "This category is for really anything. Mainly used for comments and user feedback, many authors use this category to let their supporters talk to them and let them know what they would like to hear from the author." }).save();
                yield Category_1.Category.create({ title: "Economics", description: "This category is for any new business or economic spikes or downfalls. You can use this category to update the users of Project Sh@re on what is going on in the world of economics, stocks, trade market, and finance as a whole!" }).save();
                return true;
            }
        });
    }
    ;
    all_categories() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield Category_1.Category.find();
            return categories;
        });
    }
    ;
    one_category(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield Category_1.Category.findOne({ title });
            return category;
        });
    }
    ;
    create_category(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Category_1.Category.create({ title: input.title, description: input.description }).save();
        });
    }
    ;
    category_posts(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield Post_1.Post.find({ where: { category: title } });
            return posts;
        });
    }
    ;
    sample_category_post(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield Post_1.Post.findOne({ where: { category: title } });
            return post;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "category_init", null);
__decorate([
    type_graphql_1.Query(() => [Category_1.Category], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "all_categories", null);
__decorate([
    type_graphql_1.Query(() => Category_1.Category, { nullable: true }),
    __param(0, type_graphql_1.Arg("title", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "one_category", null);
__decorate([
    type_graphql_1.Mutation(() => Category_1.Category),
    __param(0, type_graphql_1.Arg("input", () => CreateCategoryInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateCategoryInput]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "create_category", null);
__decorate([
    type_graphql_1.Query(() => [Post_1.Post], { nullable: true }),
    __param(0, type_graphql_1.Arg("title", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "category_posts", null);
__decorate([
    type_graphql_1.Query(() => Post_1.Post, { nullable: true }),
    __param(0, type_graphql_1.Arg("title", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "sample_category_post", null);
CategoryResolver = __decorate([
    type_graphql_1.Resolver()
], CategoryResolver);
exports.CategoryResolver = CategoryResolver;
;
//# sourceMappingURL=CategoryResolver.js.map