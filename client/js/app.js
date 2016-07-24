angular.module('Scatterplot', [])
    .controller('HomeController', function ($scope, $rootScope) {
        $scope.name = 'Adnan'
        $scope.btn = 'Parse'
        $scope.files = []
        $scope.pparse = function (e) {
            
        }
        $rootScope.$on('csv', function (ev, data) {
            if (data.errors.length) {
                console.log('ERROR ON CSV', data.errors);
                alert('ALERT !! \n check console');
            }else{
                console.log('Data ON CSV', data.data);
                $scope.files = data.data;
            }
        })
    })
    .directive("ngFileSelect", function () {
        return {
            link: function ($scope, el) {
                el.bind("change", function (e) {
                    $scope.file = (e.srcElement || e.target).files[0];

                    $('#files').parse({
                        config: {
                            complete: function (data) {
                                $scope.$emit('csv', data);
                            }
                        },
                        before: function (file, inputElem) {
                            console.log("Parsing file:", file);
                        },
                        complete: function (data) {
                            console.log("Done with all files.");
                        }
                    });

                    // Papa.parse($scope.file[0], {
                    //     before: function(file, inputElem) {
                    //         console.log("Parsing file:", file);
                    //     },
                    //     complete: function (results) {
                    //         console.log("Finished:", results);
                    //     }
                    // });
                });
            }
        }
    })

