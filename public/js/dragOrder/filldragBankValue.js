// export function filldragBankValue(data) {
//     console.log('data:', data);

//     function createUlLi(data) {
//         var ul = document.createElement('ul');
//         var dragContainer = document.getElementById('dragContainer');
//         ul.setAttribute('class', 'list');
//         ul.setAttribute('id', 'dragList');
//         data.forEach((item) => {
//             const li = document.createElement('li');
//             li.innerHTML = `${item.name}`;
//             li.setAttribute('draggable', true);
//             li.setAttribute('class', 'draggable li-item');
//             li.setAttribute('value', `${item.id}`);
//             ul.appendChild(li);
//         });
//         dragContainer.appendChild(ul);
//     }
//     createUlLi(data);


//     function setDragList() {
//         var cols = document.querySelectorAll('#dragList li');
//         var dragSrcEl = null;

//         cols.forEach(function (listLi) {
//             listLi.addEventListener('dragstart', handleDragStart, false);
//             listLi.addEventListener('dragenter', handleDragEnter, false);
//             listLi.addEventListener('dragover', handleDragOver, false);
//             listLi.addEventListener('dragleave', handleDragLeave, false);
//             listLi.addEventListener('drop', handleDrop, false);
//             listLi.addEventListener('dragend', handleDragEnd, false);
//         })

//         function handleDragStart(e) {
//             this.classList.add('dragging');
//             dragSrcEl = this;
//             e.dataTransfer.effectAllowed = 'move';
//             e.dataTransfer.setData('text/html', this.innerHTML);
//         }

//         function handleDragEnter(e) {
//             this.classList.add('dragover');
//         }

//         function handleDragOver(e) {
//             if (e.preventDefault) {
//                 e.preventDefault();
//             }
//             e.dataTransfer.dropEffect = 'move';
//             return false;
//         }

//         function handleDragLeave(e) {
//             this.classList.remove('dragover');
//         }

//         function handleDrop(e) {
//             if (e.stopPropagation) {
//                 e.stopPropagation();
//             }
//             if (dragSrcEl != this) {
//                 dragSrcEl.innerHTML = this.innerHTML;
//                 this.innerHTML = e.dataTransfer.getData('text/html');
//             }
//             return false;
//         }

//         function handleDragEnd(e) {
//             [].forEach.call(cols, function (col) {
//                 col.classList.remove('dragover');
//                 col.classList.remove('dragging');

//             });
//         }
//     }

//     setDragList()



// }