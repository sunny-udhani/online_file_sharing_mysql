var express = require('express');

exports.add = function (req,res) {
    var val1 = req.param("input1");
    var val2 = req.param("input2");
    var result = parseInt(val1) + parseInt(val2);
    console.log("add result: "+result);
    res.send({result: result});
};

exports.sub = function (req,res) {
    var val1 = req.param("input1");
    var val2 = req.param("input2");
    var result =  parseInt(val1)  -  parseInt(val2);
    console.log("sub result: "+result);
    res.send({result: result});
};

exports.mul = function (req,res) {
    var val1 = req.param("input1");
    var val2 = req.param("input2");
    var result =  parseInt(val1)  *  parseInt(val2);
    console.log("multiply result: "+result);
    res.send({result: result});
};

exports.div = function (req,res) {
    var val1 = parseInt(req.param("input1"));
    var val2 = parseInt(req.param("input2"));
    (val2===0) ? res.sendStatus(404) : res.status(200).send({ result: (val1 / val2) });

};