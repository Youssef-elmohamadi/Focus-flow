// services/task.service.ts
import api from './axiosInstance';
import { Task, TaskSchema } from '../types/task';
import { z } from 'zod';

// Helper to parse API response with Zod
function parseTask(data: unknown): Task {
  return TaskSchema.parse(data);
}

export const taskService = {
  async getAll() {
    const response = await api.get('/Task');
    return z.array(TaskSchema).parse(response.data.data);
  },
  async getById(id: string) {
    const response = await api.get(`/Task/${id}`);
    return parseTask(response.data.data);
  },
  async create(payload: { title: string; body: string }) {
    const response = await api.post('/Task', { ...payload, isExcuted: false });
    return parseTask(response.data.data);
  },
  async update(id: string, payload: { title: string; body: string; isExecuted?: boolean }) {
    const response = await api.put(`/Task/${id}`, { title: payload.title, body: payload.body, isExcuted: payload.isExecuted });
    return parseTask(response.data.data);
  },
  async delete(id: string) {
    await api.delete(`/Task/${id}`);
    return true;
  },
  async execute(id: string) {
    await api.patch(`/Task/${id}/execute`);
    return true;
  },
};
