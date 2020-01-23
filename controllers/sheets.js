// Using axios
const express = require('express');
const router = express.Router();
const axios = require('axios');
const {sheetsModel} = require('../models/')
const fs = require('fs');
// const file = require('../k.esp');


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


//get all sheets/documents in an account
module.exports.getAll = async(req, res) => {
    axios.get( smartsheetAPiEndpoint, smartSheetAPIOptions)
    
    .then( (response) => {
        response.data.data.map( (sheet) => {
            console.log(`Name: ${sheet.name}, Id: ${sheet.id} `);
        })
        return res.status(200).send(response.data.data)
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
        return res.status(501).send(error)
    })
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
    
    const sheetId = req.params.id;
    const body = {
        cells
    } = req.body;

    axios.post( 
        smartsheetAPiEndpoint+'/'+sheetId+'/rows', 
        body,
        smartSheetAPIOptionsKey
    )
    .then( (response) => {
        readCells(response.data)
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