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
exports.AwardResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const User_1 = require("../../entity/User");
let NewAwardInput = class NewAwardInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], NewAwardInput.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewAwardInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], NewAwardInput.prototype, "points", void 0);
NewAwardInput = __decorate([
    type_graphql_1.InputType()
], NewAwardInput);
let AwardResolver = class AwardResolver extends typeorm_1.BaseEntity {
    new_award(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id: input.id } });
            if (user) {
                const awards = user.awards;
                awards.push(input.title);
                yield User_1.User.update({
                    id: input.id
                }, {
                    points: user.points + input.points,
                    awards
                });
                let new_user = yield User_1.User.findOne({ where: { id: input.id } });
                console.log(new_user === null || new_user === void 0 ? void 0 : new_user.awards);
                return new_user === null || new_user === void 0 ? void 0 : new_user.points;
            }
            else {
                return null;
            }
        });
    }
    awards(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id } });
            if (user) {
                return user.awards;
            }
            else {
                return null;
            }
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => type_graphql_1.Int, { nullable: true }),
    __param(0, type_graphql_1.Arg("input", () => NewAwardInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewAwardInput]),
    __metadata("design:returntype", Promise)
], AwardResolver.prototype, "new_award", null);
__decorate([
    type_graphql_1.Query(() => [String], { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AwardResolver.prototype, "awards", null);
AwardResolver = __decorate([
    type_graphql_1.Resolver()
], AwardResolver);
exports.AwardResolver = AwardResolver;
//# sourceMappingURL=AwardResolver.js.map