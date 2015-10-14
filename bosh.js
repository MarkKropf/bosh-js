module.exports = function(host, port, user, pass, cafile, sslValidate) {
  this.host = host;
  this.port = port;
  this.user = user;
  this.pass = pass;
  if(cafile) { this.ca = parseBundle(cafile); } else { this.ca = null; }
  this.sslValidate = sslValidate;

  this.info = function(cb) {
    boshRequest('/info',parent=this,function(data) {
      cb(data);
    });
  };

  this.tasks = function(cb) {
    boshRequest('/tasks',parent=this,function(data) {
      cb(data);
    });
  };

  this.stemcells = function(cb) {
    boshRequest('/stemcells',parent=this,function(data) {
      cb(data);
    });
  };

  this.deployments = function(cb) {
    boshRequest('/deployments',parent=this,function(data) {
      cb(data);
    });
  };

  this.locks = function(cb) {
    boshRequest('/locks',parent=this,function(data) {
      cb(data);
    });
  };

  this.cloudConfigs = function(cb) {
    boshRequest('/cloud_configs?limit=100',parent=this,function(data) {
      cb(data);
    });
  };

  this.releases = function(input, cb) {
    var release = input.release || null;
    if(release!==null) {
      path = '/releases/' + release;
    } else {
      path = '/releases';
    }
    boshRequest(path,parent=this,function(data) {
      cb(data);
    });
  };

  function parseBundle(cafile) {
    var fs = require('fs');
    var ca, cert, chain, i, len, line;
    ca = [];
    chain = fs.readFileSync(cafile, 'utf8');
    chain = chain.split("\n");
    cert = [];

    for (i = 0, len = chain.length; i < len; i++) {
      line = chain[i];
      if (line.length === 0) {
        continue;
      }
      cert.push(line);
      if (line.match("-----END CERTIFICATE-----")) {
        ca.push(cert.join("\n"));
        cert = [];
      }
    }
    return(ca);
  }
  function boshRequest(path,parent,cb) {
    var https = require('https');
    var options = {
      host: parent.host,
      port: parent.port,
      auth: parent.user + ":" + parent.pass,
      path: path,
      method: 'GET',
      ca: parent.ca,
      rejectUnauthorized: parent.sslValidate,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    options.agent = new https.Agent(options);
    var req = https.request(options, function(res) {
      res.body="";
      if (res.statusCode == 200) {
        res.on('data', function(chunk) {
          res.body += chunk;
        });
        res.on('end', function() {
          cb(JSON.parse(res.body));
        });
      } else {
        console.log("Status code: " + res.statusCode);
      }
    });
    req.end();
  }
};
