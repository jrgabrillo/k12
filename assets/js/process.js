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
        open_modal: function(title, content){
			$("#modal_bottomPopup").openModal();
			$("#modal_bottomPopup h5").html(title);
			$("#modal_bottomPopup .modal_subContent").html(content);
        },
        close_modal: function(){ 
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
		add_student: function(){
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

				$("#field_year").change(function(){
					var selected = $("#field_year").val(), options = '';
					$.each(data[selected][1],function(i,v){
						options += "<option value='"+v['section']+"'>"+v['section']+"</option>";
					});

					$("#field_section").html(options);
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
		            field_studentID: {required: true,maxlength: 50,checkStudentID:true},
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
	                email: {
	                    remote: "Student ID already in use."
	                }
	            },
				submitHandler: function (form) {
					var studentInfo = $(form).serializeArray();
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
		display_studentList:function(){
			var data = system.get_ajax('../assets/harmony/Process.php?get-students',"");
			data.success(function(data){
		        localStorage.setItem('student-list',data);
				var data = JSON.parse(data);
				var content = "<table id='listStudent' class='table table-striped table-hover dataTable'>"+
							"    <thead>"+
							"        <tr>"+
							"            <th width='5%'></th>"+
							"            <th width='80%'>Name</th>"+
							"            <th width='15%'></th>"+
							"        </tr>"+
							"    </thead>"+
							"</table>";

				$('#disply_studentList').html(content);
                $('#listStudent').DataTable({
                    data: data,
                    sort: false,
					"columnDefs": [
						{ className: "client-avatar", "targets": [ 0 ] }
					],
                    columns: [
                        {data: "",
                            render: function ( data, type, full ){
                            	var details = '<img alt="image" src="../assets/img/'+full[0][13]+'">';
                                return details;
                            }
                        },
                        {data: "",
                            render: function ( data, type, full ){
                            	var details = "NAME: "+full[0][1]+" "+full[0][2]+", "+full[0][3]+"<br/>Student ID: "+full[0][15];
                                return details;
                            }
                        },
                        {data: "",
                            render: function ( data, type, full ){
                            	var info = JSON.stringify(full);
                            	var details = "<a href='#cmd=index;content=student-info;id="+full[0][15]+"' data-cmd='show-info' data-info='"+info+"' class='btn blue tooltipped' data-tooltip='More details' data-position='left' type='button'>"+
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
		display_studentInfo:function(){
	        var data = localStorage.getItem('student-list');
			var data = JSON.parse(data);
			var content = "<table id='listStudent' class='table table-striped table-hover dataTable'>"+
						"    <thead>"+
						"        <tr>"+
						"            <th width='5%'></th>"+
						"            <th width='80%'>Name</th>"+
						"            <th width='15%'></th>"+
						"        </tr>"+
						"    </thead>"+
						"</table>";

			$('#disply_studentList').html(content);
            $('#listStudent').DataTable({
                data: data,
                sort: false,
				"columnDefs": [
					{ className: "client-avatar", "targets": [ 0 ] }
				],
                columns: [
                    {data: "",
                        render: function ( data, type, full ){
                        	var details = '<img alt="image" src="../assets/img/'+full[0][13]+'">';
                            return details;
                        }
                    },
                    {data: "",
                        render: function ( data, type, full ){
                        	var details = "NAME: "+full[0][1]+" "+full[0][2]+", "+full[0][3]+"<br/>Student ID: "+full[0][15];
                            return details;
                        }
                    },
                    {data: "",
                        render: function ( data, type, full ){
                        	var info = JSON.stringify(full);
                        	var details = "<a href='#cmd=index;content=student-info;id="+full[0][15]+"' data-cmd='show-info' data-info='"+info+"' class='btn blue tooltipped' data-tooltip='More details' data-position='left' type='button'>"+
				                            	"<i class='mdi-navigation-more-vert'></i>"+
			                            	"</a>";
                            return details;
                        }
                    }
                ]
            });
			$('.tooltipped').tooltip({delay: 50});
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
					console.log(data);
				}
			});
		},
		update_schoolInfo:function(){
			var data = system.get_ajax('../assets/harmony/Process.php?get-schoolInfo',"");
			data.success(function(data){
				data = JSON.parse(data);
				console.log(data);
				if(data.length>0){
					// show details
					var details = JSON.parse(data[0][6]);

					if(details[0] != ''){
						$("#_schoolLogo").attr({src:'../assets/img/'+details[0]});
					}

					if(details[1] != ''){
						$("#_schoolBanner").attr({src:'../assets/img/'+details[1]});
					}

					$("#field_schoolDetails").addClass("hidden");
					$("#display_schoolDetails").removeClass("hidden");

					$("#_schoolName").html(data[0][1]);
					$("#_schoolAddress").html(details[2]);
					$("#_schoolSchoolID").html(data[0][2]);
					$("#_schoolSchoolYear").html(data[0][3]);
					$("#_schoolRegion").html(data[0][4]);
					$("#_schoolDivision").html(data[0][5]);

					$("#field_schoolName").val(data[0][1]);
					$("#field_schoolAddress").val(details[2]);
					$("#field_schoolID").val(data[0][2]);
					$("#field_schoolYear").val(data[0][3]);
					$("#field_region").val(data[0][4]);
					$("#field_division").val(data[0][5]);

				}
				else{
					$("#field_schoolDetails").removeClass("hidden");
					$("#display_schoolDetails").addClass("hidden");
				}
			});

		    $("#form_schoolInfo").validate({
		        rules: {
		            field_schoolName: {required: true,minlength: 5,maxlength: 100},
		            field_schoolAddress: {required: true,minlength: 5},
		            field_schoolYear: {required: true,checkYear:true},
		            field_schoolID: {required: true,minlength: 6,maxlength: 6},
		            field_region: {required: true,minlength: 1,maxlength: 10},
		            field_division: {required: true,minlength: 1,digits:true},
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
					var schoolInfo = $(form).serializeArray();
					var data = system.get_ajax('../assets/harmony/Process.php?set-schoolInfo',schoolInfo);
					data.success(function(data){
						if(data == 1){
							Materialize.toast('Save.',4000);
							App.handleLoadPage(window.location.hash);
						}
						else{
							Materialize.toast('Cannot process request.',4000);
							console.log(data);
						}
					});
		        }
			});

		    $("#form_updateSchoolInfo").validate({
		        rules: {
		            field_schoolName: {required: true,minlength: 5,maxlength: 100},
		            field_schoolAddress: {required: true,minlength: 5},
		            field_schoolYear: {required: true,checkYear:true},
		            field_schoolID: {required: true,minlength: 6,maxlength: 6},
		            field_region: {required: true,minlength: 1,maxlength: 10},
		            field_division: {required: true,minlength: 1,digits:true},
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
					var schoolInfo = $(form).serializeArray();
					var data = system.get_ajax('../assets/harmony/Process.php?set-schoolInfo',schoolInfo);
					data.success(function(data){
						if(data == 1){
							Materialize.toast('Save.',4000);
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
			                minlength: 5,
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
							"		<div class='input-field col s6'>"+
							"			<label for='field_subjectCode' class='active'>Subject code: </label>"+
							"            <input type='text' id='field_subjectCode' name='field_subjectCode' data-error='.error_subjectCode'>"+
							"            <input type='hidden' value='"+data.year+"' name='field_yearID'>"+
							"			<div class='error_subjectCode'></div>	"+
							"		</div>"+
							"		<div class='input-field col s6'>"+
							"			<label for='field_subjectTitle' class='active'>Subject title: </label>"+
							"            <input type='text' id='field_subjectTitle' name='field_subjectTitle' data-error='.error_subjectTitle'>"+
							"			<div class='error_subjectTitle'></div>	"+
							"		</div>"+
							"		<div class='input-field col s12'>"+
							"			<label for='field_subjectDesc' class='active'>Subject Description: <i>Optional</i></label>"+
							"            <textarea class='materialize-textarea' id='field_subjectDesc' name='field_subjectDesc' data-error='.error_subjectDesc'></textarea>"+
							"			<div class='error_subjectDesc'></div>	"+
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
						var data = system.get_ajax('../assets/harmony/Process.php?set-subject',subjectInfo);
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
							"		<div class='input-field col s12'>"+
							"			<label for='field_subjectDesc' class='active'>Subject Description: <i>Optional</i></label>"+
							"            <textarea class='materialize-textarea' id='field_subjectDesc' name='field_subjectDesc' data-error='.error_subjectDesc'></textarea>"+
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
				var data = $(this).data();
				var data = system.get_ajax('../assets/harmony/Process.php?delete-subject',[data.key,data.node]);
				data.success(function(data){
					console.log(data);
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

			$("a[data-cmd='delete-sublevelsubject']").click(function(){
				var data = $(this).data();
				var data = system.get_ajax('../assets/harmony/Process.php?delete-sublevelsubject',[data.key,data.node]);
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
							subjectcontent += "<tr><th>Subject Code</th><th>Name</th><th>Description</th><th></th></tr>";
							$.each(v[2],function(i2,v2){
								var subData = JSON.parse(v2[2]);
								if(subData.length > 1){
									var sublevel = "";
									for(var x=1;x<subData.length;x++){
										var _sub = JSON.stringify([subData[x][1],subData[x][0],subData[x][2]]);
										sublevel += "<tr>"+
															"	<td width='20%'><i class='mdi-navigation-arrow-forward'></i>"+subData[x][1]+"</td>"+
															"	<td width='20%'>"+subData[x][0]+"</td>"+
															"	<td width=''>"+subData[x][2]+"</td>"+
															"	<td width='80px;'>"+
															"		<a class='secondary-content tooltipped btn-icon' data-key='"+v2[0]+"' data-node='"+_sub+"' data-cmd='delete-sublevelsubject' data-tooltip='Delete sub-level subject' data-position='left'><i class='mdi-content-clear'></i></a>"+
															"	</td>"+
															"</tr>";
									}
									subjectcontent += "<tr>"+
														"	<td width='20%'>"+v2[1]+"</td>"+
														"	<td width='20%'>"+subData[0]+"</td>"+
														"	<td width=''>"+v2[3]+"</td>"+
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
														"	<td width=''>"+v2[3]+"</td>"+
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
									"		<a class='waves-effect waves-light grey-text tooltipped right hidden' data-tooltip='Add Subject' data-position='left' data-cmd='add_subject' data-node='"+v[0][1]+"' data-year='"+v[0][0]+"'><i class='mdi-action-note-add'></i></a>"+
									"		<a class='waves-effect waves-light grey-text tooltipped right hidden' data-tooltip='Add Section' data-position='left' data-cmd='add_section' data-node='"+v[0][1]+"' data-year='"+v[0][0]+"'><i class='mdi-av-playlist-add'></i></a>"+
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

					var previousTarget=null;
					$(".collapsible li.yearLevel").click(function(e){
						if(this!=previousTarget) {
							$("#yearLevels a").addClass('hidden');
							$("#yearLevels").find('li.yearLevel .collapsible-body').css({'display':'none'});
							$("#yearLevels li.yearLevel").removeClass('active');
							$(this).find('.hidden').removeClass('hidden');
							$(this).addClass('active');
							$(this).find('.collapsible-body').css({'display':'block'});
					    }
					    previousTarget=this;
					    return false;
					});
					account.sections();
					account.subject();
				}
				else{
					console.log('no year level');
				}
			});
		},
    };
}();
