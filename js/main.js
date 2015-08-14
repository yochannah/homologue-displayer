var mineSources   = require('./mineSources.js'),
query             = require('./query'),
imjs              = require('imjs'),
homTemplate       = require('../template/homTemplate.html'),
homologueOverview = require('../template/homologueOverview.html'),
responseOverview  = require('../template/responseOverview.html'),
_                 = require('underscore');
var main = function(){
  var services = [],
  loadSources = function(){
    var mine;
    for (var source in mineSources) {
      mine = mineSources[source];
      mine.service = new imjs.Service({root: mine.root});
      services.push(mine);
    }
    getHomologues();
  },
  getHomologues = function(symbol){
    var data = [];
    for (var i=0; i < services.length; i++) {
      var mine = services[i];
      services[i].response = services[i].service.records(query).then(function(response){
        document.getElementById('homolog').innerHTML += tempResponseFormat({"name" :mine.name,"res" :response});
      }).catch(function(e){
        console.log('oh noes',e);
      });
    }
  },
  tempResponseFormat = function(obj){
    _.templateSettings = {
      interpolate: /\{\{(.+?)\}\}/g
    };
    var geneOutput = "";
    for(var i = 0; i < obj.res.length; i++) {
        geneOutput +=  responseDisplay(obj.res[i]);
    }
    var template = _.template(homTemplate),
    output = template({
      name:obj.name,
      responseDetails : geneOutput
    });
    return output;
  },
  responseDisplay = function(obj){
    var template = _.template(responseOverview),
    homologues = "";
    for (var i=0; i <obj.homologues.length; i++) {
      homologues += homologueDisplay(obj.homologues[i]);
    }
    obj.homologuesHtml = homologues;
    return template(obj);
  },
  homologueDisplay = function(obj){
    var template = _.template(homologueOverview),
    output = template(obj);
    return output;
  }


  return {
    services : services,
    loadSources : loadSources
  };
}
//write tests in test.js

module.exports = main;
