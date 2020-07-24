var box = { 
    刷卡滿額禮: {
    '0': [
      '單筆滿NT6,000(含)以上',
      '享6%現金回饋，累計上限NT$600',
      '限量3000名',
    ],
    '1': [
      '累積消費每滿NT$666',
      '「累積旅遊消費全額刷卡金回饋」抽獎機會乙次',
      '最高回饋刷卡金NT$66,666，共十名',
    ],
  }
};

var btn = document.getElementById('btn');
btn.addEventListener('click', function () {
    var section = document.createElement('section');
    section.setAttribute('id', 1);
    document.getElementById('wrapper').appendChild(section); //apendvame tuka kum bodito
    
    var h3 = document.createElement('h3');
    h3.innerText = document.getElementById('sectionText').value;
    section.appendChild(h3);
    var input = document.createElement('INPUT');
    input.setAttribute('type', 'text')
    section.appendChild(input);
    var btn = document.createElement('button');
    btn.innerText = 'New List Item'
    var deleteBtn = document.createElement('button');
    deleteBtn.innerText = "X";
    deleteBtn.addEventListener('click', function() {
        section.remove();
    })

    var ul = document.createElement('ul');
    ul.setAttribute('class', 'listItem');
    ul.setAttribute('class', 'show');
    var hidden = document.createElement('button');
    hidden.innerText = "hide/show";
    hidden.addEventListener('click', function() {
        if(ul.classList.contains('show')) {
            input.classList.remove('initial');
            input.classList.add('hidden');
            btn.classList.remove('inline-block');
            btn.classList.add('hidden');
            ul.classList.remove('show');
            ul.classList.add('hidden');
        } else {
            input.classList.remove('hidden');
            input.classList.add('initial');
            btn.classList.remove('hidden');
            btn.classList.add('inline-block');
            ul.classList.remove('hidden');
            ul.classList.add('show');
        }
    })

    h3.appendChild(deleteBtn);
    h3.appendChild(hidden);
    section.appendChild(btn);


    btn.addEventListener('click', function () {
        var itemText = document.createElement('INPUT');
        itemText.setAttribute('type', 'text');
        itemText.setAttribute('id', 'text');
        itemText.setAttribute('value', this.previousElementSibling.value);
        ul.appendChild(itemText);
        var li = document.createElement('li');
        var itemDelete = document.createElement('button');
        itemDelete.innerText = 'X';
        itemDelete.addEventListener('click', function() {
            li.remove();  
        })
        li.appendChild(itemText);
        li.appendChild(itemDelete);
        ul.appendChild(li);

        input.parentNode.insertBefore(ul, input);
    }, false);
})



// 
// 
// 
// 
// 
// 
var enterButton = document.getElementById("enter");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul");
var item = document.getElementsByTagName("li");

function inputLength(){
	return input.value.length;
} 

function listLength(){
	return item.length;
}

function createListElement() {
	var li = document.createElement("li"); // creates an element "li"
	li.appendChild(document.createTextNode(input.value)); //makes text from input field the li text
	ul.appendChild(li); //adds li to ul
	input.value = ""; //Reset text input field


	//START STRIKETHROUGH
	// because it's in the function, it only adds it for new items
	function crossOut() {
		li.classList.toggle("done");
	}

	li.addEventListener("click",crossOut);
	//END STRIKETHROUGH


	// START ADD DELETE BUTTON
	var dBtn = document.createElement("button");
	dBtn.appendChild(document.createTextNode("X"));
	li.appendChild(dBtn);
	dBtn.addEventListener("click", deleteListItem);
	// END ADD DELETE BUTTON


	//ADD CLASS DELETE (DISPLAY: NONE)
	function deleteListItem(){
		li.classList.add("delete")
	}
	//END ADD CLASS DELETE
}


function addListAfterClick(){
	if (inputLength() > 0) { //makes sure that an empty input field doesn't create a li
		createListElement();
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.which ===13) { //this now looks to see if you hit "enter"/"return"
		//the 13 is the enter key's keycode, this could also be display by event.keyCode === 13
		createListElement();
	} 
}


enterButton.addEventListener("click",addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

