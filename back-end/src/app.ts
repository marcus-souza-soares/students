import express, { json, Request, Response } from "express";
import cors from "cors";
import prisma from "./database.js";

//comentario 1
//comentando mais algo
//comentando de novo

const app = express();
app.use(cors());
app.use(json());

app.get("/students", async (req: Request, res: Response) => {
  const students = await prisma.student.findMany();
  res.send(students);
});

app.get("/students/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const student = await prisma.student.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.send(student);
});

app.post("/students", async (req: Request, res: Response) => {
  const { students } = req.body;
  await prisma.student.createMany({
    data: students,
    skipDuplicates: true,
  });

  res.sendStatus(201); // created
});

app.get("/students/random", async (req: Request, res: Response) => {
  const students = await prisma.student.findMany();
  if (students.length > 0) {
    const randomStudent = students[Math.floor(Math.random() * students.length)];
    res.send(randomStudent);
  } else {
    res.send(null);
  }
});

export default app;
