var system = function(){
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
        open_modal: function(title, content){
			$("#modal_bottomPopup").openModal();
			$("#modal_bottomPopup h5").html(title);
			$("#modal_bottomPopup .modal_subContent").html(content);
        },
        close_modal: function(){ 
			$("#modal_bottomPopup h5").html("");
			$("#modal_bottomPopup .modal_subContent").html("");
			$("#modal_bottomPopup").closeModal();
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
		block:function(status){
			if(status){
				$("#block-control").addClass('block-content')
			}
			else{
				$("#block-control").removeClass('block-content')
			}
		},
		getRealNumber:function(val){
        	return ($.isNumeric(val)) ? val : 0;
		},
		preloader:function(margintop){
			return "<div class='col s12 center' style='margin-top:"+margintop+"px'>"+
					"	<div class='preloader-wrapper small active'>"+
					"		<div class='spinner-layer spinner-blue'>"+
					"			<div class='circle-clipper left'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"			<div class='gap-patch'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"			<div class='circle-clipper right'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"		</div>"+
					"		<div class='spinner-layer spinner-red'>"+
					"			<div class='circle-clipper left'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"			<div class='gap-patch'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"			<div class='circle-clipper right'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"		</div>"+
					"		<div class='spinner-layer spinner-yellow'>"+
					"			<div class='circle-clipper left'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"			<div class='gap-patch'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"			<div class='circle-clipper right'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"		</div>"+
					"		<div class='spinner-layer spinner-green'>"+
					"			<div class='circle-clipper left'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"			<div class='gap-patch'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"			<div class='circle-clipper right'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"		</div>"+
					"	</div>"+
					"</div>";
		},
		nav_scrollHandler:function(bg){
			$("body").append("<script>console.log('%cDeveloped By: Rufo N. Gabrillo Jr. (2016)', 'background:#000;color:#ccc;')</script>");
			$("nav .nav-wrapper").attr({'style':'background: url('+bg+') no-repeat; background-size: cover; background-position-y:50%;'});
			var nav = function(){
				"use strict";
				return {
					default:function(){
						var num = 250;
						$(".navbar-fixed").attr({'style':'height: '+num+'px;'});
						$("nav").prop({'style':'height: '+num+'px;'});
						$("#slide-out").attr({'style':'top: '+num+'px;'});
					},
					scrolled:function(){
						var num = 64;
						$(".navbar-fixed").attr({'style':'height: '+num+'px;'});
						$("nav").prop({'style':'height: '+num+'px;'});
						$("#slide-out").attr({'style':'top: '+num+'px;'});
					}
				};
			}();
			$(window).on('scroll',function(e){
				if(e.currentTarget.scrollY > 30){
					nav.scrolled();
				}
				else{
					nav.default();
				}
			});
		},
		dropDB:function(){
			var ajax = system.get_ajax('../assets/harmony/Process.php?drop-database','');
			console.log(ajax.responseText);
			ajax.success(function(data){
				if(data == 1){
					Materialize.toast('Database dropped.',4000);
					App.handleLoadPage(window.location.hash);
				}
				else{
					Materialize.toast('There was an error.',4000);
				}
			});
		}
    };
}();

