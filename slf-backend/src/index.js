"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import of the different libraries
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
// import of the different routes
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const coach_route_1 = __importDefault(require("./routes/coach.route"));
// environnement variables
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
// MongoDB 
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.error('❌ La variable d\'environnement MONGODB_URI est manquante');
    process.exit(1);
}
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => {
    console.log('🚀✅ Connecté à MongoDB');
})
    .catch((err) => {
    console.error('❌ Erreur de connexion à MongoDB', err);
    process.exit(1);
});
// Health Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erreur interne du serveur', error: err.message });
});
// Routes
app.use('/api/auth', auth_route_1.default);
app.use('/api/coaches', coach_route_1.default);
exports.default = app;
//# sourceMappingURL=index.js.map