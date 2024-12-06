import { Request, Response } from 'express';
import Task from '../models/Task';

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({message: 'Erreur lors de la création de la tâche', error});
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.query;
    const filter = projectId ? { projectId } : {};
    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({message: 'Erreur lors de la récupération des tâches', error});
  }
};

export const getTaskById = async (req: Request, res: Response): Promise<any> => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({message: 'Erreur lors de la récupération des tâches par ID', error});
  }
};

export const updateTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({message: 'Erreur lors de la mise à jour des tâches', error});
  }
};

/*
Cette fonction permet de supprimer une tâche spécifique de la base de données en utilisant son ID.
Elle utilise Mongoose pour effectuer l'opération de suppression directement dans MongoDB.
La méthode gère les cas où la tâche n'est pas trouvée ainsi que les erreurs potentielles
lors de l'exécution de l'opération.
*/

export const deleteTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({message: 'Erreur lors de la suppression des tâches', error});
  }
};

export const markTaskDone = async (req: Request, res: Response): Promise<any> => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { done: true }, { new: true });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({message: 'Erreur lors du marquage des tâches', error});
  }
};
