const express = require('express');
const router = express.Router();
import * as roomService from '../../services/room.service'
import {log} from "../../utils/logging";
// routes
router.post('/create', create);
router.get('/getAvailable', available);

module.exports = router;

function create(req, res, next) {
    roomService.create(req.body,req.user.sub).then((room) => {
        if(room){
            res.status(201).json(room);
            log(" 201 Room created successfully!")
        } else {
            res.status(400);
            log(room)
        }
    }).catch((err) => {
        log(err);
        next(err)
    });
}
function available(req, res, next) {
    roomService.getAvailable(req.query).then((rooms) => {
        if(rooms){
            res.status(200).json(rooms);
        } else {
            res.status(400);
            log(rooms)
        }
    }).catch((err) => {
        log(err);
        next(err)
    });
}