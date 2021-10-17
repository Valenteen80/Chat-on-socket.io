$(function () {
  const socket = io.connect("http://localhost:3000");

  const message = $("#message");
  const username = $("#username");
  const send_message = $("#send_message");
  const send_username = $("#send_username");
  const chatroom = $("#chatroom");
  const feedback = $("#feedback");

  send_message.click(() => {
    socket.emit("new_message", {
      message: message.val(),
      className: alertClass,
    });
  });
  const min = 1;
  const max = 6;
  let random = Math.floor(Math.random() * (max - min)) + min;

  // Устаналиваем класс в переменную в зависимости от случайного числа
  // Эти классы взяты из Bootstrap стилей
  let alertClass;
  switch (random) {
    case 1:
      alertClass = "secondary";
      break;
    case 2:
      alertClass = "danger";
      break;
    case 3:
      alertClass = "success";
      break;
    case 4:
      alertClass = "warning";
      break;
    case 5:
      alertClass = "info";
      break;
    case 6:
      alertClass = "light";
      break;
  }

  socket.on("add_mess", (data) => {
    feedback.html("");
    message.val("");
    chatroom.append(
      "<div class='alert alert-" +
        data.className +
        "'<b>" +
        data.username +
        "</b>: " +
        data.message +
        "</div>"
    );
  });

  send_username.click(() => {
    if (username.val() === "") {
      socket.emit("change_username", { username: "Ананім" });
    } else {
      socket.emit("change_username", { username: username.val() });
    }
  });

  message.bind("keypress", () => {
    socket.emit("typing");
  });

  socket.on("typing", (data) => {
    feedback.html(
      "<p><i>" + data.username + " печатает сообщение..." + "</i></p>"
    );
  });
});
