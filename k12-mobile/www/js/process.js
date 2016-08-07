var app = new Framework7({material: true});			 
var $$ = Dom7;
var processor = 'github-personal/k12/k12-web/assets/harmony/Process.php';

var swiper = app.swiper('.swiper-container', {
    speed: 400,
    spaceBetween: 100,
    direction: 'vertical'
}); 

var system = function () {
	"use strict";
	return {
		notification: function(title,message,button,timeout,loader,_functionOpen,_functionClose){
		    if(loader == true){
		        system.preloader(true);
		        system.block(true);
		    }

			var timeout = (timeout == "")?false:timeout;
		    app.addNotification({
		        title: title,
		        message: message,
		        button:button,
		        onClose:function(){
				    if(_functionClose != false){
			        	_functionClose();
				    }
		        }
		    });

		    if(timeout != false){
			    setTimeout(function(){
				    if(loader == true){
				        system.preloader(false);
				        system.block(false);
				    }
			    	app.closeNotification(".notification-item");
			    },timeout);
		    }
		    if(_functionOpen != false){
			    _functionOpen();		    	
		    }
		},	
		popover: function(title,message){
			var myApp = new Framework7({
				material: true
			}); 
			var mainView = myApp.addView('.view-main');			 
			var $$ = Dom7;
		    myApp.addNotification({
		        title: title,
		        message: message
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
		send_mail:function(email,message){
	        var nice_ip = localStorage.getItem('nice-ip');
			var ajax = this.do_ajax('http://'+nice_ip+'/send-mail',[email,message]);
			ajax.success(function(data){
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
		get_apr:function(source){
			var ajax = system.do_ajax(source,'');
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
		getRealNumber:function(val){
        	return ($.isNumeric(val)) ? val : 0;
		},
		preloader:function(status){
			if(status){
			    var container = $$('body');
			    if (container.children('.progressbar, .progressbar-infinite').length) return; //don't run all this if there is a current progressbar loading
			    app.showProgressbar(container, 'multi');
			}
			else{
		        app.hideProgressbar();				
			}
		},
		block:function(status){
			if(status){
		        app.popup('.loader');
			}
			else{
		        app.closeModal('.loader');
			}
		}
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
	        var nice_ip = localStorage.getItem('nice-ip');
			var data = system.get_ajax('http://'+nice_ip+'/github-personal/k12/k12-web/assets/harmony/Process.php?get-yearlevel',"");
			data.success(function(data){
			});
		},
		checkConnection:function(){
	        var nice_ip = localStorage.getItem('nice-ip');
			var data = system.get_ajax('http://'+nice_ip+'/github-personal/k12/k12-web/assets/harmony/Process.php?chkConnection',"");
			data.success(function(data){
				if(data != 1){ 
					// not connected
					console.log("not connected");
				}
				else{
					console.log($("#display_schoolDetails"));
					console.log("connected");
					$("#display_schoolDetails").removeClass("hidden");
					$("#display_connectionError").addClass("hidden");
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
		loadPage:function(targetUrl,do_function){
            $.ajax({
                type: 'POST',
                url: targetUrl,
                dataType: 'html',
                cache: false,
                success: function(data) {
                    $('#_content').html(data);
                    do_function();
                }
            });
		},
    };
}();

var mobile = function(){
    "use strict";
    return {
    	ini:function(){
			var app = new Framework7({material: true});
	        getIP.ini();
    	},
    	forgetIP:function(){
    		$("a[data-cmd='forget-ip']").on('click',function(){
    			// localStorage.setItem('saved-ip','');
    			// localStorage.setItem('nice-ip','');
    		})
    	},
    	logout:function(){
    		$("a[data-cmd='account-logout']").on('click',function(){
    			// localStorage.setItem('saved-login','');
    			// localStorage.setItem('user-details','');
    		})
    	},
    	welcomeScreen:function(){
    		$("a[data-cmd='WelcomeScreen']").on('click',function(){
    			window.location.reload();
    		})
    	},
    	content:function(){
			var content = system.do_ajax('templates/admin/index.html','');
			$('div[data-node="page-initialization"]').html(content.responseText);
			content = system.do_ajax('templates/admin/home.html','');
			mobile.innerContent(content.responseText);

			mobile.forgetIP();
			mobile.logout();
			mobile.welcomeScreen();
			mobile.account();
    	},
    	account:function(){
			var nice_ip = localStorage.getItem('nice-ip');
    		var source = 'github-personal/k12/k12-web/assets/img/';
    		var data = localStorage.getItem('user-details');
    		data = JSON.parse(data);

    		var img = system.get_apr('http://'+nice_ip+'/'+source+'/'+data[0][4]);

    		$("div.panel div.primary img").attr({src:img});
    		$("div.panel div[data-node='display-name']").html(data[0][1]);

    		mobile.grading();
    		mobile.home();
    	},
    	grading:function(){
    		mobile.gradingSheet();
    		mobile.summaryGrades();
    	},
    	gradingSheet:function(){
    		$("a[data-cmd='display-gradingSheet']").on('click',function(){
				var content = system.do_ajax('templates/admin/options_gradeSheet.html','');
				mobile.innerContent(content.responseText);
    		});
    	},
    	summaryGrades:function(){
    		$("a[data-cmd='display-summaryGrading']").on('click',function(){
				var content = system.do_ajax('templates/admin/grade-summary.html','');
				mobile.innerContent(content.responseText);
    		});
    	},
    	home:function(){
    		$("a[data-cmd='display-home']").on('click',function(){
				var content = system.do_ajax('templates/admin/home.html','');
				mobile.innerContent(content.responseText);
    		});
    	},
    	innerContent:function(content){
			$('#display-content').html(content);    		
    	},
    };
}();

var getIP = function(){
	"use strict";
	return {
		ini:function(){
			swiper.lockSwipes();
	        var data = localStorage.getItem('saved-ip');
			data = ((data == "") || (data == null))?false:data;
			if(data != false){
				system.notification("k12","Accessing saved IP Address.",false,5000,true,function(){
                    setTimeout(function(){
	                    getIP.access(data);                    	
                    }, 1000);
				},false);
			}
			else{
		        getIP.getIP();
				$$('a[data-popup=".ip-help"]').on('click', function () {
					var _this = this;
					$(_this).addClass('disabled');
					var content =   "<div class='content-block'>"+
										"    <h1>IP Address (Internet Protocol)</h1>"+
										"    <p class=''>This number is an exclusive number all information technology devices (printers, routers, modems, et al) use which identifies and allows them the ability to communicate with each other on a computer network.</p>"+
										"    <p class=''><a class='close-notification button  button-fill color-gray ripple-white'>Close</a></p>"+
										"</div>";

					app.popover(content, this);
					system.notification('k12',content,false,"",false,
						function(){
							$(".modal-overlay").removeClass('modal-overlay-visible');
							$(".modal-overlay").addClass('modal-overlay-invisible');
						},
						function() {
							$(_this).removeClass('disabled');
						}
					);
				});
			}	        
		},
    	getIP:function(){
    		var _this = this;
            $("#form_getIP").validate({
                rules: {
                    // field_ipAddress: {required: true,ipv4: true}
                    field_ipAddress: {required: true}
                },
                messages:{
                    field_ipAddress:{
                    	required: '<a class="zmdi zmdi-alert-triangle zmdi-hc-1x"></a> Required field',
                    	ipv4: '<a class="zmdi zmdi-alert-triangle zmdi-hc-1x"></a> Invalid IP address format',
                    },
                },
                errorElement : 'div',
                errorPlacement: function(error, element) {
                    var placement = $(element).data('error');
                    if(placement){$(placement).append(error)} 
                    else{error.insertAfter(element);}
                },
                submitHandler: function (form) {
                    var form = $(form).serializeArray();

                    if(form.length > 1){
				        localStorage.setItem('saved-ip',form[0]['value']);
                    }
                    else{
				        localStorage.setItem('saved-ip',"");
                    }
                    _this.access(form[0]['value']);
                }
            }); 
    	},
		access:function(ip){
			var ajax = system.do_ajax('http://'+ip+'/k12/test.file','');
			if(ajax.responseText == 'granted'){
				localStorage.setItem('nice-ip',ip);
				system.notification("k12","Access granted",false,2000,true,function(){
					swiper.removeSlide(0);
					login.ini();
				},false);
			}
			else{
				system.notification("k12","Unknown Server.",false,2000,true,false,false);
	 			app.closeModal('.getip');
		        getIP.getIP();
			}
		}
	}
}();

var login = function(){
	"use strict";
	return {
		ini:function(){
			swiper.lockSwipes();
	        var data = localStorage.getItem('saved-login');
			data = ((data == "") || (data == null))?false:data;

			if(data != false){
				system.notification("k12","Retrieving saved username and password.",false,5000,true,function(){
                    setTimeout(function(){
		                login.access(data);
                    }, 1000);
				},false);
			}
			else{
		        login.login();
			}
		},
    	login:function(){
            var _this = this;
            $("#form_login").validate({
                rules: {
                    field_username: {required: true},
                    field_password: {required: true}
                },
                messages:{
                    field_username:{
                    	required: '<a class="zmdi zmdi-alert-triangle zmdi-hc-1x"></a> Required field',
                    },
                    field_password:{
                    	required: '<a class="zmdi zmdi-alert-triangle zmdi-hc-1x"></a> Required field',
                    },
                },
                errorElement : 'div',
                errorPlacement: function(error, element) {
                    var placement = $(element).data('error');
                    if(placement){$(placement).append(error)} 
                    else{error.insertAfter(element);}
                },
                submitHandler: function (form) {
                    var form = $(form).serializeArray();
                    var field = JSON.stringify([{'name':form[0]['name'],'value':form[0]['value']},{'name':form[1]['name'],'value':form[1]['value']}]);
                    if(form.length > 2){
				        localStorage.setItem('saved-login',field);
                    }
                    else{
				        localStorage.setItem('saved-login',"");
                    }

                    _this.access(field);
                }
            }); 
    	},
		access:function(form){
			var data = JSON.parse(form);
			var nice_ip = localStorage.getItem('nice-ip');
			var ajax = system.do_ajax('http://'+nice_ip+'/'+processor+'?login',data);
			if(ajax.responseText != 0){
				localStorage.setItem('user-details',ajax.responseText);
				system.notification("k12","Success",false,2000,true,function(){
					mobile.content();
				},false);
			}
			else{
				system.notification("k12","Failed",false,2000,true,false,false);
		        login.login();
			}
		}
	}
}();

var gradingProcesses = function () {
    "use strict";
    return {
		controls_gradingSheet:function(){
			var nice_ip = localStorage.getItem('nice-ip');
			var data = system.get_ajax('http://'+nice_ip+'/'+processor+'?get-assoc-yearLevel',"");
			data.success(function(data){
				var data = JSON.parse(data);
				var options = "<option disabled='' selected>Choose year level</option>";
				$.each(data,function(i,v){
					if(v[1].length>0){
						options += "<option value='"+v[0]['title']+"'>"+v[0]['title']+"</option>";
					}
				})
				$("#field_year").html(options);

				$("#field_year").change(function(){
					var selected = $("#field_year").val(), options = '';
					var options = "<option disabled='' selected>Choose section</option>";
					$.each(data[selected][1],function(i,v){
						options += "<option value='"+v['section']+"'>"+v['section']+"</option>";
					});

					$("#field_subject").attr({"disabled":true});
					$("#field_subject").html("<option disabled='' selected>Choose subject</option>");
					$("#display_sublevelsubject").addClass('hidden');

					$("#field_section").attr({"disabled":false});
					$("#field_section").html(options);
				});

				$("#field_section").change(function(){
					var selected = $("#field_year").val(), options = '';
					var options = "<option disabled='' selected>Choose subject</option>";
					$.each(data[selected][2],function(i,v){
						var sub_data = JSON.parse(v['subject_title']);
						options += "<option value='"+sub_data[0]+"'>"+sub_data[0]+"</option>";
					});

					$("#field_subject").attr({"disabled":false});
					$("#field_subject").html(options);
				});

				$("#field_subject").change(function(){
					var selected = $("#field_year").val(), subject = $(this).val(), options = '';
					var options = "<option disabled='' selected>Choose subject</option>";
					$.each(data[selected][2],function(i,v){
						var sub_data = JSON.parse(v['subject_title']);
						if(sub_data[0] == subject){
							$("#display_sublevelsubject").removeClass('hidden');
							if(sub_data.length<=1){
								$("#display_sublevelsubject").addClass('hidden');
							}
							for(var x=1;x<sub_data.length;x++){
								options += "<option value='"+sub_data[x][0]+"'>"+sub_data[x][0]+"</option>";
							}
						}
					});

					$("#field_subsubject").attr({"disabled":false});
					$("#field_subsubject").html(options);
				});
			});
		},  	
		gradingSheet:function(){
			this.controls_gradingSheet();
		    $("#form_gradesheet").validate({
		        rules: {
		            field_year: {required: true},
		            field_section: {required: true},
		            field_subject: {required: true},
		            field_subsubject: {required: false},
		        },
		        errorElement : 'div',
		        errorPlacement: function(error, element) {
					var placement = $(element).data('error');
					if(placement){
						$(placement).append(error)
					} 
					else{
						error.insertAfter(element);
					}
				},
				submitHandler: function (form) {
					var form = $(form).serializeArray();
					localStorage.setItem('controls_gradingSheet',JSON.stringify(form));
					gradingProcesses.get_grade(JSON.stringify(form));
					gradingProcesses.get_student(JSON.stringify(form));
			  		gradingProcesses.get_subjectDetails(JSON.stringify(form));

					var content = system.do_ajax('templates/admin/grading-sheet.html','');
					mobile.innerContent(content.responseText);
		        }
			});
		},
		get_grade:function(controls){
			var nice_ip = localStorage.getItem('nice-ip');
			var data = system.get_ajax('http://'+nice_ip+'/'+processor+'?get-grade',controls);
			data.success(function(data){		
				localStorage.setItem("grades_gradeSheetQuarter",data);
			});
		},
		get_student:function(controls){
			var nice_ip = localStorage.getItem('nice-ip');
			var data = system.get_ajax('http://'+nice_ip+'/'+processor+'?get-studentsGradeSheet',controls);
			data.success(function(data){
		        localStorage.setItem('students_gradingSheet',data);
			});
		},
		get_subjectDetails:function(controls){
			var nice_ip = localStorage.getItem('nice-ip');
			var data = system.get_ajax('http://'+nice_ip+'/'+processor+'?get-subjectDetails',controls);
			data.success(function(data){
		        localStorage.setItem('subject_gradingSheet',data);
			});
		},
		list_gradingSheet:function(){		
	        var data_controls = JSON.parse(localStorage.getItem('controls_gradingSheet'));
	        var data_grades = JSON.parse(localStorage.getItem('grades_gradeSheet'));
	        var data_gradesAll = JSON.parse(localStorage.getItem('grades_gradeSheetQuarter'));
	        var data_students = JSON.parse(localStorage.getItem('students_gradingSheet'));
	        var data_subject = JSON.parse(localStorage.getItem('subject_gradingSheet'));
	        var content = "",_content = "", content_finalGrade = "";
	        data_subject = JSON.parse(data_subject[0][6]);

    		var components = ['Written Works','Performance Task','Quarterly Assessment'];
			var colors = ['teal lighten-5','green lighten-5','blue lighten-5'];
			var ps = 100;
			var ws = [data_subject[1],data_subject[0],data_subject[2]];

			var allContent = "",tabs = "",tabContent = "", initialGrade = 0, finalGrade = [], finalGrade_student = [], totalGrade = 0;
	        $.each(data_gradesAll,function(index_grade,value_grade){
	        	var content = "" ; 
				var sub_tabContent = "", sub_content = "", grades = "", headers = "";
				$.each(data_students,function(index_genderInner,value_genderInner){
					var sub_columnContent = "", sub_headers = "", highScore = "",summaryTabContent = "";
					initialGrade = 0;
					$.each(value_grade,function(index_grade2,value_grade2){
						var totalScore = 0, totalHighScore = 0;
						if(value_grade2.length>0){
							$.each(value_grade2,function(index_grade3,value_grade3){
								grades = JSON.parse(value_grade3[2]);
								var search = JSON.search(grades, '//*[id="'+value_genderInner[1]['student_id']+'"]/score');
								sub_headers += "<td class='"+colors[index_grade2]+"'>#"+(index_grade3+1)+"</td>";
								highScore += "<td class='"+colors[index_grade2]+"'>"+value_grade3[1]+"</td>";
								sub_columnContent += "<td class='"+colors[index_grade2]+"'>"+search+"</td>";
								totalScore = totalScore + Number(search);
								totalHighScore = totalHighScore + Number(value_grade3[1]);
							});
						}
						else{
							sub_headers += "";
							highScore += "";
							sub_columnContent += "";
							totalScore = 0;
							totalHighScore = 0;
						}
						var calc = [system.getRealNumber(((totalScore/totalHighScore)*100)),system.getRealNumber((((totalScore/totalHighScore)*100)*(ws[index_grade2]/100)))];
						initialGrade = initialGrade + system.getRealNumber((((totalScore/totalHighScore)*100)*(ws[index_grade2]/100)));	

						sub_headers += "<td class='"+colors[index_grade2]+" center-align'>Total</td><td class='"+colors[index_grade2]+" center-align'>PS</td><td class='"+colors[index_grade2]+" center-align'>WS</td>";
						highScore += "<td class='"+colors[index_grade2]+" center-align'>"+totalHighScore+"</td><td class='"+colors[index_grade2]+" center-align'>"+ps+"</td><td class='"+colors[index_grade2]+" center-align red-text'>"+ws[index_grade2]+"%</td>";
						sub_columnContent += "<td class='"+colors[index_grade2]+" center-align'>"+totalScore+"</td>"+
										"<td class='"+colors[index_grade2]+" center-align'>"+parseFloat(calc[0]).toFixed(2)+"</td>"+
										"<td class='"+colors[index_grade2]+" center-align red-text'>"+parseFloat(calc[1]).toFixed(2)+"</td>";
					});
					finalGrade.push({student_id:value_genderInner[1]['student_id'],quarter:index_grade,score:grade.search(parseFloat(initialGrade).toFixed(2),grade.table())[0]['value']});

					headers =   "<tr>"+
								"	<th class=' center-align' colspan='2'></th>"+
									sub_headers+
								"</tr>"+
								"<tr>"+
								"	<th class=' center-align'>Highest Score Posible</th><th></th>"+
									highScore+
								"	<th class=' blue lighten-3 center-align'>"+ps+"</th>"+
								"	<th class=' blue lighten-2 center-align'>"+ps+"</th>"+
								"</tr>";
					sub_content +=  "<tr>"+
									"	<td>"+value_genderInner[1]['family_name']+" "+value_genderInner[1]['given_name']+", "+value_genderInner[1]['middle_name']+"</td><td>"+value_genderInner[1]['gender']+"</td>"+
										sub_columnContent+
									"	<td class=' center-align blue lighten-3'>"+parseFloat(initialGrade).toFixed(2)+"</td>"+
									"	<td class=' center-align blue lighten-2'>"+grade.search(parseFloat(initialGrade).toFixed(2),grade.table())[0]['value']+"</td>"+
									"</tr>";
				});

				tabContent +=   "<li class='accordion-item' data-node='"+(index_grade.replace(' ',''))+"'>"+
								"	<a href='' class='item-link item-content no-ripple'><div class='item-inner'><div class='item-title'>"+index_grade+"</div></div></a>"+
								"	<div class='accordion-item-content'>"+
								"		<div id='"+(index_grade.replace(' ',''))+"' style='padding:2rem;'>"+
								"			<table id='' class='_listStudent display dataTable striped bordered'>"+
								"			    <thead>"+
		 						"			        <tr>"+
								"			            <th width='150px;' colspan='2'></th>"+
								"			            <th colspan='"+(value_grade[0].length+3)+"' class='center-align "+colors[0]+"'>Written Works "+ws[0]+"%</th>"+
								"			            <th colspan='"+(value_grade[1].length+3)+"' class='center-align "+colors[1]+"'>Performance Task "+ws[1]+"%</th>"+
								"			            <th colspan='"+(value_grade[2].length+3)+"' class='center-align "+colors[2]+"'>Quarterly Assessment "+ws[2]+"%</th>"+
								"						<th class='center-align blue lighten-3' rowspan='2'>Initial Grade</th>"+
								"						<th class='center-align blue lighten-2' rowspan='2'>Quarterly Grade</th>"+
								"			        </tr>"+
													 headers+
		 						"			    </thead>"+
													sub_content+
							    "			</table>"+
								"		</div>"+
								"	</div>"+
								"</li>";
	        });

			var sub_content = "", headers = ""; content = "";
			sub_content = "";
			$.each(data_students,function(index_gender2,value_gender2){
				var sub_columnContent = "", sub_headers = "", _finalgrade = 0;
				var grades = JSON.search(finalGrade,'//*[student_id="'+value_gender2[1]['student_id']+'"]');
				$.each(grades,function(index_grade,value_grade){
					sub_headers += "<th class=' center-align'>"+value_grade['quarter']+"</th>";
					sub_columnContent += "<td class='center-align'>"+value_grade['score']+"</td>";
					_finalgrade = _finalgrade + value_grade['score'];
				});

				headers = "<tr>"+
							"	<th width='150px;' class=' center-align'></th><th width='150px;' class=' center-align'></th>"+
								sub_headers+
							"	<th class=' center-align blue lighten-2'>Final Grade</th>"+
							"	<th class=' center-align blue lighten-3 hidden'>Remarks</th>"+
							"</tr>";

				sub_content += "<tr>"+
								"	<td width='150px;'>"+value_gender2[1]['family_name']+" "+value_gender2[1]['given_name']+", "+value_gender2[1]['middle_name']+"</td><td>"+value_gender2[1]['gender']+"</td>"+
									sub_columnContent+
								"	<td class=' center-align blue lighten-2'>"+system.getRealNumber(_finalgrade/4)+"</td>"+
								"	<td class=' center-align blue lighten-3 hidden'></td>"+
								"</tr>";
			});

			$("#_gradeSection").html(data_controls[0]['value']+" - "+data_controls[1]['value']);
			$("#_subject").html(data_controls[2]['value']);

        	allContent =  "<div class='row'>"+
	   					  "		<table class=''>"+	
 						  "			<tr>"+
						  "			    <td>Year: "+data_controls[0]['value']+"</td>"+
						  "			</tr>"+
 						  "			<tr>"+
						  "			    <td>Section: "+data_controls[1]['value']+"</td>"+
						  "			</tr>"+
 						  "			<tr>"+
						  "			    <td>Subject: "+data_controls[2]['value']+"</td>"+
						  "			</tr>"+
						  "		</table>"+
	   					  "		<div class='list-block accordion-list'>"+
						  "			<ul class='collapsible collapsible-accordion' data-collapsible='accordion'>"+
						  				tabContent+
						  "				<li class='accordion-item' data-node='FinaleGrade'>"+
						  "					<a href='' class='item-link item-content no-ripple'><div class='item-inner'><div class='item-title'>Final Grade</div></div></a>"+
						  "					<div class='accordion-item-content'>"+
						  "						<div id='Summary' style='padding:2rem;'>"+
						  "							<table class='_finalGrade display dataTable striped bordered'>"+
						  "							    <thead>"+
						  									headers+
						  "							    </thead>"+
						  "							    <tbody>"+
						  									sub_content+
						  "								    </tbody>"+
						  "							</table>"+
						  "						</div>"+
						  "					</div>"+
						  "				</li>"+
						  "			</ul>"+
	   					  "		</div>"+
						  "</div>";

			$('#display_studentList').html(allContent);

			var table = $('.dataTable').DataTable({
		        "columnDefs": [
		            { "visible": false, "targets": 1 }
		        ],
		        "order": [[ 0, 'asc' ]],
		        bLengthChange: false,
		        paging: false,
		        iDisplayLength: -1,
		        "drawCallback": function ( settings ) {
		            var api = this.api();
		            var rows = api.rows( {page:'current'} ).nodes();
		            var last=null;
		 
		            api.column(1, {page:'current'} ).data().each( function ( group, i ) {
		                if ( last !== group ) {
		                    $(rows).eq( i ).before(
		                        '<tr class="group"><td colspan="100">'+group+'</td></tr>'
		                    );
		 
		                    last = group;
		                }
		            } );
		        }
		    });

		    $('.dataTable tbody').on('click','tr.group',function(){
		        var currentOrder = table.order()[0];
		        if(currentOrder[0] === 2 && currentOrder[1] === 'asc') {
		            table.order([1,'desc']).draw();
		        }
		        else{
		            table.order([1,'asc']).draw();
		        }
		    });

            $('ul.collapsible').click(function(){
            	var data = $(this).find('li.active').data('node');
            	if((typeof data != undefined || data != 'undefined')){
	            	localStorage.setItem('open-tab',data);
            	}
            });

			system.notification('k12','Collecting Information. Please wait.',false,1000,false,
				function(){
		            var data = localStorage.getItem('open-tab');
		            $("ul li[data-node='"+data+"']").addClass('active');
		            $("ul li[data-node='"+data+"'] div.collapsible-header").addClass('active');
		            $("ul li[data-node='"+data+"'] #"+data).css({"display":"block"});
				},
				function(){}
			);
		},
		get_subjectsByYear:function(controls){
			var nice_ip = localStorage.getItem('nice-ip');
			var data = system.get_ajax('http://'+nice_ip+'/'+processor+'?get-subjectsByYear',controls);
			data.success(function(data){
				localStorage.setItem("details_subjectsByYear",data);
			});
		},
		get_gradeSummary:function(controls){
			var nice_ip = localStorage.getItem('nice-ip');
			var data = system.get_ajax('http://'+nice_ip+'/'+processor+'?get-gradeSummary',controls);
			data.success(function(data){		
				localStorage.setItem("grades_gradeSummary",data);
				gradingProcesses.show_studentGrade(data);
			});
		},
		list_summaryGrade:function(){
			this.controls_gradingSheet();
		    $("#form_gradesheet").validate({
		        rules: {
		            field_year: {required: true},
		            field_section: {required: true},
		            field_subject: {required: true},
		            field_subsubject: {required: false},
		        },
		        errorElement : 'div',
		        errorPlacement: function(error, element) {
					var placement = $(element).data('error');
					if(placement){
						$(placement).append(error);
					} 
					else{
						error.insertAfter(element);
					}
				},
				submitHandler: function (form) {
					var form = $(form).serializeArray();
					gradingProcesses.get_student(JSON.stringify(form));
					gradingProcesses.get_subjectsByYear(JSON.stringify(form));
					gradingProcesses.get_gradeSummary(JSON.stringify(form));
		        }
		    });
		},
		show_studentGrade:function(data){
			data = JSON.parse(data);	        
	        var data_students = JSON.parse(localStorage.getItem('students_gradingSheet'));
	        var subjectDetail = JSON.parse(localStorage.getItem('details_subjectsByYear'));
			var gender = [{"male":JSON.search(data_students, '//*[gender="Male"]'),"female":JSON.search(data_students, '//*[gender="Female"]')}];
			var quarters = {'First Quarter':1,'Second Quarter':2,'Third Quarter':3,'Fourth Quarter':4};
			var ws = [];

			var sub_tabContent = "", sub_content = "", grades = "", headers = "";
			var allContent = "", tabs = "", tabContent = "", initialGrade = 0, finalGrade = [], meta_finalGrade = [], finalGrade_student = [], totalGrade = 0;
			var content = "", subContent = "", subjectContent = "", subjectHeader = "", quarterHeader = "", quarterSubHeader, subjectDetails;
			var finalGradeTotal = 0, grandTotal = 0;
			var subjectCount = 0; var subject = ""; var _finalGrade_student = [];

			$.each(data_students,function(index_gender2,value_gender2){
				subjectContent = ""; subjectHeader = ""; quarterHeader = ""; quarterSubHeader = ""; grandTotal = 0; subjectCount = 0;
				finalGrade_student = [];
				$.each(data,function(index_summary,value_summary){
					var _subject = JSON.parse(index_summary);
					ws = JSON.search(subjectDetail, '//*[subject="'+_subject[2][0]+'"]'); 
					ws = JSON.parse(ws[0]['weight']); 
					ws = [ws[1],ws[0],ws[2]];
					finalGradeTotal = 0; 
					subjectDetails = JSON.parse(index_summary);
					subject = _subject[2][0];
					if(subjectDetails[2][1] == "*"){
						var activated = 0, _quarters = [];
						meta_finalGrade = [];
						finalGrade = [];
						$.each(value_summary,function(index_summary1,value_summary1){
							$.each(value_summary1,function(index_summary2,value_summary2){
								initialGrade = 0;
								$.each(value_summary2,function(index_grade2,value_grade2){
									var totalScore = 0, totalHighScore = 0;
									if(value_grade2.length>0){
										$.each(value_grade2,function(index_grade3,value_grade3){
											grades = JSON.parse(value_grade3[2]);
											var search = JSON.search(grades, '//*[id="'+value_gender2[1]['student_id']+'"]/score');
											totalScore = totalScore + Number(search);
											totalHighScore = totalHighScore + Number(value_grade3[1]);
										});
									}
									else{
										totalScore = 0;
										totalHighScore = 0;
									}
									var calc = [system.getRealNumber(((totalScore/totalHighScore)*100)),system.getRealNumber((((totalScore/totalHighScore)*100)*(ws[index_grade2]/100)))];
									initialGrade = initialGrade + system.getRealNumber((((totalScore/totalHighScore)*100)*(ws[index_grade2]/100)));
								});

								var x = grade.search(parseFloat(initialGrade).toFixed(2),grade.table())[0]['value'];
								meta_finalGrade.push({student_id:value_gender2[1]['student_id'],subject:index_summary1,quarter:index_summary2,score:grade.search(parseFloat(initialGrade).toFixed(2),grade.table())[0]['value']});
							});
						});

						var a = JSON.search(meta_finalGrade, '//*[student_id="'+value_gender2[1]['student_id']+'"]'), b = [], _subtotal = 0, _total = 0;
						$.each(quarters,function(i,v){
							b = JSON.search(a, '//*[quarter="'+i+'"]');
							_subtotal = 0;
							$.each(b,function(_i,_v){
								_subtotal = _subtotal + _v['score'];
							})
							finalGrade.push({student_id:value_gender2[1]['student_id'],subject:subjectDetails[2][0],quarter:i,score:system.getRealNumber((_subtotal/4))});
							quarterSubHeader +="<th class='center-align'>"+v+"</th>";
						});
						var __grades = meta_finalGrade;
						finalGrade_student.push({subject,__grades});
					}
					else{
						finalGrade = [];
						$.each(value_summary,function(index_summary2,value_summary2){ 
							initialGrade = 0;
							$.each(value_summary2,function(index_grade2,value_grade2){
								var totalScore = 0, totalHighScore = 0;
								if(value_grade2.length>0){
									$.each(value_grade2,function(index_grade3,value_grade3){
										grades = JSON.parse(value_grade3[2]);
										var search = JSON.search(grades, '//*[id="'+value_gender2[1]['student_id']+'"]/score');
										totalScore = totalScore + Number(search);
										totalHighScore = totalHighScore + Number(value_grade3[1]);
									});
								}
								else{
									totalScore = 0;
									totalHighScore = 0;
								}

								var calc = [system.getRealNumber(((totalScore/totalHighScore)*100)),system.getRealNumber((((totalScore/totalHighScore)*100)*(ws[index_grade2]/100)))];
								initialGrade = initialGrade + system.getRealNumber((((totalScore/totalHighScore)*100)*(ws[index_grade2]/100)));							
							});
							var x = grade.search(parseFloat(initialGrade).toFixed(2),grade.table())[0]['value'];
							finalGrade.push({student_id:value_gender2[1]['student_id'],subject:subjectDetails[2][0],quarter:index_summary2,score:grade.search(parseFloat(initialGrade).toFixed(2),grade.table())[0]['value']});
							quarterSubHeader +="<th class='center-align'>"+quarters[index_summary2]+"</th>";
						});
						var __grades = finalGrade;
						finalGrade_student.push({subject,__grades});
					}

					quarterSubHeader +="<th class='center-align'>Final Grade</th>";
					quarterHeader +="<th colspan='4' class='center-align'>Quarter</th><th></th>";
					subjectHeader +="<td colspan='5'class='center-align'>"+subjectDetails[2][0]+"</td>";
					finalGradeTotal = parseFloat(((finalGrade[0]['score']+finalGrade[1]['score']+finalGrade[2]['score']+finalGrade[3]['score'])/4)).toFixed(2);
					subjectContent +="<td class='center-align'>"+finalGrade[0]['score']+"</td><td class='center-align'>"+finalGrade[1]['score']+"</td><td class='center-align'>"+finalGrade[2]['score']+"</td><td class='center-align'>"+finalGrade[3]['score']+"</td><td class='center-align'>"+finalGradeTotal+"</td>";
					subjectCount++;
					grandTotal = Number(grandTotal)+Number(finalGradeTotal);
				});
				
				var s_id = value_gender2[1]['student_id'];
				_finalGrade_student.push({s_id,finalGrade_student});

				subjectHeader = "<tr>"+
								"	<td rowspan='2' colspan='2'></td>"+subjectHeader+"<td rowspan='3'><strong>General Average</strong></td>"+
								"</tr>"+
								"<tr>"+
									quarterHeader+
								"</tr>"+
								"<tr>"+
								"	<th width='250px;'>Name of Learners</th><th width='150px;'>Gender</th>"+quarterSubHeader+
								"</tr>";
				subContent +=   "<tr>"+
								"	<td>"+value_gender2[1]['family_name']+" "+value_gender2[1]['given_name']+", "+value_gender2[1]['middle_name']+"</td><td>"+value_gender2[1]['gender']+"</td>"+subjectContent+"<td class='center-align'>"+parseFloat((grandTotal/subjectCount)).toFixed(2)+"</td>"+
								"</tr>";
			});

			content =   "<div class='col s12'>"+
						"	<table id='studentsGradeSummary' class='_listStudent responsive-table display dataTable'>"+
 						"		<thead>"+
									subjectHeader+
 						"		</thead>"+
 						"		<tbody>"+
 									subContent+
 						"		</tbody>"+
						"	</table>"+
						"</div>";

			$('#display_studentList').html(content); 
			$('#display_studentList .card .card-content').attr('style','padding:10px; overflow-x: scroll;');
		
			var table = $('#studentsGradeSummary').DataTable({
		        "columnDefs": [
		            { "visible": false, "targets": 1 }
		        ],
		        "order": [[ 0, 'asc' ]],
		        bLengthChange: true,
		        paging: false,
		        iDisplayLength: -1,
		        "drawCallback": function ( settings ) {
		            var api = this.api();
		            var rows = api.rows( {page:'current'} ).nodes();
		            var last=null;
		 
		            api.column(1, {page:'current'} ).data().each( function ( group, i ) {
		                if ( last !== group ) {
		                    $(rows).eq( i ).before(
		                        '<tr class="group"><td colspan="100">'+group+'</td></tr>'
		                    );
		 
		                    last = group;
		                }
		            } );
		        }
		    });

		    $('#studentsGradeSummary tbody').on('click','tr.group',function(){
		        var currentOrder = table.order()[0];
		        if(currentOrder[0] === 2 && currentOrder[1] === 'asc') {
		            table.order([1,'desc']).draw();
		        }
		        else{
		            table.order([1,'asc']).draw();
		        }
		    });

            localStorage.setItem('_finalGrade_student',JSON.stringify(_finalGrade_student));
			system.notification('k12','Collecting Information. Please wait.',false,1000,false,
				function(){},
				function(){}
			);
		},
    };
}();

var grade = function () {
    "use strict";
    return {
        table: function(){
			return {
				"grades": [
					{"min":0,"max":3.99,"value":60},
					{"min":4.00,"max":7.99,"value":61},
					{"min":8.00,"max":11.99,"value":62},
					{"min":12.00,"max":15.99,"value":63},
					{"min":16.00,"max":19.99,"value":64},
					{"min":20.00,"max":23.99,"value":65},
					{"min":24.00,"max":27.99,"value":66},
					{"min":28.00,"max":31.99,"value":67},
					{"min":32.00,"max":35.99,"value":68},
					{"min":36.00,"max":39.99,"value":69},
					{"min":40.00,"max":43.99,"value":70},
					{"min":44.00,"max":47.99,"value":71},
					{"min":48.00,"max":51.99,"value":72},
					{"min":52.00,"max":55.99,"value":73},
					{"min":56.00,"max":59.99,"value":74},
					{"min":60.00,"max":61.59,"value":75},
					{"min":61.60,"max":63.19,"value":76},
					{"min":63.20,"max":64.79,"value":77},
					{"min":64.80,"max":66.39,"value":78},
					{"min":66.40,"max":67.99,"value":79},
					{"min":68.00,"max":69.59,"value":80},
					{"min":69.60,"max":71.19,"value":81},
					{"min":71.20,"max":72.79,"value":82},
					{"min":72.80,"max":74.39,"value":83},
					{"min":74.40,"max":75.99,"value":84},
					{"min":76.00,"max":77.59,"value":85},
					{"min":77.60,"max":79.19,"value":86},
					{"min":79.20,"max":80.79,"value":87},
					{"min":80.80,"max":82.39,"value":88},
					{"min":82.40,"max":83.99,"value":89},
					{"min":84.00,"max":85.59,"value":90},
					{"min":85.60,"max":87.19,"value":91},
					{"min":87.20,"max":88.79,"value":92},
					{"min":88.80,"max":90.39,"value":93},
					{"min":90.40,"max":91.99,"value":94},
					{"min":92.00,"max":93.59,"value":95},
					{"min":93.60,"max":95.19,"value":96},
					{"min":95.20,"max":96.79,"value":97},
					{"min":96.80,"max":98.39,"value":98},
					{"min":98.40,"max":99.99,"value":99},
					{"min":100,"max":100,"value":100}
				]
			}
        },
        search:function(search,grade){
        	var data = [];
        	search = Number(search);
        	$.each(grade['grades'],function(i,v){
        		if((Number(v['min'])<=search) && (Number(v['max'])>=search)){
        			data.push(v);
        			return false;
        		}
        	});
        	return data;
        }
    };
}();

// Framework7.prototype.plugins._process = function (app, params) {
//     if (!params) return;

// 	var processX = new Framework7({
// 	    _process: true
// 	});

//     return {
//         hooks: {
//             appInit: function () {
//                 console.log ('%cRufo N. Gabrillo Jr.: Hello World. App initialized.','color:#f00; border:dashed 1px #000;');
//                 console.log(this.grade);
//             },
//             grade: function(){
//             	console.log('hello');
//             }
//         }
//     };
// };

// Framework7.prototype.plugins.process2 = function (app, params) {
//     if (!params) return;
//     return {
//         hooks: {
//             appInit: function () {
//                 console.log ('%cRufo N. Gabrillo: Hello World. App initialized.','colors:#f00; border:solid 1px #000;');
//             },
//         }
//     };
// };

// var processX = new Framework7({
//     _process: true
// });

// console.log(processX);