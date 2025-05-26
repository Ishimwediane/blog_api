import { NextFunction, Request, Response } from 'express';
import Blog from '../models/blog';

export const createBlog = async (req: any, res: Response) => {
  const { 
    title, 
    content 
  } = req.body;
  try {
    const blog = await Blog.create({ title, content, userId: req.user.id });
    res.status(201).json(blog);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.findAll({ include: ['User'] });
    res.json(blogs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
 
export const updateBlog = async (req: any, res: Response,next:NextFunction):Promise<void> => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const blog = await Blog.findByPk(id);
    if (!blog) {
    res.status(404).json({ error: 'Blog not found' });
    return;
    }

    if (req.user.role !== 'admin') {
    res.status(403).json({ error: 'Only admin can update blogs' });
    return;
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    await blog.save();

    res.json({ message: 'Blog updated', blog });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteBlog = async (req: any, res: Response,next:NextFunction) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByPk(id);
    if (!blog) {
    res.status(404).json({ error: 'Blog not found' });
    return;
    }

    if (req.user.role !== 'admin') {
    res.status(403).json({ error: 'Only admin can delete blogs' });
    return;
    }

    await blog.destroy();
    res.json({ message: 'Blog deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};