var validation = function(){
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

var ini = function(){
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

var _process = function(){
	"use strict";
	return {		
		autoConnect:function(){
			$("a[data-cmd='dbConnect']").click(function(){
				system.loader(true); system.block(true);
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
												window.location.href = '../k12-web';
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
					$("#display_schoolDetails").removeClass("hidden");
				}
				else{
					console.log('log in. x');
					$("#display_schoolDetails").removeClass("hidden");
				}
			});
		},
		logIn:function(){
	        $(".login-form").validate({
	            rules: {
	                field_loginUsername: {required: true},
	                field_loginPassword: {required: true}
	            },
	            errorElement : 'div',
	            errorPlacement: function(error, element) {
	                var placement = $(element).data('error');
	                if(placement){$(placement).append(error)} 
	                else{error.insertAfter(element);}
	            },
	            submitHandler: function (form) {
	            	console.log(form);
	                var form = $(form).serializeArray();	                
					var data = system.get_ajax('assets/harmony/Process.php?login',form);
					data.success(function(data){
						console.log(data);
						if(data != 0){
							Materialize.toast('Login success. You will be redirected.',2000,'',function(){
						    	$(location).attr('href','account/');
							});
						}
						else{
							Materialize.toast('Login failed',2000,'',function(){
							});
						}
					});

	            }
	        });
		},
		passwordAuth:function(_success,_failed){
			var data = localStorage.getItem("account_data");
			data = JSON.parse(data);
			var u = data[0][2]
			var content = "";
			content = "<form class='formValidate' data-form='passwordAuth' method='get' action='' novalidate='novalidate'>"+
						"	<div class='row'><div class='col offset-s3 s6'>"+
						"		<div class='row'>"+
						"			<div class='input-field col s6'>"+
						"				<label for='field_passwordAuth' class='active'>Password: </label>"+
						"	            <input type='password' id='field_passwordAuth' name='field_passwordAuth' data-error='.error_passwordAuth'>"+
						"				<div class='error_passwordAuth'></div>"+
						"			</div>"+
						"		</div>"+
						"		<div class='input-field col s12'>"+
						"			<button class='btn blue waves-effect waves-light left' name='passwordAuth' data-cmd='passwordAuth'>Submit</button>"+
						"		</div>"+
						"	</div></div>"+
						"</form>";
			system.open_modal("<div class='row'><div class='col offset-s3 s6'>Password Authentication</div></div>",content);
		    $(".formValidate").validate({
		        rules: {
		            field_subjectName: {
		                required: true,
		                authPassword: true,
		                minlength: 5,
		                maxlength: 50
		            },
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
					form = JSON.stringify([u,form[0]['value']]);
					var data = system.get_ajax('../assets/harmony/Process.php?auth',form);
					if(data.responseText == 1){
						_success();
					}
					else{
						_failed();
					}
		        }
			});
		}
    };
}();

var account = function(){
	"use strict";
	return {
		ini:function(){
			var bg = localStorage.getItem('schoolInformation');
			bg = JSON.parse(bg); 
			if(bg == null)
				window.location.href = '../';

			bg = JSON.parse(bg[0][7]); bg = system.get_apr(bg[1]);
            system.nav_scrollHandler(bg);
			var _this = this;
			_this.accountLevel();
			_this.destroy_session();
			var picture = "../assets/img/avatar.jpg";
			var data = system.get_ajax('../assets/harmony/Process.php?get-account',"");
			data.success(function(data){
				data = JSON.parse(data);
				if(data.length>0){
					var imageData = data[0][4].split('.');
					if(imageData[imageData.length-1]!='apr')
						picture = "../assets/img/"+data[0][4];					
					else
						picture = system.get_apr(data[0][4]);

					$("#user-account img").prop('src',picture);
					$("#user-account a[data-activates='profile-dropdown']").html(data[0][1]);
					$("title").html('K12 Grading System');
					$("link[rel='icon']").prop('href',picture);
				}
				else{
					_this.check_access();
				}
			});
			_this.update_schoolInfo();
		},  
		accountLevel: function(){
			var userLevel = ['admin','teacher'];
			var data = system.get_ajax('../assets/harmony/Process.php?get-account',"");
			data.success(function(data){
				data = JSON.parse(data);
				if(data.length == 0)
					window.location.href = '../';
				localStorage.setItem('accessLevel',userLevel[Number(data[0][5])-1]);
				localStorage.setItem('teacher_id',data[0][0]);
				localStorage.setItem('account_data',JSON.stringify(data));
				return data[0][2];
			});
		},
		get_id:function(){
			return localStorage.getItem('teacher_id');
		},
		destroy_session:function(){
			var _this = this;
			$("a[data-cmd").click(function(){
				var data = $(this).data('cmd');
				if(data == "log-out"){
					var logout_data = system.get_ajax('../assets/harmony/Process.php?kill-session',"");
					_this.check_access();
				}
			});
		},
		check_access:function(){
			var _this = this;
			var data = system.get_ajax('../assets/harmony/Process.php?get-account',"");
			data = JSON.parse(data.responseText);
			if(data.length == 0){
				$(location).attr('href','../');	
				console.log("access denied.");
			}
		},		
		add_student: function(){
			console.log('x');
			$('.datepicker').pickadate({
				today: '',
				selectMonths: true,
  				selectYears: true,
  				format: 'mmmm dd, yyyy',
				formatSubmit: 'yyyy/mm/dd',
			});

			var data = system.get_ajax('../assets/harmony/Process.php?get-assoc-yearLevel',"");
			data.success(function(data){
				var data = JSON.parse(data);
				var options = "<option disabled='' selected>Choose year level</option>";
				$.each(data,function(i,v){
					options += "<option value='"+v[0]['title']+"'>"+v[0]['title']+"</option>";
				})
				$("#field_year").html(options);
			    $("select").material_select();

				$("#field_year").change(function(){
					var selected = $("#field_year").val(), options = '';
					if(data[selected][1].length>0){
						$.each(data[selected][1],function(i,v){
							options += "<option value='"+v['section']+"'>"+v['section']+"</option>";
						});					
					}
					else{
						options = "<option disabled='' selected>Choose section</option>";
					}
					$("#field_section").html(options);
				    $("select").material_select();
				});

				$("#field_dob").change(function(){
					var now = new Date();
					var dob = new Date($(this).val());
					var age = Number(now.getFullYear())-Number(dob.getFullYear())
					$("#display_age").html(age);
				});
			});
		    $("#form_registerStudent").validate({
		        rules: {
		            field_fname: {required: true,maxlength: 50},
		            field_gname: {required: true,maxlength: 50},
		            field_mname: {required: true,maxlength: 50},
		            field_dob: {required: true,minlength: 5,maxlength: 50},
		            field_pob: {required: true,minlength: 5,maxlength: 250},
		            field_permanentAddress: {required: true,minlength: 5,maxlength: 250},
		            field_citizenship: {required: true,maxlength: 50},
		            field_height: {required: true,number:true},
		            field_weight: {required: true,number:true},
		            field_fatherName: {required: true,minlength: 5,maxlength: 100},
		            field_motherName: {required: true,minlength: 5,maxlength: 100},
		            field_studentID: {required: true,minlength: 12,maxlength: 12,checkStudentID:true},
		            field_year: {required: true},
		            field_section: {required: true}
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
				messages: {
	                field_studentID: {
	                    remote: "Student ID already in use."
	                }
	            },
				submitHandler: function (form) {
					var studentInfo = $(form).serializeArray();
					console.log(studentInfo);
					var data = system.get_ajax('../assets/harmony/Process.php?set-studentInfo',studentInfo);
					data.success(function(data){
						if(data == 1){
							Materialize.toast('Save.',4000);
							App.handleLoadPage(window.location.hash);
						}
						else{
							console.log(data);
							Materialize.toast('Cannot process request.',4000);
						}
					});
		        }
			}); 
		},
		getStudent:function(){
			var ajax = system.get_ajax('../assets/harmony/Process.php?get-studentsID',"");
			return ajax.responseText;
		},
		importFromFile_student: function(){
            var $inputImage = $("#field_file");
            status = true;
            if(window.FileReader){
                $inputImage.change(function() {
					var _data = account.getStudent();
					_data = JSON.parse(_data);
                    var files = this.files, file = files[0].name.split('.');
                    if((file[1] == "csv") || (file[1] == "xlsx")){ // 
                    	$("#displayImport").removeClass('hidden');
						$("#field_file").parse({
							config: {
								complete: function(results, file) {
									var data = [],count = 0;
									for(var x=1;x<(results['data'].length-1);x++){
										data.push(results['data'][x]);
									}
					                $('#importPreview').DataTable({
					                    data: data,
					                    sort: true,
								        "order": [[ 2, 'asc' ]],
								        bLengthChange: true,
								        paging: false,
								        iDisplayLength: -1,
										sScrollY:        "300px",
										sScrollX:        "100%",
										bScrollCollapse: true,
										fixedColumns:   {
										    leftColumns: 2,
										},								        
					                    columns: [
					                        {data: "",
					                            render: function ( data, type, full ){
					                            	count++;
					                                return count+".";
					                            }
					                        },
					                        {data: "",
					                            render: function ( data, type, full ){
					                            	var result = system.searchJSON(_data,'student_id',full[0]), _class='red-text';
					                   				if(result.length<=0)
					                   					_class = '';
					                            	var details = "<span class='"+_class+"'>"+full[1]+", "+full[2]+" "+full[3]+"</span>";
					                                return details;
					                            }
					                        },
					                        {data: "",
					                            render: function ( data, type, full ){
					                            	var details = full[0];
					                                return details;
					                            }
					                        },
					                        {data: "",
					                            render: function ( data, type, full ){
					                            	var details = full[4];
					                                return details;
					                            }
					                        },
					                        {data: "",
					                            render: function ( data, type, full ){
					                            	var details = full[5];
					                                return details;
					                            }
					                        },
					                        {data: "",
					                            render: function ( data, type, full ){
					                            	var details = full[9];
					                                return details;
					                            }
					                        },
					                        {data: "",
					                            render: function ( data, type, full ){
					                            	var details = full[10];
					                                return details;
					                            }
					                        },
					                        {data: "",
					                            render: function ( data, type, full ){
					                            	var details = full[8];
					                                return details;
					                            }
					                        },
					                        {data: "",
					                            render: function ( data, type, full ){
					                            	var details = full[13];
					                                return details;
					                            }
					                        },
					                        {data: "",
					                            render: function ( data, type, full ){
					                            	var details = full[14];
					                                return details;
					                            }
					                        },
					                        {data: "",
					                            render: function ( data, type, full ){
					                            	var details = full[11];
					                                return details;
					                            }
					                        },
					                        {data: "",
					                            render: function ( data, type, full ){
					                            	var details = full[12];
					                                return details;
					                            }
					                        },
					                        {data: "",
					                            render: function ( data, type, full ){
					                            	var details = "Year: "+full[6]+",<br/>Section: "+full[7];
					                                return details;
					                            }
					                        }
					                    ],
					                });

					                $("#save_import").on("click",function(){
										Materialize.toast('Importing...',4000);
					                	$(this).addClass('disabled');
					                	setTimeout(function(){
											var ajax = system.get_ajax('../assets/harmony/Process.php?set-importStudent',data);
											ajax.success(function(data){
												if(data == 1){
													App.handleLoadPage(window.location.hash);
												}
												else{
													var data = JSON.parse(data);
													Materialize.toast('There was an error. '+data.length+' student(s) are not added.',4000);
												}
											});
					                	},1000);
					                });
								}
							},
							before: function(file, inputElem){
								$("#display_excelFile").html(file.name);
							},
							error: function(err, file, inputElem, reason){
								Materialize.toast("MS Excel file is corrupted.",4000);
							},
						});
                    }
                    else{
                    	$("#displayImport").addClass('hidden');
						$("#display_excelFile").html("");
						Materialize.toast("MS Excel file is not valid. Try a CSV file.",4000);
                    }
                });
            }
            else{
                $inputImage.addClass("hide");
            }	 			
		},
		display_studentList:function(){
			var data = system.get_ajax('../assets/harmony/Process.php?get-students',"");
			data.success(function(data){
		        localStorage.setItem('k12_studentList',data);
				var data = JSON.parse(data);
				var content = "<table id='listStudent' class='table table-striped table-hover dataTable'>"+
							"    <thead>"+
							"        <tr>"+
							"            <th width='5%'></th>"+
							"            <th width='30%'>Name</th>"+
							"            <th width='50%'>LRN</th>"+
							"            <th width='15%'></th>"+
							"        </tr>"+
							"    </thead>"+
							"</table>";

				$('#disply_studentList').html(content);
                $('#listStudent').DataTable({
                    data: data,
                    sort: true,
			        "order": [[ 1, 'asc' ]],
					"columnDefs": [
						{ className: "client-avatar", "targets": [ 0 ] }
					],
                    columns: [
                        {data: "",
                            render: function ( data, type, full ){
                            	var details = '<img alt="image" src="../assets/img/'+full['info']['picture']+'">';
                                return details;
                            }
                        },
                        {data: "",
                            render: function ( data, type, full ){
                            	var details = full['info']['family_name']+", "+full['info']['given_name']+" "+full['info']['middle_name'];
                                return details;
                            }
                        },
                        {data: "",
                            render: function ( data, type, full ){
                            	var details = full['info']['student_id'];
                                return details;
                            }
                        },
                        {data: "",
                            render: function ( data, type, full ){
                            	var info = JSON.stringify(full);
                            	var details = "<a href='#cmd=index;content=student-info;id="+full['info']['student_id']+"' data-cmd='show-info' data-info='"+info+"' class='right tooltipped' data-tooltip='More details' data-position='left' type='button'>"+
					                            	"<i class='mdi-navigation-more-vert'></i>"+
				                            	"</a>";
                                return details;
                            }
                        }
                    ]
                });
				$('.tooltipped').tooltip({delay: 50});
			});
		},
		display_studentInfo:function(studentID){
            var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            var months = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];
	        var data = localStorage.getItem('k12_studentList');
			var data = JSON.parse(data);
			var now = new Date();
			var snapshot = Defiant.getSnapshot(data);

			var result = JSON.search(data,'//info[student_id="'+studentID+'"]');
			var result2 = JSON.search(data,'//educ[student_id="'+studentID+'"]');

			console.log(data);
			console.log(result2);

			var birthdate = new Date(result[0]["date_of_birth"]);
			var bg = localStorage.getItem('schoolInformation');
			bg = JSON.parse(bg); bg = JSON.parse(bg[0][7]); bg = system.get_apr(bg[1]);
			$("#_schoolBanner").attr({'src':bg});			
        	$('#_studentAvatar').prop('src',"../assets/img/"+result[0]["picture"]);
        	$('#_studentName').html(result[0]["family_name"]+", "+result[0]["given_name"]+" "+result[0]["middle_name"]+"<a data-cmd='updateInfo' class='right  mdi-editor-mode-edit tooltipped' data-tooltip='Update' data-position='left' data-id='e24c8490-0e1e-cd57-d069-6c878f9d0cb9'></a>");
        	$('#_studentID').html(result[0]["student_id"]);
        	$('#_studentYear').html(result2[0]["year"]);
        	$('#_studentSection').html(result2[0]["section"]);

        	var content = "		<p><strong>Gender:</strong> "+result[0]["gender"]+"</p><div class='divider'></div>"+
						"		<p><strong>Date of birth:</strong> "+months[birthdate.getMonth()]+" "+birthdate.getDate()+", "+birthdate.getFullYear()+"</p><div class='divider'></div>"+
						"		<p><strong>Age:</strong> "+(now.getFullYear()-birthdate.getFullYear())+"</p><div class='divider'></div>"+
						"		<p><strong>Citizenship:</strong> "+result[0]["citizenship"]+"</p><div class='divider'></div>"+
						"		<p><strong>Weight:</strong> "+((result[0]["weight"]!="")?result[0]["weight"]+"kgs":"")+"</p><div class='divider'></div>"+
						"		<p><strong>Height:</strong> "+((result[0]["height"]!="")?result[0]["height"]+"cm":"")+"</p><div class='divider'></div>"+
						"		<p><strong>Permanent address:</strong> "+result[0]["permanent_address"]+"</p><div class='divider'></div>"+
						"		<p><strong>Place of birth:</strong> "+result[0]["place_of_birth"]+"</p><div class='divider'></div>"+
						"		<p><strong>Name of father:</strong> "+result[0]["father_name"]+"</p><div class='divider'></div>"+
						"		<p><strong>Name of mother:</strong> "+result[0]["mother_name"]+"</p><div class='divider'></div>";

        	$('#disply_studentInfo').html(content);        	
			$('.tooltipped').tooltip({delay: 50});
			account.options_UpdateStudent(studentID,result);
		},
		options_UpdateStudent:function(id,studentsInfo){
            var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            var months = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];
			var now = new Date();
			var birthdate = new Date(studentsInfo[0]["date_of_birth"]);
			$("a[data-cmd='updateInfo']").on("click",function(){
				var data = system.get_ajax('../templates/admin/student-register.html',"");
				data.success(function(data){
					var buttons = "<div class='row'>"+
								  "		<div class='col offset-s8 s4'>"+
								  "				<div class='col s4'><a class='close-modal btn waves-effect waves-light grey'>Cancel</a></div>"+
								  "				<div class='col s4'><button data-cmd='saveUpdate' class='btn waves-effect waves-light red'>Save</a></div>"+
								  "		</div>"+
								  "</div>";

					$('#modal_bottomPopup div.modal_subContent').html(data);
					data = "<form id='updateStudentInfo' data-form='addGrades' method='post' action='' novalidate='novalidate'>"+
								$('form#form_registerStudent').html()+	
							"</form>";
					system.open_modal("<div class='row'><div class='col offset-2 s8'>Update Student Information</div></div>",data);
		            // $("select").material_select();

		            $("form#updateStudentInfo div.row:nth-child(8)").html('');
		            $("form#updateStudentInfo div.row:nth-child(9)").html('');
		            $("form#updateStudentInfo div.row:nth-child(10)").html(buttons);

					$('.datepicker').pickadate({
						today: '',
						selectMonths: true,
		  				selectYears: true,
		  				format: 'mmmm dd, yyyy',
						formatSubmit: 'yyyy/mm/dd',
					});

					$("#field_dob").change(function(){
						var now = new Date();
						var dob = new Date($(this).val());
						var age = Number(now.getFullYear())-Number(dob.getFullYear())
						$("#display_age").html(age);
					});

		            if(studentsInfo[0]["family_name"]!="")
		            	$('label[for="field_fname"]').addClass('active');$('#field_fname').val(studentsInfo[0]["family_name"]);
		            if(studentsInfo[0]["middle_name"]!="")
		            	$('label[for="field_mname"]').addClass('active');$('#field_mname').val(studentsInfo[0]["middle_name"]);
		            if(studentsInfo[0]["given_name"]!="")
		            	$('label[for="field_gname"]').addClass('active');$('#field_gname').val(studentsInfo[0]["given_name"]);
		            if(birthdate.getFullYear()!=""){
		            	$('label[for="field_dob"]').addClass('active');$('#field_dob').val(months[birthdate.getMonth()]+" "+birthdate.getDate()+", "+birthdate.getFullYear());
			        	$('#display_age').html((now.getFullYear()-birthdate.getFullYear()));
		            }        	
		            if(studentsInfo[0]["place_of_birth"]!="")
		            	$('label[for="field_pob"]').addClass('active');$('#field_pob').val(studentsInfo[0]["place_of_birth"]);
		            if(studentsInfo[0]["permanent_address"]!="")
		            	$('label[for="field_permanentAddress"]').addClass('active');$('#field_permanentAddress').val(studentsInfo[0]["permanent_address"]);
		        	(studentsInfo[0]["gender"] == "Male")?$('#field_gender').attr({'checked':'checked'}):$('#field_gender2').attr({'checked':'checked'});
		            if(studentsInfo[0]["citizenship"]!="")
		            	$('label[for="field_citizenship"]').addClass('active');$('#field_citizenship').val(studentsInfo[0]["citizenship"]);
		            if(studentsInfo[0]["height"]!="")
		            	$('label[for="field_height"]').addClass('active');$('#field_height').val(studentsInfo[0]["height"]);
		            if(studentsInfo[0]["weight"]!="")
		            	$('label[for="field_weight"]').addClass('active');$('#field_weight').val(studentsInfo[0]["weight"]);
		            if(studentsInfo[0]["father_name"]!="")
		            	$('label[for="field_fatherName"]').addClass('active');$('#field_fatherName').val(studentsInfo[0]["father_name"]);
		            if(studentsInfo[0]["mother_name"]!="")
		            	$('label[for="field_motherName"]').addClass('active');$('#field_motherName').val(studentsInfo[0]["mother_name"]);

					$(".close-modal").click(function(){
						$(".bottom-sheet").closeModal();
					});
					account.update_student(id);
				});
			});
		},
		update_student: function(id){
			var now = new Date();
		    $("#updateStudentInfo").validate({
		        rules: {
		            field_fname: {required: true,maxlength: 50},
		            field_gname: {required: true,maxlength: 50},
		            field_mname: {required: true,maxlength: 50},
		            field_dob: {required: true,minlength: 5,maxlength: 50},
		            field_pob: {required: true,minlength: 5,maxlength: 250},
		            field_permanentAddress: {required: true,minlength: 5,maxlength: 250},
		            field_citizenship: {required: true,maxlength: 50},
		            field_height: {required: true,number:true},
		            field_weight: {required: true,number:true},
		            field_fatherName: {required: true,minlength: 5,maxlength: 100},
		            field_motherName: {required: true,minlength: 5,maxlength: 100}
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
					var data = $(form).serializeArray(),newData=[id];
					console.log(data);
					$.each(data,function(a,b){
						if(b['name'] != "field_dob_submit")
							newData.push(b);
					});		
					var birthdate = new Date(newData[4]["value"]);
					console.log(birthdate);
					console.log(newData[4]["value"]);

					var data = system.get_ajax('../assets/harmony/Process.php?set-updateStudentInfo',newData);
					console.log(data.responseText);
					data.success(function(data){
						if(data == 1){
				        	$('#_studentName').html(newData[1]["value"]+", "+newData[2]["value"]+" "+newData[3]["value"]+"<a data-cmd='updateInfo' class='right  mdi-editor-mode-edit tooltipped' data-tooltip='Update' data-position='left' data-id='e24c8490-0e1e-cd57-d069-6c878f9d0cb9'></a>");
				        	var content = "		<p><strong>Gender:</strong> "+newData[7]["value"]+"</p><div class='divider'></div>"+
										"		<p><strong>Date of birth:</strong> "+newData[4]["value"]+"</p><div class='divider'></div>"+
										"		<p><strong>Age:</strong> "+(now.getFullYear()-birthdate.getFullYear())+"</p><div class='divider'></div>"+
										"		<p><strong>Citizenship:</strong> "+newData[8]["value"]+"</p><div class='divider'></div>"+
										"		<p><strong>Weight:</strong> "+((newData[10]["value"]!="")?newData[10]["value"]+"kgs":"")+"</p><div class='divider'></div>"+
										"		<p><strong>Height:</strong> "+((newData[9]["value"]!="")?newData[9]["value"]+"cm":"")+"</p><div class='divider'></div>"+
										"		<p><strong>Permanent address:</strong> "+newData[6]["value"]+"</p><div class='divider'></div>"+
										"		<p><strong>Place of birth:</strong> "+newData[5]["value"]+"</p><div class='divider'></div>"+
										"		<p><strong>Name of father:</strong> "+newData[11]["value"]+"</p><div class='divider'></div>"+
										"		<p><strong>Name of mother:</strong> "+newData[12]["value"]+"</p><div class='divider'></div>";
				        	$('#disply_studentInfo').html(content);        	
							Materialize.toast('Save.',4000);
							$(".bottom-sheet").closeModal();

							$("a[data-cmd='updateInfo']").on("click",function(){
								Materialize.toast('You have just updated this student.',4000);
							});

						}
						else{
							console.log(data);
							Materialize.toast('Cannot process request.',4000);
						}
					});
		        }
			}); 
		},
		add_yearLevel:function(){
			var data = system.get_ajax('../assets/harmony/Process.php?set-yearLevel',"");
			data.success(function(data){
				if(data == 1){
					Materialize.toast('Save.',4000);
					App.handleLoadPage(window.location.hash);
				}
				else{
					Materialize.toast('Cannot process request.',4000);
				}
			});
		},
		display_schoolInfo:function(url,account){
			var data = system.get_ajax(url,"");
            var months = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];
			var logo = "../assets/img/logo.png";
			var banner = "../assets/img/bg-banner.jpg";
			data.success(function(data){
				localStorage.setItem('schoolInformation',data);
				data = JSON.parse(data);
				if(data.length>0){
					var details = JSON.parse(data[0][7]);
					var imageData = details[0].split('.');
					if(imageData[imageData.length-1]!='apr')
						logo = "assets/img/"+details[0];					
					else{
						if(!account){
							logo = system.get_aprhome("assets/img/"+details[0]);							
						}
						else{
							logo = system.get_apr(details[0]);							
						}
					}

					var bannerData = details[1].split('.');
					if(bannerData[bannerData.length-1]!='apr')
						banner = "assets/img/"+details[1];					
					else{
						if(!account){
							banner = system.get_aprhome("assets/img/"+details[1]);
						}
						else{
							banner = system.get_apr(details[1]);
						}
					}

					$("link[rel='icon']").prop('href',logo);
					$("#_schoolLogo").attr({src:logo});
					$(".logo").attr({src:logo});
					$("#_schoolBanner").attr({src:banner});
			        localStorage.setItem('school-logo',logo);

					$("#field_schoolDetails").addClass("hidden");
					$("#display_schoolDetails").removeClass("hidden");
					var minDate = data[0][3].split('-'), maxDate = data[0][4].split('-');
 
					$("#_schoolName").html(data[0][1]);
					$("#_schoolAddress").html(details[2]);
					$("#_schoolSchoolID").html(data[0][2]);
					$("#_schoolSchoolYear").html(months[Number(minDate[0])-1]+" "+minDate[1]+" to "+months[Number(maxDate[0])-1]+" "+maxDate[1]);
					$("#_schoolRegion").html(data[0][5]);
					$("#_schoolDivision").html(data[0][6]);
				}
				else{
					$("#field_schoolDetails").removeClass("hidden");
					// $("#display_schoolDetails").addClass("hidden");
				}
			});
		},
		update_schoolInfo:function(){
			var logo = "../assets/img/logo.png";
			var banner = "../assets/img/bg-banner.jpg";
			var data = system.get_ajax('../assets/harmony/Process.php?get-schoolInfo',"");
            var months = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];
			data.success(function(data){
				localStorage.setItem('schoolInformation',data);
				data = JSON.parse(data);
				if(data.length>0){
					// show details
					var details = JSON.parse(data[0][7]);

					var imageData = details[0].split('.');
					if(imageData[imageData.length-1]!='apr')
						logo = "../assets/img/"+details[0];					
					else
						logo = system.get_apr(details[0]);

					if(details[0] != ''){
						$("#_schoolLogo").attr({src:logo});
						$("link[rel='icon']").prop('href',logo);
					}
			        localStorage.setItem('school-logo',logo);

					if(details[1] != ''){
						var bannerData = details[1].split('.');
						if(bannerData[bannerData.length-1]!='apr')
							banner = "../assets/img/"+details[1];					
						else
							banner = system.get_apr(details[1]);
						$("#_schoolBanner").attr({src:banner});
					}

					$("#field_schoolDetails").addClass("hidden");
					$("#display_schoolDetails").removeClass("hidden");
					var minDate = data[0][3].split('-'), maxDate = data[0][4].split('-');
 
					$("#_schoolName").html(data[0][1]);
					$("#_schoolAddress").html(details[2]);
					$("#_schoolSchoolID").html(data[0][2]);
					$("#_schoolSchoolYear").html(months[Number(minDate[0])-1]+" "+minDate[1]+" to "+months[Number(maxDate[0])-1]+" "+maxDate[1]);
					$("#_schoolRegion").html(data[0][5]);
					$("#_schoolDivision").html(data[0][6]);
				}
				else{
					$("#field_schoolDetails").removeClass("hidden");
					$("#display_schoolDetails").addClass("hidden");
				}
			});
		},
		sections:function(){
			$("a[data-cmd='add_section']").click(function(){
				var data = $(this).data();
				var node = data.node, content = '', subContent = '';

				content = "<form class='formValidate' method='get' action='' novalidate='novalidate'>"+
							"	<div class='row'><div class='col offset-s3 s6'>"+
							"		<div class='input-field col s12'>"+
							"			<label for='field_sectionName' class='active'>Section Name: </label>"+
							"            <input type='text' id='field_sectionName' name='field_sectionName' data-error='.error_sectionName'>"+
							"            <input type='hidden' value='"+data.year+"' name='field_yearID'>"+
							"			<div class='error_sectionName'></div>	"+
							"		</div>"+
							"		<div class='input-field col s12'>"+
							"			<button class='btn blue waves-effect waves-light right' name='save' data-cmd='save_subject'>Save</button>"+
							"		</div>"+
							"	</div></div>"+
							"</form>";

				system.open_modal("<div class='row'><div class='col offset-s3 s6'>Add section to "+node+"</div></div>",content);

			    $(".formValidate").validate({
			        rules: {
			            field_sectionName: {
			                required: true,
			                minlength: 3,
			                maxlength: 50
			            }
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
						var sectionInfo = $(form).serializeArray();
						var data = system.get_ajax('../assets/harmony/Process.php?set-section',sectionInfo);
						data.success(function(data){
							console.log(data);
							if(data == 1){
								Materialize.toast('Save.',4000);
								system.close_modal();
								App.handleLoadPage(window.location.hash);
							}
							else{
								Materialize.toast('Cannot process request.',4000);
								console.log(data);
							}
						});
			        }
				});
			});

			$("a[data-cmd='delete-section']").click(function(){
				var data = $(this).data();
				var data = system.get_ajax('../assets/harmony/Process.php?delete-section',[data.node]);
				data.success(function(data){
					if(data == 1){
						Materialize.toast('Deleted.',4000);
						system.close_modal();
						App.handleLoadPage(window.location.hash);
					}
					else{
						Materialize.toast('Cannot process request.',4000);
						console.log(data);
					}
				});
			});
		},
		subject:function(){
			$("a[data-cmd='add_subject']").click(function(){
				var data = $(this).data();
				var node = data.node, content = '', subContent = '';

				content = "<form class='formValidate' data-form='addSubject' method='get' action='' novalidate='novalidate'>"+
							"	<div class='row'><div class='col offset-s3 s6'>"+
							"		<div class='row'>"+
							"			<div class='input-field col s6'>"+
							"				<label for='field_subjectCode' class='active'>Subject code: </label>"+
							"	            <input type='text' id='field_subjectCode' name='field_subjectCode' data-error='.error_subjectCode'>"+
							"	            <input type='hidden' value='"+data.year+"' name='field_yearID'>"+
							"				<div class='error_subjectCode'></div>"+
							"			</div>"+
							"			<div class='input-field col s6'>"+
							"				<label for='field_subjectTitle' class='active'>Subject title: </label>"+
							"	            <input type='text' id='field_subjectTitle' name='field_subjectTitle' data-error='.error_subjectTitle'>"+
							"				<div class='error_subjectTitle'></div>"+
							"			</div>"+
							"		</div>"+
							"		<div class='row'>"+
							"			<div class='input-field col s4'>"+
							"				<label for='field_subjectWeightPT' class='active'>Performance Task: (%)</label>"+
							"   	         <input type='text' id='field_subjectWeightPT' name='field_subjectWeightPT' data-error='.error_subjectWeightPT'>"+
							"				<div class='error_subjectWeightPT'></div>"+
							"			</div>"+
							"			<div class='input-field col s4'>"+
							"				<label for='field_subjectWeightWW' class='active'>Written Works: (%)</label>"+
							"   	         <input type='text' id='field_subjectWeightWW' name='field_subjectWeightWW' data-error='.error_subjectWeightWW'>"+
							"				<div class='error_subjectWeightWW'></div>"+
							"			</div>"+
							"			<div class='input-field col s4'>"+
							"				<label for='field_subjectWeightQA' class='active'>Quarterly Assessment: (%)</label>"+
							"	            <input type='text' id='field_subjectWeightQA' name='field_subjectWeightQA' data-error='.error_subjectWeightQA'>"+
							"				<div class='error_subjectWeightQA'></div>"+
							"			</div>"+
							"		</div>"+
							"		<div class='input-field col s12 hidden'>"+
							"			<label for='field_subjectDesc' class='active'>Subject Description: <i>Optional</i></label>"+
							"            <textarea class='materialize-textarea' id='field_subjectDesc' name='field_subjectDesc' data-error='.error_subjectDesc'>No description</textarea>"+
							"			<div class='error_subjectDesc'></div>"+
							"		</div>"+
							"		<div class='input-field col s12'>"+
							"			<button class='btn blue waves-effect waves-light right' name='save' data-cmd='save_subject'>Save</button>"+
							"		</div>"+
							"	</div></div>"+
							"</form>";

				system.open_modal("<div class='row'><div class='col offset-s3 s6'>Add subject to "+node+"</div></div>",content);

			    $(".formValidate").validate({
			        rules: {
			            field_subjectName: {
			                required: true,
			                minlength: 5,
			                maxlength: 50
			            },
			            field_subjectCode: {
			                required: true,
			                minlength: 5,
			                maxlength: 50
			            },
			            field_subjectWeightPT: {
			            	componentPercentage:['field_subjectWeightPT','field_subjectWeightWW','field_subjectWeightQA'],
			                required: true,
			                minlength: 1,
			                maxlength: 2,
			                digits:true
			            },
			            field_subjectWeightWW: {
			            	componentPercentage:['field_subjectWeightPT','field_subjectWeightWW','field_subjectWeightQA'],
			                required: true,
			                minlength: 1,
			                maxlength: 2,
			                digits:true
			            },
			            field_subjectWeightQA: {
			            	componentPercentage:['field_subjectWeightPT','field_subjectWeightWW','field_subjectWeightQA'],
			                required: true,
			                minlength: 1,
			                maxlength: 2,
			                digits:true
			            },
			            field_subjectDesc: {
			                required: false,
			                minlength: 0,
			                maxlength: 250
			            }
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
						console.log(form);
						var data = system.get_ajax('../assets/harmony/Process.php?set-subject',form);
						data.success(function(data){							
							if(data == 1){
								Materialize.toast('Save.',4000);
								system.close_modal();
								App.handleLoadPage(window.location.hash);
							}
							else{
								Materialize.toast('Cannot process request.',4000);
								console.log(data);
							}
						});
			        }
				});
			});

			$("a[data-cmd='add-sublevelsubject']").click(function(){
				var data = $(this).data();
				console.log(data);

				var node = data.node, content = '', subContent = '';

				content = "<form class='formValidate' data-form='addSubject' method='get' action='' novalidate='novalidate'>"+
							"	<div class='row'><div class='col offset-s3 s6'>"+
							"		<div class='input-field col s6'>"+
							"			<label for='field_subjectCode' class='active'>Subject code: </label>"+
							"            <input type='text' id='field_subjectCode' name='field_subjectCode' data-error='.error_subjectCode'>"+
							"            <input type='hidden' value='"+data.key+"' name='field_yearID'>"+
							"			<div class='error_subjectCode'></div>	"+
							"		</div>"+
							"		<div class='input-field col s6'>"+
							"			<label for='field_subjectTitle' class='active'>Subject title: </label>"+
							"            <input type='text' id='field_subjectTitle' name='field_subjectTitle' data-error='.error_subjectTitle'>"+
							"			<div class='error_subjectTitle'></div>	"+
							"		</div>"+
							"		<div class='input-field col s12 hidden'>"+
							"			<label for='field_subjectDesc' class='active'>Subject Description: <i>Optional</i></label>"+
							"            <textarea class='materialize-textarea' id='field_subjectDesc' name='field_subjectDesc' data-error='.error_subjectDesc'>No description</textarea>"+
							"			<div class='error_subjectDesc'></div>	"+
							"		</div>"+
							"		<div class='input-field col s12'>"+
							"			<button class='btn blue waves-effect waves-light right' name='save' data-cmd='save_subject'>Save</button>"+
							"		</div>"+
							"	</div></div>"+
							"</form>";

				system.open_modal("<div class='row'><div class='col offset-s3 s6'>Add sub-level subject to "+node+"</div></div>",content);

			    $(".formValidate").validate({
			        rules: {
			            field_subjectName: {
			                required: true,
			                minlength: 5,
			                maxlength: 50
			            },
			            field_subjectCode: {
			                required: true,
			                minlength: 5,
			                maxlength: 50
			            },
			            field_subjectDesc: {
			                required: false,
			                minlength: 0,
			                maxlength: 250
			            }
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
						var subjectInfo = $(form).serializeArray();
						var data = system.get_ajax('../assets/harmony/Process.php?set-sublevelsubject',subjectInfo);
						data.success(function(data){
							console.log(data);
							if(data == 1){
								Materialize.toast('Save.',4000);
								system.close_modal();
								App.handleLoadPage(window.location.hash);
							}
							else{
								Materialize.toast('Cannot process request.',4000);
								console.log(data);
							}
						});
			        }
				});
			});

			$("a[data-cmd='delete-subject']").click(function(){
				var _data = $(this).data();
				var content = "<div class='row'><div class='col offset-s3 s6'>"+
								" All sub-level subjects will also be deleted.<br/><br/>"+
								"	<a class='btn blue waves-effect waves-light' type='submit' name='action' data-cmd='confirm-delete'>Confirm</a>"+
								"	<a class='btn-flat waves-effect waves-light' type='submit' name='action' data-cmd='cancel-delete'>Cancel</a>"+
								"</div></div>";

				system.open_modal("<div class='row'><div class='col offset-s3 s6'>Are you sure you want to delete this subject?</div></div>",content);

				$("a[data-cmd='confirm-delete']").click(function(){
					var data = system.get_ajax('../assets/harmony/Process.php?delete-subject',[_data.key,_data.node]);
					data.success(function(data){
						if(data == 1){
							system.close_modal();
							Materialize.toast('Deleted.',4000);
							App.handleLoadPage(window.location.hash);
						}
						else{
							Materialize.toast('Cannot process request.',4000);
							console.log(data);
						}
					});
				});
				$("a[data-cmd='cancel-delete']").click(function(){
					system.close_modal();
				});
			});

			$("a[data-cmd='delete-sublevelsubject']").click(function(){
				var _data = $(this).data();
				var content = "<div class='row'><div class='col offset-s3 s6'>"+
								"<br/>"+
								"	<a class='btn blue waves-effect waves-light' type='submit' name='action' data-cmd='confirm-delete'>Confirm</a>"+
								"	<a class='btn-flat waves-effect waves-light' type='submit' name='action' data-cmd='cancel-delete'>Cancel</a>"+
								"</div></div>";

				system.open_modal("<div class='row'><div class='col offset-s3 s6'>Are you sure you want to delete this sub-level subject?</div></div>",content);

				$("a[data-cmd='confirm-delete']").click(function(){
					var data = system.get_ajax('../assets/harmony/Process.php?delete-sublevelsubject',[_data.key,_data.node]);
					data.success(function(data){
						if(data == 1){
							system.close_modal();
							Materialize.toast('Deleted.',4000);
							App.handleLoadPage(window.location.hash);
						}
						else{
							Materialize.toast('Cannot process request.',4000);
							console.log(data);
						}
					});
				});
				$("a[data-cmd='cancel-delete']").click(function(){
					system.close_modal();
				});
			});
		},
		yearLevel:function(){
			var data = system.get_ajax('../assets/harmony/Process.php?get-yearLevel',"");
			data.success(function(data){
				var data = JSON.parse(data);
				if(data.length>0){
					var content = "";
					$.each(data,function(i,v){
						var sectioncontent = "";
						if(v[1].length>0){
							sectioncontent += "<tr><th>Sections</th></tr>";
							$.each(v[1],function(i2,v2){
								sectioncontent += "<tr><td>"+v2[1]+"<a class='secondary-content tooltipped btn-icon' data-node='"+v2[0]+"' data-cmd='delete-section' data-tooltip='Delete section' data-position='left'><i class='mdi-content-clear'></i></a></td></tr>";
							});						
						}
						else{
							sectioncontent += "<tr><td>No section</td></tr>";
						}
						sectioncontent = "<table class='bordered responsive-table'>"+sectioncontent+"</table>";

						var subjectcontent = "";
						if(v[2].length>0){
							subjectcontent += "<tr><th>Subject Code</th><th>Subject Title</th><th>Weight of Component<br/><small>Performance task, Written works, Quarterly assessment</small></th><th></th></tr>";
							$.each(v[2],function(i2,v2){
								var subData = JSON.parse(v2[2]);
								if(subData.length > 1){
									var sublevel = "";
									for(var x=1;x<subData.length;x++){
										var _sub = JSON.stringify([subData[x][1],subData[x][0],subData[x][2]]);
										sublevel += "<tr>"+
															"	<td width='20%'><i class='mdi-navigation-arrow-forward'></i>"+subData[x][0]+"</td>"+
															"	<td width='20%' colspan='2'>"+subData[x][1]+"</td>"+
															"	<td width='80px;'>"+
															"		<a class='secondary-content tooltipped btn-icon' data-key='"+v2[0]+"' data-node='"+_sub+"' data-cmd='delete-sublevelsubject' data-tooltip='Delete sub-level subject' data-position='left'><i class='mdi-content-clear'></i></a>"+
															"	</td>"+
															"</tr>";
									}
									subjectcontent += "<tr>"+
														"	<td width='20%'>"+v2[1]+"</td>"+
														"	<td width='20%'>"+subData[0]+"</td>"+
														"	<td width=''>"+v2[6]+"</td>"+
														"	<td width='80px;'>"+
														"		<a class='secondary-content tooltipped btn-icon' data-key='"+v2[0]+"' data-node='"+v2[1]+"' data-cmd='add-sublevelsubject' data-tooltip='Add sub-level subject' data-position='left'><i class='mdi-content-add'></i></a>"+
														"		<a class='secondary-content tooltipped btn-icon' data-key='"+v2[0]+"' data-node='"+v2[1]+"' data-cmd='delete-subject' data-tooltip='Delete subject' data-position='left'><i class='mdi-content-clear'></i></a>"+
														"	</td>"+
														"</tr>"+sublevel;
								}
								else{
									subjectcontent += "<tr>"+
														"	<td width='20%'>"+v2[1]+"</td>"+
														"	<td width='20%'>"+subData[0]+"</td>"+
														"	<td width=''>"+v2[6]+"</td>"+
														"	<td width='80px;'>"+
														"		<a class='secondary-content tooltipped btn-icon' data-key='"+v2[0]+"' data-node='"+v2[1]+"' data-cmd='add-sublevelsubject' data-tooltip='Add sub-level subject' data-position='left'><i class='mdi-content-add'></i></a>"+
														"		<a class='secondary-content tooltipped btn-icon' data-key='"+v2[0]+"' data-node='"+v2[1]+"' data-cmd='delete-subject' data-tooltip='Delete subject' data-position='left'><i class='mdi-content-clear'></i></a>"+
														"	</td>"+
														"</tr>";
								}
							});						
						}
						else{
							subjectcontent += "<tr><td>No subject</td></tr>";
						}

						subjectcontent = "<table class='bordered responsive-table stripped'>"+subjectcontent+"</table>";

						content +=  "<li class='yearLevel'>"+
									"	<div class='collapsible-header'>"+
										v[0][1]+
									"		<a class='waves-effect waves-light grey-text tooltipped right' data-tooltip='Add Subject' data-position='left' data-cmd='add_subject' data-node='"+v[0][1]+"' data-year='"+v[0][0]+"'><i class='mdi-action-note-add'></i></a>"+
									"		<a class='waves-effect waves-light grey-text tooltipped right' data-tooltip='Add Section' data-position='left' data-cmd='add_section' data-node='"+v[0][1]+"' data-year='"+v[0][0]+"'><i class='mdi-av-playlist-add'></i></a>"+
									"	</div>"+
									"	<div class='collapsible-body row'>"+
									"		<div class='col s4'>"+
												sectioncontent+
									"		</div>"+
									"		<div class='col s8'>"+
												subjectcontent+
									"		</div>"+
									"	</div>"+
									"</li>";
					});
					content = "<ul class='collapsible popout collapsible-accordion' id='yearLevels' data-collapsible='accordion'>"+content+"</ul>";
					$("#list_yearSection").html(content);

					$('.tooltipped').tooltip({delay: 50});
					$(".collapsible").collapsible({accordion:!1});

					account.sections();
					account.subject();
				}
				else{
					console.log('no year level');
				}
			});
		},
		promotionProcess:function(){
		    $("#form_promoteSubmit").validate({
		        rules: {
		            field_yearPromotion: {required: true},
		            field_sectionPromotion: {required: true}
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
					var _form = $(form).serializeArray();
					var content = "", control = "";
					_form = JSON.stringify(_form);
					var _data = system.get_ajax('../assets/harmony/Process.php?set-studentsPromotion',_form);
					console.log(_data.responseText);
					data.success(function(data){
						if(data == 1){
							Materialize.toast('Success.',4000);
							App.handleLoadPage(window.location.hash);
						}
						else{
							Materialize.toast('Cannot process request.',4000);
							console.log(data);
						}
					});
				}
			});
		},
		display_studentPromotion:function(){
			var data = system.get_ajax('../assets/harmony/Process.php?get-assoc-yearLevel',"");
			data.success(function(data){
				var data = JSON.parse(data);
				var options = "<option disabled='' selected>Choose year level</option>";
				$.each(data,function(i,v){
					options += "<option value='"+v[0]['title']+"'>"+v[0]['title']+"</option>";
				})
				$("#field_year").html(options);
			    $("select").material_select();

				$("#field_year").change(function(){
					var selected = $("#field_year").val(), options = '';
					if(data[selected][1].length>0){
						$.each(data[selected][1],function(i,v){
							options += "<option value='"+v['section']+"'>"+v['section']+"</option>";
						});					
					}
					else{
						options = "<option disabled='' selected>Choose section</option>";
					}
					$("#field_section").html(options);
				    $("select").material_select();
				});
			});

		    $("#form_promoteStudent").validate({
		        rules: {
		            field_year: {required: true},
		            field_section: {required: true}
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
					var content = "", control = "";
					form = JSON.stringify(form);
					var data = system.get_ajax('../assets/harmony/Process.php?get-studentsPromotion',form);
					data.success(function(data){
						data = JSON.parse(data);
						$.each(data,function(i,v){
							content += "<tr><td width='5px'>"+(i+1)+". </td><td><p><input type='checkbox' name='"+v[1]+"' id='field_promote_"+v[0]+"' checked='checked'><label for='field_promote_"+v[0]+"'></label></p></td><td>"+v[7]+" "+v[8]+", "+v[9]+"</td><td>"+v[1]+"</td></tr>";
						})
					});

					control = "<div class='row'>"+
								"	<div class='divider'></div><h6>Promote Students</h6>"+
								"	<div class='input-field col s4'>"+
								"		<label for='field_yearPromotion' class='active'>Year: </label>"+
								"		<select class='select-dropdown' id='field_yearPromotion' name='field_yearPromotion' data-error='.error_yearPromotion'>"+
								"			<option>Choose section</option>"+
								"		</select>"+
								"		<br/><div class='error_yearPromotion'></div>	"+
								"	</div>"+
								"	<div class='input-field col s4'>"+
								"		<label for='field_sectionPromotion' class='active'>Section: </label>"+
								"		<select class='select-dropdown' id='field_sectionPromotion' name='field_sectionPromotion' data-error='.error_sectionPromotion'>"+
								"			<option>Choose section</option>"+
								"		</select>"+
								"		<br/><div class='error_sectionPromotion'></div>	"+
								"	</div>"+
								"	<div class='input-field col s4'>"+
								"		<button class='btn blue waves-effect waves-light' type='submit' name='button_promoteStudent'>Promote</button>"+
								"	</div>"+
								"</div>";

					content = "<form id='form_promoteSubmit' class='formValidate col s12' method='get' action='' novalidate='novalidate'>"+
							  "		<div class='row'>"+
							  "			<div class='col offset-l1 s12 m12 l10'>"+
							  "				<div class='card'>"+
							  "					<table class='_finalGrade display dataTable striped bordered'>"+
							  "					    <thead>"+
							  "							<tr><th>#</th><th>Promote</th><th>Name</th><th>Student ID</th></tr>"+
							  "					    </thead>"+
							  "					    <tbody>"+
							  							content+
							  "		 			    </tbody>"+
							  "					</table>"+
							  "				</div>"+
							  				control+
							  "			</div>"+
							  "		</div>"+
							  "</form>";

					$("#disply_studentList").html(content);
				    $("select").material_select();

					data = system.get_ajax('../assets/harmony/Process.php?get-assoc-yearLevel',"");
					data.success(function(data){
						var data = JSON.parse(data);
						var options = "<option disabled='' selected>Choose year level</option>";
						$.each(data,function(i,v){
							options += "<option value='"+v[0]['title']+"'>"+v[0]['title']+"</option>";
						})
						$("#field_yearPromotion").html(options);
					    $("select").material_select();

						$("#field_yearPromotion").change(function(){
							var selected = $("#field_yearPromotion").val(), options = '';
							if(data[selected][1].length>0){
								$.each(data[selected][1],function(i,v){
									options += "<option value='"+v['section']+"'>"+v['section']+"</option>";
								});					
							}
							else{
								options = "<option disabled='' selected>Choose section</option>";
							}
							$("#field_sectionPromotion").html(options);
						    $("select").material_select();
						});

						account.promotionProcess();
					});
		        }
			});
		}
    };
}();

