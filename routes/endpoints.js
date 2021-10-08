const express = require('express');
const router = express.Router();
const connectDB = require('../config/db');
const config = require('config');
const validUrl = require('valid-url');
const shortid = require('shortid');
const baseUrl = config.get('baseUrl');

// @route  POST /api/encode
// @desc Create short URL
router.post('/encode', (req, res) => {

    const longUrl = req.body.longurl;

    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json({
            status: false,
            message: 'Invalid base url'
        });
    }

    // create url code
    const urlCode = shortid.generate();

    // validate long Url
    if (validUrl.isUri(longUrl)) {
        try {

            const shortUrl = baseUrl + '/' + urlCode;

            let encode_sql_query = config.get('encode_sql_query');

            connectDB.query(encode_sql_query, [longUrl, shortUrl, urlCode], function(error, result) {
                if (error) {
                    console.error(error);
                    res.status(500).json({
                        status: false,
                        message: config.get('anerror_msg') + error

                    });
                } else {
                    res.status(200).json({
                        status: true,
                        data: { "longurl": longUrl, "shorturl": shortUrl, "urlcode": urlCode }

                    })
                }
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: config.get('servererror_msg') });
        }

    } else {
        res.status(401).json({
            status: false,
            message: 'Invalid long or original url - ' + longUrl
        })
    }

});

// @route  POST /api/decode
router.post('/decode', (req, res) => {

    const shorturl = req.body.shorturl;

    // validate short url
    if (shorturl != undefined && validUrl.isUri(shorturl)) {

        try {

            let decode_sql_query_select = config.get('decode_sql_query');
            //console.log('sql stment ...' + sql);
            connectDB.query(decode_sql_query_select, [shorturl], function(error, result) {
                if (error) {
                    res.status(500).json({
                        status: false,
                        message: config.get('anerror_msg') + error
                    });
                } else {
                    // console.log('json result ...' + JSON.stringify(result));
                    if (result.length > 0) {
                        res.status(200).json({
                            status: true,
                            data: result[0].longurl
                        });
                    } else {
                        res.status(202).json({
                            status: false,
                            message: "short url does not exist"
                        });
                    }
                }
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: config.get('servererror_msg') });
        }

    } else {
        console.log("Invalid url");
        res.status(400).json({
            status: false,
            message: "Invalid url"
        });
    }

});

// @route  GET /api/list
router.get('/list', (req, res) => {

    try {

        let list_sql_query = config.get('list_sql_query');
        //console.error('sql stment ...' + sql);
        connectDB.query(list_sql_query, function(error, result) {
            if (error) {
                res.status(500).json({
                    status: false,
                    message: config.get('anerror_msg') + error
                });
            } else {

                if (result.length > 0) {
                    res.status(200).json(result);
                } else {
                    res.status(202).json({
                        status: false,
                        message: "no record"
                    });
                }
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: config.get('servererror_msg') });
    }

});

// @route  GET /api/statistic/{url_path}
router.get('/statistic/:url_path?', (req, res) => {

    const url_path = req.params.url_path;

    if (url_path != undefined) {

        try {

            let statistic_sql_query = config.get('statistic_sql_query');
            //console.log('sql stment ...' + sql);
            connectDB.query(statistic_sql_query, [url_path], function(error, result) {
                if (error) {
                    res.status(500).json({
                        status: false,
                        message: config.get('anerror_msg') + error
                    });
                } else {

                    if (result.length > 0) {
                        res.status(202).json({
                            status: true,
                            data: result
                        });
                    } else {
                        res.status(202).json({
                            status: false,
                            message: "no record found"
                        });
                    }
                }
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: config.get('servererror_msg') });
        }

    } else {
        //console.log("Invalid url path");
        res.status(400).json({
            status: false,
            message: "Invalid url path"
        });
    }

});

// @route  GET /api/search/{url_path}
router.post('/search', (req, res) => {

    const txt = req.body.text;

    if (txt != undefined) {

        try {

            //let links_search_select_query = config.get('links_search_select_query');

            connectDB.query("SELECT * from links where longurl" + " like '%" + txt + "%'", function(error, result) {
                if (error) {
                    res.status(500).json({
                        status: false,
                        message: config.get('anerror_msg') + error
                    });
                } else {
                    if (result.length > 0) {
                        res.status(200).json(result);
                    } else {
                        res.status(202).json({
                            status: false,
                            message: "no record found"
                        });
                    }
                }
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: config.get('servererror_msg') });
        }

    } else {
        console.log("Invalid url path");
        res.status(400).json({
            status: false,
            message: "Invalid url path"
        });
    }

});
//links_search_select_query
module.exports = router;