;(function() {
  var _sendEmail = function(data, form) {
    var request, method, url, async, process;
    request = new XMLHttpRequest();
    method = 'POST';
    url = 'http://production-mhtciurjts.elasticbeanstalk.com/send_email';
    async = true;
    process = function(request) {
      var inputs, button, i;
      inputs = form.querySelectorAll('input');
      button = form.querySelector('button');
      i = 0;
      for(; i < inputs.length; i+=1) {
        inputs[i].value = '';
      }
      button.innerText = 'Submitted!';
      setTimeout(function() {
        button.innerText = 'Submit';
      }, 3000);
    };

    if (request.withCredentials != null) {
      request.open(method, url, async);
      request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
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
    request.send(JSON.stringify(data));
  };

  var _getSignupValues = function(e) {
    var form, button, data;
    e.preventDefault();
    form = e.target;
    button = form.querySelector('button');
    data = {
      type: 'Normal Signup',
      name: form.querySelector('#signup-name').value,
      email: form.querySelector('#signup-email').value
    };
    button.innerText = 'Sending...'
    if (data.name != "" && data.email != null) {
      _sendEmail(data, form);
    } else {
      alert('Please provide your name and email address');
    }
  };

  var _getShopSignupValues = function(e) {
    var form, button, data;
    e.preventDefault();
    form = e.target;
    button = form.querySelector('button');
    button.innerText = 'Sending...'
    data = {
      type: 'Participating Shop',
      name: form.querySelector('#participate-name').value,
      email: form.querySelector('#participate-email').value,
      telephone: form.querySelector('#participate-telephone').value,
      shop: form.querySelector('#participate-shop').value
    };
    if (data.name !== "" && data.email !== "" && data.telephone !== "" && data.shop !== "") {
      _sendEmail(data, form);
    } else {
      alert('Please fill in all the fields');
    }
  };

  var signupForm = document.getElementById('form-signup');
  var shopSignupForm = document.getElementById('form-participate');
  signupForm.addEventListener('submit', _getSignupValues, false);
  shopSignupForm.addEventListener('submit', _getShopSignupValues, false);
})();
