export function filldragBankValue(data) {
  console.log('data:', data);
  var ul = document.createElement('ul');
  ul.setAttribute('class', 'list');
  ul.setAttribute('id', 'dragList');
  data.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `${item}`;
    li.setAttribute('draggable', true);
    li.setAttribute('class', 'draggable li-item');
    ul.appendChild(li);
  });

  var dragContainer = document.getElementById('dragContainer');
  dragContainer.appendChild(ul);
}
