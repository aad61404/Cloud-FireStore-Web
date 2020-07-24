// ${drawList(JSON.stringify(dataBox.詳細說明))}
function drawList(json) {
  json = JSON.parse(json);
  console.log('json:', json);
  var creatediv = document.createElement('div');

  var test = document.getElementById('test');
  Object.keys(json).forEach(function (tz) {
    var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = tz;
    div.appendChild(p);
    var divdiv = document.createElement('div');
    div.appendChild(divdiv);

    json[tz].forEach(function (item) {
      var pp = document.createElement('p');
      pp.innerHTML = item;
      divdiv.appendChild(pp);
    });
    test.appendChild(div);
  });
}


var a = document.getElementById('test');
Object.keys(b).forEach(function (tz) {
  var div = document.createElement('div');
  var p = document.createElement('p');
  p.innerHTML = tz;
  div.appendChild(p);
  var divdiv = document.createElement('div');
  div.appendChild(divdiv);

  b[tz].forEach(function (item) {
    var pp = document.createElement('p');
    pp.innerHTML = item;
    divdiv.appendChild(pp);
  });
  a.appendChild(div);
});
