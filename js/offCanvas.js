function openCanvas(){
    // document.querySelector('.offcanvas-btn').classList.toggle('offcanvas-btn-open');
    // document.querySelector('.offcanvas-aside').classList.toggle('offcanvas-aside-open');    
    $('.offcanvas-btn').toggleClass('offcanvas-btn-open');
    $('.offcanvas-aside').toggleClass('offcanvas-aside-open'); 

}

function submit(){
    var myEmail = 'yosizemertov@gmail.com'
    var msg = $(".msg").val();
    var email = $(".email").val();
    var subject = $(".subject").val();
    
    console.log($(".msg").val());
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${subject}
    &body=${msg +'   ' + email}`)
}


