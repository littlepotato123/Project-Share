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
exports.EditUserResolver = void 0;
const crypto_ts_1 = require("crypto-ts");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const User_1 = require("../../entity/User");
const Tools_1 = require("../Tools");
let NewPasswordInput = class NewPasswordInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewPasswordInput.prototype, "token", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewPasswordInput.prototype, "password", void 0);
NewPasswordInput = __decorate([
    type_graphql_1.InputType()
], NewPasswordInput);
;
let NewLayoutInput = class NewLayoutInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], NewLayoutInput.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], NewLayoutInput.prototype, "layout", void 0);
NewLayoutInput = __decorate([
    type_graphql_1.InputType()
], NewLayoutInput);
let NewBioInput = class NewBioInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], NewBioInput.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewBioInput.prototype, "bio", void 0);
NewBioInput = __decorate([
    type_graphql_1.InputType()
], NewBioInput);
let EditUserResolver = class EditUserResolver extends typeorm_1.BaseEntity {
    new_bio(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id: input.id } });
            if (user) {
                yield User_1.User.update({
                    password: user.password
                }, {
                    bio: input.bio
                });
                const new_user = yield User_1.User.findOne({ where: { id: input.id } });
                if (new_user) {
                    return new_user.bio;
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        });
    }
    new_layout(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield User_1.User.findOne({ where: { id: input.id } });
            if (user) {
                yield User_1.User.update({
                    id: input.id
                }, {
                    layout: input.layout
                });
                user = yield User_1.User.findOne({ where: { id: input.id } });
                return user === null || user === void 0 ? void 0 : user.layout;
            }
            else {
                return null;
            }
        });
    }
    new_password(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Tools_1.FBAuth(input.token);
            if (user) {
                const crypted = crypto_ts_1.AES.encrypt(input.password, 'key').toString();
                yield User_1.User.update({
                    id: user.id
                }, {
                    password: crypted
                });
                return crypted;
            }
            else {
                return null;
            }
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => String, { nullable: true }),
    __param(0, type_graphql_1.Arg("input", () => NewBioInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewBioInput]),
    __metadata("design:returntype", Promise)
], EditUserResolver.prototype, "new_bio", null);
__decorate([
    type_graphql_1.Mutation(() => type_graphql_1.Int, { nullable: true }),
    __param(0, type_graphql_1.Arg("input", () => NewLayoutInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewLayoutInput]),
    __metadata("design:returntype", Promise)
], EditUserResolver.prototype, "new_layout", null);
__decorate([
    type_graphql_1.Mutation(() => String, { nullable: true }),
    __param(0, type_graphql_1.Arg("input", () => NewPasswordInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewPasswordInput]),
    __metadata("design:returntype", Promise)
], EditUserResolver.prototype, "new_password", null);
EditUserResolver = __decorate([
    type_graphql_1.Resolver()
], EditUserResolver);
exports.EditUserResolver = EditUserResolver;
//# sourceMappingURL=EditUserResolver.js.map