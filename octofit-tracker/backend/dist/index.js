"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
app.set('trust proxy', true);
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', baseUrl });
});
app.get('/api', (_req, res) => {
    res.json({ message: 'OctoFit Tracker API is ready.', baseUrl });
});
mongoose_1.default
    .connect(mongoUri)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
        console.log(`Base URL: ${baseUrl}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
});
