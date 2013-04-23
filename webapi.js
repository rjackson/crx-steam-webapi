window.onload = function(){
  var apikey = localStorage["apikey"];
  var warning = document.getElementById("warning");
  if (!apikey) {

      var li = document.createElement("li");
      li.appendChild(document.createTextNode("No API key set"));
      warning.appendChild(li);
  }
  var req = new XMLHttpRequest();
    req.open(
        "GET",
        (apikey) ? "http://api.steampowered.com/ISteamWebAPIUtil/GetSupportedAPIList/v0001/?key=" + apikey : "http://api.steampowered.com/ISteamWebAPIUtil/GetSupportedAPIList/v0001/",
       true);
  req.onreadystatechange = parseApi;
  req.send(null);

  function parseApi() {
    console.log(req.readyState);
    if (req.readyState == 4) {

      // Unordered List for displaying interfaces.
      var businessEnd = document.getElementById("businessEnd");

      data = JSON.parse(req.responseText).apilist;
      interfaces = data.interfaces;
      for (var i in interfaces)
      {
        interfaceName = interfaces[i].name;
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(interfaceName));
        businessEnd.appendChild(li);

        var methodsUl = document.createElement("ul");

        methods = interfaces[i].methods;
        for (var j in methods) {
          methodName = methods[j].name;
          methodVersion = methods[j].version;

          parameters = methods[j].parameters;
          var paramString = (apikey) ? "?key=" + apikey : "?";
          for (var k in parameters)
          {
            parameterName = parameters[k]["name"];
            paramString += "&" + parameterName;
          }
          var methodLink = document.createElement("a");
          methodLink.href = "http://api.steampowered.com/" + interfaceName + "/"+ methodName +"/v" + methodVersion + "/" + paramString;
          methodLink.appendChild(document.createTextNode(methodName));
          var methodLi = document.createElement("li");
          methodLi.appendChild(methodLink);
          methodsUl.appendChild(methodLi);
        }
        li.appendChild(methodsUl);
      }
    }
  }
};