var grading = function(){
	"use strict";
	return {
		gradingSheet:function(){
			var accountData = JSON.parse(localStorage.getItem('account_data'));
			this.controls_gradingSheet();
		    $("#form_gradesheet").validate({
		        rules: {
		            field_teacher: {required: true},
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
					form = JSON.stringify(form);
			        localStorage.setItem('controls_gradingSheet',form);
					grading.get_grade(form);
					grading.get_student(form);
			      	grading.get_subjectDetails(form);
			        if(Number(accountData[0][5]) == 1){
				        localStorage.setItem('teacherName',$("#field_teacher")[0]['selectedOptions'][0].innerHTML);			        	
			        }
					window.location.href = '#cmd=index;content=grading-sheet';
		        }
			});
		},
		get_subjectDetails:function(controls){
			var data = system.get_ajax('../assets/harmony/Process.php?get-subjectDetails',controls);
			data.success(function(data){
				console.log(data);
		        localStorage.setItem('subject_gradingSheet',data);
			});
		},
		get_grade:function(controls){
			data = JSON.parse(controls);
			var data = system.get_ajax('../assets/harmony/Process.php?get-grade',[controls,data[0]['value']]);
			data.success(function(data){		
				console.log(data);
				localStorage.setItem("grades_gradeSheetQuarter",data);
			});
		},
		controls_gradingSheet:function(){
			var user = localStorage.getItem('account_data');
			user = JSON.parse(user);

			if(Number(user[0][5] == 1)){ // admin
				var data = system.get_ajax('../assets/harmony/Process.php?get-teachers','');
				data.success(function(data){
					data = JSON.parse(data);
					var options = "<option disabled='' selected>Choose teacher</option>";
					$.each(data,function(i,v){
						options += "<option value='"+v['id']+"'>"+v['name']+"</option>";
					})
					$("#field_teacher").html(options);
				    $("select").material_select();

				    $("#field_teacher").change(function(){
						var data = system.get_ajax('../assets/harmony/Process.php?get-uniqueTeacherAssignSubject',$(this).val()),sublevelSubject = [];
						data.success(function(data){
							data = JSON.parse(data);
							var options = "<option disabled='' selected>Choose year level</option>", yearOption = "", sectionOption = "", subjectOption = "";
							$.each(data[0],function(i,v){
								yearOption += "<option value='"+v['year']+"'>"+v['year']+"</option>";
							})
							$("#field_year").html("<option disabled='' selected>Choose year level</option>"+yearOption);
							$("#field_year").attr({"disabled":false});

							$.each(data[1],function(i,v){
								sectionOption += "<option value='"+v['section']+"'>"+v['section']+"</option>";
							})
							$("#field_section").html("<option disabled='' selected>Choose section</option>"+sectionOption);
							$("#field_section").attr({"disabled":false});

							$.each(data[2],function(i,v){
								var _subject = JSON.parse(v);
					            sublevelSubject.push(_subject);
								subjectOption += "<option value='"+_subject[0]+"'>"+_subject[0]+"</option>";
							})
							$("#field_subject").html("<option disabled='' selected>Choose subject</option>"+subjectOption);
							$("#field_subject").attr({"disabled":false});
						    $("select").material_select();

							$("#field_subject").change(function(){
								var subject = $(this).val(), _search = [];
								$.each(sublevelSubject,function(i,v){
		                            var search = JSON.search(v, '//*[contains(*, "'+subject+'")]');
		                            if(search.length>0){
										if(search[0].length>1){
											$("#display_sublevelsubject").removeClass('hidden');
											for(var x=1;x<search[0].length;x++){
												options += "<option value='"+search[0][x][0]+"'>"+search[0][x][0]+"</option>";
											}
											$("#field_subsubject").attr({"disabled":false});
											$("#field_subsubject").html(options);
										    $("select").material_select();
										}	                            	
			                            else{
											$("#display_sublevelsubject").addClass('hidden');
			                            }
		                            }
								})
							});
						});
				    });
				});
			}
			else{ // teacher
				var data = system.get_ajax('../assets/harmony/Process.php?get-uniqueTeacherAssignSubject',$("#field_teacher").val()),sublevelSubject = [];
				data.success(function(data){
					data = JSON.parse(data);
					var options = "<option disabled='' selected>Choose year level</option>", yearOption = "", sectionOption = "", subjectOption = "";
					$.each(data[0],function(i,v){
						yearOption += "<option value='"+v['year']+"'>"+v['year']+"</option>";
					})
					$("#field_year").html("<option disabled='' selected>Choose year level</option>"+yearOption);
					$("#field_year").attr({"disabled":false});

					$.each(data[1],function(i,v){
						sectionOption += "<option value='"+v['section']+"'>"+v['section']+"</option>";
					})
					$("#field_section").html("<option disabled='' selected>Choose section</option>"+sectionOption);
					$("#field_section").attr({"disabled":false});

					$.each(data[2],function(i,v){
						var _subject = JSON.parse(v);
			            sublevelSubject.push(_subject);
						subjectOption += "<option value='"+_subject[0]+"'>"+_subject[0]+"</option>";
					})
					$("#field_subject").html("<option disabled='' selected>Choose subject</option>"+subjectOption);
					$("#field_subject").attr({"disabled":false});
				    $("select").material_select();

					$("#field_subject").change(function(){
						var subject = $(this).val(), _search = [];
						$.each(sublevelSubject,function(i,v){
                            var search = JSON.search(v, '//*[contains(*, "'+subject+'")]');
                            if(search.length>0){
								if(search[0].length>1){
									$("#display_sublevelsubject").removeClass('hidden');
									for(var x=1;x<search[0].length;x++){
										options += "<option value='"+search[0][x][0]+"'>"+search[0][x][0]+"</option>";
									}
									$("#field_subsubject").attr({"disabled":false});
									$("#field_subsubject").html(options);
								    $("select").material_select();
								}	                            	
	                            else{
									$("#display_sublevelsubject").addClass('hidden');
	                            }
                            }
						})
					});
				});
			}
		},
		list_gradingSheet:function(){
			system.loader(true); system.block(true);
			$("#display_studentList").html(system.preloader(200));
	        var data_controls = JSON.parse(localStorage.getItem('controls_gradingSheet'));
	        var data_gradesAll = JSON.parse(localStorage.getItem('grades_gradeSheetQuarter'));
	        var data_students = JSON.parse(localStorage.getItem('students_gradingSheet'));
	        var data_subject = JSON.parse(localStorage.getItem('subject_gradingSheet'));
    		var class_grading = '';
	        var teacherName = "";
	        var content = "",_content = "", content_finalGrade = "";
    		var components = ['Written Works','Performance Task','Quarterly Assessment'];
			var data_account = system.do_ajax('../assets/harmony/Process.php?get-accountLevel','');
			data_account = (data_account.responseText==1)?data_account.responseText:localStorage.getItem('teacherName');
	        
			if(data_subject.length == 0){
				Materialize.toast('No data collected.',1000,'',function(){
					system.loader(false); system.block(false);
					window.location.href = '../account/#cmd=index;content=options_gradeSheet';
				});
			}
			else{
		        data_subject = JSON.parse(data_subject[0][6]);

				var colors = ['teal lighten-5','green lighten-5','blue lighten-5'];
				var ps = 100;
				var ws = [data_subject[1],data_subject[0],data_subject[2]];
				var gender = [{"male":system.searchJSON(data_students,10,"Male"),"female":system.searchJSON(data_students,10,"Female")}];

				if(Number(data_account) == 1){
					class_grading = 'hidden';
					teacherName = "<td>Teacher: "+localStorage.getItem('teacherName')+"</td>";
					// teacherName = "<td>Teacher: "+data_account+"</td>";
				}

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
									var search = JSON.search(grades, '//*[id="'+value_genderInner[1]+'"]/score');
									sub_headers += "<td class='"+colors[index_grade2]+"'>#"+(index_grade3+1)+"</td>";
									highScore += "<td class='"+colors[index_grade2]+"'>"+value_grade3[1]+"</td>";

									var name = value_genderInner[7]+" "+value_genderInner[8]+", "+value_genderInner[9];
									var strand = value_grade2[0][5];
									var data_content = JSON.stringify([{"row":value_grade2[0][0],"highScore":value_grade2[0][1],"rating":search[0],"id":value_genderInner[1],"name":name,"strand":strand}]);

									sub_columnContent += "<td class='"+colors[index_grade2]+"'><a data-cmd='updateGrade' data-content='"+data_content+"'>"+search+"</a></td>";
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
						// summaryTabContent += "<td center-align'>Hello world"+grade.search(parseFloat(initialGrade).toFixed(2),grade.table())[0]['value']+"</td>";
						finalGrade.push({student_id:value_genderInner[1],quarter:index_grade,score:grade.search(parseFloat(initialGrade).toFixed(2),grade.table())[0]['value']});

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
										"	<td>"+value_genderInner[7]+" "+value_genderInner[8]+", "+value_genderInner[9]+"</td><td>"+value_genderInner[10]+"</td>"+
											sub_columnContent+
										"	<td class=' center-align blue lighten-3'>"+parseFloat(initialGrade).toFixed(2)+"</td>"+
										"	<td class=' center-align blue lighten-2'>"+grade.search(parseFloat(initialGrade).toFixed(2),grade.table())[0]['value']+"</td>"+
										"</tr>";
					});

					tabContent +=   "<li data-node='"+(index_grade.replace(' ',''))+"'>"+
									"	<div class='collapsible-header'>"+index_grade+"</div>"+
									"	<div id='"+(index_grade.replace(' ',''))+"' class='collapsible-body row' style='padding:2rem;padding-top:0px;'>"+
									"		<div style='position: relative;top: 60px; z-index: 100;'>"+
									"			<div class='input-field col s2'>"+
									"				<a data-cmd='print' data-node='"+(index_grade)+"' class='white-text btn-flat blue waves-effect waves-light'>Print</a>"+
									"			</div>"+
									"			<div class='input-field col s2 "+class_grading+"'>"+
									"				<a data-cmd='add-grade' data-quarter='"+(index_grade)+"' class='white-text btn-flat blue waves-effect'>Add Grade</a>"+
									"			</div>"+
									"		</div>"+
									"		<table id='' class='_listStudent display dataTable striped bordered'>"+
									"		    <thead>"+
			 						"		        <tr>"+
									"		            <th width='150px;' colspan='2'></th>"+
									"		            <th colspan='"+(value_grade[0].length+3)+"' class='center-align "+colors[0]+"'>Written Works "+ws[0]+"%</th>"+
									"		            <th colspan='"+(value_grade[1].length+3)+"' class='center-align "+colors[1]+"'>Performance Task "+ws[1]+"%</th>"+
									"		            <th colspan='"+(value_grade[2].length+3)+"' class='center-align "+colors[2]+"'>Quarterly Assessment "+ws[2]+"%</th>"+
									"					<th class='center-align blue lighten-3' rowspan='2'>Initial Grade</th>"+
									"					<th class='center-align blue lighten-2' rowspan='2'>Quarterly Grade</th>"+
									"		        </tr>"+
													 headers+
			 						"		    </thead>"+
													sub_content+
								    "		</table>"+
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
									"	<td width='150px;'>"+value_gender2[7]+" "+value_gender2[8]+", "+value_gender2[9]+"</td><td>"+value_gender2[10]+"</td>"+
										sub_columnContent+
									"	<td class=' center-align blue lighten-2'>"+system.getRealNumber(_finalgrade/4)+"</td>"+
									"	<td class=' center-align blue lighten-3 hidden'></td>"+
									"</tr>";
				});

				$("#_gradeSection").html(data_controls[1]['value']+" - "+data_controls[2]['value']);
				$("#_subject").html(data_controls[3]['value']);

	        	allContent =  "<div class='row'>"+
							  "		<blockquote>"+
		   					  "			<table class=''>"+	
	 						  "				<tr>"+teacherName+
							  "				    <td>Year: "+data_controls[1]['value']+"</td>"+
							  "				    <td>Section: "+data_controls[2]['value']+"</td>"+
							  "				    <td>Subject: "+data_controls[3]['value']+"</td>"+
							  "				    <td width='500px'></td>"+
							  "				</tr>"+
							  "			</table>"+
		   					  "		</blockquote>"+
							  "		<ul class='collapsible collapsible-accordion' data-collapsible='accordion'>"+
							  			tabContent+
							  "			<li data-node='FinaleGrade'>"+
							  "				<div class='collapsible-header'>Final Grade</div>"+
							  "				<div id='Summary' class='collapsible-body' style='padding:2rem;padding-top:0px;'>"+
							  "					<div class='' style='position: relative;top: 60px; z-index: 100;'>"+
							  "						<div class='input-field col s2'>"+
							  "							<a data-cmd='print' data-node='Summary' class='white-text btn-flat blue waves-effect waves-light'>Print</a>"+
							  "						</div>"+
							  "					</div>"+
							  "					<table class='_finalGrade display dataTable striped bordered'>"+
							  "					    <thead>"+
							  							headers+
							  "					    </thead>"+
							  "					    <tbody>"+
							  							sub_content+
							  "						    </tbody>"+
							  "					</table>"+
							  "				</div>"+
							  "			</li>"+
							  "		</ul>"+
							  "</div>";

				$('#display_studentList').html(allContent);
				$(".collapsible").collapsible({accordion:!1});

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

	            $("table._listStudent").parents(".dataTables_wrapper").find('div.s6:nth-child(1)').html("<h5><br/></h5>");
	            $("table._finalGrade").parents(".dataTables_wrapper").find('div.s6:nth-child(1)').html("<h5><br/></h5>");
				grading.add_grade(data_students,data_controls);
	            $("select").material_select();

	            $('ul.collapsible').click(function(){
	            	var data = $(this).find('li.active').data('node');
	            	if((typeof data != undefined || data != 'undefined')){
		            	localStorage.setItem('open-tab',data);
	            	}
	            });

				Materialize.toast('Collecting Information. Please wait.',1000,'',function(){
					system.loader(false); system.block(false);
		            var data = localStorage.getItem('open-tab');
		            $("ul li[data-node='"+data+"']").addClass('active');
		            $("ul li[data-node='"+data+"'] div.collapsible-header").addClass('active');
		            $("ul li[data-node='"+data+"'] #"+data).css({"display":"block"});
		 		    grading.grade_printing();
				});
			}

			$("a[data-cmd='updateGrade']").click(function(){
				var data = $(this).data('content');
				var dataX = data[0];
				var _this = this;
				data = data[0];

				var content = "<div class='row'>"+
						"	<div class='col offset-s3 s6'>"+
						"		<form class='form_gradesheet' data-form='addGrades' method='get' action='' novalidate='novalidate'>"+
						"			<div class='col s6'>"+
						"				<p>Student: "+data.name+"</p>"+
						"				<p>Current Score: "+data.rating+"</p>"+
						"				<p>Strand: "+data.strand+"</p><br/>"+
						"			</div>"+
						"			<div class='col s6'>"+
						"				<label for='field_fname'>New Score:</label>"+
						"				<input type='text' class='field_highGrade' placeholder='New score' name='field_highGrade'>"+
						"			</div>"+
						"			<div class='col s12'>"+
						"				<button class='btn blue waves-effect waves-light'>Save</button>"+
						"				<a class='close-modal btn-flat waves-effect waves-light'>Cancel</a>"+
						"			</div>"+
						"		</form>"+
						"	</div>"+
						"</div>";

				system.open_modal("<div class='row'><div class='col offset-s3 s6'>Update grade</div></div>",content);

				$.validator.addClassRules("field_highGrade", {
				    required: true,
				    number:true,
	            	checkRange2:[0,data.highScore]
				});

			    $(".form_gradesheet").validate({
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
						var data = system.get_ajax('../assets/harmony/Process.php?set-updateGrades',[dataX,form]);
						data.success(function(data){
							if(data == 1){
								Materialize.toast('Save.',4000);
								system.close_modal();
								$(_this).html(form[0].value);
							}
							else{
								Materialize.toast('Cannot process request.',4000);
							}
						});
			        }
				});

				$(".close-modal").click(function(){
					$(".bottom-sheet").closeModal();
				});
			});
		},
		grade_printing:function(){
	        var data_school = JSON.parse(localStorage.getItem('schoolInformation'));
	        var meta_data_school = JSON.parse(data_school[0][7]);
	        var logo = localStorage.getItem('school-logo');

			var data = system.get_ajax('../assets/harmony/Process.php?get-schoolInfo',"");
			var principal = JSON.parse(data.responseText);
			console.log(principal);
			principal = JSON.parse(principal[0][7]);
			principal = (typeof principal[3] == "undefined")?"______________________________":principal[3];
			// var teacher = (localStorage.getItem('teacherName') == null)?"_________________________":localStorage.getItem('teacherName');
			var teacher = $("#accountName").html();
			
			$("a[data-cmd='print']").click(function(){
				var form = $(this).data('node');

				var content = "", subContent = "", gradeContent = "", subgradeContent = "", _subgradeContent = "", headers = "", footer = "", grades = 0, _grades = 0, genAve = 0;
				system.loader(true); system.block(true);

				var sign = "<table style='margin-top:100px;'><tr>"+
							"<tr><td class='center-align'>"+principal+" <br/>Principal</td><td></td><td class='center-align'>_______<u>"+teacher+"</u>_______ <br/>Subject Teacher</td></tr>"+
							"</tr></table>";

				$("#_quarter").html(form.toUpperCase());
				if(form == "Summary"){
					content = $("#"+form+" table").html();
					$("#display_data").html("<table class='display striped bordered'>"+content+"</table>");
					$("#display_data").find('table th.hidden').removeClass('hidden');
					$("#display_data").find('table td.hidden').removeClass('hidden');
				}
				else{
					content = $("#"+form.replace(' ','')+" table").html();
					$("#display_data").html("<table class='display striped bordered'>"+content+"</table>");
				}
				$("#display_data").append(sign);
				console.log(content);
				Materialize.toast('Collecting Information. Please wait.',5000,'',function(){
					system.loader(false); system.block(false);
					$("#print_gradeArea").print({
		                mediaPrint : true,
	                    stylesheet : ['../css/style.min.css','../css/materialize.min.css','../css/plugins/dataTables/dataTables.tableTools.min.css','../css/plugins/dataTables/dataTables.responsive.css','../css/plugins/dataTables/dataTables.bootstrap.css'],
					});
				});
			});
		},
		add_grade:function(students,controls){
			var content = "";
			var quarter = "", year = controls[1]['value'], section = controls[2]['value'], subject = controls[3]['value'];
			var subsubject = (controls.length>4) ? controls[4]['value'] : "";
			$("a[data-cmd='add-grade']").click(function(){
				var data_node = $(this).data('node'); content = "";
				quarter = $(this).data('quarter');
				content += "<tr><td colspan='3'>Male</td></tr>";

				// var gender = [JSON.search(students, '//*[gender="Male"]'),JSON.search(students, '//*[gender="Female"]')];
				var gender = [system.searchJSON(students,10,"Male"),system.searchJSON(students,10,"Female")];
				$.each(gender[0],function(i,v){
					console.log(v);
					content += "<tr>"+
								"	<td width='5px'>"+(i+1)+". </td>"+
								"	<td width='300px'>"+v[7]+" "+v[8]+", "+v[9]+"</td>"+
								"	<td>"+
								"		<div class=''>"+
								"			<div class='input-field'>"+
								"				<input type='text' placeholder='Score' class='field_grade' name='"+v[1]+"'>"+
								"			</div>"+
								"		</div>"+
								"	</td>"+
								"</tr>";
				});
				content += "<tr><td colspan='3'><br/>Female</td></tr>";
				var _grades = "", _headers = "";
				$.each(gender[1],function(i,v){
					content += "<tr>"+
								"	<td width='5px'>"+(i+1)+". </td>"+
								"	<td width='300px'>"+v[7]+" "+v[8]+", "+v[9]+"</td>"+
								"	<td>"+
								"		<div class=''>"+
								"			<div class='input-field'>"+
								"				<input type='text' placeholder='Score' class='field_grade' name='"+v[1]+"'>"+
								"			</div>"+
								"		</div>"+
								"	</td>"+
								"</tr>";
				});

				content = "<div class='row'>"+
						"	<div class='col offset-s3 s6'>"+
						"		<form class='form_gradesheet' data-form='addGrades' method='get' action='' novalidate='novalidate'>"+
						"			<div class='col s6'>"+
						"				<label for='field_fname'>Component:</label>"+
						"				<select class='select-dropdown' name='field_component'>"+
						"					<option>Performance Task</option>"+
						"					<option>Written Works</option>"+
						"					<option>Quarterly Assessment</option>"+
						"				</select>"+
						"			</div>"+
						"			<div class='col s6'>"+
						"				<label for='field_fname'>Highest Posible Score:</label>"+
						"				<input type='text' class='field_highGrade' placeholder='Highest Posible Score' name='field_highGrade'>"+
						"			</div>"+
						"			<div class='col s12'>"+
						"				<table id='gradesheet_listStudent' class='table bordered stripped'>"+
											content+
						"				</table>"+
						"					<button class='btn blue waves-effect waves-light'>Save</button>"+
						"					<a class='close-modal btn-flat waves-effect waves-light'>Cancel</a>"+
						"			</div>"+
						"		</form>"+
						"	</div>"+
						"</div>";

				system.open_modal("<div class='row'><div class='col offset-s3 s6'>Add grade</div></div>",content);
	            $("select").material_select();

				$.validator.addClassRules("field_grade", {
				    required: true,
				    number:true,
	            	checkRange:[0,'field_highGrade']
				});

			    $(".form_gradesheet").validate({
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
						if($("input[name='field_highGrade']").val() == ""){
							Materialize.toast('You missed to enter Highest Posible Score',4000);
						}
						else{
							var form = [quarter,year,section,subject,subsubject,$(form).serializeArray()];
							var data = system.get_ajax('../assets/harmony/Process.php?set-grade',[form,controls[0]['value']]);
							data.success(function(data){							
								if(data == 1){
									grading.get_grade(JSON.stringify(controls));
									Materialize.toast('Save.',4000);
									system.close_modal();
									App.handleLoadPage(window.location.hash);
								}
								else{
									Materialize.toast('Cannot process request.',4000);
								}
							});
						}
			        }
				});
				$(".close-modal").click(function(){
					$(".bottom-sheet").closeModal();
				});
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
					$("#display_studentList").html(system.preloader(100));
					grading.get_student(JSON.stringify(form));
					grading.get_subjectsByYear(JSON.stringify(form));
					grading.get_gradeSummary(JSON.stringify(form));
					system.loader(true); system.block(true);
		        }
		    });
		},
		get_student:function(controls){
			var data = system.get_ajax('../assets/harmony/Process.php?get-studentsGradeSheet',controls);
			data.success(function(data){
		        localStorage.setItem('students_gradingSheet',data);
			});
		},
		get_subjectsByYear:function(controls){
			var data = system.get_ajax('../assets/harmony/Process.php?get-subjectsByYear',controls);
			data.success(function(data){
				// console.log(data);
				localStorage.setItem("details_subjectsByYear",data);
			});
		},
		get_gradeSummary:function(controls){
			var data = JSON.parse(controls);
			var data = system.get_ajax('../assets/harmony/Process.php?get-gradeSummary',[controls,data[0]['value']]);
			data.success(function(data){
				localStorage.setItem("grades_gradeSummary",data);
				grading.show_studentGrade(data);
				grading.show_graphicalStudentGrade(data);

				$("#modeOption").removeClass("hidden");
	            $("select[data-cmd='changeView']").on('change',function(e){
	            	if(e.target.selectedOptions[0].value == "Graphical"){
	            		// $("#display_simpleStudentList").addClass("hidden");
	            		// $("#display_graphicalStudentList").removeClass("hidden");
	            		$("#display_simpleStudentList").attr({"style":"opacity:0;"});
	            		$("#display_graphicalStudentList").attr({"style":"opacity:1; "});
	            	}
	            	else{
	            		$("#display_simpleStudentList").attr({"style":"opacity:1;"});
	            		$("#display_graphicalStudentList").attr({"style":"opacity:0; height:0px; overflow:hidden;"});
	            		// $("#display_simpleStudentList").removeClass("hidden");
	            		// $("#display_graphicalStudentList").addClass("hidden");
	            	}
	            });
			});
		},
		show_studentGrade:function(data){
			var _data = data;
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
											var search = JSON.search(grades, '//*[id="'+value_gender2[1]+'"]/score');
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
								meta_finalGrade.push({student_id:value_gender2[1],subject:index_summary1,quarter:index_summary2,score:grade.search(parseFloat(initialGrade).toFixed(2),grade.table())[0]['value']});
							});
						});

						var a = JSON.search(meta_finalGrade, '//*[student_id="'+value_gender2[1]+'"]'), b = [], _subtotal = 0, _total = 0;
						$.each(quarters,function(i,v){
							b = JSON.search(a, '//*[quarter="'+i+'"]');
							_subtotal = 0;
							$.each(b,function(_i,_v){
								_subtotal = _subtotal + _v['score'];
							})
							finalGrade.push({student_id:value_gender2[1],subject:subjectDetails[2][0],quarter:i,score:system.getRealNumber((_subtotal/4))});
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
										var search = JSON.search(grades, '//*[id="'+value_gender2[1]+'"]/score');
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
							finalGrade.push({student_id:value_gender2[1],subject:subjectDetails[2][0],quarter:index_summary2,score:grade.search(parseFloat(initialGrade).toFixed(2),grade.table())[0]['value']});
							quarterSubHeader +="<th class='center-align'>"+quarters[index_summary2]+"</th>";
						});
						var __grades = finalGrade;
						finalGrade_student.push({subject,__grades});
					}

					quarterSubHeader +="<th class='center-align'>Final Grade</th>";
					quarterHeader +="<th colspan='4' class='center-align'>Quarter</th><th></th>";
					subjectHeader +="<th colspan='5'class='center-align'>"+subjectDetails[2][0]+"</th>";
					finalGradeTotal = parseFloat(((finalGrade[0]['score']+finalGrade[1]['score']+finalGrade[2]['score']+finalGrade[3]['score'])/4)).toFixed(2);
					subjectContent +="<td class='center-align'>"+finalGrade[0]['score']+"</td><td class='center-align'>"+finalGrade[1]['score']+"</td><td class='center-align'>"+finalGrade[2]['score']+"</td><td class='center-align'>"+finalGrade[3]['score']+"</td><td class='center-align' style='background: #eee;'>"+finalGradeTotal+"</td>";
					subjectCount++;
					grandTotal = Number(grandTotal)+Number(finalGradeTotal);
				});
				
				var s_id = value_gender2[1];
				_finalGrade_student.push({s_id,finalGrade_student});

				subjectHeader = "<tr>"+
								"	<th rowspan='2' colspan='2'></th>"+subjectHeader+"<th rowspan='3'><strong>General Average</strong></th>"+
								"</tr>"+
								"<tr>"+
									quarterHeader+
								"</tr>"+
								"<tr>"+
								"	<th width='250px;'>Name of Learners</th><th width='150px;'>Gender</th>"+quarterSubHeader+
								"</tr>";
				subContent +=   "<tr>"+	
								"	<td>"+value_gender2[7]+" "+value_gender2[8]+", "+value_gender2[9]+"</td><td>"+value_gender2[10]+"</td>"+subjectContent+"<td class='center-align'>"+parseFloat((grandTotal/subjectCount)).toFixed(2)+"</td>"+
								"</tr>";
			});

			content =   ""+
						"<div class='col s12'>"+
						"	<table width='100%' id='simpleStudentsGradeSummary' class='_listStudent responsive-table display dataTable'>"+
 						"		 		<thead>"+
									subjectHeader+
 						"		 		</thead>"+
 						"    	<tbody>"+
 								 	subContent+
 						"    	</tbody>"+
						"	</table>"+
						"</div>";

			$('#display_simpleStudentList').html(content); 
		
			var table = $('#simpleStudentsGradeSummary').removeAttr('width').DataTable({
		        "columnDefs": [
		            { "visible": false, "targets": 1 },
		            { width: '30%', targets: 0},
		        ],
		        "order": [[ 0, 'asc' ]],
		        bLengthChange: true,
		        bPaginate: false,
		        iDisplayLength: -1,
				sScrollY:        "300px",
				sScrollX:        "100%",
				bScrollCollapse: true,
				fixedColumns:   {
				    rightColumns: 1,
				},
		    });
		    var printControls = "<div class='row'>"+
								"	<form id='form_printGrade' class='formValidate' method='get' action='' novalidate='novalidate'>"+
								"		<div class='input-field col s6'>"+
								"			<label for='field_print' class='active'>Print: </label>"+
								"			<select class='select-dropdown' id='field_print' name='field_print' data-error='.error_print'>"+
								"				<option disabled='' selected>Choose</option>"+
								"				<option value='First Quarter'>First Quarter</option>"+
								"				<option value='Second Quarter'>Second Quarter</option>"+
								"				<option value='Third Quarter'>Third Quarter</option>"+
								"				<option value='Fourth Quarter'>Fourth Quarter</option>"+
								"				<option value='Summary'>Summary</option>"+
								"			</select>"+
								"			<br/><div class='error_print'></div>"+
								"		</div>"+
								"		<div class='input-field col s4'>"+
								"			<a data-cmd='print' class='btn blue waves-effect waves-light right' type='submit' name='printGrades'>Print</a>"+
								"		</div>"+
								"	</div>"+
								"</form>";

			var modeControls = "<div class='col s3' id='modeOption'>"+
								"	<label for='field_print' class='active'>Mode: </label>"+
								"	<select class='select-dropdown' data-cmd='changeView'>"+
								"		<option selected>Simple</option>"+
								"		<option>Graphical</option>"+
								"	</select>"+
								"</div>";
            $("#display_simpleStudentList .dataTables_wrapper").prepend("<div class='col s5'>"+printControls+"</div>"+modeControls);

            $("select").material_select();
            localStorage.setItem('_finalGrade_student',JSON.stringify(_finalGrade_student));
			Materialize.toast('Collecting Information. Please wait.',5000,'',function(){
				system.loader(false); system.block(false);
	 		    grading._grade_printing();
			});
		},
		show_graphicalStudentGrade:function(data){
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
											var search = JSON.search(grades, '//*[id="'+value_gender2[1]+'"]/score');
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
								meta_finalGrade.push({student_id:value_gender2[1],subject:index_summary1,quarter:index_summary2,score:grade.search(parseFloat(initialGrade).toFixed(2),grade.table())[0]['value']});
							});
						});

						var a = JSON.search(meta_finalGrade, '//*[student_id="'+value_gender2[1]+'"]'), b = [], _subtotal = 0, _total = 0;
						$.each(quarters,function(i,v){
							b = JSON.search(a, '//*[quarter="'+i+'"]');
							_subtotal = 0;
							$.each(b,function(_i,_v){
								_subtotal = _subtotal + _v['score'];
							})
							finalGrade.push({student_id:value_gender2[1],subject:subjectDetails[2][0],quarter:i,score:system.getRealNumber((_subtotal/4))});
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
										var search = JSON.search(grades, '//*[id="'+value_gender2[1]+'"]/score');
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
							finalGrade.push({student_id:value_gender2[1],subject:subjectDetails[2][0],quarter:index_summary2,score:grade.search(parseFloat(initialGrade).toFixed(2),grade.table())[0]['value']});
							quarterSubHeader +="<th class='center-align'>"+quarters[index_summary2]+"</th>";
						});
						var __grades = finalGrade;
						finalGrade_student.push({subject,__grades});
					}

					quarterSubHeader +="<th class='center-align'>Final Grade</th><th></th>";
					quarterHeader +="<th colspan='5' class='center-align'>Quarter</th><th></th>";
					subjectHeader +="<th colspan='6'class='center-align'>"+subjectDetails[2][0]+"</th>";
					finalGradeTotal = parseFloat(((finalGrade[0]['score']+finalGrade[1]['score']+finalGrade[2]['score']+finalGrade[3]['score'])/4)).toFixed(2);
					subjectContent +="<td class='center-align' style='background: -webkit-linear-gradient(transparent "+(100-finalGrade[0]['score'])+"%, #d81b60 0%); border: solid 1px rgba(0,0,0,0.2);'>"+finalGrade[0]['score']+"</td>"+
					"<td class='center-align' style='background: -webkit-linear-gradient(transparent "+(100-finalGrade[1]['score'])+"%, #dd7c12 0%); border: solid 1px rgba(0,0,0,0.2);'>"+finalGrade[1]['score']+"</td>"+
					"<td class='center-align' style='background: -webkit-linear-gradient(transparent "+(100-finalGrade[2]['score'])+"%, #ffca28 0%); border: solid 1px rgba(0,0,0,0.2);'>"+finalGrade[2]['score']+"</td>"+
					"<td class='center-align' style='background: -webkit-linear-gradient(transparent "+(100-finalGrade[3]['score'])+"%, #009688 0%); border: solid 1px rgba(0,0,0,0.2);'>"+finalGrade[3]['score']+"</td>"+
					"<td class='center-align' style='background: -webkit-linear-gradient(transparent "+(100-finalGradeTotal)+"%, #2196f3 0%); border: solid 1px rgba(0,0,0,0.2);'>"+finalGradeTotal+"</td><td></td>";
					subjectCount++;
					grandTotal = Number(grandTotal)+Number(finalGradeTotal);
				});
				
				var s_id = value_gender2[1];
				_finalGrade_student.push({s_id,finalGrade_student});

				subjectHeader = "<tr>"+
								"	<th rowspan='2' colspan='2'></th>"+subjectHeader+"<th rowspan='3'><strong>General Average</strong></th>"+
								"</tr>"+
								"<tr>"+
									quarterHeader+
								"</tr>"+
								"<tr>"+
								"	<th width='250px;'>Name of Learners</th><th width='150px;'>Gender</th>"+quarterSubHeader+
								"</tr>";
				subContent +=   "<tr>"+	
								"	<td>"+value_gender2[7]+" "+value_gender2[8]+", "+value_gender2[9]+"</td><td>"+value_gender2[10]+"</td>"+subjectContent+"<td class='center-align'>"+parseFloat((grandTotal/subjectCount)).toFixed(2)+"</td>"+
								"</tr>";
			});

			content =   "<div class='col s12'>"+
						"	<table width='100%' id='graphicalStudentsGradeSummary' class='_listStudent responsive-table display dataTable'>"+
 						"		 		<thead>"+
									subjectHeader+
 						"		 		</thead>"+
 						"    	<tbody>"+
 								 	subContent+
 						"    	</tbody>"+
						"	</table>"+
						"</div>";


			$('#display_graphicalStudentList').html(content); 

			var table = $('#graphicalStudentsGradeSummary').DataTable({
		        "columnDefs": [
		            { "visible": false, "targets": 1 },
		            { width: '20%', targets: 0},
		        ],
		        "order": [[ 0, 'asc' ]],
		        bLengthChange: true,
		        bPaginate: false,
		        iDisplayLength: -1,
				sScrollY:        "300px",
				sScrollX:        "100%",
				bScrollCollapse: true,
				fixedColumns:   true,
				bAutoWidth:true
		    });

			var modeControls = "<div class='col s3 hidden' id='modeOption'>"+
								"	<label for='field_print' class='active'>Mode: </label>"+
								"	<select class='select-dropdown' data-cmd='changeView' style='display:none;'>"+
								"		<option>Simple</option>"+
								"		<option selected>Graphical</option>"+
								"	</select>"+
								"</div>";
            $("#display_graphicalStudentList .dataTables_wrapper").prepend(""+modeControls);
            $("select").material_select();
		    // $('#display_graphicalStudentList').addClass('hidden');
		},
		_grade_printing:function(){
	        var data_students = JSON.parse(localStorage.getItem('students_gradingSheet'));
	        var data_grades = JSON.parse(localStorage.getItem('_finalGrade_student'));
	        var data_school = JSON.parse(localStorage.getItem('schoolInformation'));
	        var meta_data_school = JSON.parse(data_school[0][7]);
	        var logo = localStorage.getItem('school-logo');
			var quarters = {'First Quarter':1,'Second Quarter':2,'Third Quarter':3,'Fourth Quarter':4};
			$("a[data-cmd='print']").click(function(){
				var form = $("#form_printGrade").serializeArray();
				console.log(form);
				var content = "", subContent = "", gradeContent = "", subgradeContent = "", _subgradeContent = "", headers = "", footer = "", grades = 0, _grades = 0, genAve = 0;
				var _class = 'invisible';
				if(form.length>0){
					system.loader(true); system.block(true);
					var print = form[0]['value'];
					var searchStudent = [], searchGrade = [];
					if(print == "Summary"){
						$.each(data_grades,function(i1,v1){
							gradeContent = "";
							genAve = 0;
							$.each(v1['finalGrade_student'],function(i3,v3){
								subgradeContent = "";
								if(v3['__grades'].length>4){
									grades = 0;
									for(var x=0;x<(v3['__grades'].length);x=x+4){
										_subgradeContent = "";
										var meta_subject = "";
										_grades = 0;
										for(var y=x;y<(x+4);y++){
											meta_subject = v3['__grades'][y]['subject'];
											_subgradeContent += "<td width='10%' class='center-align'>"+v3['__grades'][y]['score']+"</td>";
										}
										subgradeContent += "<tr><td width='30%'>&emsp;"+meta_subject+"</td>"+_subgradeContent+"<td width='15%' class='center-align'></td><td width='15%' class='center-align'></td></tr>";
									}
									_subgradeContent = "";
									$.each(quarters,function(i4,v4){
										var search = JSON.search(v3['__grades'], '//*[quarter="'+i4+'"]');
										_grades = 0;
										$.each(search,function(i5,v5){
											_grades = _grades + v5['score'];
										});
										grades = grades + Number(parseFloat((_grades/4)).toFixed(2));
										_subgradeContent += "<td width='10%' class='center-align'>"+parseFloat((_grades/4)).toFixed(2)+"</td>";
									});
									gradeContent += "<tr><td width='30%'>"+v3['subject']+"</td>"+_subgradeContent+"<td width='15%' class='center-align'>"+parseFloat((grades/4)).toFixed(2)+"</td><td width='15%' class='center-align'></td></tr>"+subgradeContent;
									grades = Number(parseFloat((grades/4)).toFixed(2));
								}
								else{
									grades = 0;
									$.each(v3['__grades'],function(i4,v4){
										grades = grades + v4['score'];
										subgradeContent += "<td width='10%' class='center-align'>"+v4['score']+"</td>";
									});
									gradeContent += "<tr><td width='30%'>"+v3['subject']+"</td>"+subgradeContent+"<td width='15%' class='center-align'>"+parseFloat((grades/4)).toFixed(2)+"</td><td width='15%' class='center-align'></td></tr>";
									grades = Number(parseFloat((grades/4)).toFixed(2));
								}
								genAve = genAve + grades;
							});
							headers = "<tr>"+
									  "	<th rowspan='2' class='center-align'>Learning Areas</th><th colspan='4' class='center-align'>Quarter</th><th rowspan='2' class='center-align'>Final Grade</th><th rowspan='2' class='center-align'>Remarks</th>"+
									  "</tr>"+
									  "<tr>"+
									  "	<th class='center-align'>1</th><th class='center-align'>2</th><th class='center-align'>3</th><th class='center-align'>4</th>"+
									  "</tr>";
							footer = "<tr>"+
									  "	<th></th><th colspan='4' class='center-align'>General Average</th><th class='center-align'>"+parseFloat((genAve/v1['finalGrade_student'].length)).toFixed(2)+"</th><th class='center-align'></th>"+
									  "</tr>";

							// var search = JSON.search(data_students, '//*[student_id="'+v1['s_id']+'"]');
							var search = system.searchJSON(data_students,1,v1['s_id']);

							subContent +=   "<div class='col offset-s2 col s8'>"+
											"	<div class='' style='margin-bottom:20px;'>"+
											"		<table class='table-no-bordered' style='border:0px !important; margin-bottom:50px;'>"+
											"			<tr>"+
											"				<td width='30%' class='center-align'><img src='"+logo+"' class='circle' alt='logo' style='width: 100px;'></td>"+
											"		  		<td width='40%'><small>"+
											"            			<div class='col-md-8 center-align'>"+
											"		  				Republic of the Philippines<br/>"+
											"		  				Region "+data_school[0][5]+"<br/>"+
											"		  				Department of Education<br/>"+
											"		  				<h3>"+data_school[0][1]+"</h3>"+
											"		  				<small>"+meta_data_school[2]+"</small>"+
											"		  			</div></small>"+
											"				</td>"+
											"				<td width='30%' class='center-align'><img src='../assets/img/logo.png' class='img-circle circle-border m-b-md' alt='logo' style='width: 100px;'></td>"+
											"			</tr>"+
											"		</table>"+
											"		<h4 class='center-align'>Report Card</h4><br/><br/>"+
											"		Name:"+search[0][7]+" "+search[0][8]+" "+search[0][9]+"<br/>"+
											"		Student ID:"+search[0][1]+
											"		<table class='responsive-table display dataTable'>"+headers+gradeContent+footer+"</table>"+
											"	</div>"+
											"</div><br/><br/><br/><br/>";
						});
					}
					else{
						$.each(data_grades,function(i1,v1){
							gradeContent = "";
							genAve = 0;
							console.log(v1);
							$.each(v1['finalGrade_student'],function(i3,v3){
								subgradeContent = "";
								if(v3['__grades'].length>4){
									grades = 0;
									for(var x=0;x<(v3['__grades'].length);x=x+4){
										_subgradeContent = "";
										var meta_subject = "";
										_grades = 0;
										for(var y=x;y<(x+4);y++){
											meta_subject = v3['__grades'][y]['subject'];
											if(v3['__grades'][y]['quarter'] == print){
												_class = 'visible';
											}
											else{
												_class = 'invisible';												
											}

											_subgradeContent += "<td width='10%' class='center-align '><span class='"+_class+"'>"+v3['__grades'][y]['score']+"</span></td>";
										}
										subgradeContent += "<tr><td width='30%'>&emsp;"+meta_subject+"</td>"+_subgradeContent+"<td width='15%' class='center-align'></td><td width='15%' class='center-align'></td></tr>";
									}
									_subgradeContent = "";
									$.each(quarters,function(i4,v4){
										var search = JSON.search(v3['__grades'], '//*[quarter="'+i4+'"]');
										_grades = 0;
										$.each(search,function(i5,v5){
											_grades = _grades + v5['score'];
										});
										if(i4 == print){
											_class = 'visible';
										}
										else{
											_class = 'invisible';												
										}
										grades = grades + Number(parseFloat((_grades/4)).toFixed(2));
										_subgradeContent += "<td width='10%' class='center-align '><span class='"+_class+"'>"+parseFloat((_grades/4)).toFixed(2)+"</span></td>";
									});
									gradeContent += "<tr><td width='30%'>"+v3['subject']+"</td>"+_subgradeContent+"<td width='15%' class='center-align '><span class='invisible'>"+parseFloat((grades/4)).toFixed(2)+"</span></td><td width='15%' class='center-align'></td></tr>"+subgradeContent;
									grades = Number(parseFloat((grades/4)).toFixed(2));
								}
								else{
									grades = 0;
									$.each(v3['__grades'],function(i4,v4){
										grades = grades + v4['score'];
										if(v4['quarter'] == print){
											_class = 'visible';
										}
										else{
											_class = 'invisible';												
										}
										subgradeContent += "<td width='10%' class='center-align '><span class='"+_class+"'>"+v4['score']+"</span></td>";
									});
									gradeContent += "<tr><td width='30%'>"+v3['subject']+"</td>"+subgradeContent+"<td width='15%' class='center-align '><span class='invisible'>"+parseFloat((grades/4)).toFixed(2)+"</span></td><td width='15%' class='center-align'></td></tr>";
									grades = Number(parseFloat((grades/4)).toFixed(2));
								}
								genAve = genAve + grades;
							});
							headers = "<tr>"+
									  "	<th rowspan='2' class='center-align'>Learning Areas</th><th colspan='4' class='center-align'>Quarter</th><th rowspan='2' class='center-align'>Final Grade</th><th rowspan='2' class='center-align'>Remarks</th>"+
									  "</tr>"+
									  "<tr>"+
									  "	<th class='center-align'>1</th><th class='center-align'>2</th><th class='center-align'>3</th><th class='center-align'>4</th>"+
									  "</tr>";
							footer = "<tr>"+
									  "	<th></th><th colspan='4' class='center-align'>General Average</th><th class='center-align '><span class='invisible'>"+parseFloat((genAve/v1['finalGrade_student'].length)).toFixed(2)+"</span></th><th class='center-align'></th>"+
									  "</tr>";

							// system.searchJSON(_data,'student_id',full[0])
							// var search = JSON.search(data_students, '//*[1="'+v1['s_id']+'"]');
							var search = system.searchJSON(data_students,1,v1['s_id']);

							subContent +=   "<div class='col offset-s2 col s8'>"+
											"	<div class='' style='margin-bottom:20px;'>"+
											"		<table class='table-no-bordered' style='border:0px !important; margin-bottom:50px;'>"+
											"			<tr>"+
											"				<td width='30%' class='center-align'><img src='"+logo+"' class='circle' alt='logo' style='width: 100px;'></td>"+
											"		  		<td width='40%'><small>"+
											"            			<div class='col-md-8 center-align'>"+
											"		  				Republic of the Philippines<br/>"+
											"		  				Region "+data_school[0][5]+"<br/>"+
											"		  				Department of Education<br/>"+
											"		  				<h3>"+data_school[0][1]+"</h3>"+
											"		  				<small>"+meta_data_school[2]+"</small>"+
											"		  			</div></small>"+
											"				</td>"+
											"				<td width='30%' class='center-align'><img src='../assets/img/logo.png' class='img-circle circle-border m-b-md' alt='logo' style='width: 100px;'></td>"+
											"			</tr>"+
											"		</table>"+
											"		<h4 class='center-align'>Report Card</h4><br/><br/>"+
											"		Name:"+search[0][7]+" "+search[0][8]+" "+search[0][9]+"<br/>"+
											"		Student ID:"+search[0][1]+
											"		<table class='responsive-table display dataTable'>"+headers+gradeContent+footer+"</table>"+
											"	</div>"+
											"</div><br/><br/><br/><br/>";
						});
					}
		        	content = "<div class='' style='margin-top:10px'>"+subContent+"</div>";
					$("#print_gradeArea").html(content);
					Materialize.toast('Collecting Information. Please wait.',1000,'',function(){
						system.loader(false); system.block(false);
						$("#print_gradeArea").print({
			                mediaPrint : true,
		                    stylesheet : ['../css/style.min.css','../css/materialize.min.css','../css/plugins/dataTables/dataTables.tableTools.min.css','../css/plugins/dataTables/dataTables.responsive.css','../css/plugins/dataTables/dataTables.bootstrap.css'],
						});
					});
				}
			});
		}
	};
}();

