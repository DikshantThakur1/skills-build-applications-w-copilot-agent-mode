"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("./models");
const router = (0, express_1.Router)();
const createResourceRoutes = (resourceName, model) => {
    router.get(`/api/${resourceName}/`, async (_req, res) => {
        try {
            const items = await model.find({});
            res.json(items);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    router.post(`/api/${resourceName}/`, async (req, res) => {
        try {
            const item = await model.create(req.body);
            res.status(201).json(item);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
    router.get(`/api/${resourceName}/:id`, async (req, res) => {
        try {
            const item = await model.findById(req.params.id);
            if (!item) {
                return res.status(404).json({ error: `${resourceName} not found` });
            }
            return res.json(item);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
    router.put(`/api/${resourceName}/:id`, async (req, res) => {
        try {
            const item = await model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!item) {
                return res.status(404).json({ error: `${resourceName} not found` });
            }
            return res.json(item);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
    router.delete(`/api/${resourceName}/:id`, async (req, res) => {
        try {
            const item = await model.findByIdAndDelete(req.params.id);
            if (!item) {
                return res.status(404).json({ error: `${resourceName} not found` });
            }
            return res.json({ message: `${resourceName} deleted` });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
};
createResourceRoutes('users', models_1.User);
createResourceRoutes('teams', models_1.Team);
createResourceRoutes('activities', models_1.Activity);
createResourceRoutes('leaderboard', models_1.LeaderboardEntry);
createResourceRoutes('workouts', models_1.Workout);
exports.default = router;
