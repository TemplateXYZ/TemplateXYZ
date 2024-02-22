document.addEventListener("DOMContentLoaded", function() {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        body {
           /* background: #f5dcdc; */
        }
          .header {
              background-color: white;
              padding: 10px 20px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
      
          .logo {
              font-size: 24px;
              font-weight: bold;
              color: #333; /* Dark gray color */
              text-decoration: none; /* Remove default link underline */
          }
          .logo img{
            max-width: 100px;
          }
      
          .menu-icon {
              cursor: pointer;
              font-size: 20px;
              color: #333; /* Dark gray color */
          }
      
          .menu-items {
              display: none;
              background-color: white;
              padding: 10px 20px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
      
          .menu-items.active {
              display: block;
              animation: slide-down 0.3s ease forwards;
          }
      
          @keyframes slide-down {
              from {
                  transform: translateY(-50%);
                  opacity: 0;
              }
              to {
                  transform: translateY(0);
                  opacity: 1;
              }
          }
      
          .menu-items ul {
              list-style-type: none;
              padding: 0;
              margin: 0;
          }
      
          .menu-items li {
              margin-bottom: 10px;
          }
      
          /* Media query for mobile devices */
          @media only screen and (max-width: 600px) {
              .header {
                  padding: 10px;
              }
      
              .logo {
                  font-size: 20px;
              }
              
              .logo img{
                max-width: 80px;
              }
      
              .menu-icon {
                  font-size: 18px;
              }
      
              .menu-items {
                  padding: 10px;
              }
          }
          #api, #contact, #share{
            position: fixed;
            top: 30px;
            max-height: 80%;
            overflow-y: auto;
            z-index: 100;
          }
          .close-icon{
            float: right;
          }
        .qna, .question, .answer {
            background: #ebeef1;
            padding: 10px;
            border: none;
            border-radius: 10px;
            color: #552bbe;
            box-shadow: 10px 10px 10px -1px rgba(10,99,169,0.16),
                        -10px -10px 10px -1px rgba(255,255,255,0.7);
            margin-bottom: 10px;
            overflow-y: auto;
        }
        .question, .answer {
            box-shadow: inset 10px 10px 10px -1px rgba(10,99,169,0.16),
                        inset -10px -10px 10px -1px rgba(255,255,255,0.7);
            margin-left: 20%;
            margin-bottom: 10px;
            color: #2b96be;
            font-size: 18px;
            font-weight: 600;
            font-style: italic;
            text-align: right;
            padding-left: 20%;
            overflow-x: auto;
        }
        .answer {
            color: #085015;
            text-align: left;
            font-weight: 450;
            font-style: normal;
            padding-left: 10px;
            margin: 0px;
            margin-right: 3%;
            margin-bottom: 10px;
        }
        .answer table {
            box-shadow: 10px 10px 10px -1px rgba(10,99,169,0.16),
                        -10px -10px 10px -1px rgba(255,255,255,0.7);
            border: none;
            border-radius: 10px;
            padding: 10px;
            margin: 10px;
            margin-left: 20px;
            color: #085015;
            font-weight: 450;
        }
        table tbody tr td {
            border-top: 2px solid #bed6ea;
            border-right: 2px solid #bed6ea;
            border-radius: 5px;
        }
        .loader {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
        .fixed-container {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: #f0f0f0;
            padding: 10px;
            box-sizing: border-box;
        }
        .fixed-container textarea {
            width: calc(100% - 80px);
            padding: 5px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 5px 0 0 5px;
            outline: none;
        }
        .fixed-container button {
            width: 70px;
            padding: 7px;
            border: none;
            background-color: #007bff;
            color: #fff;
            border-radius: 0 5px 5px 0;
            cursor: pointer;
        }
    `;
    document.getElementsByTagName('head')[0].appendChild(style);
});

function adjustQnaHeight() {
    var fixedContainer = document.querySelector('.fixed-container');
    var content = document.getElementById('qna');
    var missingElement = '';

    if (!fixedContainer) {
        missingElement = '.fixed-container';
    } else if (!content) {
        missingElement = '#qna';
    }

    if (missingElement !== '') {
        console.error('Element ' + missingElement + ' not found.');
        return missingElement;
    }

    var fixedContainerHeight = fixedContainer.offsetHeight;
    var windowHeight = window.innerHeight;

    if (!windowHeight || !fixedContainerHeight) {
        console.error('Window height or fixed container height not available.');
        return 'Window height or fixed container height not available.';
    }

    content.style.height = windowHeight - fixedContainerHeight - 150 + 'px';
}


    window.onload = function() {
        adjustQnaHeight();
    };

    window.onresize = function() {
        adjustQnaHeight();
    };
    
function convertToBold(text) {
    text = text['split']("\n");
    for (let i = 0; i < text['length']; i++) {
        text[i] = text[i]['replace'](/\*\*(.*?)\*\*/g, "<b>$1</b>");
    }
    return text['join']("\n");
}

function convertToHeadings(strings) {
    let inCodeTag = false;
    return strings.map(str => {
        if (/<code>/.test(str)) {
            inCodeTag = true;
            return str;
        } else if (/<\/code>/.test(str)) {
            inCodeTag = false;
            return str;
        } else if (!inCodeTag) {
            if (/^\s*####/.test(str)) {
                return "<h4>" + str.replace(/^\s*####/, '') + "</h4>";
            } else if (/^\s*###/.test(str)) {
                return "<h3>" + str.replace(/^\s*###/, '') + "</h3>";
            } else if (/^\s*##/.test(str)) {
                return "<h2>" + str.replace(/^\s*##/, '') + "</h2>";
            } else if (/^\s*#/.test(str)) {
                return "<h1>" + str.replace(/^\s*#/, '') + "</h1>";
            } else {
                return str;
            }
        } else {
            return str;
        }
    }).join("\n");
}


function convertToUnorderedList(strings) {
    let isInList = false;
    let result = '';

    strings['forEach'](str => {
        if (/^\s*\*/['test'](str)) {
            if (!isInList) {
                result += '<ul>\n';
                isInList = true;
            }
            result += '<li>' + str['replace'](/^\s*\*/, '') + '</li>\n';
        } else {
            if (isInList) {
                result += '</ul>';
                isInList = false;
            }
            result += str + '\n';
        }
    });

    if (isInList) {
        result += '</ul>\n';
    }

    return result;
}

function convertToUnorderedList2(strings) {
    let isInList = false;
    let result = '';

    strings.forEach(str => {
        if (/^\s*-/.test(str)) {
            if (!isInList) {
                result += '<ul>\n';
                isInList = true;
            }
            result += '<li>' + str.replace(/^\s*-\s*/, '') + '</li>\n';
        } else {
            if (isInList) {
                result += '</ul>';
                isInList = false;
            }
            result += str + '\n';
        }
    });

    if (isInList) {
        result += '</ul>\n';
    }

    return result;
}

function convertToOrderedList(strings) {
    let isInList = false;
    let result = '';
    let currentOrder = 0;

    strings.forEach(str => {
        const match = str.match(/^\s*\d+\./);
        if (match) {
            const order = parseInt(match[0]);
            if (!isInList || order !== currentOrder) {
                if (isInList) {
                    result += '</ol>\n';
                }
                result += '<ol>\n';
                isInList = true;
                currentOrder = order;
            }
            result += '<li>' + str.replace(/^\s*\d+\./, '').trim() + '</li>\n';
        } else {
            if (isInList) {
                result += '</ol>\n';
                isInList = false;
            }
            result += str + '\n';
        }
    });

    if (isInList) {
        result += '</ol>\n';
    }

    return result;
}

function encodehtml(s) {
    return s.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
}


function convertToCodeBlock(strings) {
    let isInCodeBlock = false;
    let result = '';

    strings.forEach(str => {
        const matches = str.match(/^\s*```(\w*)/);
        if (matches) {
            const lang_name = matches[1] || '';
            if (isInCodeBlock) {
                result += '\n</code></pre>\n';
                isInCodeBlock = false;
            } else {
                result += '<pre class="language-' + lang_name + '"><code>\n';
                isInCodeBlock = true;
            }
        } else {
            if (isInCodeBlock) {
                result += encodehtml(str) + '\n';
            } else {
                result += str + '\n';
            }
        }
    });

    if (isInCodeBlock) {
        result += '</code></pre>\n';
    }

    return result.trim();
}

