$(function(){
  function buildHTML(message){
   if ( message.image ) {
     var html =
     `<div class="message" data-message-id=${message.id}>
        <div class="chat-main__message-case">
          <div class="chat-main__message-case-list">
            ${message.user_name}
          </div>
            <div class="chat-main__message-case-list-date">
            ${message.created_at}
          </div>
        </div>
          <div class="chat-main__message-case-comment">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
            <img src=${message.image} class = "lower-message__image">
      </div>`
     return html;
   } else {
     var html =
     `<div class="message" data-message-id=${message.id}>
        <div class="chat-main__message-case">
          <div class="chat-main__message-case-list">
          ${message.user_name}
        </div>
            <div class="chat-main__message-case-list-date">
          ${message.created_at}
        </div>
        </div>
        <div class="chat-main__message-case-comment">
        <p class="lower-message__content">
          ${message.content}
        </p>
      </div>
    </div>`
     return html;
   };
 }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.chat-main__message').append(html);
        $('form')[0].reset();
        $('.box').animate({'height' : '200px'});
        $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
        $('.form__box-submit').prop('disabled', false);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
      });
  });

 var reloadMessages = function() {
  var last_message_id = $('.message:last').data("message-id");
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
     .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.chat-main__message').append(insertHTML);
      $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
      }
      })
  }
      if (document.location.href.match(/\/groups\/\d+\/messages/)) {
        setInterval(reloadMessages, 7000);
        }
});