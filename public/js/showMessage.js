/***  動畫 start    ****/

// 同時間只會跑一次 動畫
let opentimer;
let closetimer;
export function showMessage(word, successful) {
  let toastShow = false;
  document.getElementById('toastWord').innerHTML = word;

  if (successful == true) {
    $('.toast div').removeClass('alert-danger');
    $('.toast div').addClass('alert-success');
    $('.toast div:nth-child(2)').removeClass('alert-danger');
    $('.toast div:nth-child(2)').addClass('alert-success');
    $('.toast div svg rect').css({ fill: 'lightgreen' });
  } else {
    $('.toast div').addClass('alert-danger');
    $('.toast div').removeClass('alert-success');
    $('.toast div:nth-child(2)').addClass('alert-danger');
    $('.toast div:nth-child(2)').removeClass('alert-success');
    $('.toast div svg rect').css({ fill: '#ff0000' });
  }
  //   console.log('timer:', timer)
  clearTimeout(opentimer);
  clearTimeout(closetimer);

  $('.toast').removeClass('animate__fadeInRight');
  $('.toast').toast('show');
  $('.toast').addClass('animate__fadeInRight');

  opentimer = window.setTimeout(() => {
    $('.toast').addClass('animate__fadeOutRight');
  }, 3500);

  closetimer = window.setTimeout(() => {
    $('.toast').removeClass('animate__fadeInRight');
    $('.toast').removeClass('animate__fadeOutRight');
    $('.toast').removeClass('show');
  }, 3700);

}
/***  動畫 end    ****/
