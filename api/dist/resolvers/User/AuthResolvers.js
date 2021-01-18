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
exports.AuthResolver = void 0;
const crypto_ts_1 = require("crypto-ts");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../../entity/User");
let LoginInput = class LoginInput {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], LoginInput.prototype, "handle", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
LoginInput = __decorate([
    type_graphql_1.InputType()
], LoginInput);
;
let SignupInput = class SignupInput {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], SignupInput.prototype, "handle", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], SignupInput.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], SignupInput.prototype, "imageUrl", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], SignupInput.prototype, "bio", void 0);
SignupInput = __decorate([
    type_graphql_1.InputType()
], SignupInput);
;
let AuthResolver = class AuthResolver {
    user_handle(handle) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { handle } });
            if (user) {
                return user;
            }
            else {
                return null;
            }
        });
    }
    user_token(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { password: token } });
            return user;
        });
    }
    signup(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield User_1.User.find({ where: { handle: input.handle } });
            if (found.length > 0) {
                return null;
            }
            const password = crypto_ts_1.AES.encrypt(input.password, 'key').toString();
            console.log(password);
            const user = yield User_1.User.create({
                handle: input.handle,
                imageUrl: input.imageUrl,
                password,
                awards: [],
                points: 0,
                bio: input.bio,
                supported: [],
                supporting: [],
                supporters: 0,
                layout: 0,
                messages: [],
                liked: []
            }).save();
            return user;
        });
    }
    login(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { handle: input.handle } });
            if (user) {
                const pass = crypto_ts_1.AES.encrypt(input.password, 'key').toString();
                const decrypt_2 = crypto_ts_1.AES.decrypt(pass, 'key').toString();
                const decrypt = crypto_ts_1.AES.decrypt(user.password, 'key').toString();
                if (decrypt == decrypt_2) {
                    return user.password;
                }
                else {
                    return "Error: Password Incorrect!";
                }
            }
            else {
                return "Error: User Not Found!";
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg("handle", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "user_handle", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg("token", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "user_token", null);
__decorate([
    type_graphql_1.Mutation(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg("input", () => SignupInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SignupInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "signup", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg("input", () => LoginInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
AuthResolver = __decorate([
    type_graphql_1.Resolver()
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=AuthResolvers.js.map