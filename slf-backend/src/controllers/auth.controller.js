"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';
const registerUser = async (req, res) => {
    const { email, password, role, firstName, lastName, coachProfile } = req.body;
    if (!email || !password || !role) {
        return res.status(400).json({ message: 'Email, mot de passe et rôle sont obligatoires' });
    }
    try {
        const existingUser = await user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Un utilisateur avec cet email existe déjà' });
        }
        const passwordHash = await bcrypt_1.default.hash(password, 10);
        const displayName = `${firstName || ''} ${lastName || ''}`.trim() || email;
        const newUser = await user_model_1.default.create({
            uid: email,
            email,
            displayName,
            role,
            coachProfile: role === 'coach' ? coachProfile : undefined,
            passwordHash,
        });
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id.toString(), uid: newUser.uid, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });
        console.log(`✅ Nouvel utilisateur inscrit : ${newUser.email}`);
        res.status(201).json({ user: newUser, token });
    }
    catch (error) {
        res.status(500).json({ message: "Erreur lors de l’inscription", error: error.message });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe sont obligatoires' });
    }
    try {
        const user = await user_model_1.default.findOne({ email });
        if (!user || !user.passwordHash) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }
        const isValid = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!isValid) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id.toString(), uid: user.uid, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        console.log(`✅ Connexion réussie pour : ${user.email}`);
        res.status(200).json({ user, token });
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=auth.controller.js.map