var teacher = function(){
	"use strict";
	return {
		add: function(){
			$("label[for='field_password'] a[data-cmd='show-password']").on('mousedown',function(e){
				$("#field_password").attr({'type':'text'});
			}).on('mouseup',function(e){
				$("#field_password").attr({'type':'password'});
			});

		    $("#form_registerTeacher").validate({
		        rules: {
		            field_name: {required: true,maxlength: 255,checkUser:["teacher","name"]},
		            field_uname: {required: true,maxlength: 255,checkUser:["teacher","username"]},
		            field_password: {required: true,maxlength: 255,checkPassword:true,checkUser:["teacher","password",'*']},
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
					var data = $(form).serializeArray();
					data = system.get_ajax('../assets/harmony/Process.php?set-teacherInfo',data);
					data.success(function(data){
						if(data == 1){
							Materialize.toast('Save.',4000);
							App.handleLoadPage(window.location.hash);
						}
						else{
							console.log(data);
							Materialize.toast('Cannot process request.',4000);
						}
					});
		        }
			}); 
		},
		list:function(){
			var data = system.get_ajax('../assets/harmony/Process.php?get-teachers','');
			data.success(function(data){
				localStorage.setItem('teachers',data);
				var data = JSON.parse(data);
				console.log(data);
				var content = "<table id='listStudent' class='table table-striped table-hover dataTable'>"+
							"    <thead>"+
							"        <tr>"+
							"            <th width='5%'></th>"+
							"            <th width='30%'>Name</th>"+
							"            <th width='15%'></th>"+
							"        </tr>"+
							"    </thead>"+
							"</table>";

				$('#disply_teacherList').html(content);
                $('#listStudent').DataTable({
                    data: data,
                    sort: true,
			        "order": [[ 1, 'asc' ]],
					"columnDefs": [
						{ className: "client-avatar", "targets": [ 0 ] }
					],
                    columns: [
                        {data: "",
                            render: function ( data, type, full ){
								var imageData = full['picture'].split('.'), logo;
								if(imageData[imageData.length-1]!='apr')
									logo = "../assets/img/"+full['picture'];					
								else
									logo = system.get_apr(full['picture']);
                            	var details = '<img alt="image" src="'+logo+'">';
                                return details;
                            }
                        },
                        {data: "",
                            render: function ( data, type, full ){
                            	var details = full['name'];
                                return details;
                            }
                        },
                        {data: "",
                            render: function ( data, type, full ){
                            	var info = JSON.stringify(full);
                            	var details = "<a href='#cmd=index;content=teacher-info;id="+full['id']+"' data-cmd='show-info' data-info='"+info+"' class='right tooltipped' data-tooltip='More details' data-position='left' type='button'>"+
					                            	"<i class='mdi-navigation-more-vert'></i>"+
				                            	"</a>";
                                return details;
                            }
                        }
                    ]
                });
				$('.tooltipped').tooltip({delay: 50});
			});
		},
		info:function(){
			var id = window.location.href;
			id = id.split(';'); id = id[2].split('=');
			var data = localStorage.getItem('teachers');
			localStorage.setItem('teacher_id',id[1]);

			data = JSON.parse(data);
            var search = JSON.search(data, '//*[contains(id, "'+id[1]+'")]');

			var imageData = search[0]['picture'].split('.');
			if(imageData[imageData.length-1]!='apr')
				imageData = "../assets/img/"+search[0]['picture'];					
			else
				imageData = system.get_apr(search[0]['picture']);

			var bg = localStorage.getItem('schoolInformation');
			bg = JSON.parse(bg); bg = JSON.parse(bg[0][7]); bg = system.get_apr(bg[1]);

			$("#_schoolBanner").attr({'src':bg});			
			$("#_teacherAvatar").attr({'src':imageData});			
			$("#_teacherName").html(search[0]['name']);			
			$("#_teacherUsername").html(search[0]['username']);			
			$("#_teacherPassword").html('active');	
			this.getAssign();		
		},
		getAssign:function(){
			var teacher_id = localStorage.getItem('teacher_id');
			var data = system.get_ajax('../assets/harmony/Process.php?get-teacherAssignSubject',teacher_id);
			data.success(function(data){
				var data = JSON.parse(data);
				if(data.length>0){
					$("#_teacherAssigned").html("<a style='cursor:pointer;' data-cmd='assignSubject'>Assign subject.</a>");
					var content = "";
					content = "<tr><th>Year Level</th><th>Section</th><th>Subject</th><th></th></tr>";
					$.each(data,function(a,b){
						content += "<tr><td>"+b['year']+"</td><td>"+b['section']+"</td><td>"+b['subject']+"</td><td><a class='secondary-content tooltipped btn-icon mdi-content-clear' data-key='"+b['id']+"' data-cmd='delete-subject' data-tooltip='Delete subject' data-position='left'></a></td></tr>";
					});
					$("#_displayTeacherAssigned").html("<table class='table bordered'>"+content+"</table>");
					$('.tooltipped').tooltip({delay: 50});
				}
				else{
					$("#_teacherAssigned").html("There is no subject assigned. <a style='cursor:pointer;' data-cmd='assignSubject'>Assign subject.</a>");				
				}
				$("a[data-cmd='assignSubject']").click(function(){
					teacher.formAssignSubject();
				});

				$("a[data-cmd='delete-subject']").click(function(e){
					console.log(e.target.dataset);
					var content = "<div class='row'><div class='col offset-s3 s6'>"+
									" All the data associated with this subject assignment will also  be deleted.<br/><br/>"+
									"	<a class='btn blue waves-effect waves-light' type='submit' name='action' data-cmd='confirm-delete'>Confirm</a>"+
									"	<a class='btn-flat waves-effect waves-light' type='submit' name='action' data-cmd='cancel-delete'>Cancel</a>"+
									"</div></div>";

					system.open_modal("<div class='row'><div class='col offset-s3 s6'>Are you sure you want to delete this assigned subject?</div></div>",content);

					$("a[data-cmd='confirm-delete']").click(function(){
						var data = system.get_ajax('../assets/harmony/Process.php?delete-assignSubjects',e.target.dataset.key);
						data.success(function(data){
							if(data == 1){
								system.close_modal();
								Materialize.toast('Deleted.',4000);
								teacher.getAssign();
							}
							else{
								Materialize.toast('Cannot process request.',4000);
								console.log(data);
							}
						});
					});
					$("a[data-cmd='cancel-delete']").click(function(){
						system.close_modal();
					});
				});
			});
		},
		control_options:function(){
			var data = system.get_ajax('../assets/harmony/Process.php?get-assoc-yearLevel',"");
			data.success(function(data){
				var data = JSON.parse(data);
				var options = "<option disabled='' selected>Choose year level</option>";
				$.each(data,function(i,v){
					if(v[1].length>0){
						options += "<option value='"+v[0]['title']+"'>"+v[0]['title']+"</option>";
					}
				})
				$("#field_year").html(options);
			    $("select").material_select();

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
				    $("select").material_select();
					$(".error_subject").html(" ");
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
				    $("select").material_select();
					$(".error_subject").html(" ");
				});

				$("#field_subject").change(function(){
					var selected = $("#field_year").val(), subject = $(this).val(), options = '';
					var options = "<option disabled='' selected>Choose subject</option>";
					var _data = system.get_ajax('../assets/harmony/Process.php?check-teacherAssignSubject',[$("#field_year").val(),$("#field_section").val(),$("#field_subject").val()]);
					_data.success(function(_data){
						_data = JSON.parse(_data);
						if(_data.length>0){
							$("#btn_assignSubject").attr({'disabled':'true'});
							$(".error_subject").html(subject+" is already assigned.");
						}
						else{
							$("#btn_assignSubject").removeAttr('disabled');
							$(".error_subject").html(" ");
						}
					});

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
				    $("select").material_select();
				});
			});
		},
		formAssignSubject:function(){
			var data = system.get_ajax('../templates/admin/formAssignSubject.html','');
			data.success(function(data){
				system.open_modal("<div class='row'><div class='col offset-s3 s6'>Assign Subject<a style='cursor:pointer;' class='close-modal right'>x</a></div></div>","<div class='row'><div class='col offset-s3 s6'>"+data+"</div>");
	            $("select").material_select();

	            $(".close-modal").click(function(){
	            	teacher.getAssign();
					$(".bottom-sheet").closeModal();
	            	$(".lean-overlay").attr({"style":"display:none"});
	            });

			    $("#form_assignSubject").validate({
			        rules: {
			            field_year: {required: true},
			            field_section: {required: true},
			            field_subject: {required: true,validateAssignSubject:[$("#field_year").html(),$("#field_section").html(),$("#field_subject").html()]}
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
						var data = system.get_ajax('../assets/harmony/Process.php?set-assignSubjects',[localStorage.getItem('teacher_id'),form]);
						data.success(function(data){
							console.log(data);
							if(data == 1){
								Materialize.toast('Save.',4000);
								teacher.formAssignSubject();
							}
							else{
								Materialize.toast('Cannot process request.',4000);
							}
						});
			        }
			    });
			});
		}
	};
}();

