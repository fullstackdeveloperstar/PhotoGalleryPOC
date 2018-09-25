window.URL = window.URL || window.webkitURL;
var input_images_choose = $("#input-images-choose");
var div_gallery_container = $("#div-gallery-container");
var form_selet_image = $("#form-selet-image");
var gallery = {
	images: []
};

function selectIMG(files) {
	if (!files.length) {
	    // alert('No file selected');
	    return;
	}

	for (var i = 0; i < files.length; i++) {
      	var item = $("<div class='photo-item'></div>");

      	div_gallery_container.append(item);
      	var img = document.createElement("img");
      	img.height = 90;
      	img.width = 90;
		img.src = window.URL.createObjectURL(files[i]);
  		img.onload = function() {
	      window.URL.revokeObjectURL(this.src);
	    }
	    item.append(img);
	    var info = document.createElement("span");
	    info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
	    item.append(info);

	    item.data('rotation', 0);

	    gallery.images.push({
	    	id: gallery.images.length,
	    	filename: files[i].name,
	    	cover: true,
	    	mustSee: true,
	    	rotation: 0
	    });

	    console.log(gallery);
  	}

  	document.getElementById("form-selet-image").reset();
}