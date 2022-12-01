const express = require('express');
const router = express.Router();
const { pool } = require('../../../config/databaseconfig');
const poolStats = require('../../midware/databasepoolstats');

// admin (admin boolean set in database) checker, jwt-token verifier
const isAdmin = require('../../midware/isadmin');
const verifyToken = require('../../midware/jwttokenverify');

//

router.get('/', async (request, response) => {
    try {
        const tentti = "SELECT * FROM tentti";
        let result_tentti = await pool.query(tentti);
        // log result_tentti -->
        // console.log("tentti:", result_tentti.rows);

        const kysymys = "SELECT * FROM kysymys";
        let result_kysymys = await pool.query(kysymys);
        // log result_kysymys -->
        // console.log("kysymys:", result_kysymys.rows);

        const vastaus = "SELECT * FROM vastaus";
        let result_vastaus = await pool.query(vastaus);
        // log result_vastaus -->
        // console.log("vastaus:", result_vastaus.rows);

        const liitos = `
            SELECT *
            FROM kysymys
            INNER JOIN tentti_kysymys_liitos
            ON kysymys.kysymys_id = tentti_kysymys_liitos.kysymyksen_id
            `;
        let result_liitos = await pool.query(liitos);
        // log result_liitos -->
        // console.log("liitos:", result_liitos.rows);

        // mappaa tässä? ja filtteröi? ja tuuppaa resObjektiin?
        // sit ei tarvi filteröidä frontissa?

        // combine query results into a new object:
        const resObject = {
            resTentti: result_tentti.rows,
            resKysymys: result_kysymys.rows,
            resVastaus: result_vastaus.rows,
            resLiitos: result_liitos.rows
        };

        console.log("resObject:", resObject);
        // send result object as a response:
        response.status(200).json(resObject);

        console.log(`Query completed succesfully`);
    } catch (error) {
        response.send('Caught error with query');
        console.error('err:', error);
    }
    // pool.end(() => { console.log('pool ended') })
});

// Hae yksi tentti ID:n avulla, joka sisältää kysymykset ja vastausvaihtoehdot
// router.get('/:tenttiId', verifyToken, async (req, res) => {
//     try {
//       const tentti_query = 'SELECT * FROM tentti WHERE id = ($1)';
//       const { rows: tentti_data } = await db.query(tentti_query, [req.params.tenttiId,]);
  
//       const kysymys_query =
//         'SELECT * FROM kysymys WHERE id IN (SELECT kysymys_id FROM tentti_kysymys_liitos WHERE tentti_id = ($1))';
//       const { rows: kysymys_data } = await db.query(kysymys_query, [req.params.tenttiId,]);
  
//       const vastaus_query =
//         'SELECT * FROM vastaus WHERE kysymys_id IN (SELECT kysymys_id FROM tentti_kysymys_liitos WHERE tentti_id = ($1))';
//       const { rows: vastaus_data } = await db.query(vastaus_query, [req.params.tenttiId,]);

  
//       const kysymykset = kysymys_data.map((kysymys) => {
//         return {
//           id: kysymys.id,
//           kysymys: kysymys.kysymys,
//           vastausvaihtoehdot: vastaus_data.filter(
//             (vastaus) => vastaus.kysymys_id === kysymys.id
//           ),
//         };
//       });
  
//       const tenttiObjekti = {
//         tentti: { ...tentti_data[0] },
//         kysymykset,
//       };
  
//       res.send(tenttiObjekti);
//     } catch (error) {
//       console.error('Virhe hakiessa tenttiä liitostaulusta:', error);
//     }
//   });

//
// export
module.exports = router;