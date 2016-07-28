angular.module('Scatterplot', [])
    .controller('HomeController', function ($scope, $rootScope) {
        $scope.name = 'Adnan'
        $scope.btn = 'Parse'
        $scope.files = []
        $scope.pparse = function (e) {

        }
        var xScale, yScale, xAxis, yAxis, xGrid, yGrid;

        $rootScope.$on('csv', function (ev, data) {
            if (data.errors.length) {
                console.log('ERROR ON CSV', data.errors);
                alert('ALERT !! \n check console');
            }else{
                console.log('Data ON CSV', data.data);
                $scope.files = data.data;
                $scope.initScatterPlot();
            }
        })
        $scope.initScatterPlot = function () {
            //d3.select('#graphPlot').append('div').attr('id', 'graphPlot')
            $scope.sepXY();
            var w= 900, h = 500;
            var numTicksX= 5, numTicksY = 9;

            var svg = d3.select("svg")
                //.append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("style", 'border:1px solid; margin-left:auto; margin-right:auto')
                //.append("svg:g")
                //.attr("transform", "translate(" + m[3] + "," + m[0] + ")");

            var g = svg.append("g").attr('transform', 'translate(50, 50)')

            var gx = g.append("g").attr('transform', 'translate(0, '+(h-100)+')')
                .attr('class', 'x')


            xScale = d3.scale.linear().domain([ d3.min($scope.xVal), d3.max($scope.xVal) ]).nice().range([0, w-100]);
            yScale = d3.scale.linear().domain([ d3.max($scope.yVal), d3.min($scope.yVal) ]).nice().range([0, h-100]);

            // X & Y axes and alter ticks & labels
            xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(numTicksX);
            yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(numTicksY);


            g.call(yAxis);
            gx.call(xAxis);

            var circle = svg.append('circle')
                .data({x: $scope.xVal, y:$scope.yVal})
                .enter()
                .append('circle')

            circle
                .attr('cx', function (d, i) {
                    console.log(d, i)
                })
                .attr('cy', function (d, i) {
                    console.log(d, i)
                })
                .attr('r', 5)
                //.attr({'cx':80, 'cy': 60, 'r':5})
                .style('fill', 'red')


            //var circle = svg.append('circle')
            //    .attr({'cx':80, 'cy': 60, 'r':5})
            //    .style('fill', 'red')

            /*

            xGrid = d3.svg.axis().scale(xScale).orient("bottom").ticks(numTicksX);
            yGrid = d3.svg.axis().scale(yScale).orient("left").ticks(numTicksY);*/

        }
        $scope.sepXY = function () {
            $scope.vars = $scope.files.shift();


            $scope.x = $scope.files.map(function(item){
                return item[0]
            })
            $scope.y = $scope.files.map(function(item){
                return item[1]
            })


            $scope.xVal = $scope.x.filter(function(item){
                return item && item != null && item !=''
            }).map(function(item){
                return item
            })
            $scope.yVal = $scope.y.filter(function(item){
                return item && item != null && item !=''
            }).map(function(item){
                return item
            })

            console.log('$scope.x = ', $scope.x)
            console.log('$scope.y = ', $scope.y)
            console.log('$scope.xVal = ', $scope.xVal)
            console.log('$scope.yVal = ', $scope.yVal)
        }
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

