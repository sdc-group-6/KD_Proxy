require('newrelic');
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  'allowedHeaders': ['Content-Type', 'Origin', 'Accept'],
  'origin': true,
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(express.static(path.join(__dirname, '../public')));

// app.use('/shoes',
//   proxy({
//     target: "http://127.0.0.1:8001",
//     changeOrigin: true
//   })
// );

// app.use('/shoes/:shoeId',
//   proxy({
//     target: "http://127.0.0.1:8001",
//     changeOrigin: true
//   })
// );

// app.use('/looks/:id',
//   proxy({
//     target: "http://127.0.0.1:8001",
//     changeOrigin: true
//   })
// );

// app.use('/shares/:id',
//   proxy({
//     target: "http://127.0.0.1:8001",
//     changeOrigin: true
//   })
// );

// app.use('/products/:model',
//   proxy({
//     target: "http://127.0.0.1:8002",
//     changeOrigin: true
//   })
// );

// app.use('/images/:imageId',
//   proxy({
//     target: "http://127.0.0.1:8002",
//     changeOrigin: true
//   })
// );

app.use('/reviews/:id',cors(),
  proxy({
    target: "http://ec2-54-67-95-154.us-west-1.compute.amazonaws.com:8003",
    changeOrigin: true
  })
);

// app.use('/postreview/:id',cors(),
//   proxy({
//     target: "http://127.0.0.1:8003",
//     changeOrigin: true
//   })
// );

app.get('/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
})

app.listen(port, () => {
  console.log(`Listening on server: https://localhost:${port}`);
});
