"use strict";

const express = require("express");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const sequelize = require("./src/app/database/conexion");
const cors = require("cors");
const port = process.env.PORT || 4000;
const versionapi = process.env.VERSION || "1.0.0";

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.json());


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Retail Core API',
      version: `${versionapi}`,
      description: 'Documentation core of API',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  
  apis: ['./src/app/router/*.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", require("./src/app/router/index"));
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is healthy" });
});

async function main() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfuly");
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  } catch (error) {
    console.log(`Unable to connect to the database ${error}`);
    process.exit(1);
  }
}
main();