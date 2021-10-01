require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./config/db.config')();

const app = express();

const API_VERSION = 1;
const basePath = `/api/v${API_VERSION}`

app.use(express.json());
// Não esquecer de criar variável de ambiente com o endereço do seu app React (local ou deployado no Netlify)
app.use(cors({ origin: process.env.REACT_APP_URL }));

//Redirecionando as requisições para os roteadores

// Adding userRouter
const userRouter = require('./routes/user.routes');
app.use(basePath, userRouter);

// Adding adRouter
const adRouter = require('./routes/ad.routes');
app.use(basePath, adRouter);

//Adding reviewRouter
const reviewRouter = require('./routes/review.routes');
app.use(basePath, reviewRouter);


//Adding petRouter
const petRouter = require("./routes/pet.routes");
app.use(basePath, petRouter);


app.use((err, req, res, next) => {
    if (err) {
      console.error(err);
      return res.status(err.status || 500).json({
        msg: "Erro interno no servidor.",
        err: err,
      });
    }
  
    return next();
  });

app.listen(Number(process.env.PORT), () =>
    console.log(`Server up and running at port ${process.env.PORT}`)
);

