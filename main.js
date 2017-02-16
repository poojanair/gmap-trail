angular.module('myApp', ['uiGmapgoogle-maps','dahr.ng-haversine'])
        .controller("gmapCtrl", function($scope,$http, uiGmapIsReady,$haversine) {
                $scope.map;
				$scope.markers = [];
				$scope.markerId = 1;
				
				$scope.findNearest = function(lat,lon)
				{		
					var coord1 = { "latitude": lat, "longitude": lon};
					var closestLat = 0;
					var closestLon = 0;
					var shortestDistance=Number.MAX_VALUE;
					var distance=0;
					
					angular.forEach($scope.markers, function(value, key){
						  var coord2 = { "latitude": value.latitude, "longitude": value.longitude};
						  
						  distance = $haversine.distance(coord1, coord2);
						  if(shortestDistance > distance){
							  shortestDistance = distance;
							  closestLat = coord2.latitude;
							  closestLon = coord2.longitude;
						  }
				    });
					document.getElementById("ShortestDistance").innerHTML = "<b>Shortest Distance:</b>"+Math.round(shortestDistance*0.00062137)+"Miles, ";
					document.getElementById("lat").innerHTML = " <b>Latitude:</b>"+closestLat;
					document.getElementById("lon").innerHTML = ", <b>Longitude:</b>"+closestLon;
				};
				
				$scope.deleteValues = function(index)
				{					
				   $scope.markers.splice(index, 1);
				   $scope.modifyField = false;
				   $scope.viewField = false;
				};
								
				$scope.add = function(){
				   var data = {};
				   data.latitude ='' ;
				   data.longitude ='';
				   data.title ='' ;
				   data.id =$scope.markers+1;
				   data.icon ="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
				   $scope.markers.push(data);
				   $scope.modifyField = true;
				   $scope.viewField = true;
				   
				   var element = document.getElementById("it");
				   var tableht = document.getElementById("tt").clientHeight;
				   element.scrollTop = tableht;
				};
	
				$scope.modify = function(tableData){
				   $scope.modifyField = true;
				   $scope.viewField = true;
				};

				$scope.update = function(tableData){
					$scope.modifyField = false;
					$scope.viewField = false;
				};
				
				$scope.loadValues = function(){
					$http.get('pct-data.json').then(function(d) {
					gmarkers = [];
					for (var i=0; i < (d.data).length; i++) {
							gmarkers.push({
								latitude: d.data[i][1],
								longitude: d.data[i][2],
								title: d.data[i][0],
								id: i,
								icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
							});
					};
					$scope.markers = [];
        
					uiGmapIsReady.promise()                    
						.then(function(instances) {           
						   $scope.markers = gmarkers;
						});
						 
					$scope.map = {
								center: {
											latitude: 40.583333,
											longitude: -122.366667
									},
								markers: $scope.markers,
								zoom: 8
					};
				}); 
			 };
			 				
			 $scope.map = {
                        center: {
                                latitude: 40.583333,
                                longitude: -122.366667
                        },
						markers: [],
     					zoom: 8
             };
});