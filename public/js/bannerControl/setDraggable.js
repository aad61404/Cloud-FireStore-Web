// 範例
// https://glitch.com/~simple-drag-drop
// 文章
// https://web.dev/drag-and-drop/
export function setDraggable() {
  // document.addEventListener('DOMContentLoaded', (event) => {
  var dragSrcEl = null;
  var allBoxClass = document.querySelectorAll('#bannerContainer .box');
    allBoxClass.forEach((item) => {
      item.classList.add('transparent')
    })

  function handleDragStart(e) {
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
  }

  function handleDragEnter(e) {
    items.forEach(function (item) {
      item.classList.remove('over');
    });
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    if ( e.target.className == "banner box" ) {
      this.classList.remove('over');
    }
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    items.forEach(function (item) {
      item.classList.remove('over');
    });
  }

  // let item2s = document.querySelectorAll('.container .box');
  let items = document.querySelectorAll('#bannerContainer .banner');
  items.forEach(function (item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });

  // item2s.forEach(function(item) {
  //   item.addEventListener('dragstart', handleDragStart, false);
  //   item.addEventListener('dragenter', handleDragEnter, false);
  //   item.addEventListener('dragover', handleDragOver, false);
  //   item.addEventListener('dragleave', handleDragLeave, false);
  //   item.addEventListener('drop', handleDrop, false);
  //   item.addEventListener('dragend', handleDragEnd, false);
  // });
  // });
}
