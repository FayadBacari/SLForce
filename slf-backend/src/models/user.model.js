"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const coachProfileSchema = new mongoose_1.default.Schema({
    avatar: { type: String },
    speciality: { type: String },
    location: { type: String },
    price: { type: Number },
    experience: { type: Number },
    description: { type: String },
    skills: [{ type: String }],
}, { _id: false });
const userSchema = new mongoose_1.default.Schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String },
    role: { type: String, enum: ['eleve', 'coach'], required: true },
    coachProfile: { type: coachProfileSchema, required: false },
    passwordHash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=user.model.js.map