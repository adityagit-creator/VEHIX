import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import multer from "multer";
import morgan from "morgan";

const imageUpload = multer({
  dest: 'images',
});

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = "C:/HTML/Vehix-Project-main-2";
const dbURL = "http://localhost:3000";

app.use(express.static(path.join(__dirname, '/')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "userdata",
  password: "root",
  port: 5432,
});
db.connect();

const storage = multer.memoryStorage();
const upload = multer({ storage });

//User Registration
app.post('/api/register', async (req, res) => {
  const { userName, emailID, password } = req.body;
  try {
    await db.query(
      "INSERT INTO clientdata(username, emailid, password) VALUES ($1, $2, $3)",
      [userName, emailID, password]
    );
    res.status(200).send("User registered successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user");
  }
});

//User Login
app.post('/api/login', async (req, res) => {
  const { emailID, password } = req.body;
  try {
    const result = await db.query("SELECT password FROM clientdata WHERE emailid = $1", [emailID]);
    const truePassword = result.rows[0]?.password;
    if (password === truePassword) {
      res.status(200).send("Login verification success");
    } else {
      res.status(500).send("Incorrect email or password");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
})

//UPLOAD FILE TO DB
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
      const {fileData, personName,documentName, buffer, mimetype ,expiryDate} = req.file;
      // Save file info to your PostgreSQL database
      await pool.query('INSERT INTO files (fileData,personName,documentName,expiryDate,content, mime_type,) VALUES ($1, $2, $3, $4,$5)', [fileData,personName,documentName,expiryDate, buffer, mimetype,]);
      res.status(200).send('File uploaded successfully!');
  } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send('Error uploading file.');
  }
  const {fileData, personName, documentName, expiryDate} = req.body;
  console.log(req.body);
});
app.get('/files/:documentName', (req, res) => {
  const fileId = req.params.documentName;
})
app.delete('/files/:documentName', (req, res) => {
  const fileId = req.params.documentName;})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

