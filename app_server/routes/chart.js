/**
 * Created by g_fri on 2017-04-18.
 */
var express = require('express');
var router = express.Router();

var chartController = require('../controllers/chartController');

/*GET request for chart. NOTE This must come before route for id (i.e. display author)*/
router.get('/', chartController.chart_get);

/* POST request for creating Author. */
router.post('/create', chartController.chart_create_post);

// /* GET request to delete Author. */
// router.get('/author/:id/delete', chartController.chart_delete_get);
//
// // POST request to delete Author
// router.post('/author/:id/delete', chartController.chart_delete_post);
//
// /* GET request to update Author. */
// router.get('/author/:id/update', chartController.chart_update_get);
//
// // POST request to update Author
// router.post('/author/:id/update', chartController.chart_update_post);
//
// /* GET request for one Author. */
// router.get('/author/:id', chartController.chart_detail);
//
// /* GET request for list of all Authors. */
// router.get('/authors', chartController.author_list);

module.exports = router;
