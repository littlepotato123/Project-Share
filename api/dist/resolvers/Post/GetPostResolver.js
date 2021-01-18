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
exports.GetPostResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Comment_1 = require("../../entity/Comment");
const Post_1 = require("../../entity/Post");
let GetPostResolver = class GetPostResolver extends typeorm_1.BaseEntity {
    homepage() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield Post_1.Post.find();
            return posts;
        });
    }
    user_posts(handle) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield Post_1.Post.find({ where: { author: handle } });
            return posts;
        });
    }
    ;
    user_post(handle) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield Post_1.Post.findOne({ where: { author: handle } });
            return post;
        });
    }
    trending_posts() {
        return __awaiter(this, void 0, void 0, function* () {
            let posts = (yield Post_1.Post.find()).sort((a, b) => (a.likes < b.likes) ? 1 : -1);
            if (posts.length > 20) {
                return posts.splice(0, 21);
            }
            else {
                return posts;
            }
        });
    }
    ;
    get_comments(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield Comment_1.Comment.find({ where: { postId: id } });
            return comments;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Post_1.Post], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GetPostResolver.prototype, "homepage", null);
__decorate([
    type_graphql_1.Query(() => [Post_1.Post], { nullable: true }),
    __param(0, type_graphql_1.Arg("handle", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GetPostResolver.prototype, "user_posts", null);
__decorate([
    type_graphql_1.Query(() => Post_1.Post, { nullable: true }),
    __param(0, type_graphql_1.Arg("handle", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GetPostResolver.prototype, "user_post", null);
__decorate([
    type_graphql_1.Query(() => [Post_1.Post], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GetPostResolver.prototype, "trending_posts", null);
__decorate([
    type_graphql_1.Query(() => [Comment_1.Comment], { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GetPostResolver.prototype, "get_comments", null);
GetPostResolver = __decorate([
    type_graphql_1.Resolver()
], GetPostResolver);
exports.GetPostResolver = GetPostResolver;
;
//# sourceMappingURL=GetPostResolver.js.map