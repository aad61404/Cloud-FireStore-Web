$('#exampleFormControlSelect1').change(function () {
  console.log($('#exampleFormControlSelect1')[0].value);
  var giftTextLength = $('#exampleFormControlSelect1')[0].value;
  drawComponent(giftTextLength);
});


var object = {
    gift: {
        isShow: true,
        texts: [
          {
            條件: '單月分期累積滿額NT$25,000(含以上)',
            贈送: '享250元回饋金',
            備註: '',
          },
          {
            條件: '單月分期累積滿額NT$35,000(含以上)',
            贈送: '享350元回饋金',
            備註: '',
          },
          {
            條件: '單月分期累積滿額NT$55,000(含以上)',
            贈送: '享888元回饋金',
            備註: '',
          },
        ],
        begDt: '2020/07/01',
        endDt: '2020/09/30',
        注意事項: '',
        領取條件: '',
      },
}

function drawComponent(num) {
  console.log('num:', num);

  var giftContainer = document.getElementById('gift-container');
//   giftContainer.removeChild()
    for(let i=1; i<= num; i++) {
        console.log('object.gift.texts[i]', object.gift.texts[i]);
        var component = document.createElement('div');
        component.classList.add("gift-"+i);
        component.innerHTML = `
            <h3>優惠<span></span></h3>
            消費條件
            <input type="text" >
            <br />
            贈送
            <input type="text" >
            <br />
            備註
            <input type="text ">
        `
        ;
        

        // Object.keys(object.gift.texts[i]).forEach((item)=> console.log(item))

        giftContainer.appendChild(component);
    }
  

     // $('.gift-'+(j+1)+' input')[j].value = Object.keys(object.gift.texts[j])[j];
 
  
}





