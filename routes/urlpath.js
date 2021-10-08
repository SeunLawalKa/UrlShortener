const express = require('express');
const router = express.Router();
const config = require('config');
const connectDB = require('../config/db');

// @route  GET /{url_path}
router.get('/:url_path?', (req, res) => {

    const urlcode = req.params.url_path;

    if (urlcode != undefined) {

        try {

            let url_path_select_query = config.get('url_path_select_query');

            connectDB.query(url_path_select_query, [urlcode], function(error, result) {
                if (error) {
                    res.status(500).json({
                        status: false,
                        message: config.get('anerror_msg') + error
                    });
                } else {
                    if (result.length > 0) {

                        let count = result[0].count + 1;

                        let url_path_update_query = config.get('url_path_update_query');

                        connectDB.query(url_path_update_query, [count, result[0].id], function(error, result2) {
                            if (error) {
                                res.status(500).json({
                                    status: false,
                                    message: config.get('anerror_msg') + error
                                });

                            } else {
                                res.redirect(result[0].longurl);
                            }
                        })
                    } else {
                        res.status(202).json({
                            status: false,
                            message: config.get('urlpathnotexist_msg')

                        })
                    }
                }
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: false,
                message: config.get('servererror_msg')
            });
        }

    } else {
        res.status(400).json({
            status: false,
            message: config.get('invalidurlpath_msg')
        });
    }

});

module.exports = router;