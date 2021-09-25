let codeHistoryList = [];

function init() {
  this.getLatestCode();
  this.populateHistoryOptions();
}

function getLatestCode() {
  document.getElementById("htmlCode").innerHTML = window.localStorage.getItem('latestHTMLCode');
  document.getElementById("cssCode").value = window.localStorage.getItem('latestCSSCode');
  document.getElementById("jsCode").value = window.localStorage.getItem('latestJSCode');
  this.showPreview();
}

function showPreview(){
  var htmlCode = document.getElementById("htmlCode").value;
  var cssCode = "<style>"+ document.getElementById("cssCode").value +"</style>";
  var jsCode = "<script>"+document.getElementById("jsCode").value+"</script>";
  var frame = document.getElementById("preview-window").contentWindow.document;
  frame.open();
  frame.write(htmlCode+cssCode+jsCode);
  frame.close();
}

function saveLatestCode() {
  var htmlCode = document.getElementById("htmlCode").value;
  var cssCode = document.getElementById("cssCode").value;
  var jsCode = document.getElementById("jsCode").value;
  var templateName = document.getElementById("template-name").value;

  window.localStorage.setItem('latestHTMLCode', htmlCode);
  window.localStorage.setItem('latestCSSCode', cssCode);
  window.localStorage.setItem('latestJSCode', jsCode);
  window.localStorage.setItem('templateName', templateName);

  const savedCode = {
    'htmlCode': window.localStorage.getItem('latestHTMLCode'),
    'cssCode': window.localStorage.getItem('latestCSSCode'),
    'jsCode': window.localStorage.getItem('latestJSCode'),
    'templateName': window.localStorage.getItem('templateName'), 
    'id': + new Date()
  }

  if(document.getElementById("template-name").value){
    this.addCodeToHistoryList(savedCode);
    modal.style.display = "none";
  } else {
    alert("Please enter a template name");
  }
}

function loadSelectedCode(selectedCode) {
  const historyList = JSON.parse(window.localStorage.getItem('codeHistoryList') || "[]");
  document.getElementById("htmlCode").innerHTML = historyList[selectedCode.value].htmlCode;
  document.getElementById("cssCode").value = historyList[selectedCode.value].cssCode;
  document.getElementById("jsCode").value = historyList[selectedCode.value].jsCode;
  this.showPreview();
}

function addCodeToHistoryList(code) {
  codeHistoryList = codeHistoryList.concat([code]);
  window.localStorage.setItem('codeHistoryList', JSON.stringify(codeHistoryList));
  this.populateHistoryOptions();
}

function populateHistoryOptions() {
  var select = document.getElementById("example-select");
  const historiesArray = JSON.parse(window.localStorage.getItem('codeHistoryList'));
  var select = document.getElementById("example-select");
  
  if(historiesArray){
    for(index in historiesArray) {
      select.options[select.options.length] = new Option(`${historiesArray[index].templateName} - id:${historiesArray[index].id}`, index);
    }
  }
  var select = document.getElementById("example-select");
}

function openSaveCodeModal() {
  let modal = document.getElementById("modal")
  let closeBtn = document.getElementById("close-btn")

  modal.style.display = "block"

  closeBtn.onclick = function(){
    modal.style.display = "none"
  }
  window.onclick = function(e){
    if(e.target == modal){
      modal.style.display = "none"
    }
  }
}

function growDiv() {
  var growDiv = document.getElementById('grow');
  var wrapper = document.getElementById('measuringWrapper');
  var grow2Div = document.getElementById('preview-area-container');

  if (growDiv.clientHeight) {
    growDiv.style.height = 0;
    grow2Div.style.height = '400px';
    document.getElementById("minimize").innerHTML = 'Maximize';
  } else {
    growDiv.style.height = wrapper.clientHeight + "px";
    grow2Div.style.height = '200px';
    document.getElementById("minimize").innerHTML = 'Minimize';
  }
}
