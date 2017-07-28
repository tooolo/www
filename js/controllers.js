angular.module('starter.controllers', [])

	.controller('HomeCtrl', function($scope, $rootScope, $http, $ionicSlideBoxDelegate, shareData) {

		$http.post($rootScope.URLAdmin + '/Handler/OfflineCourseHandler.ashx?action=indexshow').success(function(obj) {
			//轮播
			$scope.lunbodata = obj.data.bannerList;
			$ionicSlideBoxDelegate.$getByHandle("slideimgs").update();
			$ionicSlideBoxDelegate.$getByHandle("slideimgs").loop("true");
			//好评榜
			$scope.homegooddata = [
				[obj.data.goodList[0], obj.data.goodList[1]],
				[obj.data.goodList[2], obj.data.goodList[3]]
			];

			//最新课程
			$scope.homenewdata = [
				[obj.data.newList[0], obj.data.newList[1]],
				[obj.data.newList[2], obj.data.newList[3]]
			];

			//猜你喜欢
			$scope.homelikedata = obj.data.chooseList;
		})

		$scope.homeSearch = function() {
			console.log(111)
			if($scope.searchText) {
				// 赋值
				shareData.set('indexSearchText', $scope.searchText);
				$scope.searchText = '';
				window.location = "#/tab/curselist";
			}
		}

	})

	.controller('CurselistCtrl', function($scope, $rootScope, $http, $courseLists, shareData) {

		$scope.priceBtns = [
			{ id: 0, btnName: "全部" },
			{ id: 1, btnName: "免费" },
			{ id: 2, btnName: "收费" }
		]

		$http.post($rootScope.URLAdmin + '/Handler/OfflineCourseHandler.ashx?action=getcategory').success(function(obj) {
			$scope.courseListBtns = obj.data;
		});

		$scope.boolCourseList = true;
		$scope.boolprice = true;
		$scope.notMore = false;
		$scope.CourseList = function() {
			$scope.boolCourseList = !$scope.boolCourseList;
			$scope.boolprice = true;
			$scope.pcolor = { color: "#333" };
			if($scope.boolCourseList == false) {
				$scope.lcolor = { color: "#63aafc" };
			} else {
				$scope.lcolor = { color: "#333" };
			}
		}
		$scope.Price = function() {
			$scope.boolprice = !$scope.boolprice;
			$scope.boolCourseList = true;
			$scope.lcolor = { color: "#333" };
			if($scope.boolprice == false) {
				$scope.pcolor = { color: "#63aafc" };
			} else {
				$scope.pcolor = { color: "#333" };
			}
		}

		$scope.courselists = [];
		$scope.nowPage = 1;
		$scope.searchText = '';
		$scope.CategoryTwo = '';
		$scope.CpriceId = '';

		$scope.getCourseList = function() {
			console.log($scope.nowPage)
			$scope.moredata = false;
			var myData = {
				"pageStart": $scope.nowPage, //第几页
				"searchText": $scope.searchText, //查询字段
				"CategoryTwo": $scope.CategoryTwo, //专业id
				"CpriceId": $scope.CpriceId //价格段id
			};
			$http.post($rootScope.URLAdmin + '/Handler/OfflineCourseHandler.ashx?action=courseshow', myData).success(function(obj) {
				console.log(obj);
				$scope.courselists = $scope.courselists.concat(obj.data.list);
				$scope.nowPage = obj.data.pageStart;

				if($scope.searchText || $scope.CategoryTwo || $scope.CpriceId) {
					$scope.moredata = false;
				} else {
					$scope.moredata = true;
				}

			})
		}

		$scope.doInfinite = function() {
			$scope.nowPage++;
			$scope.getCourseList();
			$scope.nowPage = "";
			$scope.$broadcast('scroll.infiniteScrollComplete');

		}

		//	筛选方法
		$scope.courseSerch = function(searchText, CategoryId, CpriceId) {
			$scope.courselists = [];
			$scope.searchText = searchText;
			$scope.CategoryTwo = CategoryId;
			$scope.CpriceId = CpriceId;

			$scope.nowPage = 0;
			$scope.getCourseList();

		};

		$scope.myKeyup = function(e) {

			var keyCode = window.event ? e.keyCode : e.which;
			if(keyCode == 0 || keyCode == 13) {
				$scope.courseSerch($scope.searchInputText, '', '');
				$scope.searchInputText = "";
			}
		};
		if(shareData.get('indexSearchText')) {
			$scope.courselists = [];
			// 获取值
			$scope.searchText = shareData.get('indexSearchText');
			$scope.courseSerch($scope.searchText, '', '');
			shareData.set('indexSearchText', '');

		} else {
			$scope.getCourseList();
		}

	})

	.controller('MycourseCtrl', function($scope, $rootScope, $http) {
		$scope.hideList = true;
		//判断是否登录
		$http.post($rootScope.URLAdmin + '/Handler/UserHandler.ashx?action=isLogin').success(function(result) {
			if(result.success) {
				$scope.hideList = false;
				//请求我的课程
				$http.get($rootScope.URLAdmin + '/Handler/OnCourseHandler.ashx?action=mycourse')
					.success(function(result) {
						console.log(result)
						$scope.itemFir = result.data;
					});
				//请求收藏课程
				$http.get($rootScope.URLAdmin + '/Handler/OnCourseHandler.ashx?action=mycollection')
					.success(function(result) {
						console.log(result)
						$scope.itemSec = result.data;
					})
			}

		})
		//		$scope.courseFirst = $courseFirst.all();
		//		$scope.courseSecond = $courseSecond.all();
		$scope.mcolor = { color: "#63aafc" };
		$scope.boolMycourse = true;
		$scope.boolCollect = false;
		$scope.myCourse = function() {
			$scope.mcolor = { color: "#63aafc" };
			$scope.ccolor = { color: "#333" };
			$scope.boolMycourse = true;
			$scope.boolCollect = false;
		}
		$scope.collectCourse = function() {
			$scope.ccolor = { color: "#63aafc" };
			$scope.mcolor = { color: "#333" };
			$scope.boolCollect = true;
			$scope.boolMycourse = false;
		}
		$scope.data = {
			showDelete: false
		};

		$scope.edit = function(item) {
			alert('Edit Item: ' + item.id);
		};
		$scope.share = function(item) {
			alert('Share Item: ' + item.id);
		};

		$scope.moveItem = function(item, fromIndex, toIndex) {
			$scope.itemSec.splice(fromIndex, 1);
			$scope.itemSec.splice(toIndex, 0, item);
		};

		$scope.onItemDelete = function(item) {
			$scope.itemSec.splice($scope.itemSec.indexOf(item), 1);
		};

	})
	//登录界面

	.controller('PersonalCtrl', function($scope, $http, $ionicPopup, $rootScope) {
		$rootScope.hideTabs = false;
		$scope.loginuser = {
			name: '',
			passwor: ''
		};
		//		 判断是否登录    或者enter页面获取
		$http.post($rootScope.URLAdmin + '/Handler/UserHandler.ashx?action=isLogin')
			.success(function(result) {
				if(result.success) {
					window.location = "#/tab/information"
				}
			})

		$scope.doEnter = function() {
			var mydata = {
				"userName": $scope.loginuser.name,
				"userPwd": $scope.loginuser.passwor
			}
			$http.post($rootScope.URLAdmin + '//Handler/UserHandler.ashx?action=login', mydata).success(function(obj) {
				if(!!$scope.loginuser.name && !!$scope.loginuser.passwor) {
					if(obj.success) {
						window.location = '#/tab/enter'
					} else {
						$ionicPopup.alert({
							title: "失败!",
							template: obj.err,
							okText: '确认'
						});
					}
				}
			})
		}

	})
	.controller('RegisterCtrl', function($scope, $state, $ionicPopup, $rootScope, $http) {
		$scope.registerBack = function() {
			window.location = '#/tab/personal'
		};

		$scope.infor = {
			name: '',
			passwor: '',
			passwordt: '',
			phone: '',
			email: '',
		};
		$scope.register = function(infor) {
			var password_yz = /[a-zA-Z0-9_]{6,15}/;
			var email_yz = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			var phone_yz = /^1\d{10}$/;
			if(!!infor.name && !!infor.passwor && !!infor.passwordt && !!infor.phone && !!infor.email) {
				if(!password_yz.test(infor.passwor)) {
					$ionicPopup.alert({
						title: "提示信息!",
						template: '密码必须由6-15的数字或字母组成，请重新输入！'
					});
				} else if(infor.passwor != infor.passwordt) {
					$ionicPopup.alert({
						title: "提示信息!",
						template: '两次密码不相同，请重新输入！'
					});
				} else if(!phone_yz.test(infor.phone)) {
					$ionicPopup.alert({
						title: "提示信息!",
						template: '请输入正确的手机号！'
					});
				} else if(!email_yz.test(infor.email)) {
					$ionicPopup.alert({
						title: "提示信息!",
						template: '请输入正确的邮箱'
					});
				} else {
					//格式正确的时候
					var myData = {
						'userName': $scope.infor.name,
						'email': $scope.infor.email,
						'phone': $scope.infor.phone,
						'userPwd': $scope.infor.passwor,
						'nickname': '',
						'userPic': ''
					}
					$http.post($rootScope.URLAdmin + '/Handler/UserHandler.ashx?action=add', myData).success(function(result) {
						if(result.success) {
							window.location = "#/tab/enter"
						} else {
							$ionicPopup.alert({
								title: '失败！',
								template: result.err
							})
						}
					})
				}

			} else {
				$ionicPopup.alert({
					title: "提示信息!",
					template: '请输入内容'
				});
			}

		}

	})
	.controller('EnterCtrl', function($scope, $http, $rootScope) {
		$http.get($rootScope.URLAdmin + '/Handler/OnCourseHandler.ashx?action=returnuserinfo').success(function(data) {
			$scope.data = data
		})
		$scope.enterBlack = function() {
			$http.post($rootScope.URLAdmin + '/Handler/UserHandler.ashx?action=quit').success(function(obj) {
				if(obj.success) {
					window.location = "#/tab/personal"
				} else {
					$ionicPopup.alert({
						title: "提示信息!",
						template: '请输入内容'
					});
				}
			})
		}
		//      $http.post($rootScope.URLAdmin + '/Handler/UserHandler.ashx?action=isLogin').success(function(obj) {
		//				console.log(obj+"ok")
		//			})
	})

	//学习界面
	.controller('StudyCtrl', function($scope, $rootScope, $stateParams, $ionicModal, $http, $ionicPopup) {
        
		$scope.myId = {
			courseId: $stateParams.id
		}
		//为video赋值  默认值
		$scope.Vurl = 'video/mov_bbb.mp4';
		//登录提示
		$scope.plogin = true;
		//购买提示
		$scope.pbuy = false;
		$scope.tabShow = false;
		$scope.shouc = " 收藏";
		$scope.goum = "购买";

		//判断是否登录
		$http.post($rootScope.URLAdmin + '/Handler/UserHandler.ashx?action=isLogin').success(function(result) {

			if(result.success) {
				$scope.plogin = false;
				//底部导航
				$scope.tabShow = true;
				//获取已登录的课程列表
				$http.post($rootScope.URLAdmin + '/Handler/OnCourseHandler.ashx?action=learnshow', $scope.myId).success(function(result) {
					//判断是否收藏
					if(result.data.ifColected) {
						$scope.shouc = "已收藏";
						Collect.style.color = "#387EF5"
					} else {
						$scope.shouc = "收藏";
						Collect.style.color = "#555555"
					}
					//判断是否购买
					if(result.data.ifPay) {
						$scope.goum = "已购买";
						$scope.pbuy = false;
					} else {
						$scope.goum = "购买";
						$scope.pbuy = true;
					}
					//目录
					$scope.studymulu = result.data.CDlist;
					//详情
					$scope.assesslist = result.data.evaluate.list;
					//视频播放
					$scope.Vurl = $rootScope.URLAdmin + result.data.CDlist[0].Vlist[0].Vurl;

				})
			} else {
				//获取未登录的课程列表
				$http.post($rootScope.URLAdmin + '/Handler/OfflineCourseHandler.ashx?action=learnshow', $scope.myId).success(function(result) {
					$scope.studymulu = result.data.CDlist
					$scope.assesslist = result.data.evaluate.list;
				})
			}
		})

		//	模态框显示隐藏
		$scope.showModal = function() {
			$ionicModal.fromTemplateUrl('modal.html', { scope: $scope }).then(
				function(modal) {
					$scope.modal = modal;
					$scope.modal.show()
				}
			)
		}
		//目录,详情点击事件
		$scope.ccolor = { color: "#63aafc" };
		$scope.boolCatalog = true;
		$scope.boolDetail = false;
		$scope.catalog = function() {
			$scope.ccolor = { color: "#63aafc" };
			$scope.dcolor = { color: "#333" };
			$scope.boolCatalog = true;
			$scope.boolDetail = false;
		}
		$scope.detail = function() {
			$scope.dcolor = { color: "#63aafc" };
			$scope.ccolor = { color: "#333" };
			$scope.boolDetail = true;
			$scope.boolCatalog = false;
		}

		//	 收藏
		var Collect = document.getElementById("collect");
		$scope.collect = function() {

			$http.post($rootScope.URLAdmin + '/Handler/OnCourseHandler.ashx?action=collection', $scope.myId).success(function(response) {

				if(response.ifColected) {
					$scope.shouc = "已收藏";
					Collect.style.color = "#387EF5";
				} else {
					$scope.shouc = "收藏";
					Collect.style.color = "#555555";
				}
			})
		}

		$scope.payGo = function() {
			//设置支付测试数据
			var charge = { "id": "ch_ez9a5O9GSCy5fj5afHTGmvHG", "object": "charge", "created": 1442542657, "livemode": false, "paid": false, "refunded": false, "app": "app_ir1uHKe9aHaL9SWn", "channel": "upacp", "order_no": "123456789", "client_ip": "127.0.0.1", "amount": 100, "amount_settle": 0, "currency": "cny", "subject": "Your Subject", "body": "Your Body", "extra": {}, "time_paid": null, "time_expire": 1442546257, "time_settle": null, "transaction_no": null, "refunds": { "object": "list", "url": "/v1/charges/ch_ez9a5O9GSCy5fj5afHTGmvHG/refunds", "has_more": false, "data": [] }, "amount_refunded": 0, "failure_code": null, "failure_msg": null, "metadata": {}, "credential": { "object": "credential", "upacp": { "tn": "201509181017374044084", "mode": "00" } }, "description": null };
			$http.post($rootScope.URLAdmin + "/Handler/OnCourseHandler.ashx?action=buy", $scope.myId).success(function(response) {
				$scope.goum = "已购买";
				$scope.pbuy = false;
			})
			//			try {
			//				pingpp.createPayment(charge, function(result) {
			//					alert('suc:' + result);   "success"
			//				}, function(result) {
			//					alert('err:' + result);   "fail"|"cancel"|"invalid"
			//				});
			//			} catch(e) {
			//				alert(e);
			//			}
		}

		$scope.play = function() {
			$scope.Vurl = $rootScope.URLAdmin + "" + this.vdetail.Vurl;
		}

		$scope.promp = function() {

			$http.post($rootScope.URLAdmin + '/Handler/OnCourseHandler.ashx?action=addcoursecomments', $scope.myId)
				.success(function(temp) {
			
					if(temp.success) {
						$scope.modal.hide();						
					}else{
						$scope.modal.hide();
					}
				})
		}
	})

	/*底部tabs隐藏显示的指令*/
	.directive('hideTabs', function($rootScope) {
		return {
			restrict: 'A',
			link: function(scope, element, attributes) {
				scope.$on('$ionicView.beforeEnter', function() {
					$rootScope.hideTabs = attributes.hideTabs;
				});

				scope.$on('$ionicView.beforeLeave', function() {
					$rootScope.hideTabs = false;
				});
			}
		};
	})