var settings = function(){
	"use strict";
	return {
		displayUser:function(){
			var picture = "../assets/img/avatar.jpg";
			var content = "", _this = this;
            var months = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];
			var data = system.get_ajax('../assets/harmony/Process.php?get-account',"");
			data.success(function(data){
				data = JSON.parse(data);
				var imageData = data[0][4].split('.');
				if(imageData[imageData.length-1]!='apr')
					picture = "../assets/img/"+data[0][4];					
				else
					picture = system.get_apr(data[0][4]);

				content =   "<ul class='collection z-depth-1'>"+		
							"	<li class='collection-item'><strong>Profile Picture:</strong>"+
							"		<div class='row'>"+
							"		    <div class='col s4'>"+
							"		        <div id='profile_picture1' class='col s6'>"+
							"		            <div class='col-md-12' style='float:none; position: absolute; padding-top: 10px;'>"+
							"		                <a data-cmd='update_picture' class='btn blue btn-floating btn-flat mdi-editor-mode-edit tooltipped' data-tooltip='Update picture' data-position='down' style='opacity: 0.5;'><i class='fa fa-camera-retro'></i></a>"+
							"		            </div>"+
							"		            <img alt='image' class='img-responsive' src='"+picture+"' style='width: 100%;'>"+
							" 		        </div>"+
							"		        <div id='profile_picture2' class='ibox-content no-padding border-left-right hidden'>"+
							"		        </div>"+
							"		    </div>"+
							"		</div>"+
							"	</li>"+		
							"	<li class='collection-item' id='user_name'>"+
							"		<span><strong>Name:</strong> "+data[0][1]+"<a data-field='name' class='right  mdi-editor-mode-edit tooltipped' data-tooltip='Update' data-position='left' ></a></span>"+
							"		<form role='form' class='form-inline row hidden'>"+
							"		    <div class='input-field col s6'>"+
							"				<label for='field_name'>Name: </label>"+
							"				<input id='field_name' type='text' name='field_name' data-error='.error_name'>"+
							"				<div class='error_name'></div>"+
							"		    </div>"+
							"		    <div class='input-field col s6'>"+
							"		        <button class='btn waves-effect waves-light blue save-profile'>Save</button>"+
							"		        <action class='btn waves-effect waves-light grey cancel'>Cancel</action>"+
							"		    </div>"+
							"		</form>"+
							"	</li>"+
							"	<li class='collection-item' id='user_username'>"+
							"		<span><strong>Username:</strong> "+data[0][2]+" <a data-field='username' class='right  mdi-editor-mode-edit tooltipped' data-tooltip='Update' data-position='left'></a></span>"+
							"		<form role='form' class='form-inline row hidden'>"+
							"		    <div class='input-field col s6'>"+
							"				<label for='field_username'>Username: </label>"+
							"				<input id='field_username' type='text' name='field_username' data-error='.error_username'>"+
							"				<div class='error_username'></div>"+
							"		    </div>"+
							"		    <div class='input-field col s6'>"+
							"		        <button class='btn waves-effect waves-light blue save-profile'>Save</button>"+
							"		        <action class='btn waves-effect waves-light grey cancel'>Cancel</action>"+
							"		    </div>"+
							"		</form>"+
							"	</li>"+
							"	<li class='collection-item' id='user_password'>"+
							"		<span><strong>Password:</strong> password is active <a data-field='password' class='right  mdi-editor-mode-edit tooltipped' data-tooltip='Update' data-position='left'></a></span>"+
							"		<form role='form' class='form-inline row hidden'>"+
							"		    <div class='input-field col s6'>"+
							"				<label for='field_password'>Password: </label>"+
							"				<input id='field_password' type='password' name='field_password' data-error='.error_password'>"+
							"				<div class='error_password'></div>"+
							"		    </div>"+
							"		    <div class='input-field col s6'>"+
							"		        <action class='btn waves-effect waves-light blue darken-2 show-password mdi-action-lock-open'></action>"+
							"		        <button class='btn waves-effect waves-light blue save-profile'>Save</button>"+
							"		        <action class='btn waves-effect waves-light grey cancel'>Cancel</action>"+
							"		    </div>"+
							"		</form>"+
							"	</li>"+		
							"</ul>";
				$("#display_teacherInfo").html(content);
				_this.update_userPicture(data);
				_this.update_userData(data);
			})
		},
	    update_userPicture:function(data){
			var picture = "../assets/img/avatar.jpg";
			if(data[0][4] != ""){
				var imageData = data[0][4].split('.');
				if(imageData[imageData.length-1]!='apr')
					picture = "../assets/img/"+data[0][4];					
				else
					picture = system.get_apr(data[0][4]);
			}

	    	$("a[data-cmd='update_picture']").click(function(){
	    		$("#profile_picture1").addClass('hidden');
	    		$("#profile_picture2").removeClass('hidden');

	    		var content =   "<div class='image-crop col s6' style='margin-bottom:5px;'>"+
								"	<img width='100%' src='"+picture+"'>"+
								"</div>"+
								"<div class='btn-group col s12'>"+
								"	<label for='inputImage' class='btn blue btn-floating btn-flat tooltipped' data-tooltip='Load image' data-position='down'>"+
								"		<input type='file' accept='image/*' name='file' id='inputImage' class='hide'>"+
								"		<i class='large mdi-editor-publish'></i>"+
								"	</label>"+
								"	<button class='btn blue btn-floating btn-flat tooltipped' data-cmd='cancel' type='button' data-tooltip='Cancel' data-position='down'>"+
								"		<i class='mdi-navigation-close'></i>"+
								"	</button>"+
								"	<button class='btn blue btn-floating btn-flat hidden tooltipped' data-cmd='rotate' data-option='-90' type='button' data-tooltip='Rotate left' data-position='down'>"+
								"		<i class='mdi-image-rotate-left'></i>"+
								"	</button>"+
								"	<button class='btn blue btn-floating btn-flat hidden tooltipped' data-cmd='rotate' data-option='90' type='button' data-tooltip='Rotate right' data-position='down'>"+
								"		<i class='mdi-image-rotate-right'></i>"+
								"	</button>"+
								"	<button class='btn blue btn-floating btn-flat hidden tooltipped' data-cmd='save' type='button' data-tooltip='Save' data-position='down'>"+
								"		<i class='mdi-content-save'></i>"+
								"	</button>"+
								"</div>";
	    		$("#profile_picture2").html(content);
				$('.tooltipped').tooltip({delay: 50});

	            var $inputImage = $("#inputImage");
	            var status = true;
	            if(window.FileReader){
	                $inputImage.change(function() {
	                    var fileReader = new FileReader(),
	                            files = this.files,
	                            file;

	                    file = files[0];

	                    if (/^image\/\w+$/.test(file.type)) {
	                        fileReader.readAsDataURL(file);
	                        fileReader.onload = function () {
	                            $inputImage.val("");

					            var $image = $(".image-crop > img")
					            $($image).cropper({
					            	aspectRatio: 1/1,
								    autoCropArea: 0.80,
								    preview: ".avatar-preview",
								    built: function () {
				    		    		$(".cropper-container").css({'left':'0px !important;'});

								    	$("button[data-cmd='save']").removeClass('hidden');
								    	$("button[data-cmd='rotate']").removeClass('hidden');
							            $("button[data-cmd='save']").click(function(){									    	
									    	$(this).html('Loading..').addClass('disabled');

									    	if(status){
												var ajax = system.get_ajax('../assets/harmony/Process.php?set-newImage',[data[0][0],'teacher',$image.cropper("getDataURL")]);
												ajax.success(function(data){
													// console.log(data);
													if(data == 1){
														Materialize.toast('Success. Picture updated.',2000,'',function(){
															$("#user-account img.profile-image").prop('src',$image.cropper("getDataURL"));
															App.handleLoadPage(window.location.hash);
														});
													}
													else{
														Materialize.toast('Failed. An error occured.',4000);
													}
												});
									    		status = false;
									    	}
							            });
								    }
								});

	                            $image.cropper("reset", true).cropper("replace", this.result);

					            $("button[data-cmd='rotate']").click(function(){
					            	var data = $(this).data('option');
						        	$image.cropper('rotate', data);
					            });

	                        };
	                    }
	                    else{
	                        showMessage("Please choose an image file.");
	                    }
	                });
	            }
	            else{
	                $inputImage.addClass("hide");
	            }	            
	            $("button[data-cmd='cancel']").click(function(){
					App.handleLoadPage(window.location.hash);
	            });
	    	});
	    },	
        update_userData:function(){
        	$("a[data-field='name']").click(function(){
        		$('span').removeClass('hidden');
        		$('form').addClass('hidden');

        		$('input').val('');
        		$('#user_name form').removeClass('hidden');
        		$('#user_name span').addClass('hidden');
        	});
        	$("a[data-field='username']").click(function(){
        		$('span').removeClass('hidden');
        		$('form').addClass('hidden');

        		$('input').val('');
        		$('#user_username form').removeClass('hidden');
        		$('#user_username span').addClass('hidden');
        	});
        	$("a[data-field='password']").click(function(){
        		$('span').removeClass('hidden');
        		$('form').addClass('hidden');

        		$('input').val('');
        		$('#user_password form').removeClass('hidden');
        		$('#user_password span').addClass('hidden');
        	});

        	$(".cancel").click(function(){
        		$('span').removeClass('hidden');
        		$('form').addClass('hidden');
        		$('input').val('');
        	});

        	$(".show-password").mouseup(function() {
        		$("#user_password form").find('input').prop({"type":"password"})
			})
			.mousedown(function() {
        		$("#user_password form").find('input').prop({"type":"text"})
			});

			$("#user_name form").validate({
			    rules: {
			        field_name: {required: true,minlength: 5,maxlength: 50},
			    },
			    errorElement : 'div',
			    errorPlacement: function(error, element) {
					var placement = $(element).data('error');
					if(placement){$(placement).append(error)} 
					else{error.insertAfter(element);}
				},
				submitHandler: function (form) {
					var form = $(form).serializeArray();
					var data = system.get_ajax('../assets/harmony/Process.php?set-userDetails',[form]);
					data.success(function(data){
						console.log(data);
						if(data == 1){
							Materialize.toast('Save.',4000);
							App.handleLoadPage(window.location.hash);
							$("#user-account a[data-activates='profile-dropdown']").html(form[0]['value']);
						}
						else{
							console.log(data);
							Materialize.toast('Cannot process request.',4000);
						}
					});
			    }
			}); 

			$("#user_username form").validate({
			    rules: {
			        field_username: {required: true,minlength: 5,maxlength: 50},
			    },
			    errorElement : 'div',
			    errorPlacement: function(error, element) {
					var placement = $(element).data('error');
					if(placement){$(placement).append(error)} 
					else{error.insertAfter(element);}
				},
				submitHandler: function (form) {
					var form = $(form).serializeArray();
					var data = system.get_ajax('../assets/harmony/Process.php?set-userDetails',[form]);
					data.success(function(data){
						console.log(data);
						if(data == 1){
							Materialize.toast('Save.',4000);
							App.handleLoadPage(window.location.hash);
						}
						else{
							console.log(data);
							Materialize.toast('Cannot process request.',4000);
						}
					});
			    }
			}); 

			$("#user_password form").validate({
			    rules: {
			        field_password: {required: true,minlength: 5,maxlength: 50},
			    },
			    errorElement : 'div',
			    errorPlacement: function(error, element) {
					var placement = $(element).data('error');
					if(placement){$(placement).append(error)} 
					else{error.insertAfter(element);}
				},
				submitHandler: function (form) {
					var form = $(form).serializeArray();
					var data = system.get_ajax('../assets/harmony/Process.php?set-userDetails',[form]);
					data.success(function(data){
						console.log(data);
						if(data == 1){
							Materialize.toast('Save.',4000);
							App.handleLoadPage(window.location.hash);
						}
						else{
							console.log(data);
							Materialize.toast('Cannot process request.',4000);
						}
					});
			    }
			}); 
        },
		displaySchool:function(){
			var logo = "../assets/img/logo.png";
			var banner = "../assets/img/bg-banner.jpg";
			var content = "", _this = this;
            var months = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];
			var data = system.get_ajax('../assets/harmony/Process.php?get-schoolInfo',"");
			data.success(function(data){
				data = JSON.parse(data);
				var metaData = JSON.parse(data[0][7]);

				var imageData = metaData[0].split('.');
				if(imageData[imageData.length-1]!='apr')
					logo = "../assets/img/"+metaData[0];					
				else
					logo = system.get_apr(metaData[0]);

				var bannerData = metaData[1].split('.');
				if(bannerData[bannerData.length-1]!='apr')
					banner = "../assets/img/"+metaData[1];					
				else
					banner = system.get_apr(metaData[1]);

				var principal = (metaData.length <= 3)?"No data":metaData[3];
				content =   "<ul class='collection z-depth-1'>"+
							"	<li class='collection-item'><strong>Banner:</strong>"+
							"		<div class='row'>"+
							"		    <div class='col s4'>"+
							"		        <div id='profile_banner1' class='col s12'>"+
							"		            <div class='col-md-12' style='float:none; position: absolute; padding-top: 10px;'>"+
							"		                <a data-cmd='update_banner' class='btn blue btn-floating btn-flat mdi-editor-mode-edit tooltipped' data-tooltip='Update banner' data-position='down' style='opacity: 0.5;'><i class='fa fa-camera-retro'></i> Update Picture</a>"+
							"		            </div>"+
							"		            <img alt='image' class='img-responsive' src='"+banner+"' style='width: 100%;'>"+
							" 		        </div>"+
							"		        <div id='profile_banner2' class='ibox-content no-padding border-left-right hidden'>"+
							"		        </div>"+
							"		    </div>"+
							"		</div>"+
							"	</li>"+
							"	<li class='collection-item'><strong>Logo:</strong>"+
							"		<div class='row'>"+
							"		    <div class='col s4'>"+
							"		        <div id='profile_logo1' class='col s6'>"+
							"		            <div class='col-md-12' style='float:none; position: absolute; padding-top: 10px;'>"+
							"		                <a data-cmd='update_logo' class='btn blue btn-floating btn-flat mdi-editor-mode-edit tooltipped' data-tooltip='Update logo' data-position='down' style='opacity: 0.5;'><i class='fa fa-camera-retro'></i> Update Picture</a>"+
							"		            </div>"+
							"		            <img alt='image' class='img-responsive' src='"+logo+"' style='width: 100%;'>"+
							" 		        </div>"+
							"		        <div id='profile_logo2' class='ibox-content no-padding border-left-right hidden'>"+
							"		        </div>"+
							"		    </div>"+
							"		</div>"+
							"	</li>"+
							"	<li class='collection-item' id='school_name'>"+
							"		<span><strong>School Name:</strong> "+data[0][1]+"<a data-field='schoolName' class='right mdi-editor-mode-edit tooltipped' data-tooltip='Update' data-position='left'></a></span>"+
							"		<form role='form' class='form-inline row hidden'>"+
							"		    <div class='input-field col s6'>"+
							"				<label for='field_schoolName'>School Name: </label>"+
							"				<input id='field_schoolName' type='text' name='field_schoolName' data-error='.error_schoolName'>"+
							"				<div class='error_schoolName'></div>"+
							"		    </div>"+
							"		    <div class='input-field col s6'>"+
							"		        <button class='btn waves-effect waves-light blue save-profile'>Save</button>"+
							"		        <action class='btn waves-effect waves-light grey cancel'>Cancel</action>"+
							"		    </div>"+
							"		</form>"+
							"	</li>"+
							"	<li class='collection-item' id='school_address'>"+
							"		<span><strong>School Address:</strong> "+metaData[2]+"<a data-field='schoolAddress' class='right mdi-editor-mode-edit tooltipped' data-tooltip='Update' data-position='left'></a></span>"+
							"		<form role='form' class='form-inline row hidden'>"+
							"		    <div class='input-field col s6'>"+
							"				<label for='field_schoolAddress'>School Address: </label>"+
							"				<input id='field_schoolAddress' type='text' name='field_schoolAddress' data-error='.error_schoolAddress'>"+
							"				<div class='error_schoolAddress'></div>"+
							"		    </div>"+
							"		    <div class='input-field col s6'>"+
							"		        <button class='btn waves-effect waves-light blue save-profile'>Save</button>"+
							"		        <action class='btn waves-effect waves-light grey cancel'>Cancel</action>"+
							"		    </div>"+
							"		</form>"+
							"	</li>"+
							"	<li class='collection-item' id='school_id'>"+
							"		<span><strong>School ID:</strong> "+data[0][2]+"<a data-field='schoolID' class='right mdi-editor-mode-edit tooltipped' data-tooltip='Update' data-position='left'></a></span>"+
							"		<form role='form' class='form-inline row hidden'>"+
							"		    <div class='input-field col s6'>"+
							"				<label for='field_schoolID'>School ID: </label>"+
							"				<input id='field_schoolID' type='text' name='field_schoolID' data-error='.error_schoolID'>"+
							"				<div class='error_schoolID'></div>"+
							"		    </div>"+
							"		    <div class='input-field col s6'>"+
							"		        <button class='btn waves-effect waves-light blue save-profile'>Save</button>"+
							"		        <action class='btn waves-effect waves-light grey cancel'>Cancel</action>"+
							"		    </div>"+
							"		</form>"+
							"	</li>"+
							"	<li class='collection-item' id='school_region'>"+
							"		<span><strong>Region:</strong> "+data[0][5]+"<a data-field='region' class='right mdi-editor-mode-edit tooltipped' data-tooltip='Update' data-position='left'></a></span>"+
							"		<form role='form' class='form-inline row hidden'>"+
							"		    <div class='input-field col s6'>"+
							"				<label for='field_region'>Region: </label>"+
							"				<input id='field_region' type='text' name='field_region' data-error='.error_region'>"+
							"				<div class='error_region'></div>"+
							"		    </div>"+
							"		    <div class='input-field col s6'>"+
							"		        <button class='btn waves-effect waves-light blue save-profile'>Save</button>"+
							"		        <action class='btn waves-effect waves-light grey cancel'>Cancel</action>"+
							"		    </div>"+
							"		</form>"+
							"	</li>"+
							"	<li class='collection-item' id='school_division'>"+
							"		<span><strong>Division:</strong> "+data[0][6]+"<a data-field='division' class='right mdi-editor-mode-edit tooltipped' data-tooltip='Update' data-position='left'></a></span>"+
							"		<form role='form' class='form-inline row hidden'>"+
							"		    <div class='input-field col s6'>"+
							"				<label for='field_division'>Division: </label>"+
							"				<input id='field_division' type='text' name='field_division' data-error='.error_division'>"+
							"				<div class='error_division'></div>"+
							"		    </div>"+
							"		    <div class='input-field col s6'>"+
							"		        <button class='btn waves-effect waves-light blue save-profile'>Save</button>"+
							"		        <action class='btn waves-effect waves-light grey cancel'>Cancel</action>"+
							"		    </div>"+
							"		</form>"+
							"	</li>"+
							"	<li class='collection-item' id='school_yearStart'>"+
							"		<span><strong>School Year(Start):</strong> <display id='_schoolYearStart'>"+data[0][3]+"</display><a data-field='yearStart' class='right mdi-editor-mode-edit tooltipped' data-tooltip='Update' data-position='left'></a></span>"+
							"		<form role='form' class='form-inline row hidden'>"+
							"		    <div class='input-field col s6'>"+
							"				<label for='field_yearStart'>School Year(Start): </label>"+
							"				<input id='field_yearStart' type='text' name='field_yearStart' data-error='.error_yearStart'>"+
							"				<div class='error_yearStart'></div>"+
							"		    </div>"+
							"		    <div class='input-field col s6'>"+
							"		        <button class='btn waves-effect waves-light blue save-profile'>Save</button>"+
							"		        <action class='btn waves-effect waves-light grey cancel'>Cancel</action>"+
							"		    </div>"+
							"		</form>"+
							"	</li>"+
							"	<li class='collection-item' id='school_yearEnd'>"+
							"		<span><strong>School Year(End):</strong> <display id='_schoolYearEnd'>"+data[0][4]+"</display><a data-field='yearEnd' class='right  mdi-editor-mode-edit tooltipped' data-tooltip='Update' data-position='left'></a></span>"+
							"		<form role='form' class='form-inline row hidden'>"+
							"		    <div class='input-field col s6'>"+
							"				<label for='field_yearEnd'>School Year(End): </label>"+
							"				<input id='field_yearEnd' type='text' name='field_yearEnd' data-error='.error_yearEnd'>"+
							"				<div class='error_yearEnd'></div>"+
							"		    </div>"+
							"		    <div class='input-field col s6'>"+
							"		        <button class='btn waves-effect waves-light blue save-profile'>Save</button>"+
							"		        <action class='btn waves-effect waves-light grey cancel'>Cancel</action>"+
							"		    </div>"+
							"		</form>"+
							"	</li>"+
							"	<li class='collection-item' id='school_principal'>"+
							"		<span><strong>Principal:</strong> <display id='_school_principal'>"+principal+"</display><a data-field='school_principal' class='right  mdi-editor-mode-edit tooltipped' data-tooltip='Update' data-position='left'></a></span>"+
							"		<form role='form' class='form-inline row hidden'>"+
							"		    <div class='input-field col s6'>"+
							"				<label for='field_school_principal'>Principal: </label>"+
							"				<input id='field_school_principal' type='text' name='field_school_principal' data-error='.error_school_principal'>"+
							"				<div class='error_school_principal'></div>"+
							"		    </div>"+
							"		    <div class='input-field col s6'>"+
							"		        <button class='btn waves-effect waves-light blue save-profile'>Save</button>"+
							"		        <action class='btn waves-effect waves-light grey cancel'>Cancel</action>"+
							"		    </div>"+
							"		</form>"+
							"	</li>"+
							"</ul";
				$("#display_schoolInfo").html(content);
				_this.update_logo(metaData);
				_this.update_banner(metaData);
				_this.update_schoolData();
			})
		},
	    update_logo:function(data){
			var logo = "../assets/img/logo.png";
			if(data[0] != ""){
				var imageData = data[0].split('.');
				if(imageData[imageData.length-1]!='apr')
					logo = "../assets/img/"+data[0];					
				else
					logo = system.get_apr(data[0]);
			}

	    	$("#display_schoolInfo a[data-cmd='update_logo']").click(function(){
	    		$("#profile_logo1").addClass('hidden');
	    		$("#profile_logo2").removeClass('hidden');

	    		var content =   "<div class='image-crop col s6' style='margin-bottom:5px;'>"+
								"	<img width='100%' src='"+logo+"'>"+
								"</div>"+
								"<div class='btn-group col s12'>"+
								"	<label for='inputImage' class='btn blue btn-floating btn-flat tooltipped' data-tooltip='Load image' data-position='down'>"+
								"		<input type='file' accept='image/*' name='file' id='inputImage' class='hide'>"+
								"		<i class='large mdi-editor-publish'></i>"+
								"	</label>"+
								"	<button class='btn blue btn-floating btn-flat tooltipped' data-cmd='cancel' type='button' data-tooltip='Cancel' data-position='down'>"+
								"		<i class='mdi-navigation-close'></i>"+
								"	</button>"+
								"	<button class='btn blue btn-floating btn-flat hidden tooltipped' data-cmd='rotate' data-option='-90' type='button' data-tooltip='Rotate left' data-position='down'>"+
								"		<i class='mdi-image-rotate-left'></i>"+
								"	</button>"+
								"	<button class='btn blue btn-floating btn-flat hidden tooltipped' data-cmd='rotate' data-option='90' type='button' data-tooltip='Rotate right' data-position='down'>"+
								"		<i class='mdi-image-rotate-right'></i>"+
								"	</button>"+
								"	<button class='btn blue btn-floating btn-flat hidden tooltipped' data-cmd='save' type='button' data-tooltip='Save' data-position='down'>"+
								"		<i class='mdi-content-save'></i>"+
								"	</button>"+
								"</div>";
	    		$("#profile_logo2").html(content);
				$('.tooltipped').tooltip({delay: 50});

	            var $inputImage = $("#inputImage");
	            status = true;
	            if(window.FileReader){
	                $inputImage.change(function() {
	                    var fileReader = new FileReader(),
	                            files = this.files,
	                            file;

	                    file = files[0];

	                    if (/^image\/\w+$/.test(file.type)) {
	                        fileReader.readAsDataURL(file);
	                        fileReader.onload = function () {
	                            $inputImage.val("");

					            var $image = $(".image-crop > img")
					            $($image).cropper({
					            	aspectRatio: 1/1,
								    autoCropArea: 0.80,
								    preview: ".avatar-preview",
								    built: function () {
				    		    		$(".cropper-container").css({'left':'0px !important;'});

								    	$("button[data-cmd='save']").removeClass('hidden');
								    	$("button[data-cmd='rotate']").removeClass('hidden');
							            $("button[data-cmd='save']").click(function(){									    	
									    	$(this).html('Loading..').addClass('disabled');
									    	if(status){
												var ajax = system.get_ajax('../assets/harmony/Process.php?set-newImage',["*",'school',$image.cropper("getDataURL")]);
												ajax.success(function(data){
													console.log(data);
													if(data == 1){
														Materialize.toast('Success. Logo updated.',2000,'',function(){
															$("link[rel='icon']").prop('href',$image.cropper("getDataURL"));
															App.handleLoadPage(window.location.hash);
														});
													}
													else{
														Materialize.toast('Failed. An error occured.',4000);
													}
												});
									    		status = false;
									    	}
							            });
								    }
								});

	                            $image.cropper("reset", true).cropper("replace", this.result);

					            $("button[data-cmd='rotate']").click(function(){
					            	var data = $(this).data('option');
						        	$image.cropper('rotate', data);
					            });

	                        };
	                    }
	                    else{
							Materialize.toast("Please choose an image file.",4000);
	                    }
	                });
	            }
	            else{
	                $inputImage.addClass("hide");
	            }	            
	            $("button[data-cmd='cancel']").click(function(){
					App.handleLoadPage(window.location.hash);
	            });
	    	});
	    },	
	    update_banner:function(data){
			var banner = "../assets/img/bg-banner.jpg";
			if(data[1] != ""){
				var imageData = data[1].split('.');
				if(imageData[imageData.length-1]!='apr')
					banner = "../assets/img/"+data[1];					
				else
					banner = system.get_apr(data[1]);
			}

	    	$("#display_schoolInfo a[data-cmd='update_banner']").click(function(){
	    		$(".material-tooltip").html("");


	    		$("#profile_banner1").addClass('hidden');
	    		$("#profile_banner2").removeClass('hidden');

	    		var content =   "<div class='banner-crop col s12' style='margin-bottom:5px;'>"+
								"	<img width='100%' src='"+banner+"'>"+
								"</div>"+
								"<div id='banner' class='btn-group col s12'>"+
								"	<label for='inputBanner' class='btn blue btn-floating btn-flat tooltipped' data-tooltip='Load image' data-position='down'>"+
								"		<input type='file' accept='image/*' name='file' id='inputBanner' class='hide'>"+
								"		<i class='large mdi-editor-publish'></i>"+
								"	</label>"+
								"	<button class='btn blue btn-floating btn-flat tooltipped' data-cmd='cancel' type='button' data-tooltip='Cancel' data-position='down'>"+
								"		<i class='mdi-navigation-close'></i>"+
								"	</button>"+
								"	<button class='btn blue btn-floating btn-flat hidden tooltipped' data-cmd='rotate' data-option='-90' type='button' data-tooltip='Rotate left' data-position='down'>"+
								"		<i class='mdi-image-rotate-left'></i>"+
								"	</button>"+
								"	<button class='btn blue btn-floating btn-flat hidden tooltipped' data-cmd='rotate' data-option='90' type='button' data-tooltip='Rotate right' data-position='down'>"+
								"		<i class='mdi-image-rotate-right'></i>"+
								"	</button>"+
								"	<button class='btn blue btn-floating btn-flat hidden tooltipped' data-cmd='save' type='button' data-tooltip='Save' data-position='down'>"+
								"		<i class='mdi-content-save'></i>"+
								"	</button>"+
								"</div>";
	    		$("#profile_banner2").html(content);
				$('.tooltipped').tooltip({delay: 50});

	            var $inputImage = $("#inputBanner");
	            status = true;
	            if(window.FileReader){
	                $inputImage.change(function() {
	                    var fileReader = new FileReader(),
	                            files = this.files,
	                            file;

	                    file = files[0];

	                    if (/^image\/\w+$/.test(file.type)) {
	                        fileReader.readAsDataURL(file);
	                        fileReader.onload = function () {
	                            $inputImage.val("");

					            var $image = $(".banner-crop > img")
					            $($image).cropper({
					            	aspectRatio: 16/3,
								    autoCropArea: 0.80,
								    preview: ".avatar-preview",
								    built: function () {
				    		    		$(".cropper-container").css({'left':'0px !important;'});

								    	$("#banner button[data-cmd='save']").removeClass('hidden');
								    	$("#banner button[data-cmd='rotate']").removeClass('hidden');
							            $("#banner button[data-cmd='save']").click(function(){									    	
									    	$(this).html('Loading..').addClass('disabled');
									    	if(status){
												var ajax = system.get_ajax('../assets/harmony/Process.php?set-newBanner',["*",'school',$image.cropper("getDataURL")]);
												ajax.success(function(data){
													console.log(data);
													if(data == 1){
														Materialize.toast('Success. Banner updated.',2000);
														account.update_schoolInfo();
														$("nav .nav-wrapper").attr({'style':'background: url('+$image.cropper("getDataURL")+') no-repeat; background-size: cover;'});
														App.handleLoadPage(window.location.hash);												
													}
													else{
														Materialize.toast('Failed. An error occured.',4000);
													}
												});
									    		status = false;
									    	}
							            });
								    }
								});

	                            $image.cropper("reset", true).cropper("replace", this.result);

					            $("#banner button[data-cmd='rotate']").click(function(){
					            	var data = $(this).data('option');
						        	$image.cropper('rotate', data);
					            });

	                        };
	                    }
	                    else{
	                        showMessage("Please choose an image file.");
	                    }
	                });
	            }
	            else{
	                $inputImage.addClass("hide");
	            }	            
	            $("#banner button[data-cmd='cancel']").click(function(){
					App.handleLoadPage(window.location.hash);
	            });
	    	});
	    },		
        update_schoolData:function(){
        	$("a[data-field='schoolName']").click(function(){
        		$('span').removeClass('hidden');
        		$('form').addClass('hidden');

        		$('input').val('');
        		$('#school_name form').removeClass('hidden');
        		$('#school_name span').addClass('hidden');
        	});
        	$("a[data-field='schoolAddress']").click(function(){
        		$('span').removeClass('hidden');
        		$('form').addClass('hidden');

        		$('input').val('');
        		$('#school_address form').removeClass('hidden');
        		$('#school_address span').addClass('hidden');
        	});
        	$("a[data-field='schoolID']").click(function(){
        		$('span').removeClass('hidden');
        		$('form').addClass('hidden');

        		$('input').val('');
        		$('#school_id form').removeClass('hidden');
        		$('#school_id span').addClass('hidden');
        	});
        	$("a[data-field='region']").click(function(){
        		$('span').removeClass('hidden');
        		$('form').addClass('hidden');

        		$('input').val('');
        		$('#school_region form').removeClass('hidden');
        		$('#school_region span').addClass('hidden');
        	});
        	$("a[data-field='division']").click(function(){
        		$('span').removeClass('hidden');
        		$('form').addClass('hidden');

        		$('input').val('');
        		$('#school_division form').removeClass('hidden');
        		$('#school_division span').addClass('hidden');
        	});
        	$("a[data-field='yearStart']").click(function(){
				$("input[name='field_yearStart']").datepicker( {
				    format: "mm-yyyy",
				    startView: "months", 
				    minViewMode: "months",
				});

        		$('span').removeClass('hidden');
        		$('form').addClass('hidden');

        		$('input').val('');
        		$('#school_yearStart form').removeClass('hidden');
        		$('#school_yearStart span').addClass('hidden');
        	});
        	$("a[data-field='yearEnd']").click(function(){
				$("input[name='field_yearEnd']").datepicker( {
				    format: "mm-yyyy",
				    startView: "months", 
				    minViewMode: "months",
				});

        		$('span').removeClass('hidden');
        		$('form').addClass('hidden');

        		$('input').val('');
        		$('#school_yearEnd form').removeClass('hidden');
        		$('#school_yearEnd span').addClass('hidden');
        	});

        	$("a[data-field='school_principal']").click(function(){
				$("input[name='field_yearEnd']").datepicker( {
				    format: "mm-yyyy",
				    startView: "months", 
				    minViewMode: "months",
				});

        		$('span').removeClass('hidden');
        		$('form').addClass('hidden');

        		$('input').val('');
        		$('#school_principal form').removeClass('hidden');
        		$('#school_principal span').addClass('hidden');
        	});

        	$(".cancel").click(function(){
        		$('span').removeClass('hidden');
        		$('form').addClass('hidden');
        		$('input').val('');
        	});

			$("#school_name form").validate({
			    rules: {
			        field_schoolName: {required: true,minlength: 5,maxlength: 50},
			    },
			    errorElement : 'div',
			    errorPlacement: function(error, element) {
					var placement = $(element).data('error');
					if(placement){$(placement).append(error)} 
					else{error.insertAfter(element);}
				},
				submitHandler: function (form) {
					var form = $(form).serializeArray();
					var data = system.get_ajax('../assets/harmony/Process.php?set-schoolDetails',[form]);
					data.success(function(data){
						console.log(data);
						if(data == 1){
							Materialize.toast('Save.',4000);
							App.handleLoadPage(window.location.hash);
						}
						else{
							console.log(data);
							Materialize.toast('Cannot process request.',4000);
						}
					});
			    }
			}); 

			$("#school_address form").validate({
			    rules: {
			        field_schoolAddress: {required: true,minlength: 5,maxlength: 50},
			    },
			    errorElement : 'div',
			    errorPlacement: function(error, element) {
					var placement = $(element).data('error');
					if(placement){$(placement).append(error)} 
					else{error.insertAfter(element);}
				},
				submitHandler: function (form) {
					var form = $(form).serializeArray();
					var data = system.get_ajax('../assets/harmony/Process.php?set-schoolDetails',[form]);
					data.success(function(data){
						console.log(data);
						if(data == 1){
							Materialize.toast('Save.',4000);
							App.handleLoadPage(window.location.hash);
						}
						else{
							console.log(data);
							Materialize.toast('Cannot process request.',4000);
						}
					});
			    }
			}); 

			$("#school_id form").validate({
			    rules: {
			        field_schoolID: {required: true,minlength: 6,maxlength: 6},
			    },
			    errorElement : 'div',
			    errorPlacement: function(error, element) {
					var placement = $(element).data('error');
					if(placement){$(placement).append(error)} 
					else{error.insertAfter(element);}
				},
				submitHandler: function (form) {
					var form = $(form).serializeArray();
					var data = system.get_ajax('../assets/harmony/Process.php?set-schoolDetails',[form]);
					data.success(function(data){
						console.log(data);
						if(data == 1){
							Materialize.toast('Save.',4000);
							App.handleLoadPage(window.location.hash);
						}
						else{
							console.log(data);
							Materialize.toast('Cannot process request.',4000);
						}
					});
			    }
			}); 

			$("#school_region form").validate({
			    rules: {
			        field_region: {required: true,minlength: 1,maxlength: 10},
			    },
			    errorElement : 'div',
			    errorPlacement: function(error, element) {
					var placement = $(element).data('error');
					if(placement){$(placement).append(error)} 
					else{error.insertAfter(element);}
				},
				submitHandler: function (form) {
					var form = $(form).serializeArray();
					var data = system.get_ajax('../assets/harmony/Process.php?set-schoolDetails',[form]);
					data.success(function(data){
						console.log(data);
						if(data == 1){
							Materialize.toast('Save.',4000);
							App.handleLoadPage(window.location.hash);
						}
						else{
							console.log(data);
							Materialize.toast('Cannot process request.',4000);
						}
					});
			    }
			}); 

			$("#school_division form").validate({
			    rules: {
			        field_division: {required: true,minlength: 1,digits:true},
			    },
			    errorElement : 'div',
			    errorPlacement: function(error, element) {
					var placement = $(element).data('error');
					if(placement){$(placement).append(error)} 
					else{error.insertAfter(element);}
				},
				submitHandler: function (form) {
					var form = $(form).serializeArray();
					var data = system.get_ajax('../assets/harmony/Process.php?set-schoolDetails',[form]);
					data.success(function(data){
						console.log(data);
						if(data == 1){
							Materialize.toast('Save.',4000);
							App.handleLoadPage(window.location.hash);
						}
						else{
							console.log(data);
							Materialize.toast('Cannot process request.',4000);
						}
					});
			    }
			}); 

			$("#school_yearStart form").validate({
			    rules: {
			        field_yearStart: {required: true,validateRange:[1,'field_yearStart',$("#_schoolYearEnd").html()]},
			    },
			    errorElement : 'div',
			    errorPlacement: function(error, element) {
					var placement = $(element).data('error');
					if(placement){$(placement).append(error)} 
					else{error.insertAfter(element);}
				},
				submitHandler: function (form) {
					var form = $(form).serializeArray();
					var data = system.get_ajax('../assets/harmony/Process.php?set-schoolDetails',[form]);
					data.success(function(data){
						console.log(data);
						if(data == 1){
							Materialize.toast('Save.',4000);
							App.handleLoadPage(window.location.hash);
						}
						else{
							console.log(data);
							Materialize.toast('Cannot process request.',4000);
						}
					});
			    }
			}); 

			$("#school_yearEnd form").validate({
			    rules: {
			        field_yearEnd: {required: true,validateRange:[2,$("#_schoolYearStart").html(),'field_yearEnd']},
			    },
			    errorElement : 'div',
			    errorPlacement: function(error, element) {
					var placement = $(element).data('error');
					if(placement){$(placement).append(error)} 
					else{error.insertAfter(element);}
				},
				submitHandler: function (form) {
					var form = $(form).serializeArray();
					var data = system.get_ajax('../assets/harmony/Process.php?set-schoolDetails',[form]);
					data.success(function(data){
						console.log(data);
						if(data == 1){
							Materialize.toast('Save.',4000);
							App.handleLoadPage(window.location.hash);
						}
						else{
							console.log(data);
							Materialize.toast('Cannot process request.',4000);
						}
					});
			    }
			}); 

			$("#school_principal form").validate({
			    rules: {
			        field_school_principal: {required: true,minlength: 5,maxlength: 50},
			    },
			    errorElement : 'div',
			    errorPlacement: function(error, element) {
					var placement = $(element).data('error');
					if(placement){$(placement).append(error)} 
					else{error.insertAfter(element);}
				},
				submitHandler: function (form) {
					var form = $(form).serializeArray();
					var data = system.get_ajax('../assets/harmony/Process.php?set-schoolDetails',[form]);
					data.success(function(data){
						console.log(data);
						if(data == 1){
							Materialize.toast('Save.',4000);
							App.handleLoadPage(window.location.hash);
						}
						else{
							console.log(data);
							Materialize.toast('Cannot process request.',4000);
						}
					});
			    }
			});
        },
        db_list:function(){
			var data = system.get_ajax('../assets/harmony/Process.php?get-dbFiles',"");
			data.success(function(data){
				var content = "", _data = "", date = "";
				data = JSON.parse(data);
				console.log(data);
				$.each(data,function(i,v){
					if(v[0] != 'k12.sql'){
						date = new Date(v[1]);
						// console.log(date.getFullYear());
						content +=  "<li class='collection-item'>"+
									"	<div class='row'>"+
									"		<div class='col s9 truncate'>"+
												v[0]+"<br/>"+v[1]+
									"		</div>"+
									"		<div class='secondary-content'>"+
									"			<button class='mdi-action-restore btn-flat waves-effect waves-light'></button>"+
									"		</div>"+
									"	</div>"+
									"</li>";						
					}
				});
				content = "<ul class='collection with-header'>"+content+"</ul>";

				$("#display_dbFiles").html(content);
			});
        },
        db_lastlist:function(){
			var data = system.get_ajax('../assets/harmony/Process.php?get-dbFiles',"");
			data.success(function(data){
				var content = "", _data = "", date = "";
				data = JSON.parse(data);
				console.log(data);
				$.each(data,function(i,v){
					if(v[0] != 'k12.sql'){
						date = new Date(v[1]);
						content =  "<li class='collection-item'>"+
									"	<div class='row'>"+
									"		<div class='col s9 truncate'><strong>Last database backup:</strong></div>"+
									"		<div class='col s9 truncate'>"+
												v[0]+"<br/>"+v[1]+
									"		</div>"+
									// "		<div class='secondary-content'>"+
									// "			<button class='mdi-action-restore btn-flat waves-effect waves-light'></button>"+
									// "		</div>"+
									"	</div>"+
									"</li>";						
					}
				});
				content = "<ul class='collection with-header'>"+content+"</ul>";

				$("#display_dbFiles").html(content);
			});
        },
        db_restore:function(){
			$("button[data-cmd='restore-db']").click(function(){
				$(this).addClass('hidden');
				$('#restore_confirmHandler').removeClass('hidden');
			});
			$("button[data-cmd='cancel-restore-db']").click(function(){
				$("button[data-cmd='restore-db']").removeClass('hidden');
				$('#restore_confirmHandler').addClass('hidden');
			});

			$("button[data-cmd='sure-restore-db']").click(function(){
				var data = _process.passwordAuth(function(){
					Materialize.toast('Authentication success.',4000);
					console.log("success");
					system.loader(true); system.block(true);
					Materialize.toast('Starting to remove all grades data.',2000,'',function(){
						var data = system.get_ajax('../assets/harmony/Process.php?truncate-grades',"");
						data.success(function(data){
							if(data != 0){
								Materialize.toast('Restored. The system will restart.',4000,'',function(){
									window.location.href = '../';
								});
							}
							else{
								Materialize.toast('Cannot process grade restoration',4000,'',function(){
									window.location.href = '../k12/account/';
								});
							}

						});

					});
				},
				function(){
					Materialize.toast('Authentication failed.',4000);
					$("#field_passwordAuth").val("");
					console.log("failed");
				});
			});
        },
        db_backup:function(){
        	this.db_lastlist();
			var data = localStorage.getItem('schoolInformation');
			data = JSON.parse(data);
            var months = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];

			var maxDate = data[0][4].split('-');
			if(new Date(Number(maxDate[1]), Number(maxDate[0]) + 0, 1) < new Date()){
				$("button[data-cmd='backup-db']").attr('data-activate',true)
			}

			$("button[data-cmd='backup-db']").click(function(){
				var data = $(this).data();
				console.log(data['activate']);
				if(data['activate']){
					$(this).addClass('hidden');
					$('#backup_confirmHandler').removeClass('hidden');
				}
				else{
					Materialize.toast('Send to archive is not available. Current school year is active.',2000);
				}
			});
			$("button[data-cmd='cancel-backup-db']").click(function(){
				$("button[data-cmd='backup-db']").removeClass('hidden');
				$('#backup_confirmHandler').addClass('hidden');
			});

			$("button[data-cmd='sure-backup-db']").click(function(){
				var data = _process.passwordAuth(function(){
					Materialize.toast('Authentication success.',4000);
					console.log("success");
					system.loader(true); system.block(true);
					Materialize.toast('Starting database backup.',2000,'',function(){
						Materialize.toast('Back up on process. Do not interupt',2000,'',function(){
							var data = system.get_ajax('../assets/harmony/Process.php?buckup-db',"");
							data.success(function(data){
								data = JSON.parse(data);
								if(data[0] == 1){
									settings.db_lastlist();
									Materialize.toast('Success. Database has been backed up.',1000,'',function(){
										system.loader(false); system.block(false);
										$("button[data-cmd='backup-db']").removeClass('hidden');
										$('#backup_confirmHandler').addClass('hidden');
										$(".bottom-sheet").closeModal();
										window.location.href = "../assets/db/"+data[1];
									});
								}
								else{
									Materialize.toast('Failed. Cannot back up this time. Please try later.',1000,'',function(){
										system.loader(false); system.block(false);
									});
								}
							});
						});
					});

				},
				function(){
					Materialize.toast('Authentication failed.',4000);
					$("#field_passwordAuth").val("");
					console.log("failed");
				});
			});
        },
		importFromFile_sql: function(){
            var $inputImage = $("#field_file");
            status = true;
            if(window.FileReader){
                $inputImage.change(function() {
					var _data = account.getStudent();
					_data = JSON.parse(_data);

                    var fileReader = new FileReader(),
                            files = this.files,
                            file,
							fileType = files[0].name.split('.');	

                    file = files[0];

                    var files = this.files;
                    if((fileType[1] == "sql")){
                        var dataFromFile = fileReader.readAsText(file);

                        fileReader.onload = function (e) {
                        	dataFromFile = e.target.result;
                        };

                    	$("#displayImport").removeClass('hidden');
		                $("#save_import").on("click",function(){
							system.loader(true); system.block(true);
							Materialize.toast('Importing...',1000);
		                	$(this).addClass('disabled');
		                	$("#field_file").addClass('disabled');

							Materialize.toast('Restoring archived database (1/4).',2000,'',function(){
								var data = system.get_ajax('../assets/harmony/Process.php?drop-tempdatabase',"");
								console.log(data.responseText);
								data.success(function(data){
									Materialize.toast('Restoring archived database (2/4).',2000,'',function(){
										var data = system.get_ajax('../assets/harmony/Process.php?createDB',"");
										data.success(function(data){
											if(data == 1){
												Materialize.toast('Restoring archived database (3/4).',5000,'',function(){
													Materialize.toast('Restoring database (4/4).',5000,'',function(){
														var ajax = system.get_ajax('../assets/harmony/Process.php?restoreTablesFromFile',dataFromFile);
														console.log(ajax.responseText);
														ajax.success(function(data){
															if(data != 0){
																Materialize.toast('Restored. You will be redirected in 5 seconds.',4000,'',function(){
												                	window.open('../../k12-archive/account','_blank');
																	setTimeout(function(){
																		window.location.href = '../';
																	},5000)
																});
															}
															else{
																Materialize.toast('Cannot process database restoration',4000,'',function(){
																	system.loader(false); system.block(false);
																	window.location.href = '../';
																});
															}
														});
													});
												});
											}
											else{
												Materialize.toast('Cannot process database restoration.',4000,'',function(){
													window.location.href = '../k12/account/';
													system.loader(false); system.block(false);
												});
											}
										});					
									});
								});
							});
		                });
                    }
                    else{
                    	$("#displayImport").addClass('hidden');
						$("#display_excelFile").html("");
						Materialize.toast("SQL file is not valid.",4000);
                    }
                });
            }
            else{
                $inputImage.addClass("hide");
            }	 			
		},
    };
}();

var grade = function(){
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