function convertBacktickToBoldHtmlentities(text) {
    for (let i = 0; i < text.length; i++) {
        text[i] = text[i].replace(/`([^`]+)`/g, function(match, p1) {
            return '<b>' + p1 + '</b>';
        });
    }
    return text.join("\n");
}

function convertToTable(strings) {
    let isInTable = false;
    let result = '';

    strings.forEach(str => {
        if (/^\s*\|/.test(str)) {
            if (!isInTable) {
                result += '<table>\n';
                isInTable = true;
            }

            const columns = str.split('|').map(col => col.trim()).filter(col => col.length > 0);

            if (result.indexOf('<thead>') === -1) {
                result += '<thead><tr>\n';
                result += columns.map(col => '<th>' + convert(col) + '</th>').join('') + '\n';
                result += '</tr></thead><tbody>\n';
            } else {
                result += '<tr>\n';
                result += columns.map(col => '<td>' + convert(col) + '</td>').join('') + '\n';
                result += '</tr>\n';
            }
        } else {
            if (isInTable) {
                result += '</tbody></table>\n';
                isInTable = false;
            }
            result += str + '\n';
        }
    });

    if (isInTable) {
        result += '</tbody></table>\n';
    }

    return result;
}

function removeBrTagsUnderTable(html) {
    const pattern = /<table\b[^>]*>(.*?)<\/table>/gis;

    html = html.replace(pattern, match => {
        return match.replace(/<br\s*\/?>/g, '');
    });

    return html;
}

function convert(text) {
    
    let strings = text;
  
    strings = convertToBold(strings);
  
    strings = strings.split("\n");
    strings = convertToUnorderedList(strings);
  
    strings = strings.split("\n");
    strings = convertToUnorderedList2(strings);
  
    strings = strings.split("\n");
    strings = convertToOrderedList(strings);
  
    strings = strings.split("\n");
    strings = convertToCodeBlock(strings);
    
    strings = strings.split("\n");
    strings = convertToHeadings(strings);
  
    strings = strings.split("\n");
    strings = convertBacktickToBoldHtmlentities(strings);
  
    strings = strings.split("\n");
    strings = convertToTable(strings);
  
    strings = strings.replace("\n", "<br>");
    strings = removeBrTagsUnderTable(strings);
  
    return strings;
}

let isGeneratingAnswer = false;
let lastQuestion = "";
let lastAnswer = "";
let storeQnaHistory = "";
let data = " ";

document.getElementById('questionForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  if(isGeneratingAnswer){
    return 0;
  }
  isGeneratingAnswer = true;
  
  
  currentQuestion = document.getElementById('question').value;
  document.getElementById('question').value = "";
  document.getElementById('qna').innerHTML += "<div class='question'>" + encodehtml(currentQuestion) + "</div>";
  document.getElementById('qna').innerHTML += "<div class='answer' id='loadingDiv'><i id='loadingIcon' class='fas fa-spinner fa-spin loader'></i></div>";
  autoScroll();
  
  let previousQna = "";
  if(lastQuestion!=""){
    previousQna = "User: \"" + lastQuestion + "\"\nModel: \"" + lastAnswer + "\"\n";
  }
  
  const question = "You are 'iticGPT' created by 'Sir Reon'. Write in Bangla. Use heading, list, table, math and code example when responding.\n" + previousQna + "User: \"" + currentQuestion + "\"";
  const all_api = ['AIzaSyBrB6k9WsoxTDe5-Ya-iFbnv4FhbCQpdJA','AIzaSyAgnjScIP7dYkLn31pgX2k2cDcxPIp0eFE','AIzaSyCdNs3CIFJgTTRNji6l-dtytyPXA1z0cTY','AIzaSyBcThRSvLhBrBF0gZU--B4wqIjsPSJ-OiE','AIzaSyCOt6-Pr6dKcSu0SioqGW3wMCfnMGEdQNc','AIzaSyCOCxNcyz9HxQ1jBFgYdkPZAPLvgFL_EFY','AIzaSyBIntJJbCua2z1owpfeor03sGn1x42095s'];
  const apiKey = getRandomValueFromArray(all_api);
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey;

    data = {
            contents: [
                  {
                    parts : [
                      {
                       text: question
                      }
                     ]
                  }
            ]
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(responseData => {
            lastAnswer = responseData.candidates[0].content.parts[0].text;
            lastQuestion = currentQuestion;
            removeLoadingDiv();
            document.getElementById("qna").innerHTML += "<div class='answer'>" + convert(lastAnswer) + "</div>";
            isGeneratingAnswer = false;
            autoScroll();
        })
        .catch(error => console.error('Error:', error));
    });

    function autoScroll() {
        var qnaDiv = document.getElementById('qna');
        qnaDiv.scrollTop = qnaDiv.scrollHeight; // Scroll to the bottom of the div
    }
    function removeLoadingDiv() {
        var loadingIcon = document.getElementById('loadingDiv');
        if (loadingIcon) {
            loadingIcon.parentNode.removeChild(loadingIcon);
        }
    }
    
    function getRandomValueFromArray(array) {
      return array[Math.floor(Math.random() * array.length)];
    }
    

function hideElementById(id) {
    var element = document.getElementById(id);
    if (element) {
        element.style.display = "none";
    }
}

///////////////////

function toggleMenu() {
    var menuItems = document.getElementById('menuItems');
    menuItems.classList.toggle('active');
}

///////////////////

function showElementById(id) {
    hideElementById("api");
    hideElementById("contact");
    hideElementById("share");
    
    var element = document.getElementById(id);
    if (element) {
        element.style.display = "block";
    } else {
        console.error("Element with ID '" + id + "' not found.");
    }
}

///////////////////

// Function to create and show the API div
function showApiDiv() {
  toggleMenu();
  
  hideElementById("api");
  hideElementById("contact");
  hideElementById("share");
    
  // Create div element for API container
  var apiDiv = document.createElement('div');
  apiDiv.className = 'qna';
  apiDiv.id = 'api';
  apiDiv.style.width = '80%';
  apiDiv.style.margin = '20px auto';

  // Create close icon div and set onclick event
  var closeIcon = document.createElement('div');
  closeIcon.className = 'close-icon';
  closeIcon.textContent = '✖️';
  closeIcon.onclick = function() {
    hideElementById('api');
  };
  apiDiv.appendChild(closeIcon);

  // Create h1 element for API heading
  var heading = document.createElement('h1');
  heading.textContent = 'API';
  apiDiv.appendChild(heading);

  // Create div element for answer
  var answerDiv = document.createElement('div');
  answerDiv.className = 'answer';
  
  // Create mark element for text
  var markElement = document.createElement('mark');
  markElement.innerHTML = '&nbsp;Coming Soon.&nbsp;';
  answerDiv.appendChild(markElement);

  apiDiv.appendChild(answerDiv);

  // Append the API div to the body
  document.body.appendChild(apiDiv);
}

///////////////////

// Function to create and show the Contact div
function showContactDiv() {
  toggleMenu();
  
  hideElementById("api");
  hideElementById("contact");
  hideElementById("share");
    
  // Create div element for Contact container
  var contactDiv = document.createElement('div');
  contactDiv.className = 'qna';
  contactDiv.id = 'contact';
  contactDiv.style.width = '80%';
  contactDiv.style.margin = '20px auto';

  // Create close icon div and set onclick event
  var closeIcon = document.createElement('div');
  closeIcon.className = 'close-icon';
  closeIcon.textContent = '✖️';
  closeIcon.onclick = function() {
    hideElementById('contact');
  };
  contactDiv.appendChild(closeIcon);

  // Create h1 element for Contact heading
  var heading = document.createElement('h1');
  heading.textContent = 'Contact';
  contactDiv.appendChild(heading);

  // Create div element for answer
  var answerDiv = document.createElement('div');
  answerDiv.className = 'answer';

  // Create bold and mark elements for contact information
  var boldElement = document.createElement('b');
  boldElement.textContent = 'For more information, Contact with me: ';

  var markElement = document.createElement('mark');
  markElement.innerHTML = '&nbsp;01763832002&nbsp;';

  boldElement.appendChild(markElement);
  answerDiv.appendChild(boldElement);

  contactDiv.appendChild(answerDiv);

  // Append the Contact div to the body
  document.body.appendChild(contactDiv);
}

///////////////////

function copyLink(text) {

    // Create a temporary input element
    var tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);

    // Select the text in the input element
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    // Inform the user
    alert("Text copied to clipboard: " + text);
}

///////////////////

// Function to create and show the Share div
function showShareDiv() {
  toggleMenu();
  
  hideElementById("api");
  hideElementById("contact");
  hideElementById("share");
    
  // Create div element for Share container
  var shareDiv = document.createElement('div');
  shareDiv.className = 'qna';
  shareDiv.id = 'share';
  shareDiv.style.width = '80%';
  shareDiv.style.margin = '20px auto';

  // Create close icon div and set onclick event
  var closeIcon = document.createElement('div');
  closeIcon.className = 'close-icon';
  closeIcon.textContent = '✖️';
  closeIcon.onclick = function() {
    hideElementById('share');
  };
  shareDiv.appendChild(closeIcon);

  // Create h1 element for Share heading
  var heading = document.createElement('h1');
  heading.textContent = 'Share';
  shareDiv.appendChild(heading);

  // Create div element for answer
  var answerDiv = document.createElement('div');
  answerDiv.className = 'answer';

  // Create h2 element for support heading
  var supportHeading = document.createElement('h2');
  supportHeading.textContent = 'Support';
  answerDiv.appendChild(supportHeading);

  // Create p element for share text
  var paragraph = document.createElement('p');
  paragraph.textContent = 'যদি আপনি এই ওয়েবসাইটকে সাপোর্ট করতে চান তবে নিচের ';

  // Create mark element for "Copy Link" button
  var markElement = document.createElement('mark');
  markElement.textContent = 'Copy Link';
  paragraph.appendChild(markElement);
  paragraph.innerHTML += ' বাটনে ক্লিক করে লিংকটি কপি করুন এবং সোশ্যাল মিডিয়ায় আপনার বন্ধুদের সাথে শেয়ার করুন।';
  answerDiv.appendChild(paragraph);

  // Create button element for "Copy Link" button
  var copyLinkButton = document.createElement('button');
  copyLinkButton.textContent = 'Copy Link';
  copyLinkButton.style.padding = '5px 10px';
  copyLinkButton.style.background = '#0e9b05';
  copyLinkButton.style.color = '#fff';
  copyLinkButton.style.fontWeight = '700';
  copyLinkButton.style.border = 'none';
  copyLinkButton.onclick = function() {
    copyLink('https://www.iticgpt.top');
  };
  answerDiv.appendChild(copyLinkButton);

  shareDiv.appendChild(answerDiv);

  // Append the Share div to the body
  document.body.appendChild(shareDiv);
}

///////////////////

