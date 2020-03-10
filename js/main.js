

function copyElement(element) {
  const el = $('<textarea/>');
  el[0].value = $(element)[0].innerHTML;
  $('body').append(el);
  el.select();
  document.execCommand('copy');
  el.remove();
  alert('Copiado');
}

function requestRows() {
  $.sweetModal.prompt('Cuantas columnas deseas?', 'Como máximo 12 columnas (col-12)', null, function (val) {
    generateTemplate(val);
  });
}

function generateTemplate(num) {
  let numRows;
  let template;
  let btnStyle;
  let btnCopy;

  if ($.isNumeric(num)) {
    if (num > 12) {
      num = 12
    } else if (num < 1) {
      num = 1
    }

    numRows = 12 / num;
    btnStyle = '<a id="btnStyle" class="hvr-fade padding-xl pull-right" onclick="showStyle();">Generate Style</a>';
    btnCopy = `<a id="btnCopy" class="hvr-fade padding-xl pull-right" onclick="copyElement('div.customTable');">Copy to clipboard</a>`;
    template = `<div class="listStyle"><div class="row"><div class="col-12 headerList hidden-m hidden-s mod-expand">`;

    if (numRows % 1 == 0) {
      template += generateTemplateHeader(1, num, numRows);
    }
    else {
      template += generateTemplateHeader(0, num, numRows);
    }
    template += '</div>'
    console.log(template);
    $('div.customTable').html(template);
    generateTemplateItems('.headerList');
    if ($('#btnStyle').length == 0 && $('#btnCopy').length == 0) {
      $('div.containerActions').append(btnStyle);
      $('div.containerActions').append(btnCopy);
    }
  }
  else {
    $.sweetModal({
      content: 'The value entered is not a number',
      title: 'Oh .....',
      icon: $.sweetModal.ICON_ERROR,
      buttons: [
        {
          label: 'That\'s fine',
          classes: 'redB'
        }
      ]
    });
  }



}

function showStyle() {
  let styleTemplate;

  styleTemplate = `<div class="row"><a onclick="copyElement('#styleInfo');">Copy to clipboard</a></div>
  <pre id="styleInfo">
  .headerList {
    background-color: #f5f7fa !important;
    padding: 10px 0px !important;
    border-bottom: 1px solid #e9ecef !important;
    text-transform: uppercase !important;
  }
  
  .headerList > div{
      font-weight: bold;
  }
  
  .listStyle .itemList {
    color: #616e7c !important;
    padding: 10px 0px !important;
    border-bottom: 1px solid #e9ecef;
    text-align: left;
  }
  </pre>`;

  $.sweetModal({
    title: 'Element Style',
    content: styleTemplate
  });

}

function generateTemplateHeader(isInt, num, numRows) {
  let templateHeader = '';
  let dinamicNumRows;
  let decimalNumRows;

  if (isInt === 1) {
    dinamicNumRows = numRows;
    while (dinamicNumRows <= 12) {
      templateHeader += '<div class="col-' + numRows + ' text-center">Rommel</div>'
      dinamicNumRows += numRows;
    }
  }
  else {
    numRows = Math.trunc(numRows);
    dinamicNumRows = numRows;
    decimalNumRows = num * Math.trunc(numRows);
    while (dinamicNumRows <= (decimalNumRows - numRows)) {
      templateHeader += '<div class="col-' + numRows + ' text-center">Rommel</div>'
      dinamicNumRows += numRows;
    }
    templateHeader += '<div class="col-' + ((12 - decimalNumRows) + numRows) + ' text-center">Rommel</div>'
  }

  return templateHeader
}

function generateTemplateItems(selector) {
  let templateItems = '';
  //let times = 0;
  let containerItems = $('<div class="itemList row"/>');
  templateItems = $(selector).clone().removeClass();
  templateItems.addClass("col-12 padding-0");
  $(containerItems).append(templateItems);


  $(containerItems).appendTo("div.listStyle > div.row");
  $('div.itemList > div > div').addClass('col-m-12 col-s-12');
}