console.log("This is test")
var express = require('express'),
    app = express(),
    jasper = require('node-jasper')({
        path: './jasperreport',
        reports: {
            hw: {
                jasper: 'resources/test.jasper',
            	conn:'in_memory_json'
            }
        },
        drivers: {
            pg: {
                path: 'lib/jdbc-postgresql.jar',
                class: 'org.postgresql.Driver',
                type: 'postgresql'
            }
        },
        conns: {
            dbserver1: {
                host: 'dbserver1.example.com',
                port: 5432,
                dbname: 'example',
                user: 'johnny',
                pass: 'test',
                driver: 'pg'
            }
        },
        defaultConn: 'dbserver1'
    });

    app.get('/html', function(req, res, next) {
	console.log("req query id",req.query.id);
        //beware of the datatype of your parameter.
        var report = {
            report: 'hw',
            data: {
                id: parseInt(req.query.id, 10),
                secundaryDataset: jasper.toJsonDataSource({
                    data: {
			"ID":"1",
			"FIRSTNAME":"aBCD",
			"LASTNAME":"XYZ",
			"CITY":"BNG"
		
		}
                },'data')
            },
            dataset:[ {
			"ID":"1",
			"FIRSTNAME":"aBCD",
			"LASTNAME":"XYZ",
			"CITY":"BNG"
		
	         	},
			{
			"ID":"2",
			"FIRSTNAME":"Nana",
			"LASTNAME":"Baba",
			"CITY":"BNG"
		
	         	}
		]
        };
try{
      // var pdf = jasper.pdf(report);
       var html = jasper.export(report,'html'); 
       res.set({
            'Content-type': 'application/pdf:',
            'Content-Length': html.length
        });
        res.send(html);
}catch(error){
console.log(error);}
    });

    app.listen(3000);
