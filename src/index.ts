import "./tracer";

import { createLogger, format, transports } from "winston";

import express from "express";
import crypto from "crypto";

const logger = createLogger({
  level: "info",
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({
      filename: `/home/ylyra/Documents/projects/ignite/datadog-test/logs/logz.log`,
    }),
  ],
});

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());

app.post("/users", (req, res) => {
  const { token } = req.headers;

  const { name, instagram } = req.body;

  if (!token) {
    return res.status(401).end();
  }

  if (!name || !instagram) {
    return res.status(500).json({ error: "Invalid parameters" });
  }

  const user = {
    id: crypto.randomBytes(16).toString("hex"),
    name,
    username: instagram,
  };

  return res.json(user);
});

app.listen(port, () => console.log(`Server is running on PORT ${port}`));
