angular.module('bot-stash', ['ngMaterial'])
    .controller('AppCtrl', function($scope) {
        $scope.imagePath = 'img/washedout.png';
        $scope.bots = [{'title' : 'BotStash', 'description' : ' A curated list of 110+ bots', 'upvotes' : 12, 'comments' : '500', "tags" :[
            {
                "name" : "Default",
                "color" : "#57105E"
            }
        ]},{'title' : 'Trello Manager', 'description' : ' Super Charge with power of Trello','upvotes' : 12, 'comments' : '500'}];
    });
