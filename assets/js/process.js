
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
			var ajax = this.do_ajax('http://apparato.net/systems/harmony/Process.php?send-mail',[email,message]);
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
			var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?get-yearlevel',"");
			data.success(function(data){
			});
		},
		checkConnection:function(){
			var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?chkConnection',"");
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
					var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?createDB',"");
					data.success(function(data){
						if(data == 1){
							Materialize.toast('Database created.',5000,'',function(){
								Materialize.toast('Adding tables.',5000,'',function(){
									var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?createTables',"");
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
			var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?checkSchoolDetails',"");
			data.success(function(data){
				data = JSON.parse(data);
				console.log(data);
				if(data.length > 0){
					console.log('with school data. show school data');
					$("#display_login").removeClass("hide-on-med-and-up hide-on-med-and-down");
					$("#display_schoolDetails").addClass("hide-on-med-and-up hide-on-med-and-down");
				}
				else{
					console.log('log in');
				}
			});
		},
		logIn:function(){
			$("a[data-cmd='login']").click(function(){
				var data = $(".login-form").serializeArray();
				var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?login',data);
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
			var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?get-account',"");
			data.success(function(data){
				data = JSON.parse(data);
				$("#user-account img").prop('src',"../assets/img/"+data[0][4]);
				$("#user-account a[data-activates='profile-dropdown']").html(data[0][1]);
			});
		},  
		accountLevel: function(){
			var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?get-account',"");
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

			var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?get-assoc-yearLevel',"");
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
					var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?set-studentInfo',studentInfo);
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
			var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?get-students',"");
			data.success(function(data){
		        localStorage.setItem('k12_studentList',data);
				var data = JSON.parse(data);
				// console.log(data);
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
                            	var details = '<img alt="image" src="../assets/img/'+full['info']['picture']+'">';
                                return details;
                            }
                        },
                        {data: "",
                            render: function ( data, type, full ){
                            	var details = "NAME: "+full['info']['family_name']+" "+full['info']['given_name']+", "+full['info']['middle_name']+"<br/>Student ID: "+full['info']['student_id'];
                                return details;
                            }
                        },
                        {data: "",
                            render: function ( data, type, full ){
                            	var info = JSON.stringify(full);
                            	var details = "<a href='#cmd=index;content=student-info;id="+full['info']['student_id']+"' data-cmd='show-info' data-info='"+info+"' class='btn blue tooltipped' data-tooltip='More details' data-position='left' type='button'>"+
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
            var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            var months = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];
	        var data = localStorage.getItem('k12_studentList'),info = window.location.href.split(';');
			var data = JSON.parse(data);
			var now = new Date();
	        info = info[2].split('=');
			var snapshot = Defiant.getSnapshot(data);

			var result = JSON.search(data,'//info[student_id="'+info[1]+'"]');
			var result2 = JSON.search(data,'//educ[student_id="'+info[1]+'"]');

			console.log(result2);

			var birthdate = new Date(result[0]["date_of_birth"]);
        	$('#_studentAvatar').prop('src',"../assets/img/"+result[0]["picture"]);
        	$('#_studentName').html(result[0]["family_name"]+", "+result[0]["given_name"]+" "+result[0]["middle_name"]);
        	$('#_studentID').html(result[0]["student_id"]);
        	$('#_studentYear').html(result2[0]["year"]);
        	$('#_studentSection').html(result2[0]["section"]);

        	var content = "<div class='col s12'>"+
						"	<ul class='collection z-depth-1'>"+
						"		<li class='collection-item'><strong>Gender:</strong> "+result[0]["gender"]+"</li>"+
						"		<li class='collection-item'><strong>Citizenship:</strong> "+result[0]["citizenship"]+"</li>"+
						"		<li class='collection-item'><strong>Weight:</strong> "+result[0]["weight"]+"kgs</li>"+
						"		<li class='collection-item'><strong>Height:</strong> "+result[0]["height"]+"cm</li>"+
						"		<li class='collection-item'><strong>Permanent address:</strong> "+result[0]["permanent_address"]+"</li>"+
						"		<li class='collection-item'><strong>Place of birth:</strong> "+result[0]["place_of_birth"]+"</li>"+
						"		<li class='collection-item'><strong>Date of birth:</strong> "+months[birthdate.getMonth()]+" "+birthdate.getDate()+", "+birthdate.getFullYear()+"</li>"+
						"		<li class='collection-item'><strong>Age:</strong> "+(now.getFullYear()-birthdate.getFullYear())+"</li>"+
						"		<li class='collection-item'><strong>Name of father:</strong> "+result[0]["father_name"]+"</li>"+
						"		<li class='collection-item'><strong>Name of mother:</strong> "+result[0]["mother_name"]+"</li>"+
						"	</ul>"+
						"</div>";
        	$('#disply_studentInfo').html(content);        	

			$('.tooltipped').tooltip({delay: 50});
		},
		add_yearLevel:function(){
			var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?set-yearLevel',"");
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
			var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?get-schoolInfo',"");
            var months = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];
			data.success(function(data){
				data = JSON.parse(data);
				console.log(data);
				if(data.length>0){
					// show details
					var details = JSON.parse(data[0][7]);

					if(details[0] != ''){
						$("#_schoolLogo").attr({src:'../assets/img/'+details[0]});
					}

					if(details[1] != ''){
						$("#_schoolBanner").attr({src:'../assets/img/'+details[1]});
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

					$("#field_schoolName").val(data[0][1]);
					$("#field_schoolAddress").val(details[2]);
					$("#field_schoolID").val(data[0][2]);
					$("#field_schoolStart").val(data[0][3]);
					$("#field_schoolEnd").val(data[0][4]);
					$("#field_region").val(data[0][5]);
					$("#field_division").val(data[0][6]);
				}
				else{
					$("#field_schoolDetails").removeClass("hidden");
					$("#display_schoolDetails").addClass("hidden");
				}
			});

			$("input[name='field_schoolStart']").datepicker( {
			    format: "mm-yyyy",
			    startView: "months", 
			    minViewMode: "months",
			});
			$("input[name='field_schoolEnd']").datepicker( {
			    format: "mm-yyyy",
			    startView: "months", 
			    minViewMode: "months",
			});

		    $("#form_schoolInfo").validate({
		        rules: {
		            field_schoolName: {required: true,minlength: 5,maxlength: 100},
		            field_schoolAddress: {required: true,minlength: 5},
		            field_schoolStart: {required: true,dateRange:['field_schoolStart','field_schoolEnd']},
		            field_schoolEnd: {required: true,dateRange:['field_schoolStart','field_schoolEnd']},
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
					var form = $(form).serializeArray();
					var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?set-schoolInfo',form);
					data.success(function(data){
						console.log(data);
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
		            field_schoolStart: {required: true,dateRange:['field_schoolStart','field_schoolEnd']},
		            field_schoolEnd: {required: true,dateRange:['field_schoolStart','field_schoolEnd']},
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
					var form = $(form).serializeArray();
					var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?set-schoolInfo',form);
					data.success(function(data){
						console.log(data);
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
						var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?set-section',sectionInfo);
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
				var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?delete-section',[data.node]);
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
						var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?set-subject',form);
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
						var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?set-sublevelsubject',subjectInfo);
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
					var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?delete-subject',[_data.key,_data.node]);
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
					var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?delete-sublevelsubject',[_data.key,_data.node]);
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
			var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?get-yearLevel',"");
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
		controls_gradingSheet:function(){
			var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?get-assoc-yearLevel',"");
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
					account.get_grade(JSON.stringify(form));
					account.get_student(JSON.stringify(form));
			      	account.get_subjectDetails(JSON.stringify(form));
					window.location.href = '#cmd=index;content=grading-sheet';
		        }
			});
		},
		add_grade:function(students,controls){
			var content = "";
			var quarter = "", year = controls[0]['value'], section = controls[1]['value'], subject = controls[2]['value'];
			var subsubject = (controls.length>4) ? controls[4]['value'] : "";
			$("a[data-cmd='add-grade']").click(function(){
				var data_node = $(this).data('node'); content = "";
				quarter = $(this).data('quarter');
				console.log(quarter);
				content += "<tr><td colspan='3'>Male</td></tr>";

				var gender = [JSON.search(students, '//*[gender="Male"]'),JSON.search(students, '//*[gender="Female"]')];
				$.each(gender[0],function(i,v){
					content += "<tr>"+
								"	<td width='5px'>"+(i+1)+". </td>"+
								"	<td width='300px'>"+v['family_name']+" "+v['given_name']+", "+v['middle_name']+"</td>"+
								"	<td>"+
								"		<div class=''>"+
								"			<div class='input-field'>"+
								"				<input type='text' placeholder='Score' class='field_grade' name='"+v['student_id']+"'>"+
								"			</div>"+
								"		</div>"+
								"	</td>"+
								"</tr>";
				});
				content += "<tr><td colspan='3'><br/>Female</td></tr>";
				var _grades = "", _headers = "";
				$.each(gender[1],function(i,v){
					console.log(v);
					content += "<tr>"+
								"	<td width='5px'>"+(i+1)+". </td>"+
								"	<td width='300px'>"+v['family_name']+" "+v['given_name']+", "+v['middle_name']+"</td>"+
								"	<td>"+
								"		<div class=''>"+
								"			<div class='input-field'>"+
								"				<input type='text' placeholder='Score' class='field_grade' name='"+v['student_id']+"'>"+
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
						"				<select class='browser-default' name='field_component'>"+
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
							var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?set-grade',form);
							data.success(function(data){							
								if(data == 1){
									account.get_grade(JSON.stringify(controls));
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
			        }
				});

				$(".close-modal").click(function(){
					$(".bottom-sheet").closeModal();
				});
			});
		},
		get_grade:function(controls){
			var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?get-grade',controls);
			data.success(function(data){		
				// console.log(data);				
				localStorage.setItem("grades_gradeSheetQuarter",data);
			});
		},
		get_gradeSummary:function(controls){
			var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?get-gradeSummary',controls);
			data.success(function(data){		
				console.log(data);				
				// localStorage.setItem("grades_gradeSheetQuarter",data);
			});
		},
		get_student:function(controls){
			var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?get-studentsGradeSheet',controls);
			data.success(function(data){
				// console.log(data);
				data = JSON.parse(data);
		        localStorage.setItem('students_gradingSheet',JSON.stringify(data));
			});
		},
		get_subjectDetails:function(controls){
			var data = system.get_ajax('http://apparato.net/systems/harmony/Process.php?get-subjectDetails',controls);
			data.success(function(data){
				data = JSON.parse(data);
		        localStorage.setItem('subject_gradingSheet',JSON.stringify(data));
			});
		},
		list_gradingSheet:function(){
			$("#display_studentList").html(system.preloader(200));
	        var data_controls = JSON.parse(localStorage.getItem('controls_gradingSheet'));
	        var data_students = JSON.parse(localStorage.getItem('students_gradingSheet'));
	        var data_grades = JSON.parse(localStorage.getItem('grades_gradeSheet'));
	        var data_gradesAll = JSON.parse(localStorage.getItem('grades_gradeSheetQuarter'));
	        var data_subject = JSON.parse(localStorage.getItem('subject_gradingSheet'));
	        var content = "",_content = "", content_finalGrade = "";
    		var components = ['Written Works','Performance Task','Quarterly Assessment'];
	        data_subject = JSON.parse(data_subject[0][6]);

			var colors = ['teal lighten-5','green lighten-5','blue lighten-5'];
			var ps = 100;
			var ws = [data_subject[1],data_subject[0],data_subject[2]];
			var gender = [{"male":JSON.search(data_students, '//*[gender="Male"]'),"female":JSON.search(data_students, '//*[gender="Female"]')}];

			var allContent = "",tabs = "",tabContent = "", initialGrade = 0, finalGrade = [], finalGrade_student = [], totalGrade = 0;
	        $.each(data_gradesAll,function(index_grade,value_grade){
	        	var content = "" ; 
				$.each(gender[0],function(index_gender,value_gender){
					var sub_tabContent = "", sub_content = "", grades = "", headers = "";
					$.each(value_gender,function(index_genderInner,value_genderInner){
						var sub_columnContent = "", sub_headers = "", highScore = "",summaryTabContent = "";
						initialGrade = 0;
						$.each(value_grade,function(index_grade2,value_grade2){
							var totalScore = 0, totalHighScore = 0;
							if(value_grade2.length>0){
								$.each(value_grade2,function(index_grade3,value_grade3){
									grades = JSON.parse(value_grade3[2]);
									var search = JSON.search(grades, '//*[id="'+value_genderInner['student_id']+'"]/score');
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
						summaryTabContent += "<td center-align'>"+grade.search(parseFloat(initialGrade).toFixed(2),grade.table())[0]['value']+"</td>";
						finalGrade.push({student_id:value_genderInner['student_id'],quarter:index_grade,score:grade.search(parseFloat(initialGrade).toFixed(2),grade.table())[0]['value']});

						headers = "<tr>"+
									"	<th class=' center-align'></th>"+
										sub_headers+
									"</tr>"+
									"<tr>"+
									"	<th class=' center-align'>Highest Score Posible</th>"+
										highScore+
									"	<th class=' blue lighten-3 center-align'>"+ps+"</th>"+
									"	<th class=' blue lighten-2 center-align'>"+ps+"</th>"+
									"</tr>";
						sub_content += "<tr>"+
										"	<td>"+value_genderInner['family_name']+" "+value_genderInner['given_name']+", "+value_genderInner['middle_name']+"</td>"+
										sub_columnContent+
										"<td class=' center-align blue lighten-3'>"+parseFloat(initialGrade).toFixed(2)+"</td>"+
										"<td class=' center-align blue lighten-2'>"+grade.search(parseFloat(initialGrade).toFixed(2),grade.table())[0]['value']+"</td>"+
										"</tr>";
					});

					content += "<br/><br/><div class='divider'></div><br/><br/>"+
								"<table id='' class='"+(index_gender.replace(' ',''))+"_listStudent display dataTable'>"+
		 						"    <thead>"+
		 						"        <tr>"+
								"            <th width='150px;'></th>"+
								"            <th colspan='"+(value_grade[0].length+3)+"' class='center-align "+colors[0]+"'>Written Works</th>"+
								"            <th colspan='"+(value_grade[1].length+3)+"' class='center-align "+colors[1]+"'>Performance Task</th>"+
								"            <th colspan='"+(value_grade[2].length+3)+"' class='center-align "+colors[2]+"'>Quarterly Assessment</th>"+
								"			 <th class='center-align blue lighten-3' rowspan='2'>Initial Grade</th>"+
								"			 <th class='center-align blue lighten-2' rowspan='2'>Quarterly Grade</th>"+
								"        </tr>"+
										 headers+
		 						"    </thead>"+
		 						"    <tbody>"+
										sub_content+
		 						"    </tbody>"+
								"</table>";

				});

				//loop here. test the finalgrade
				tabs += "<li class='tab col s3'><a href='#"+(index_grade.replace(' ',''))+"' class=''>"+index_grade+"</a></li>";
				tabContent += "<div id='"+(index_grade.replace(' ',''))+"' class='col s12'>"+
								"<blockquote>"+
			   					"<table class=''>"+
		 						"	<tr>"+
								"	    <td>Year: "+data_controls[0]['value']+"</td>"+
								"	    <td>Section: "+data_controls[1]['value']+"</td>"+
								"	    <td>Subject: "+data_controls[2]['value']+"</td>"+
								"	    <td><a data-cmd='add-grade' data-quarter='"+(index_grade)+"' class='white-text btn-flat blue right waves-effect'>Add Grade</a></td>"+
								"	</tr>"+
								"</table>"+
			   					"</blockquote>"+
								content+
								"</div>";
	        });

			var sub_content = "", headers = ""; content = "";
			$.each(gender[0],function(index_gender,value_gender){
				sub_content = "";
				$.each(value_gender,function(index_gender2,value_gender2){
					var sub_columnContent = "", sub_headers = "", _finalgrade = 0;
					var grades = JSON.search(finalGrade,'//*[student_id="'+value_gender2['student_id']+'"]');
					$.each(grades,function(index_grade,value_grade){
						sub_headers += "<th class=' center-align'>"+value_grade['quarter']+"</th>";
						sub_columnContent += "<td class='center-align'>"+value_grade['score']+"</td>";
						_finalgrade = _finalgrade + value_grade['score'];
					});

					headers = "<tr>"+
								"	<th width='150px;' class=' center-align'></th>"+
									sub_headers+
								"	<th class=' center-align blue lighten-2'>Final Grade</th>"+
								"</tr>";

					sub_content += "<tr>"+
									"	<td width='150px;'>"+value_gender2['family_name']+" "+value_gender2['given_name']+", "+value_gender2['middle_name']+"</td>"+
										sub_columnContent+
									"	<td class=' center-align blue lighten-2'>"+system.getRealNumber(_finalgrade/4)+"</td>"+
									"</tr>";
				});

				content += "<br/><br/><div class='divider'></div><br/><br/>"+
							"<table id='' class='"+(index_gender.replace(' ',''))+"_finalGrade display dataTable'>"+
	 						"    <thead>"+
									 headers+
	 						"    </thead>"+
	 						"    <tbody>"+
									sub_content+
	 						"    </tbody>"+
							"</table>";

			});

        	allContent += "<div class='row'>"+
					"	<div class='col s12'>"+
					"		<ul class='tabs tab-demo z-depth-1' style='width: 100%;'>"+tabs+
					"		<li class='tab col s3'><a href='#finalGrade' class=''>Final Grade</a></li>"+
					"		</ul>"+
					"	</div>"+
					"	<div class='col s12'>"+tabContent+
					"		<div id='finalGrade' class='col s12'>"+
								content+
					"		</div>"+
					"	</div>"+
					"</div>";

			$('#display_studentList').html(allContent);
 
			$("ul.tabs").tabs();

            $('.male_listStudent').DataTable({"order": [[ 0, "asc" ]],iDisplayLength: -1,bLengthChange: false,paging: false,});
            $('.female_listStudent').DataTable({"order": [[ 0, "asc" ]],iDisplayLength: -1,bLengthChange: false,paging: false,});

            $("table.male_listStudent").parents(".dataTables_wrapper").find('div.s6:nth-child(1)').html("<h5><br/>Male Students</h5>");
            $("table.female_listStudent").parents(".dataTables_wrapper").find('div.s6:nth-child(1)').html("<h5><br/>Female Students</h5>");


            $('.male_finalGrade').DataTable({"order": [[ 0, "asc" ]],iDisplayLength: -1,bLengthChange: false,paging: false,});
            $('.female_finalGrade').DataTable({"order": [[ 0, "asc" ]],iDisplayLength: -1,bLengthChange: false,paging: false,});

            $("table.male_finalGrade").parents(".dataTables_wrapper").find('div.s6:nth-child(1)').html("<h5><br/>Male Students</h5>");
            $("table.female_finalGrade").parents(".dataTables_wrapper").find('div.s6:nth-child(1)').html("<h5><br/>Female Students</h5>");
			this.add_grade(data_students,data_controls);
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
						$(placement).append(error)
					} 
					else{
						error.insertAfter(element);
					}
				},
				submitHandler: function (form) {
					var form = $(form).serializeArray();
					account.get_gradeSummary(JSON.stringify(form));
		        }
		    });
		},
		get_gradingSheet:function(){
			// create a function that can return the final grade per subject.
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
