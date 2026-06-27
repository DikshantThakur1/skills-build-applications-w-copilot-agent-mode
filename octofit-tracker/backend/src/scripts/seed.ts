import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

// Seed the octofit_db database with test data
async function seed() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB for seeding');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      name: 'Maya Chen',
      email: 'maya@example.com',
      role: 'captain',
      goals: ['Run a half marathon', 'Improve mobility'],
    },
    {
      name: 'Jordan Alvarez',
      email: 'jordan@example.com',
      role: 'member',
      goals: ['Complete 3 strength sessions'],
    },
    {
      name: 'Riley Singh',
      email: 'riley@example.com',
      role: 'member',
      goals: ['Increase daily steps'],
    },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Night Owls',
      sport: 'running',
      members: users.slice(0, 2).map((user) => user.name),
      captain: users[0].name,
    },
    {
      name: 'Momentum Crew',
      sport: 'strength',
      members: [users[2].name],
      captain: users[2].name,
    },
  ]);

  const activities = await Activity.insertMany([
    {
      userId: users[0]._id.toString(),
      type: 'run',
      durationMinutes: 42,
      distanceKm: 7.8,
      calories: 480,
      date: new Date('2026-06-25T06:30:00Z'),
    },
    {
      userId: users[1]._id.toString(),
      type: 'strength',
      durationMinutes: 55,
      distanceKm: 0,
      calories: 390,
      date: new Date('2026-06-26T18:00:00Z'),
    },
    {
      userId: users[2]._id.toString(),
      type: 'walk',
      durationMinutes: 35,
      distanceKm: 4.2,
      calories: 180,
      date: new Date('2026-06-27T07:15:00Z'),
    },
  ]);

  await LeaderboardEntry.insertMany([
    {
      userId: users[0]._id.toString(),
      displayName: users[0].name,
      score: 1280,
      metric: 'points',
    },
    {
      userId: users[1]._id.toString(),
      displayName: users[1].name,
      score: 1120,
      metric: 'points',
    },
    {
      userId: users[2]._id.toString(),
      displayName: users[2].name,
      score: 960,
      metric: 'points',
    },
  ]);

  await Workout.insertMany([
    {
      title: 'Tempo Run',
      description: 'A fast-paced run focused on endurance and pacing.',
      durationMinutes: 35,
      difficulty: 'intermediate',
      focus: 'cardio',
    },
    {
      title: 'Core Blast',
      description: 'A high-energy core session to build stability.',
      durationMinutes: 20,
      difficulty: 'beginner',
      focus: 'core',
    },
    {
      title: 'Recovery Flow',
      description: 'Gentle mobility and stretching for active recovery.',
      durationMinutes: 25,
      difficulty: 'beginner',
      focus: 'mobility',
    },
  ]);

  console.log('Seeded users, teams, activities, leaderboard, and workouts');
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
