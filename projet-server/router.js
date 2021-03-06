const express = require('express')
const router = express.Router()
const db = require('./database.js')

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

router.get('/', (req, res, next) => {
  res.send('API endpoint')
})

router.get('/randomthemes/:count', (req, res, next) => {
  db.getRandomCategories(req.params.count).then((val) => {
    let tmp = {
      'themes': val
    }
    res.send(tmp)
  })
})

router.get('/randomquestions/:theme/:count', (req, res, next) => {
  db.getRandomQuestions(req.params.theme, req.params.count).then((val) => {
    let tmp = {
      'questions': val
    }
    res.send(tmp)
  })
})

router.get('/scores/:count', (req, res, next) => {
  db.getBestScores(req.params.count).then((val) => {
    let tmp = {
      'scores': val
    }
    res.send(tmp)
  })
})

router.post('/scores/:name/:theme/:score/:count', (req, res, next) => {
  db.addScore(req.params.name, req.params.theme, req.params.score, req.params.count).then((val) => {
    let tmp = {
      'scores': val
    }
    res.send(tmp)
  })
})

module.exports = router
