;(function() {
  var request, method, url, data, process;
  request = new XMLHttpRequest();
  method = 'GET';
  url = '';
  data = JSON.stringify({
    'key': 'Y40QePckhKKYTmtJB8I8Wg',
    'message': {
      'from_email': 'me@robertwpearce.com',
      'to': [
        {
          'email': 'robertwaltonpearce@gmail.com',
          'name': 'Robert Pearce',
          'type': 'to'
        }
      ],
      'autotext': 'true',
      'subject': 'TESTY',
      'html': 'This is a test bro'
    }
  });
  process = function(request) {
    console.log(request);
  };

  if (request.withCredentials != null) {
    request.open(method, url, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send(data);
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        return process(request);
      }
    };
  } else if (typeof XDomainRequest !== "undefined" && XDomainRequest != null) {
    request = new XDomainRequest();
    request.open(method, url);
    request.onload = function() {
      return process(request);
    };
  }
})();
