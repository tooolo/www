
angular.module("starter.services",[])
//轮播图

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

.factory('$lunbopic', function() {
      var lunbopics = [{
        "id" : 0,
        "imgsrc" : "lunbo1.jpg"
      },
        {
          "id" : 1,
          "imgsrc" : "lunbo2.jpg"
        },
        {
          "id" : 2,
          "imgsrc" : "lunbo3.jpg"
        }
      ]

      return {
        all: function() {
          return lunbopics;
        }
      }
    })


//好评榜
.factory("$HomeGoodlistRow", function () {
  var homeGoodlistRows =
    [
      [
        {
          "id": 0, "title": "辣椒看联盟", "main": "good,good,非常棒！","imgsrc":"1.png"
        },
        {
          "id": 1, "title": "LOL大事件", "main": "UI,非常棒！","imgsrc":"2.jpg"
        }
      ],
      [
        {
          "id":2,"title":"主播炸了", "main":"bangbangda,非常棒！","imgsrc":"3.jpg"
        },
        {
          "id": 3, "title":"放学后的屠正直", "main":"wuli jQuery,非常棒！","imgsrc":"4.jpg"
        }
      ]
  ]
  return {
    all: function () {
      return homeGoodlistRows;
    }
  };

})

//最新课程
.factory("$HomeNewLists", function () {
  var homeNewListRow = [
    [{"id": 0, "title": "javaScript 课程", "main": "good,good,非常棒！", "imgsrc": "shouye_03.png"},
      {"id": 1, "title": "UI/UE", "main": "UI,非常棒！", "imgsrc": "shouye_03.png"}],
    [{"id": 2, "title": "HTML5+CSS3", "main": "bangbangda,非常棒！", "imgsrc": "shouye_03.png"},
      {"id": 3, "title": "jQuery", "main": "wuli jQuery,非常棒！", "imgsrc": "shouye_03.png"}]
  ];
  return {
    all: function () {
      return homeNewListRow;
    }
  };
})


//猜你喜欢
.factory("$HomeLikeLists", function () {
  var homeLikeListRow = [
    {"id": 0, "title": "前端教程", "main": "这是一套前端教程,非常棒！", "imgsrc": "shouye_03.png"},
    {"id": 1, "title": "android", "main": "android安卓课程的描述", "imgsrc": "shouye_03.png"},
    {"id": 2, "title": "android", "main": "android安卓课程的描述", "imgsrc": "person_01.png"},
    {"id": 3, "title": "css测试", "main": "这是一个css测试", "imgsrc": "person_01.png"},
    {"id": 4, "title": "android", "main": "android安卓课程的描述", "imgsrc": "person_01.png"},
    {"id": 5, "title": "前端教程", "main": "这是一套前端教程,非常棒！", "imgsrc": "person_01.png"},
     {"id": 6, "title": "ios课程", "main": "ios课程描述", "imgsrc": "person_01.png"},
  ];
  return {
    all: function () {
      return homeLikeListRow;
    }
  };
})

//课程列表

 .factory('$courseLists',function() {
    var chats = [{ 
        id: 0, 
        titleEn: '0Ben Sparrow', 
        price: 'You on your way?', 
        imgsrc: 'img/ben.png' 
    },{ 
        id: 1, 
        titleEn: '1Ben Sparrow', 
        price: 'You on your way?', 
        imgsrc: 'img/ben.png' 
    },{ 
        id: 2, 
        titleEn: '2Ben Sparrow', 
        price: 'You on your way?', 
        imgsrc: 'img/ben.png' 
    },{ 
        id: 3, 
        titleEn: '3Ben Sparrow', 
        price: 'You on your way?', 
        imgsrc: 'img/ben.png' 
    },{ 
        id: 4, 
        titleEn: '4Ben Sparrow', 
        price: 'You on your way?', 
        imgsrc: 'img/ben.png' 
    },{ 
        id: 5, 
        titleEn: '5Ben Sparrow', 
        price: 'You on your way?', 
        imgsrc: 'img/ben.png' 
    },{ 
        id: 6, 
        titleEn: '6Ben Sparrow', 
        price: 'You on your way?', 
        imgsrc: 'img/ben.png' 
    },{ 
        id: 7, 
        titleEn: '7Ben Sparrow', 
        price: 'You on your way?', 
        imgsrc: 'img/ben.png' 
    },{ 
        id: 8, 
        titleEn: '8Ben Sparrow', 
        price: 'You on your way?', 
        imgsrc: 'img/ben.png' 
    },{ 
        id: 9, 
        titleEn: '9Ben Sparrow', 
        price: 'You on your way?', 
        imgsrc: 'img/ben.png' 
    },{ 
        id: 10, 
        titleEn: '10Ben Sparrow', 
        price: 'You on your way?', 
        imgsrc: 'img/ben.png' 
    },{ 
        id: 11, 
        titleEn: '11Ben Sparrow', 
        price: 'You on your way?', 
        imgsrc: 'img/ben.png' 
    },{ 
        id: 12, 
        titleEn: '12Ben Sparrow', 
        price: 'You on your way?', 
        imgsrc: 'img/ben.png' 
    },{ 
        id: 13, 
        titleEn: '13Ben Sparrow', 
        price: 'You on your way?', 
        imgsrc: 'img/ben.png' 
    },{ 
        id: 14, 
        titleEn: '14Ben Sparrow', 
        price: 'You on your way?', 
        imgsrc: 'img/ben.png' 
    },{ 
        id: 15, 
        titleEn: '16Ben Sparrow', 
        price: 'You on your way?', 
        imgsrc: 'img/ben.png' 
    }
    ];
    return { 
        all:function(){ 
            return chats; 
        },
        add:function(){
            return chats.splice(0,5); 
        } 
        
    }
  })
 
 
 
 
 
 // 我的课程
