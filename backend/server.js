const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const dataFile = path.join(__dirname, 'data.json');
if (!fs.existsSync(dataFile)) {
  const initialData = {
    products: [
      { id: 1, name: "Managed IT Support", description: "Comprehensive IT support services including network management, helpdesk, and cybersecurity.", price: 499.99, imageUrl: "" },
      { id: 2, name: "Cloud Migration", description: "Seamless migration of your on-premise infrastructure to AWS, Azure, or Google Cloud.", price: 2500.00, imageUrl: "" },
      { id: 3, name: "Custom Software Development", description: "Tailored software solutions to streamline your business operations.", price: 5000.00, imageUrl: "" }
    ]
  };
  fs.writeFileSync(dataFile, JSON.stringify(initialData, null, 2));
}

function getProducts() {
  const data = fs.readFileSync(dataFile);
  return JSON.parse(data).products;
}

function saveProducts(products) {
  fs.writeFileSync(dataFile, JSON.stringify({ products }, null, 2));
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });

app.get('/api/products', (req, res) => {
  try {
    const products = getProducts();
    res.json({ message: "success", data: products });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/products', upload.single('image'), (req, res) => {
  const { name, description, price } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  
  try {
    const products = getProducts();
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = { id: newId, name, description, price: parseFloat(price), imageUrl };
    
    products.push(newProduct);
    saveProducts(products);
    
    res.json({ message: "success", data: newProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
