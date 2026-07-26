// hooks/useTasks.ts
import { useState, useCallback, useEffect } from 'react';
import { taskService } from '../services/task.service';
import { Task } from '../types/task';

type Filter = 'all' | 'active' | 'done';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getAll();
      setTasks(data);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const refresh = fetchTasks;

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !t.isExecuted;
    if (filter === 'done') return t.isExecuted;
    return true;
  });

  const counts = {
    total: tasks.length,
    completed: tasks.filter((t) => t.isExecuted).length,
  };

  const create = async (payload: { title: string; body: string }) => {
    const optimistic: Task = {
      id: crypto.randomUUID(),
      title: payload.title,
      body: payload.body,
      isExecuted: false,
      createdAt: new Date().toISOString(),
    } as Task;
    setTasks((prev) => [optimistic, ...prev]);
    try {
      const created = await taskService.create(payload);
      setTasks((prev) => prev.map((t) => (t.id === optimistic.id ? created : t)));
    } catch (e: any) {
      setTasks((prev) => prev.filter((t) => t.id !== optimistic.id));
      setError(e?.message ?? 'Create failed');
    }
  };

  const update = async (id: string, payload: { title: string; body: string }) => {
    const original = tasks.find((t) => t.id === id);
    if (!original) return;
    const optimistic = { ...original, ...payload };
    setTasks((prev) => prev.map((t) => (t.id === id ? optimistic : t)));
    try {
      const updated = await taskService.update(id, { ...payload, isExecuted: original.isExecuted });
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e: any) {
      setTasks((prev) => prev.map((t) => (t.id === id ? original : t)));
      setError(e?.message ?? 'Update failed');
    }
  };

  const remove = async (id: string) => {
    const original = tasks;
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await taskService.delete(id);
    } catch (e: any) {
      setTasks(original);
      setError(e?.message ?? 'Delete failed');
    }
  };

  const toggleExecuted = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const optimistic = { ...task, isExecuted: !task.isExecuted };
    setTasks((prev) => prev.map((t) => (t.id === id ? optimistic : t)));
    try {
      await taskService.execute(id);
    } catch (e: any) {
      setTasks((prev) => prev.map((t) => (t.id === id ? task : t)));
      setError(e?.message ?? 'Mark executed failed');
    }
  };

  return {
    tasks: filteredTasks,
    loading,
    error,
    filter,
    setFilter,
    refresh,
    create,
    update,
    remove,
    toggleExecuted,
    counts,
  };
};
