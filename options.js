// Save this script as `options.js`

// Saves options to localStorage.
function save_options() {
  var select = document.getElementById("apikey");
  localStorage["apikey"] = select.value;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var api_key = localStorage["apikey"];
  if (!api_key) {
    return;
  }
  var select = document.getElementById("apikey");
  select.value = api_key;
}

function init() {
  document.querySelector('#save').addEventListener('click', save_options);
  restore_options();
}
document.addEventListener('DOMContentLoaded', init);