/**
 * Created by hanso on 12/6/2017.
 */

'use strict';
var config = require('../config'),
  request = require('request'),
  db = require('../models/database'),
  Momo = {};

//Receive mobile money
Momo.receiveMoney = function (req, res) {
  var body = req.body,
    payload,
    url = config.hubtel.baseUrl + config.hubtel.momoReceiveUrl,
    auth = "Basic " + new Buffer(config.hubtel.clientId + ":" + config.hubtel.clientSecret).toString("base64");

  payload = {
    "customerName": body.CustomerName,
    "CustomerMsisdn": body.CustomerMsisdn,
    "CustomerEmail": body.CustomerEmail,
    "Channel": body.Channel,
    "Amount": body.Amount,
    "PrimaryCallbackUrl": body.PrimaryCallbackUrl,
    "Description": body.Description,
    "Token": "",
    "ClientReference": body.ClientReference
  };

  var options = {
    url: url,
    json: true,
    body: payload,
    method: "POST",
    headers: {
      "Authorization": auth
    }
  };
  console.log("options >>>", options);
  request(options, function (error, response, body) {
    if (error) {
      console.log("error", "Error requesting receive momo >>> ", error);
      res.json(error);
    } else {
      console.log("info", "Receive Momo Service Request successfully returned 200 Response body>>");
      var result = {};
          result.response = body.responsecode;
          result.body = body.data
      console.log('result body >>>>',result);
      res.status(200).json(result);
    }
  });

}

Momo.sendMoney = function (req, res) {
  var body = req.body,
    payload,
    url = config.hubtel.baseUrl + config.hubtel.momoSendUrl,
    auth = "Basic " + new Buffer(config.hubtel.clientId + ":" + config.hubtel.clientSecret).toString("base64");

  payload = {
    "RecipientName": body.RecipientName,
    "RecipientMsisdn": body.RecipientMsisdn,
    "CustomerEmail": body.CustomerEmail,
    "Channel": body.Channel,
    "Amount": body.Amount,
    "PrimaryCallbackUrl": body.PrimaryCallbackUrl,
    "SecondaryCallbackUrl": "",
    "Description": body.Description,
    "ClientReference": body.ClientReference
  };

  var options = {
    url: url,
    json: true,
    body: payload,
    method: "POST",
    headers: {
      "Authorization": auth
    }
  };
  console.log("options >>>", options);
  request(options, function (error, response, body) {
    if (error) {
      console.log("error", "Error requesting sending momo >>> ", error);
      res.json(error);
    } else {
      console.log("info", "Send Momo Service Request successfully returned 200 Response body >>");
      var result = {};
      result.response = response.responseCode;
      result.data = body.data;

      console.log('result data >>>>',result);
      res.status(200).json(body);
    }
  });

}// send mobile money

Momo.refund = function (req, res) { }//do momo refund

Momo.geTranStatus = function (req, res) {
  var body = req.body,
    invoiceToken = "",
    networkTransactionId="",
    hubtelTransactionId=body.TransactionId,
    url = config.hubtel.baseUrl + config.hubtel.tranStatusUrl+hubtelTransactionId;

  var options = {
    url: url,
    json: true,
    method: "GET"
  };
  console.log("options >>>", options);
  request(options, function (error, response, body) {
    if (error) {
      console.log("error", "Error requesting momo transaction status >>> ", error);
      res.status(500).json(error);
    } else {
      console.log("info", "Successful Momo transaction status >>");
      var result = {};

      res.status(200).json(body);
    }
  });
} //get  transaction status

Momo.callBack = function (req, res) {
  var body = req.body;
  console.log('listen to momo callback >>>', body);
} //Momo callback responses


module.exports = Momo;
