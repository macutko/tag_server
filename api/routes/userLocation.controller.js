const express = require('express');
const router = express.Router();
const locationService = require('../../services/userLocation.service');
const chalk = require("chalk");
const l = require("../../utils/logging")
// routes
router.post('/create', createFirstPosition);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function createFirstPosition(req, res, next) {
    locationService.create(req.body, req.user.sub)
        .then(() => {
            res.status(201).json({message: "Location created successfully!", location: req.body});
            l.log(" 201 First location successfully!")
        })
        .catch(err => next(err));
}

function getById(req, res, next) {
    locationService.getById(req.params.id)
        .then(userLocation => userLocation ? res.json(userLocation) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    locationService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function _delete(req, res, next) {
    locationService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}