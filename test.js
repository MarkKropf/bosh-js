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

bosh.locks(function(data) {
  if(data) {
    console.log("Locks: " + data);
  }
});

bosh.cloudConfigs(function(data) {
  if(data) {
    console.log("Cloud Configs: " + data);
  }
});

bosh.stemcells(function(data) {
  if(data) {
    console.log("Stemcells: ");
    for (var key in data) {
        console.log("Name: " + data[key].name + " os: " + data[key].operating_system + " version: " + data[key].version + " cid: " + data[key].cid + " deployments: " + JSON.stringify(data[key].deployments));
    }
  }
});

bosh.deployments(function(deployments) {
  if(deployments) {
    console.log("Deployments: ");
    for (var deployment in deployments) {
      console.log("Name: " + deployments[deployment].name);
      if(deployments[deployment].releases.length > 0) {
        console.log("Releases: ");
        for(var release in deployments[deployment].releases) {
          console.log(" Name: " + deployments[deployment].releases[release].name);
          console.log(" Version: " + deployments[deployment].releases[release].version);
        }
      }
      if(deployments[deployment].stemcells.length > 0) {
        console.log("Stemcells: ");
        for(var stemcell in deployments[deployment].stemcells) {
          console.log(" Name: " + deployments[deployment].stemcells[stemcell].name);
          console.log(" Version: " + deployments[deployment].stemcells[stemcell].version);
        }
      }
      console.log(" Cloud Config: " + deployments[deployment].cloud_config);
    }
  }
});

bosh.releases({},function(releases) {
  if(releases) {
    console.log("Releases: ");
    for (var release in releases) {
    console.log("Name: " + releases[release].name + " versions: ");
    for (var version in releases[release].release_versions) {
      console.log("  Version: " + releases[release].release_versions[version].version);
      console.log("  Commit Hash: " + releases[release].release_versions[version].commit_hash);
      console.log("  Uncomitted Changes: " + releases[release].release_versions[version].uncommitted_changes);
      console.log("  Currently Deployed: " + releases[release].release_versions[version].currently_deployed);
      console.log("  Jobs: " + JSON.stringify(releases[release].release_versions[version].job_names));
    }
  }
  }
});

bosh.releases({release: 'bosh-ui'},function(data) {
  if(data.packages) {
    console.log("Jobs: ");
    for (var key in data.packages) {
      console.log("Name: " + data.packages[key].name + " sha1: " + data.packages[key].sha1 + " version: " + data.packages[key].version);
    }
  }
});
