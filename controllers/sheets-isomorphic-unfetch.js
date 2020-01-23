// Using isomorphic-unfetch package
// const fetch = require('isomorphic-unfetch');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const {sheetsModel} = require('../models/')
const fs = require('fs');
const fetchData = require('../helpers/fetchData');



// const fetchData = async ({
//     url,
//     method = 'POST',
//     body,
//     headers = {},
//     ...params
//   }) => {
//     let defaultHeaders = {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     };
  
//     if (Object.keys(headers).length) {
//       defaultHeaders = {
//         ...defaultHeaders,
//         ...headers,
//       };
//     }
//     const options = {
//       method,
//       headers: { ...defaultHeaders },
//       ...params,
//     };
  
//     if (body) {
//       options.body = JSON.stringify(body);
//     }
  
//     console.log('headers');
//     console.log(defaultHeaders);
//     const res = await fetch(url, options);
//     return res.json();
// };


// const API_KEY = process.env.SMARTSHEET_API_KEY;
const API_KEY = fs.readFileSync( './k.txt', (err, data) => {
    if (err){
        console.log(`API KEY error ${err} `)
        // process.exit();
        return err;
    }
    return data.toString();
    // console.log( data.values() );
});
console.log(`API_KEY : ${API_KEY} `)
router.use(express.json());

const smartsheetAPiEndpoint = 'https://api.smartsheet.com/2.0/sheets';
const smartSheetAPIOptions = {'headers': {
    'Authorization' : 'Bearer '+API_KEY,
    'Content-Type' : 'application/json'
}}

const smartSheetAPIOptionsKey = {'headers': {
    'Authorization' : 'Bearer '+API_KEY,
    'Content-Type' : 'application/json'
}}

const url = smartsheetAPiEndpoint;
const headers = {
    'Authorization' : 'Bearer '+API_KEY
};

//get all sheets/documents in an account
module.exports.getAll = async(req, res) => {
    
    console.log('using isomorphic-unfetch plugin');
    const method = 'GET';
    try {
        const getSheets = await fetchData({url, method, headers});
        console.log(getSheets);
        return res.status(200).send(getSheets);
    } catch (err) {
        return res.status(400).send('Could not get data');
    }
}


function readCells(input){
    
    // //Display all columns:
    if (input.columns){
      let columns = input.columns;
      console.log("Column names only:\n");
      columns.map( (column) => {
        console.log(column.title + "\n" );
      })
    }
    
    // //Display all rows
    // if (input.rows && input.rows.length > 0 ){
    //   const rows = input.rows;
      
    //   rows.map( ( row ) => {
    //     let cells = row.cells; //Exh row has an array of cells.
    //     console.log(`Row Number: ${row.rowNumber} `);
    //     cells.map( (cell) => {
    //       if(cell.value){
    //         console.log( `${cell.value} `);
    //       }
    //     })
    //     console.log('--\n--');  
    //   } )
    //   return;
    // }
    
    // // ///Display second row only.
    // if (input.rows[1]){
    //     const row = input.rows[1];
    //     let cells = row.cells; //Exh row has an array of cells.
        
    //     console.log(`Row Number: ${row.rowNumber} `);
        
    //     cells.map( (cell) => {
          
    //       if(cell.value){
    //         console.log( `${cell.value} `);
    //       }
    //     })
    // }

    
}

module.exports.getOne = async(req, res) => {
    const sheetId = req.params.id;

    axios.get( smartsheetAPiEndpoint+'/'+sheetId, smartSheetAPIOptions)
    .then( (response) => {
        readCells(response.data)
        return res.status(200).send(response.data);
    })
    .catch( (error) => {
        if (error.response){
            console.log( error.response.data )
            console.log( error.response.status )
            console.log( error.response.headers )
        } else if (error.request) {
            console.log(error.request)
        } else {
            console.log(error)
        }
        return res.status(501).send('Could not get data')
    })

}

module.exports.updateRow = async(req, res) => {
    
    console.log(smartSheetAPIOptions)

    const sheetId = req.params.id;
    const dataBody = {
        id,
        cells
    } = req.body;

    axios.put( 
        smartsheetAPiEndpoint+'/'+sheetId+'/rows', 
        dataBody,
        {
            'headers': {
                'Authorization' : 'Bearer tbew9ffz5feqqp0yag6b2g6bom',
                'Content-Type' : 'application/json'
            }
        }
    )
    .then( (response) => {
        // readCells(response.data)
        console.log(response.data);
        return res.status(200).send(response.data);
    })
    .catch( (error) => {
        //console.log(error);
        if (error.response){
            console.log( error.response.data )
            console.log( error.response.status )
            console.log( error.response.headers )
        } else if (error.request) {
            console.log(error.request)
        } else {
            console.log(error)
        }
        return res.status(501).send('Could not get data')
    })

}

module.exports.createRow = async(req, res) => {
    
    // const body = {
    //     cells
    // } = req.body;
    const url = `${smartsheetAPiEndpoint}/${req.params.id}/rows`;
    // console.log(`postUrl: ${postUrl} `);

    const body = {
        "cells": [
            {
                    "columnId": 1934643202156420,
                    "value": "Testing insert."
            }
        ]
    };
    
    // console.log( '\nbody' );
    // console.log( body );
    // console.log( '\nbody' );


    try {
        const postSheets = await fetchData({url, body, headers});
        console.log(postSheets);
        return res.status(200).send(postSheets);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Could not post data');
    }
    
    // const sheetId = req.params.id;
    // const body = {
    //     cells
    // } = req.body;

    // axios.post( 
    //     smartsheetAPiEndpoint+'/'+sheetId+'/rows', 
    //     body,
    //     smartSheetAPIOptionsKey
    // )
    // .then( (response) => {
    //     readCells(response.data)
    //     return res.status(200).send(response.data);
    // })
    // .catch( (error) => {
    //     //console.log(error);
    //     if (error.response){
    //         console.log( error.response.data )
    //         console.log( error.response.status )
    //         console.log( error.response.headers )
    //     } else if (error.request) {
    //         console.log(error.request)
    //     } else {
    //         console.log(error)
    //     }
    //     return res.status(501).send('Could not get data')
    // })

}

module.exports.create = async(req, res) => {
    const body = {
        name,
        columns,
    } = req.body;
    axios.post( 
        smartsheetAPiEndpoint,
        body,
        smartSheetAPIOptionsKey
    )
    .then( (response) => {
        return res.status(200).send(response.data);
    })
    .catch( (error) => {
        if (error.response){
            console.log( error.response.data )
            console.log( error.response.status )
            console.log( error.response.headers )
        } else if (error.request) {
            console.log(error.request)
        } else {
            console.log(error)
        }
        return res.status(501).send('Could not get data')
    })
}