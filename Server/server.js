const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const controller = require('./controllers')

// app.get('/',
//   (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/index.html'))
//   }
// )

app.post('/',
  controller.postScore,
  (req, res) => {
    return res.status(200).json('postScore')
  }
)

app.get('/stats',
  controller.statsPage,
  (req, res) => {
    return res.status(200).json('statsPage')
  }
)

// --------------- CATCH ALL FOR UNKNOWN ROUTES ----------------- //
app.use('*',(req,res) => res.sendStatus(404));


// ------------------- GLOBAL ERROR HANDLER --------------------- //
app.use((err,req,res,next) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { error: 'An error occurded' }
  };
  const errorObj = Object.assign(defaultError,err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});



app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})