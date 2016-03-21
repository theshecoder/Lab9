angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.test = 'Hello world!';
    $scope.comments = [
      {title:'Comment 1', upvotes:5, photo: 'https://s-media-cache-ak0.pinimg.com/736x/e7/cf/f3/e7cff3be614f68782386bfbeecb304b1.jpg'},
      {title:'Comment 2', upvotes:6, photo: 'https://s-media-cache-ak0.pinimg.com/736x/e7/cf/f3/e7cff3be614f68782386bfbeecb304b1.jpg'},
      {title:'Comment 3', upvotes:1, photo: 'https://s-media-cache-ak0.pinimg.com/736x/e7/cf/f3/e7cff3be614f68782386bfbeecb304b1.jpg'},
      {title:'Comment 4', upvotes:4, photo: 'https://s-media-cache-ak0.pinimg.com/736x/e7/cf/f3/e7cff3be614f68782386bfbeecb304b1.jpg'},
      {title:'Comment 5', upvotes:3, photo: 'https://s-media-cache-ak0.pinimg.com/736x/e7/cf/f3/e7cff3be614f68782386bfbeecb304b1.jpg'}
    ];
    $scope.create = function(comment) {
    return $http.post('/comments', comment).success(function(data){
      $scope.comments.push(data);
    });
  };
    $scope.addComment = function() {
      $scope.create({title:$scope.formContent,upvotes:0,photo:$scope.photoContent});
      $scope.formContent='';
	  $scope.photoContent='';
    };
    $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes += 1;
        });
    };
   $scope.incrementUpvotes = function(comment) {
       $scope.upvote(comment);
    };
   $scope.getAll = function() {
    return $http.get('/comments').success(function(data){
      angular.copy(data, $scope.comments);
    });
  };
   $scope.getAll(); 
  }
]);
