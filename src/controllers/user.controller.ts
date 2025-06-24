import { Request, Response } from "express";
import { UserModel } from "../models/user.model";

// Obtener todos los usuarios
export const getUsers = async (_req: Request, res: Response) => {
  const users = await UserModel.find();
  res.json(users);
};

// Crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "El nombre es obligatorio." });
  }
  if (typeof email !== "string" || email.trim() === "") {
    return res.status(400).json({ error: "El email es obligatorio." });
  }

  const newUser = new UserModel({ name: name.trim(), email: email.trim() });
  await newUser.save();

  res.status(201).json(newUser);
};

// Actualizar un usuario por ID
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Nombre y email son requeridos." });
  }

  const updated = await UserModel.findByIdAndUpdate(
    id,
    { name: name.trim(), email: email.trim() },
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ error: "Usuario no encontrado." });
  }

  res.json(updated);
};

// Eliminar un usuario por ID
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await UserModel.findByIdAndDelete(id);

  if (!deleted) {
    return res.status(404).json({ error: "Usuario no encontrado." });
  }

  res.json({ message: "Usuario eliminado correctamente." });
};

// Eliminar todos los usuarios
export const deleteAllUsers = async (_req: Request, res: Response) => {
  await UserModel.deleteMany({});
  res.json({ message: "Todos los usuarios han sido eliminados." });
};

// Eliminar múltiples usuarios
export const deleteMultipleUsers = async (req: Request, res: Response) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: "Debe enviar un arreglo de IDs." });
  }

  const result = await UserModel.deleteMany({ _id: { $in: ids } });
  res.json({ message: "Usuarios eliminados.", count: result.deletedCount });
};

// Crear múltiples usuarios
export const createMultipleUsers = async (req: Request, res: Response) => {
  const { users: newUsers } = req.body;

  if (!Array.isArray(newUsers) || newUsers.length === 0) {
    return res.status(400).json({ error: "Debe enviar un arreglo de usuarios." });
  }

  const validUsers = newUsers
    .filter(u => typeof u.name === 'string' && u.name.trim() !== '' &&
                 typeof u.email === 'string' && u.email.trim() !== '')
    .map(u => ({
      name: u.name.trim(),
      email: u.email.trim()
    }));

  if (validUsers.length === 0) {
    return res.status(400).json({ error: "No se proporcionaron usuarios válidos." });
  }

  const created = await UserModel.insertMany(validUsers);
  res.status(201).json(created);
};
