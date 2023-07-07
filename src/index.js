import express from 'express';
import cors from 'cors';
import { Queue } from "./process/queue";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

Queue.run(app);