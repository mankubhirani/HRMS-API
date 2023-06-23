'use strict';

const CountryStateCity = require('../models/country-state-city.model');



exports.findAllCountry = function(req, res) {
    CountryStateCity.findAllCountry(function(err, country) {
        if (err)
        res.send(err);
        else if(country[0][0].response==="fail")
        return   res.status(404).send({success:false, error:true,message:"country does not exist!"});
else
// console.log(country[1][0].count);
res.status(200).json({data:country[0],success:true, error:false,message:"country fetched successfully!","count":country[1][0].count});
     

    });
};

exports.findstate = function(req, res) {
    CountryStateCity.findStatebyCountryid(req.params.country_id,function(err, state) {
        if (err)
        res.send(err);
        else if(state[0][0].response==="fail")
        return   res.status(404).send({success:false, error:true,message:"state does not exist!"});
else
res.status(200).json({data:state[0],success:true, error:false,message:"state fetched successfully!","count":state[1][0].count});
     

    });
};
exports.findcity = function(req, res) {
    CountryStateCity.findCitybyStateid(req.params.state_id,function(err, city) {
        if (err)
        res.send(err);
        else if(city[0][0].response==="fail")
        return   res.status(404).send({success:false, error:true,message:"city does not exist!"});
else
res.status(200).send({data:city[0],success:true, error:false,message:"city fetched successfully!","count":city[1][0].count});
     

    });
};
