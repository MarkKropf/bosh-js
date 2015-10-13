var config = require('./config.json');
var Bosh = require('./bosh.js');
var bosh = new Bosh(config.host,config.port,config.user,config.pass,config.ca);

bosh.info(function(data) {
  console.log("Director Name: " + data.name);
  console.log("UUID: " + data.uuid);
  console.log("Version: " + data.version);
});

bosh.tasks(function(data) {
  if(data) {
    console.log("Tasks: " + data);
  }
});

bosh.stemcells(function(data) {
  if(data) {
    console.log("Stemcells: " + data[0].name);
  }
});