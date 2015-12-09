/**
 * jnsdrop.js
 * Author: @JoHauns
 * 
 */

(function($){
 
	$(document).ready(function() {

		if(jimdoData.isCMS) {

			var dz = $('<div id="ddup"><div id="ddup-label">Layout Upload</div><div id="ddup-log"></div></div>');


			$('body').append(dz);
			var obj = $("#ddup");
														 
			obj.on('dragenter', function (e)
			{
					e.stopPropagation();
					e.preventDefault();
					
					$(this).addClass('over');
					
			});
			obj.on('dragover', function (e)
			{
					 e.stopPropagation();
					 e.preventDefault();
			});

			obj.on('drop', function (e)
			{
					e.preventDefault();
					var files = e.originalEvent.dataTransfer.files;
					handleFileUpload(files,obj);
					
					$(this).removeClass('over');
			});
					
			obj.on('click', function(e) {

					$(this).toggleClass('expand');
			});

			$('#ddup-log', obj).on('click', function(e) {

				e.stopPropagation();
				e.preventDefault();
				
			});
					
			$(document).on('dragenter', function (e)
			{
					e.stopPropagation();
					e.preventDefault();
					
					obj.addClass('expand');
			});

			$(document).on('dragover', function (e)
			{
				e.stopPropagation();
				e.preventDefault();
			});

			function handleFileUpload(files,obj)
			{
				 for (var i = 0; i < files.length; i++)
				 {
						$('#ddup-log').append('<p class="ddup-item" data-name="'+files[i].name+'">' + files[i].name + '</p>');
						
							var fd = new FormData();
							fd.append('templateFile', files[i]);
			 
							sendFileToServer(fd, files[i].name);
			 
				 }
			}
														 

			function sendFileToServer(fd, name) {

				$.ajax({
					url: "/app/siteadmin/layout/apiupload",
					data: fd,
					cache: false,
					contentType: false,
					processData: false,
					type: 'POST',
					success: function (data) {
						var hlp = $('<div><\/div>');
						hlp.html(data);
						var text = JSON.parse($('textarea', hlp).val());
						
						var item = $('.ddup-item[data-name="'+name+'"]');
						
						item.addClass(text.status);
						
						if(text.status == "success")
							setTimeout(function() {item.fadeOut(600, function() {
								item.remove();
							})}, 5000);
						else
							item.attr('title', text.errors['templateFile']);
						
					}
				});


			}
		}
	});

})(jQuery);
