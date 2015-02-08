function ChatCtrl($scope, $document, socket) {
    $scope.message = "";
    $scope.messages = [];

    $scope.sendMessage = function() {
      socket.emit('chat message', $scope.message);
      $scope.message = "";
    };

    socket.on('chat message', function(data) {
      $scope.messages.unshift(data);
    });
}
