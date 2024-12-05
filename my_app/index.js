import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";

const __dirname = path.resolve();

const app = express();

// file path
const filePath = path.join(__dirname, "data", "writing.json");

// body parser set
app.use(bodyParser.urlencoded({ extended: false })); // express 기본 모듈 사용
app.use(bodyParser.json());

// view engine set
app.set("view engine", "html"); // main.html -> main(.html)

// nunjucks
nunjucks.configure("views", {
  watch: true, // html 파일이 수정될 경우, 다시 반영 후 렌더링
  express: app
});

// mongoose connect
// 초기 연결 성공 메시지
mongoose;
mongoose
  .connect("mongodb://test_user:test_password@localhost:27018/test")
  .then(() => console.log("DB 연결 성공"))
  .catch((e) => console.error(e));

// 연결 성공 및 오류 이벤트 처리
mongoose.connection.on("connected", () => {
  console.log("MongoDB에 연결되었습니다.");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB 연결 오류:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB와의 연결이 끊어졌습니다.");
});

// 애플리케이션 종료 시 연결 닫기
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB와의 연결이 종료되었습니다.");
  process.exit(0);
});

// mongoose set
const { Schema } = mongoose;

const WritingSchema = new Schema({
  title: String,
  contents: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const Writing = mongoose.model("Writing", WritingSchema);

// middleware
// main page GET
app.get("/", async (req, res) => {
  // const fileData = fs.readFileSync(filePath);
  // const writings = JSON.parse(fileData);

  let writings = await Writing.find({});

  res.render("main", { list: writings });
});

app.get("/write", (req, res) => {
  res.render("write");
});

app.post("/write", async (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;

  // mongodb에 저장
  try {
    const result = await Writing.create({
      title: title,
      contents: contents
    });

    console.log("success");
    res.render("detail", {
      detail: { title: title, contents: contents }
    });
  } catch (err) {
    console.error(err);
    res.render("write");
  }
});

app.get("/detail/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const detail = await Writing.findOne({ _id: id });
    res.render("detail", { detail });
  } catch (err) {
    console.error(err);
  }
});

app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const edit = await Writing.findOne({ _id: id });
    res.render("detail", { edit });
  } catch (err) {
    console.error(err);
  }
});

app.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const contents = req.body.contents;

  try {
    const edit = await Writing.replaceOne(
      { _id: id },
      { title: title, contents: contents }
    );

    console.log("update success");
    res.render("detail", {
      detail: { id: id, title: title, contents: contents }
    });
  } catch (err) {
    console.error(err);
  }
});

app.post("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const delete_content = await Writing.deleteOne({ _id: id });

    console.log("delete success");
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

app.listen(3000, () => {
  console.log("Server is running");
});
