var system = function () {
	"use strict";
	return {
		errorNotification: function(title,message){
			toastr.options = {
			  "progressBar": true,
			  "positionClass": "toast-top-left",
			  "preventDuplicates": true,
			  "onclick": null,
			  "showDuration": "100",
			  "hideDuration": "100",
			  "timeOut": "3000",
			  "extendedTimeOut": "3000",
			  "showEasing": "swing",
			  "hideEasing": "linear",
			  "showMethod": "fadeIn",
			  "hideMethod": "fadeOut"
			}					
            toastr.error(message,title)
		},	
		successNotification: function(title,message){
			toastr.options = {
			  "progressBar": true,
			  "positionClass": "toast-top-left",
			  "preventDuplicates": true,
			  "onclick": null,
			  "showDuration": "100",
			  "hideDuration": "100",
			  "timeOut": "3000",
			  "extendedTimeOut": "3000",
			  "showEasing": "swing",
			  "hideEasing": "linear",
			  "showMethod": "fadeIn",
			  "hideMethod": "fadeOut"
			}					
            toastr.success(message,title)
		},
        modalLarge: function(title, subtitle, body){
        	$("#modalLarge").modal('show');
        	$("#modalLarge .modal-title").html(title);
        	$("#modalLarge .font-bold").html(subtitle);
        	$("#modalLarge .modal-body").html(body);
        },
        close_modalLarge: function(){ 
        	$("#modalLarge").modal('hide');
        	$(".modal-backdrop").addClass('hidden');
        },
        modalSmall: function(title, subtitle, body){
        	$("#modalSmall").modal('show');
        	$("#modalSmall .modal-title").html(title);
        	$("#modalSmall .font-bold").html(subtitle);
        	$("#modalSmall .modal-body").html(body);
        },
        close_modalSmall: function(){ 
        	$("#modalSmall").modal('hide');
        	$(".modal-backdrop").addClass('hidden');
        },
        confim: function(title, callback) {
			swal({
		        title: title,
		        type: "warning",
		        showCancelButton: true,
		        confirmButtonColor: "#DD6B55",
		        confirmButtonText: "Confirm",
		        animation:false,
		        closeOnConfirm: false
		    }, 
		    function () {
				callback();
		    });		
		},
        searchJSON: function(obj, key, val) {
		    var objects = [];
		    for (var i in obj) {
		        if (!obj.hasOwnProperty(i)) continue;
		        if (typeof obj[i] == 'object') {
		            objects = objects.concat(this.searchJSON(obj[i], key, val));
		        } else if (i == key && obj[key] == val) {
		            objects.push(obj);
		        }
		    }
		    return objects;
		},
        sortResults : function (data,prop, asc) {
            data = data.sort(function(a, b) {
                if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
                else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            });
            return data;
        },
		do_ajax: function(url,data){
	        return $.ajax({
		        type: "POST",
		        url: url,
		        data: {data: data},
		        async: !1,
		        cache:false,
		        error: function() {
		            console.log("Error occured")
		        }
		    });
		},
		computeAccount:function(data){
			var a = [], b = [], report, completion = 0;
			$.each(data[0],function(i,v){
				if(v != ""){
					a.push(v);
				}
				else{
					b.push(i);
				}
			});
			completion = Math.floor((a.length / data[0].length) * 100);
			report = [completion,a,b];
			return report;
		},
		send_mail:function(email,message){
			var ajax = this.do_ajax('../assets/harmony/Process.php?send-mail',[email,message]);
			ajax.success(function(data){
			});
		},
		StringCounter:function(input,id,allowed){
		    var a = allowed-input.length;
		    if(a >= 0 && a <= 1){
		        id.html(a+" character remaining");
		    }
		    else if(a == -1){
		        id.html(-1*a+" character exceeded");
		    }
		    else if(a <= -2){
		        id.html(-1*a+" characters exceeded");
		    }
		    else{
		        id.html(a+" characters remaining");
		    }
		},
		date:function(){
			$(".prettydate").prettydate({
			    dateFormat: "YYYY-MM-DD hh:mm:ss",
			    autoUpdate: true,
			    messages:{
				    second: "Just now",
				    seconds: "%s seconds %s",
				    minute: "A minute %s",
				    minutes: "%s minutes %s",
				    hour: "A hour %s",
				    hours: "%s hours %s",
				    day: "A day %s",
				    days: "%s days %s",
				    week: "A week %s",
				    weeks: "%s weeks %s",
				    month: "A month %s",
				    months: "%s months %s",
				    year: "A year %s",
				    years: "%s years %s",
				    yesterday: "Yesterday",
				    beforeYesterday: "2 days ago",
				    tomorrow: "Tomorrow",
				    afterTomorrow: "The next day"
				}
			});
		},
		do_upload:function(url,fallback_success,fallback_error){
            var f = document.getElementById('file'),
                pb = document.getElementById('pb'),
                pt = document.getElementById('pt');
            app.uploader({
                files: f,
                progressBar: pb,
                progressText: pt,
                processor: url,
                finished: function(data){
                    var uploads = document.getElementById('uploads'),
                        succeeded = document.createElement('div'),
                        failed = document.createElement('div'),
                        anchor,
                        span,
                        x,string;
                        uploads.innerText = '';
                        
                        if(data.succeeded.length > 0){
                            fallback_success(data.succeeded);                        	
                        }
                        if(data.failed.length > 0){
                            fallback_error(data.failed);
                        }
                },
            });
		},
		truncate: function(string, length, delimiter) {
		   delimiter = delimiter || "&hellip;";
		   return string.length > length ? string.substr(0, length) + delimiter : string;
		},
		get_apr:function(image){
			var ajax = system.do_ajax('../assets/img/'+image,'');
			return ajax.responseText;
		},
		get_aprhome:function(image){
			var ajax = system.do_ajax(image,'');
			return ajax.responseText;
		},
		get_ajax: function(url,data){
	        return $.ajax({
		        type: "POST",
		        url: url,
		        data: {data: data},
		        async: !1,
		        error: function() {
		            console.log("Error occured")
		        }
		    });
		},
		loader: function(_switch){
			if(_switch){
				$(".progress").removeClass("hide-on-med-and-up hide-on-med-and-down");
			}
			else{
				$(".progress").addClass("hide-on-med-and-up hide-on-med-and-down");
			}
		},
    };
}();

