import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    role: { type: String, default: 'member' },
    goals: [{ type: String }],
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    sport: { type: String, default: 'fitness' },
    members: [{ type: String }],
    captain: { type: String, default: '' },
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, default: 30 },
    distanceKm: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema(
  {
    userId: { type: String, required: true },
    displayName: { type: String, required: true },
    score: { type: Number, required: true },
    metric: { type: String, default: 'points' },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    durationMinutes: { type: Number, default: 30 },
    difficulty: { type: String, default: 'beginner' },
    focus: { type: String, default: 'full-body' },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || model('User', userSchema);
export const Team = mongoose.models.Team || model('Team', teamSchema);
export const Activity = mongoose.models.Activity || model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry || model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.models.Workout || model('Workout', workoutSchema);
