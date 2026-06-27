import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const router = Router();

const createResourceRoutes = (resourceName: string, model: any) => {
  router.get(`/api/${resourceName}/`, async (_req, res) => {
    try {
      const items = await model.find({});
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  router.post(`/api/${resourceName}/`, async (req, res) => {
    try {
      const item = await model.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  router.get(`/api/${resourceName}/:id`, async (req, res) => {
    try {
      const item = await model.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: `${resourceName} not found` });
      }
      return res.json(item);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  });

  router.put(`/api/${resourceName}/:id`, async (req, res) => {
    try {
      const item = await model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!item) {
        return res.status(404).json({ error: `${resourceName} not found` });
      }
      return res.json(item);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  });

  router.delete(`/api/${resourceName}/:id`, async (req, res) => {
    try {
      const item = await model.findByIdAndDelete(req.params.id);
      if (!item) {
        return res.status(404).json({ error: `${resourceName} not found` });
      }
      return res.json({ message: `${resourceName} deleted` });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  });
};

createResourceRoutes('users', User);
createResourceRoutes('teams', Team);
createResourceRoutes('activities', Activity);
createResourceRoutes('leaderboard', LeaderboardEntry);
createResourceRoutes('workouts', Workout);

export default router;
