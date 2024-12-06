import { Request, Response } from 'express';
import Project from '../models/Project';

export const createProject = async (req: Request, res: Response): Promise<any> => {
    try {   
    const {name, description, status, createdAt} = req.body;

    if (!name )  {
        return res.status(400).json({
            message: 'Name is required'
        })
    }
    const newProject = new Project({name, description, status, createdAt});
    const savedProject = await newProject.save();
    res.status(201).json({
        message: 'Project created successfully',
        project: savedProject})
}
    catch (error: any) {
        console.log(error)
        return res.status(500).json({
            message: 'Error creating project',
            error: error.message
        })
}}

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({message: 'Erreur lors de l\'obtention du projet', error});
  }
};

export const getProjectById = async (req: Request, res: Response): Promise<any> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({message: 'Erreur lors de l\'obtention du projet via l\'ID', error});
  }
};

export const updateProject = async (req: Request, res: Response): Promise<any> => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProject) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({message: 'Erreur lors de la mise a jour du projet', error});
  }
};


/*
Cette fonction permet de supprimer un projet de la base de données en utilisant son ID.
Elle utilise Mongoose pour effectuer l'opération de suppression directement dans MongoDB.
La méthode gère également les cas où le projet n'est pas trouvé, ainsi que les erreurs possibles
lors de l'exécution de l'opération.
*/

export const deleteProject = async (req: Request, res: Response): Promise<any> => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({message: 'Erreur lors de la suppréssion du projet', error});
  }
};


export const completeProject = async (req: Request, res: Response): Promise<any> => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, { status: 'completed' }, { new: true });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({message: 'Erreur lors du marquage', error});
  }
};
