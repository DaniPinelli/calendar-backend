const { response } = require('express')


const getEvents = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'get events'
    })
}

const createEvent = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'create events'
    })
}

const updateEvent = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'update events'
    })
}

const deleteEvent = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'delete events'
    })
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}




