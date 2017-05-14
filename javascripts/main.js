app.run((FIREBASE_CONFIG) => {
  firebase.initializeApp(FIREBASE_CONFIG);
});

app.controller("MushroomCtrl", ($http, $q, $scope, FIREBASE_CONFIG) => {
	// $scope.showListView = true;
	$scope.mushrooms = [];


  let getMushroomList = () => {
    let mushroomz = [];
    return $q ((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/mushrooms.json`)
      .then((firebaseItems) => {
          let itemCollection = firebaseItems.data;
          Object.keys(itemCollection).forEach((key) => {
            itemCollection[key].id = key;
            mushroomz.push(itemCollection[key]);
          });
          resolve(mushroomz);
      }).catch((error) => {
        reject(error);
      });
    }); 
  };


  let getMushrooms = () => {
    getMushroomList().then((mushroomz) => {
      $scope.mushrooms = mushroomz;
    }).catch((error) => {
      console.log("error", error);
    });
  };


  getMushrooms();
  
});