var validation = function () {
	"use strict";
	return {
		email: function(email){
			var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		    if (filter.test(email)) {
		        return true;
		    }
		    else {
		        return false;
		    }
	    },
		validate_form:function(form){
			var _this = this;
        	var fields = [];
			var flag = 0;
			$.each(form,function(i,v){
				var inputtype = $("input[name='"+v['name']+"']").data('inputtype');
				if(typeof inputtype != 'undefined'){
					if(inputtype == 'required'){
						if((v['value'] == "") || (v['value'] == null)){
							flag = 1;
							$("input[name='"+v['name']+"']").parent().addClass("has-error");
							fields.push($("input[name='"+v['name']+"']").attr('placeholder'));
						}
						else{
							$("input[name='"+v['name']+"']").parent().removeClass("has-error");
						}							
					}
				}
			});
			return [flag,fields];
		},
		validate:function(form){
			var _this = this;
        	var fields = [];
			var flag = 0;
			$.each(form,function(i,v){
				if(typeof $("input[name='"+v['name']+"']").data('inputtype') != 'undefined'){
					if($("input[name='"+v['name']+"']").data('inputtype') == 'required'){
						if((v['value'] == "") || (v['value'] == null)){
							flag = 1;
							$("input[name='"+v['name']+"']").parent().addClass("has-error");
							fields.push($("input[name='"+v['name']+"']").attr('placeholder'));
						}
						else{
							$("input[name='"+v['name']+"']").parent().removeClass("has-error");
						}
					}
				}
				else if(typeof $("textarea[name='"+v['name']+"']").data('inputtype') != 'undefined'){
					if($("textarea[name='"+v['name']+"']").data('inputtype') == 'required'){
						if((v['value'] == "") || (v['value'] == null)){
							flag = 1;
							$("textarea[name='"+v['name']+"']").parent().addClass("has-error");
							fields.push($("textarea[name='"+v['name']+"']").attr('placeholder'));
						}
						else{
							$("textarea[name='"+v['name']+"']").parent().removeClass("has-error");
						}
					}
				}
				else{
					//console.log('x');
				}
			});
			return [flag,fields];
		}
    };
}();

