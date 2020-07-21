    /***  動畫 start    ****/ 

    // 同時間只會跑一次 動畫
    let toastShow = false;

    function showToast(word, successful) {
      document.getElementById('toastWord').innerHTML = word;
      if(successful == true) {
        $('.toast div').removeClass("alert-danger");
        $('.toast div').addClass("alert-success");
        $('.toast div:nth-child(2)').removeClass("alert-danger");
        $('.toast div:nth-child(2)').addClass("alert-success");
        $('.toast div svg rect').css({ fill: "lightgreen" });
      } else {

        $('.toast div').addClass("alert-danger");
        $('.toast div').removeClass("alert-success");
        $('.toast div:nth-child(2)').addClass("alert-danger");
        $('.toast div:nth-child(2)').removeClass("alert-success");
        $('.toast div svg rect').css({ fill: "#ff0000" });
      }
      if (toastShow == false) {
        toastShow = true;
        $('.toast').toast('show');
        $('.toast').addClass('animate__fadeInRight');

        setTimeout(() => {
          $('.toast').addClass('animate__fadeOutRight');
        }, 5500);
        setTimeout(() => {
          $('.toast').removeClass('animate__fadeInRight');
          $('.toast').removeClass('animate__fadeOutRight');
          $('.toast').removeClass('show');
          toastShow = false;
        }, 6000);
      }

    }
    /***  動畫 end    ****/    

