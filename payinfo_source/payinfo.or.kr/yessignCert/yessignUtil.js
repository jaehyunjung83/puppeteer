function _escapeUrl(url) {
  if (!url) {
    return '';
  }

  var ch;
  var out = '';

  for ( var i = 0; i < url.length; i++) {
    ch = url.charAt(i);
    if (ch == ' ')
      out += '%20';
    else if (ch == '%')
      out += '%25';
    else if (ch == '&')
      out += '%26';
    else if (ch == '+')
      out += '%2B';
    else if (ch == '=')
      out += '%3D';
    else if (ch == '?')
      out += '%3F';
    else
      out += ch;
  }
  return out;
}

function _escapeHtml(html) {
  var entityMap = {
    "&" : "&amp;",
    "<" : "&lt;",
    ">" : "&gt;",
    '"' : '&quot;',
    "'" : '&#39;',
    "/" : '&#x2F;'
  };

  return String(html).replace(/[&<>"'\/]/g, function(s) {
    return entityMap[s];
  });
}

function _sendHttpRequest(url, names) {
  var xhr = _getHttpRequest();
  if (xhr === null) {
    return undefined;
  }

  var response;
  var random = Math.floor(Math.random() * 4294967295 /* 2^32 - 1 */).toString() + new Date().getTime().toString();
  var parameter = "request=" + names.join(';') + '&random=' + random;
  xhr.open('GET', url + '?' + parameter, false); // synchronous
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      response = _parseParameter(xhr.responseText);
    }
  };

  try {
    xhr.send();
  } catch (err) {
    if (window.console) {
      console.log(err);
    }
  }

  return response;
}

function _getHttpRequest() {
  // IE �������� ���
  if (window.ActiveXObject) {
    try {
      return new ActiveXObject('Msxml2.XMLHTTP');
    } catch (err) {
      try {
        return new ActiveXObject('Microsoft.XMLHTTP');
      } catch (err1) {
        return null;
      }
    }
  }
  // ��IE �������� ���
  else if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  } else {
    return null;
  }
}

function _parseParameter(parameter) {
  function _trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
  }

  function _decode(str) {
    return decodeURIComponent(str.replace(/\+/g, '%20'));
  }

  var result = {};
  var list = _trim(parameter).split('&');
  for ( var i = 0; i < list.length; i++) {
    var pair = list[i].split('=');
    if (pair[0] !== '' && pair[1] !== '') {
      result[pair[0]] = _decode(pair[1]);
    }
  }

  return result;
}

function _returnAsync(callback /* , args */) {
  var args = Array.prototype.slice.call(arguments, 1);
  setTimeout(function() {
    callback.apply(null, args);
  }, 0);
};
