var db = require('../models'),
    request = require('request'),
    config = require('../config'),

    hubtelApi = {};

hubtelApi.doTransaction = function (trans, callback) {
    console.info('info', trans.transType);
    if (trans.transType == 'receivemomo') {
        var payload = {
            "CustomerName": "Customer FullName",
            "CustomerMsisdn": "054XXXX",
            "CustomerEmail": "",
            "Channel": "mtn-gh",
            "Amount": 0.8,
            "PrimaryCallbackUrl": "http://requestb.in/1minotz1",
            "SecondaryCallbackUrl": "http://requestb.in/1minotz1",
            "Description": "T Shirt",
            "ClientReference": "",
            "Token": "string"
          }

        console.log("info","receive momo", payload);
        hubtelApi.receive(payload, function (response) {
            console.info("info", "Receive Momo response >>>");
            console.info("info", response);
            if (response.error) {
                transaction.transStatus = "failed";
                transaction.serviceStatus = "500 :" + response.data;
                transaction.save();
                logger.log('error', response.data);
                return;
            }
            if (response.data.status) {
                transaction.serviceStatus = response.data.status;
            } else {
                transaction.serviceStatus = '404';
            }
            transaction.save();
            callback(transaction.serviceStatus);
        })
    } else if (trans.transType == 'sendmomo') {
        var payload = {
            "RecipientName": "Recepient FullName",
            "RecipientMsisdn": "054XXXXXXX",
            "CustomerEmail": "recipientemail@gmail.com",
            "Channel": "mtn-gh",
            "Amount": 0.4,
            "PrimaryCallbackUrl": "http://requestb.in/rbi0ptrb",
            "SecondaryCallbackUrl": "",
            "Description": "2 boxes of biscuits",
            "ClientReference": ""
        };

        console.log("info", "Service Request Payload >>>");
        console.log("info", payload);
        doPost(payload, function (response) {
            logger.info("info", "send money transaction response >>>");
            logger.info("info", response);
            if (response.error) {
                transaction.transStatus = "failed";
                transaction.serviceStatus = "500 :" + response.data;
                transaction.save();
                logger.log('error', response.data);
                return;
            }
            transaction.transStatus = "complete";

            if (response.data.status) {
                transaction.serviceStatus = response.data.status;
            } else {
                transaction.serviceStatus = '404';
            }

            transaction.save();
            callback(transaction.serviceStatus);
        })
    }
    else if (trans.transType == 'refund') {
        var payload = {
            "TransactionId": "string",
            "Reason": "string",
            "ClientReference": "string",
            "Description": "string",
            "Amount": 0,
            "Full": true
        };

        logger.log("info", "Service Request Payload >>>");
        logger.log("info", payload);
        doPost(payload, function (response) {
            logger.info("info", "Otherpayment transaction response >>>");
            logger.info("info", response);
            if (response.error) {
                transaction.transStatus = "failed";
                transaction.serviceStatus = "500 :" + response.data;
                transaction.save();
                logger.log('error', response.data);
                return;
            }
            transaction.transStatus = "complete";
            transaction.serviceStatus = response.data.status;
            transaction.save();
            callback(transaction.serviceStatus);
        })

    }

};

hubtelApi.receive = function (payload, callback) {
    var url = config.hubtel.baseUrl + config.hubtel.receiveMoMo,
        auth = "Basic " + new Buffer(config.hubtel.clientId + ":" + config.hubtel.clientSecret).toString("base64");

    var options = {
        url: url,
        json: true,
        body: payload,
        headers: {
            "Authorization": auth,
            "content-type": "application/json"
        },
        method: "POST"
    };
    console.log('... receiving mobile money');
    console.info(options);
    request(options, function (error, response, body) {
        console.log("info", body);
        if (error) {
            console.log("error", "Error in request for service successfully returned 500 Response body>>");
            console.log("error", error);
            callback({ error: true, data: error });

        } else {
            console.log("info", "Service Request successfully returned 200 Response body>>");
            console.log("info", body);
            callback({ error: false, data: body });
        }
    });
}

module.exports = hubtelApi;