var ini = function () {
	"use strict";
	return {
		installDatabase:function(){
			var data = system.get_ajax('assets/harmony/Process.php?get-yearlevel',"");
			data.success(function(data){
			});
		},
		checkConnection:function(){
			var data = system.get_ajax('assets/harmony/Process.php?chkConnection',"");
			data.success(function(data){
				if(data != 1){ 
					// not connected
					console.log("not connected");
				}
				else{
					console.log("connected");
					$("#display_schoolDetails").removeClass("hide-on-med-and-up hide-on-med-and-down");
					$("#display_connectionError").addClass("hide-on-med-and-up hide-on-med-and-down");
				}
			});
		},
		ini:function(){
			ini.checkConnection();
			_process.autoConnect();
            _process.checkSchoolDetails();
            _process.logIn();
		},
    };
}();

var _process = function () {
	"use strict";
	return {		
		autoConnect:function(){
			$("a[data-cmd='dbConnect']").click(function(){
				system.loader(true);
				Materialize.toast('Creating database. Do not interupt.',2000,'',function(){
					var data = system.get_ajax('assets/harmony/Process.php?createDB',"");
					data.success(function(data){
						if(data == 1){
							Materialize.toast('Database created.',5000,'',function(){
								Materialize.toast('Adding tables.',5000,'',function(){
									var data = system.get_ajax('assets/harmony/Process.php?createTables',"");
									data.success(function(data){
										console.log(data);
										if(data != 0){
											system.loader(false);
											Materialize.toast('Connected. You will be redirected.',4000,'',function(){
												window.location.href = '../k12';
											});
										}
										else{
											console.log(data);
											Materialize.toast('Cannot process auto-connect.',4000);
										}
									});									
								});
							});
						}
						else{
							console.log(data);
							Materialize.toast('Cannot process auto-connect.',4000);
						}
					});					
				});
			})
		},
		checkSchoolDetails:function(){
			var data = system.get_ajax('assets/harmony/Process.php?checkSchoolDetails',"");
			data.success(function(data){
				data = JSON.parse(data);
				console.log(data);
				if(data.length > 0){
					console.log('with school data. show school data');
				}
				else{
					$("#display_login").removeClass("hide-on-med-and-up hide-on-med-and-down");
					$("#display_schoolDetails").addClass("hide-on-med-and-up hide-on-med-and-down");
					console.log('log in');
				}
			});
		},
		logIn:function(){
			$("a[data-cmd='login']").click(function(){
				var data = $(".login-form").serializeArray();
				var data = system.get_ajax('assets/harmony/Process.php?login',data);
				data.success(function(data){
					if(data != 0){
						$("#display_loginFailed .card.green").removeClass("hide-on-med-and-up hide-on-med-and-down");
					    setTimeout( function(){
					    	$("#display_loginFailed .card.green").addClass("hide-on-med-and-up hide-on-med-and-down");
					    	$(location).attr('href','account/');
					    }, 5000 );
					}
					else{
						// failed login
						$("#display_loginFailed .card.red").removeClass("hide-on-med-and-up hide-on-med-and-down");
					    setTimeout( function(){$("#display_loginFailed .card.red").addClass("hide-on-med-and-up hide-on-med-and-down");}, 5000 );
					}
					console.log(data);
				});
			});
		},
    };
}();

var account = function () {
	"use strict";
	return {
		ini:function(){
			var data = system.get_ajax('../assets/harmony/Process.php?get-account',"");
			data.success(function(data){
				data = JSON.parse(data);
				console.log(data);
				$("#user-account img").prop('src',"../assets/img/"+data[0][4]);
				$("#user-account a[data-activates='profile-dropdown']").html(data[0][1]);
			});
		},
		accountLevel: function(){
			var data = system.get_ajax('../assets/harmony/Process.php?get-account',"");
			data.success(function(data){
				data = JSON.parse(data);
				console.log(data[0][2]);
				return data[0][2];
			});
		}, 		
    };
}();
