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
exports.UserPageResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const User_1 = require("../../entity/User");
const Tools_1 = require("../Tools");
let UserSupportingInput = class UserSupportingInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], UserSupportingInput.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserSupportingInput.prototype, "token", void 0);
UserSupportingInput = __decorate([
    type_graphql_1.InputType()
], UserSupportingInput);
let AddMessageInput = class AddMessageInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddMessageInput.prototype, "body", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], AddMessageInput.prototype, "userId", void 0);
AddMessageInput = __decorate([
    type_graphql_1.InputType()
], AddMessageInput);
;
let UserPageResolver = class UserPageResolver extends typeorm_1.BaseEntity {
    add_message(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id: input.userId } });
            if (user) {
                const messages = user.messages;
                messages.push(input.body);
                yield User_1.User.update({
                    id: input.userId
                }, {
                    messages
                });
                return input.body;
            }
            else {
                return null;
            }
        });
    }
    all_messages(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id } });
            if (user) {
                return user.messages;
            }
            else {
                return null;
            }
        });
    }
    support(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const main = yield User_1.User.findOne({ where: { id: input.id } });
            const second = yield User_1.User.findOne({ where: { password: input.token } });
            if (main && second) {
                let supported = main.supported;
                let supporting = second.supporting;
                if (supported.includes(second.password) && supporting.includes(main.password)) {
                    return null;
                }
                supported.push(input.token);
                supporting.push(main.password);
                yield User_1.User.update({
                    id: input.id
                }, {
                    supporters: main.supporters + 1,
                    supported
                });
                yield User_1.User.update({
                    id: second.id
                }, {
                    supporting
                });
                const user = yield User_1.User.findOne({ where: { id: main.id } });
                if (user) {
                    return user.supporters;
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
    unsupport(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const main = yield User_1.User.findOne({ where: { id: input.id } });
            const second = yield User_1.User.findOne({ where: { password: input.token } });
            if (main && second) {
                let supported = main.supported;
                let supporting = second.supporting;
                if (supported.includes(second.password) && supporting.includes(main.password)) {
                    supported = Tools_1.remove(supported, input.token);
                    supporting = Tools_1.remove(supporting, main.password);
                    yield User_1.User.update({
                        id: input.id
                    }, {
                        supporters: main.supporters - 1,
                        supported
                    });
                    yield User_1.User.update({
                        id: second.id
                    }, {
                        supporting
                    });
                    const user = yield User_1.User.findOne({ where: { id: main.id } });
                    if (user) {
                        return user.supporters;
                    }
                    else {
                        return null;
                    }
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
    leaderboard() {
        return __awaiter(this, void 0, void 0, function* () {
            let init = (yield User_1.User.find()).sort((a, b) => (a.supporters < b.supporters) ? 1 : -1);
            for (let i = 0; i < 3; i++) {
                const current = init[i];
                const next = init[i + 1];
                if (current && next) {
                    const curr_sup = current.supporters;
                    const next_sup = next.supporters;
                    const range = curr_sup / 10;
                    if (curr_sup - next_sup > range) {
                        continue;
                    }
                    else {
                        if (next.points > current.points) {
                            init[i + 1] = current;
                            init[i] = next;
                        }
                        if (next.awards.length >= current.awards.length) {
                            init[i + 1] = current;
                            init[i] = next;
                        }
                        else {
                            init[i] = current;
                            init[i + 1] = next;
                        }
                    }
                }
                else {
                    break;
                }
            }
            ;
            return init;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => String, { nullable: true }),
    __param(0, type_graphql_1.Arg("input", () => AddMessageInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddMessageInput]),
    __metadata("design:returntype", Promise)
], UserPageResolver.prototype, "add_message", null);
__decorate([
    type_graphql_1.Query(() => [String], { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserPageResolver.prototype, "all_messages", null);
__decorate([
    type_graphql_1.Mutation(() => type_graphql_1.Int, { nullable: true }),
    __param(0, type_graphql_1.Arg("input", () => UserSupportingInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserSupportingInput]),
    __metadata("design:returntype", Promise)
], UserPageResolver.prototype, "support", null);
__decorate([
    type_graphql_1.Mutation(() => type_graphql_1.Int, { nullable: true }),
    __param(0, type_graphql_1.Arg("input", () => UserSupportingInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserSupportingInput]),
    __metadata("design:returntype", Promise)
], UserPageResolver.prototype, "unsupport", null);
__decorate([
    type_graphql_1.Query(() => [User_1.User], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserPageResolver.prototype, "leaderboard", null);
UserPageResolver = __decorate([
    type_graphql_1.Resolver()
], UserPageResolver);
exports.UserPageResolver = UserPageResolver;
//# sourceMappingURL=UserPageResolvers.js.map