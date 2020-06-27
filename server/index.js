const express = require("express");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

const DB_PATH = path.join(__dirname, "./products.json");

const myReadFile = (path) => {
  return new Promise((res, rej) => {
    fs.readFile(path, (er, data) => {
      if (er) rej(er);
      else res(JSON.parse(data.toString()));
    });
  });
};

const myWriteFile = (path, data) => {
  return new Promise((res, rej) => {
    fs.writeFile(path, JSON.stringify(data), (er) => {
      if (er) rej(er);
      else res();
    });
  });
};

app.use((req, res, next) => {
  console.log(chalk.cyan(`Request made to ${req.path}`));

  next();
});

app.use(express.json());

app.use((req, res, next) => {
  myReadFile(DB_PATH).then((data) => {
    req.products = data;
    next();
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.get("/api/products", (req, res) => {
  res.send({
    products: req.products,
  });
});

app.get("/api/products/:name", (req, res) => {
  const { name } = req.params;

  res.send({
    selectedProduct: req.products[name]
      ? {
          name: name,
          ...req.products[name],
        }
      : null,
  });
});

app.post("/api/products/:name", (req, res) => {
  const { name } = req.params;
  const { type, price } = req.body;
  console.log("req.body: ", req.body);

  if (req.products[name]) {
    res.status(400).send({
      message: `Product ${name} already exists.`,
    });
  } else if (typeof type !== "string" || typeof price !== "number") {
    res.status(400).send({
      message:
        'Body of request must contain a "type" of type "string" and a "price" of type "number"',
    });
  } else {
    const newProduct = {
      ...req.products,
      [name]: {
        type,
        price,
      },
    };

    myWriteFile(DB_PATH, newProduct).then(() => {
      res.status(201).send({
        message: `Product ${name} added as a new Product!`,
      });
    });
  }
});

app.delete("/api/products/:name", (req, res) => {
  const { name } = req.params;

  if (!req.products[name]) {
    res.status(400).send({
      message: `Product ${name} does not exist in product offerings`,
    });
  } else {
    delete req.products[name];

    myWriteFile(DB_PATH, req.products).then(() => {
      res.status(204).send({
        message: `Product ${name} removed from product offerings`,
      });
    });
  }
});

app.use((req, res, next) => {
  console.log("Got to Not Found Middleware!");
  res.status(404).send({
    message: `Webpage not found at ${req.path}`,
  });
});

app.use((err, req, res, next) => {
  console.log("Hit error middleware");

  res.send({
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(chalk.green(`Server is now listening on PORT:${PORT}`));
});
