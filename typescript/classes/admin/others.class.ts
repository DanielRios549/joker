/* 
 ***************************************************************
 | Copyright (c) 2014-2015 Atomo.com. All rights reserved.
 | @ Author	: Daniel Rios.
 ***************************************************************
*/

export class AdminOthers {
    //Show the advanced options

	advancedOptions(button:string, show:string):void {
		$(button).on("click", ".searchAdvancedClose", function() {
			$(this).removeClass("searchAdvancedClose").addClass("searchAdvancedOpen");
			$(show).removeClass("advancedSearchHide").addClass("advancedSearchShow");
		});
		
		$(button).on("click", ".searchAdvancedOpen", function() {
			$(this).removeClass("searchAdvancedOpen").addClass("searchAdvancedClose");
			$(show).removeClass("advancedSearchShow").addClass("advancedSearchHide");
		});
	}

	//Upload

	showSelectedFile(div:string):void {
		$(div).on('change', '.inputImage', function() {
			var $this = $(this);
			var files = $this.prop('files');
			var fileReader = new FileReader();

			fileReader.addEventListener('load', function() {
				var imageSelected = fileReader.result;
				$this.next('.fileInputLabel').removeClass('fileInputLabel').addClass('selectedInputLabel');
				$this.next('.selectedInputLabel').find('img').attr('src', imageSelected);
			});

			fileReader.readAsDataURL(files[0]);
		})
		.on('change', '.inputVideo', function() {
			var $this = $(this);
			var files = $this.prop('files');
			var fileReader = new FileReader();
			
			var blob = new Blob([files[0]], {type: files.type});
			var video = document.getElementById("selectedVideo");
			var url = (URL || webkitURL).createObjectURL(blob);

			video.src = url;
			fileReader.readAsArrayBuffer(files[0]);
		});
	}
}