import express from 'express';
import * as bodyParser from 'body-parser';
import * as R from 'ramda';
import {
    seq,
    show,
    deleter,
    create,
    update
} from './models'

var jsonParser = bodyParser.json()

// utility
function clean(args) {
    var f = (val, key) => !(R.isNil(val))
    return R.pickBy(f, args)
}

var app = express();

app.get('/', (req, res) => show()
    .then(results => res.json(results))
    .catch(() => res.sendStatus(500)))

app.delete('/:id', jsonParser, (req, res) => {
    deleter(req.params.id)
        .then(result => {
            if (result > 0) return res.sendStatus(200)
            throw "ERROR"
        })
        .catch(() => res.sendStatus(500))
})

app.post('/', jsonParser, (req, res) => {
    var body = req.body;
    if (!(body && body.name && body.rank)) return res.sendStatus(400)
    create(body.name, body.rank)
        .then(results => res.sendStatus(200))
        .catch(results => res.sendStatus(304))
})

app.put('/', jsonParser, (req, res) => {
    var body = req.body;
    if (!(body && body.id && (body.name || body.rank))) return res.sendStatus(400)
    update(body.id, body.name, body.rank)
        .then(result => {
            var status = (result[0] > 0) ? 200 : 304;
            res.sendStatus(status)
        })
        .catch(error => res.sendStatus(500))
})

seq.authenticate()
    .then(() => app.listen(4500))
