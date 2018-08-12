const { db } = require('./database');

function getExtTempLast(req, res, next) {
  db.any('SELECT * FROM temp_ext ORDER BY datetime DESC LIMIT 1')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved last external temperature'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function setExtTemp(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('INSERT INTO temp_ext(temp) VALUES(${temp})', req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one temperature'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getExtTempLast: getExtTempLast,
  setExtTemp: setExtTemp
};

// function getSinglePuppy(req, res, next) {
//   var pupID = parseInt(req.params.id);
//   db.one('select * from pups where id = $1', pupID)
//     .then(function (data) {
//       res.status(200)
//         .json({
//           status: 'success',
//           data: data,
//           message: 'Retrieved ONE puppy'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }
//
// function updatePuppy(req, res, next) {
//   db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
//     [req.body.name, req.body.breed, parseInt(req.body.age),
//       req.body.sex, parseInt(req.params.id)])
//     .then(function () {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: 'Updated puppy'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }
//
// function removePuppy(req, res, next) {
//   var pupID = parseInt(req.params.id);
//   db.result('delete from pups where id = $1', pupID)
//     .then(function (result) {
//       /* jshint ignore:start */
//       res.status(200)
//         .json({
//           status: 'success',
//           message: `Removed ${result.rowCount} puppy`
//         });
//       /* jshint ignore:end */
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }
//
// module.exports = {
//   getExtTempLast: getExtTempLast,
//   getSinglePuppy: getSinglePuppy,
//   createPuppy: createPuppy,
//   updatePuppy: updatePuppy,
//   removePuppy: removePuppy
// };
