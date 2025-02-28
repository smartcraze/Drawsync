import express from "express";
import db from "@repo/db";

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
