import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Collector from "../models/Collector";
import Donor from "../models/Donor";
import Collection from "../models/Collection";
import dayjs from "dayjs";

import { Request, Response } from "express";

export const collectorLogin = async (req: Request, res: Response) => {
  const collector = await Collector.findOne({ loginId: req.body.loginId });
  if (!collector) return res.status(401).json({ message: "Invalid login" });

  const match = await bcrypt.compare(req.body.password, collector.password!);
  if (!match) return res.status(401).json({ message: "Invalid login" });

  const token = jwt.sign(
    { id: collector._id, role: "collector" },
    process.env.JWT_SECRET!
  );

  res.json({ token });
};

export const addDonor = async (req: Request, res: Response) => {
  const donor = await Donor.create({
    ...req.body,
    createdBy: (req as any).user.id,
  });
  res.json(donor);
};

export const collectMoney = async (req: Request, res: Response) => {
  const now = dayjs();

  const entry = await Collection.create({
    donor: req.body.donorId,
    collector: (req as any).user.id,
    amount: req.body.amount,
    date: now.format("DD-MM-YYYY"),
    time: now.format("HH:mm"),
  });

  // 🔔 WhatsApp trigger (later integration)
  console.log("📲 WhatsApp sent to donor");

  res.json(entry);
};
