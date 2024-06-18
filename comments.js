// Create web server

var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

var comments = [];

var server = http.createServer(function (req, res) {
  // Parse the request URL
  var url_parts = url.parse(req.url);

  // If the request URL is /comments
  if (url_parts.pathname === '/comments') {
    // If the request is a POST request, process the form input
    if (req.method === 'POST') {
      var comment = '';
      req.on('data', function (chunk) {
        comment += chunk;
      });
      req.on('end', function () {
        comment = querystring.parse(comment);
        comments.push(comment.comment);
        res.end('Comment added');
      });
    } else if (req.method === 'GET') {
      var all_comments = '';
      comments.forEach(function (comment) {
        all_comments += '<li>' + comment + '</li>';
      });
      res.end('<ul>' + all_comments + '</ul>');
    }
  } else {
    // If the request URL is not /comments, serve the static file
    fs.readFile(__dirname + '/index.html', function (err, data) {
      res.end(data);
    });
  }
});

server.listen(3000);
console.log('Server running at http://localhost:3000/');

