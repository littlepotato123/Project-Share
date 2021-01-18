"use strict";
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
exports.user_info = exports.FBAuth = exports.remove = void 0;
const User_1 = require("../entity/User");
const remove = (arr, str) => {
    const i = arr.indexOf(str);
    const new_arr = arr.splice(i, i - 1);
    return new_arr;
};
exports.remove = remove;
const FBAuth = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = User_1.User.findOne({ where: { password: token } });
    return user;
});
exports.FBAuth = FBAuth;
const user_info = (handle) => __awaiter(void 0, void 0, void 0, function* () {
    const user = User_1.User.findOne({ where: { handle } });
    return user;
});
exports.user_info = user_info;
//# sourceMappingURL=Tools.js.map