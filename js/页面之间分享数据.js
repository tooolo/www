//services.js 
 //页面之间共享数据的方法，使用方式，一个页面设置值，跳转页面，然后在另一个页面取值，并设置值为空。
  .factory('shareData',function($window){
    var allData = {};
    return{
      //存储单个属性
      set :function(key,value){
        allData[key]=value;
      },
      //读取单个属性
      get:function(key,defaultValue){
        return  allData[key] || defaultValue;
      }

    }
  })

// HomeCtrl
if($scope.searchText){
    // 赋值
    shareData.set('indexSearchText',$scope.searchText);
    $scope.searchText = '';
    window.location.href = "#/tab/lessonlist";
}

// courselistCtrl
if(shareData.get('indexSearchText')){
    // 获取值
    $scope.searchText=shareData.get('indexSearchText');
        // ...后续操作
        // ...
    shareData.set('indexSearchText','');
}