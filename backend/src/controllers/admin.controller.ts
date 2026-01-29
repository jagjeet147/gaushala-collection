import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";
import Collector from "../models/Collector";
import Collection from "../models/Collection";

import { Request, Response } from "express";

export const adminLogin = async (req: Request, res: Response) => {
  const admin = await Admin.findOne({ username: req.body.username });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(req.body.password, admin.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET!);
  res.json({ token });
};

export const createCollector = async (req: Request, res: Response) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const collector = await Collector.create({ ...req.body, password: hashed });
  res.json(collector);
};

export const getAllCollections = async (_req: Request, res: Response) => {
  const data = await Collection.find()
    .populate("collector")
    .populate("donor");
  res.json(data);
};
