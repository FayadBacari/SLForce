"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = __importDefault(require("../models/user.model"));
const router = (0, express_1.Router)();
// GET /api/coaches
// Renvoie simplement tous les utilisateurs avec role = 'coach'
router.get('/', async (req, res) => {
    try {
        const coaches = await user_model_1.default.find({ role: 'coach' }).select('-__v');
        res.status(200).json({ coaches });
    }
    catch (error) {
        console.error('Erreur lors de la récupération des coachs:', error);
        res
            .status(500)
            .json({ message: 'Erreur lors de la récupération des coachs', error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=coach.route.js.map