
const controller = {};

controller.postScore = (req, res, next) => {
  try{
    console.log('hit postScore controller');
  } catch (err) {
    next({
      log: 'error in postScore controller',
      message: {error: err}
    })
  }
  next();
}

controller.statsPage = (req, res, next) => {
  try{
    console.log('hit statsPage controller')
  } catch (err) {
    next({
      log: 'error in statsPage controller',
      message: {error: err}
    })
  }
  next();
}


module.exports = controller;