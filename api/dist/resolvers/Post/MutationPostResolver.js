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
exports.MutationPostResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Comment_1 = require("../../entity/Comment");
const Post_1 = require("../../entity/Post");
const User_1 = require("../../entity/User");
const Tools_1 = require("../Tools");
let CreateCommentInput = class CreateCommentInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], CreateCommentInput.prototype, "postId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateCommentInput.prototype, "token", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateCommentInput.prototype, "body", void 0);
CreateCommentInput = __decorate([
    type_graphql_1.InputType()
], CreateCommentInput);
;
let CreatePostInput = class CreatePostInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreatePostInput.prototype, "token", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreatePostInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreatePostInput.prototype, "category", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreatePostInput.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreatePostInput.prototype, "body", void 0);
CreatePostInput = __decorate([
    type_graphql_1.InputType()
], CreatePostInput);
let DeletePostInput = class DeletePostInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], DeletePostInput.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], DeletePostInput.prototype, "token", void 0);
DeletePostInput = __decorate([
    type_graphql_1.InputType()
], DeletePostInput);
let LikePostInput = class LikePostInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], LikePostInput.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LikePostInput.prototype, "token", void 0);
LikePostInput = __decorate([
    type_graphql_1.InputType()
], LikePostInput);
let MutationPostResolver = class MutationPostResolver extends typeorm_1.BaseEntity {
    create_post(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Tools_1.FBAuth(input.token);
            if (user) {
                const post = yield Post_1.Post.create({
                    body: input.body,
                    title: input.title,
                    category: input.category,
                    createdAt: input.createdAt,
                    author: user.handle,
                    likes: 0,
                    liked: []
                }).save();
                return post;
            }
            else {
                return null;
            }
        });
    }
    delete_post(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Tools_1.FBAuth(input.token);
            const post = yield Post_1.Post.findOne({ id: input.id });
            if (user && post) {
                if (post.author == user.handle) {
                    yield Post_1.Post.delete({ id: input.id });
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        });
    }
    create_comment(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Tools_1.FBAuth(input.token);
            if (user) {
                const comment = yield Comment_1.Comment.create({
                    author: user.handle,
                    postId: input.postId,
                    body: input.body
                }).save();
                return comment;
            }
            else {
                return null;
            }
        });
    }
    like_post(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Tools_1.FBAuth(input.token);
            const post = yield Post_1.Post.findOne({ where: { id: input.id } });
            if (user && post) {
                let arr = post.liked;
                if (arr.includes(user.password)) {
                    return null;
                }
                arr.push(user.password);
                yield Post_1.Post.update({
                    id: input.id
                }, {
                    likes: post.likes + 1,
                    liked: arr
                });
                let user_arr = user.liked;
                user_arr.push(post.id);
                yield User_1.User.update({
                    id: user.id
                }, {
                    liked: user_arr
                });
                const new_post = yield Post_1.Post.findOne({ id: post.id });
                return new_post === null || new_post === void 0 ? void 0 : new_post.likes;
            }
            else {
                return null;
            }
        });
    }
    unlike_post(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Tools_1.FBAuth(input.token);
            const post = yield Post_1.Post.findOne({ where: { id: input.id } });
            if (user && post) {
                let arr = post.liked;
                if (!arr.includes(user.password)) {
                    return null;
                }
                arr = Tools_1.remove(arr, user.password);
                yield Post_1.Post.update({
                    id: input.id
                }, {
                    likes: post.likes - 1,
                    liked: arr
                });
                let user_arr = user.liked;
                user_arr = Tools_1.remove(user_arr, post.id);
                yield User_1.User.update({
                    id: user.id
                }, {
                    liked: user_arr
                });
                const new_post = yield Post_1.Post.findOne({ id: post.id });
                return new_post === null || new_post === void 0 ? void 0 : new_post.likes;
            }
            else {
                return null;
            }
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Post_1.Post, { nullable: true }),
    __param(0, type_graphql_1.Arg("input", () => CreatePostInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePostInput]),
    __metadata("design:returntype", Promise)
], MutationPostResolver.prototype, "create_post", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("input", () => DeletePostInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DeletePostInput]),
    __metadata("design:returntype", Promise)
], MutationPostResolver.prototype, "delete_post", null);
__decorate([
    type_graphql_1.Mutation(() => Comment_1.Comment, { nullable: true }),
    __param(0, type_graphql_1.Arg("input", () => CreateCommentInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateCommentInput]),
    __metadata("design:returntype", Promise)
], MutationPostResolver.prototype, "create_comment", null);
__decorate([
    type_graphql_1.Mutation(() => type_graphql_1.Int, { nullable: true }),
    __param(0, type_graphql_1.Arg("input", () => LikePostInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LikePostInput]),
    __metadata("design:returntype", Promise)
], MutationPostResolver.prototype, "like_post", null);
__decorate([
    type_graphql_1.Mutation(() => type_graphql_1.Int, { nullable: true }),
    __param(0, type_graphql_1.Arg("input", () => LikePostInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LikePostInput]),
    __metadata("design:returntype", Promise)
], MutationPostResolver.prototype, "unlike_post", null);
MutationPostResolver = __decorate([
    type_graphql_1.Resolver()
], MutationPostResolver);
exports.MutationPostResolver = MutationPostResolver;
;
//# sourceMappingURL=MutationPostResolver.js.map