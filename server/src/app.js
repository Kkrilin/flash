import express from "express";

const app = express();
const port = 3000;
app.use("/", (req, res) => {
  res.status(200).json({ success: 1 });
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
