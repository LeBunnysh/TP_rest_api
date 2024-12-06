import express from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  markTaskDone,
} from '../controllers/taskcontroller';

const router = express.Router();

router.post('/task', createTask);
router.get('/task', getAllTasks);
router.get('/task/:id', getTaskById);
router.put('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);
router.post('/task/:id/mark-done', markTaskDone);

export default router;