.factory("$courseFirst",function() {
  var itemFir = [
    {
      id: 1,
      imgsrc:"img/ben.png",
      title: "我的课程标题 1",
      num: "3 节",
      nums: "15 节"
    },
    {
      id: 2,
      imgsrc:"img/ben.png",
      title: "我的课程标题 2",
      num: "3 节",
      nums: "15 节"
    },
    {
      id: 3,
      imgsrc:"img/ben.png",
      title: "我的课程标题 3",
      num: "3 节",
      nums: "15 节"
    },
    {
      id: 4,
      imgsrc:"img/ben.png",
      title: "我的课程标题 4",
      num: "3 节",
      nums: "15 节"
    },
    {
      id: 5,
      imgsrc:"img/ben.png",
      title: "我的课程标题 5",
      num: "3 节",
      nums: "15 节"
    }
  ];
  return {
    all:function(){
      return itemFir;
    }
  };
})
// 收藏课程
.factory("$courseSecond",function() {
  var itemFir = [
    {
      id: 0,
      imgsrc:"img/ben.png",
      title: "收藏课程标题 1",
      num: "3 节",
      nums: "15 节"
    },
    {
      id: 1,
      imgsrc:"img/ben.png",
      title: "收藏课程标题 2",
      num: "3 节",
      nums: "15 节"
    },
    {
      id: 2,
      imgsrc:"img/ben.png",
      title: "收藏课程标题 3",
      num: "3 节",
      nums: "15 节"
    },
    {
      id: 3,
      imgsrc:"img/ben.png",
      title: "收藏课程标题 4",
      num: "3 节",
      nums: "15 节"
    },
    {
      id: 4,
      imgsrc:"img/ben.png",
      title: "收藏课程标题 5",
      num: "3 节",
      nums: "15 节"
    },

    {
      id: 5,
      imgsrc:"img/ben.png",
      title: "收藏课程标题 6",
      num: "3 节",
      nums: "15 节"
    }
  ];
  return {
    all:function(){
      return itemFir;
    }
  };
})
 
 
 //学习页面目录数据
 .factory('$studyList',function() {
  var studymulu = [{
    title:"1-1photoshop 修图效果效果制作",
    time:"15 分钟"
  },
    {
      title:"1-2photoshop 修图效果效果制作",
      time:"15 分钟"
    },
    {
      title:"1-2photoshop 修图效果效果制作",
      time:"15 分钟"
    },
    {
      title:"1-2photoshop 修图效果效果制作",
      time:"15 分钟"
    },
    {
      title:"1-2photoshop 修图效果效果制作",
      time:"15 分钟"
    } ,
    {
      title:"1-2photoshop 修图效果效果制作",
      time:"15 分钟"
    }]
  return{
    all:function(){
      return studymulu;
    }
  }
})

//评价详情
.factory('$pingjiaList', function () {
  var assesslist = [{
    pic: "img/study_tx.jpg",
    name: "李晓丽",
    title: "10 分钟前",
    cont: "多谢大神指点",
  },
    {
      pic: "img/study_tx.jpg",
      name: "李晓丽",
      title: "10 分钟前",
      cont: "多谢大神指点",
    },
    {
      pic: "img/study_tx.jpg",
      name: "李晓丽",
      title: "8 分钟前",
      cont: "多谢大神指点",
    },
    {
      pic: "img/study_tx.jpg",
      name: "李晓丽",
      title: "刚刚",
      cont: "多谢大神指点",
    }]
  return {
    all: function () {
      return assesslist
    }
  }
})

 
