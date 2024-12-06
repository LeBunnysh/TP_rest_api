import express from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  completeProject,
} from '../controllers/projectcontroller';

const router = express.Router();

router.post('/project', createProject);
router.get('/project', getAllProjects);
router.get('/project/:id', getProjectById);
router.put('/project/:id', updateProject);
router.delete('/:id', deleteProject);
router.post('/project/:id/complete', completeProject);

export default router;
