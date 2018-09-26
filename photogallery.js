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
      	var att_id = document.createAttribute("data-id");
		att_id.value = gallery.images.length; 
		img.setAttributeNode(att_id);  
		img.src = window.URL.createObjectURL(files[i]);
  		img.onload = function() {
	      window.URL.revokeObjectURL(this.src);
	    }
	    item.append(img);
	    var info = document.createElement("span");
	    info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
	    item.append(info);

	    // select for rotation
	    var rotation = $(`
	    	<p><label>Rotation: </label>
	    	<select class="select-rotation" data-id="`+gallery.images.length+`">
	    		<option value='0'>0</option>
	    		<option value='90'>90</option>
	    		<option value='180'>180</option>
	    		<option value='270'>270</option>
	    		</select>
	    	</p>
	    `);

	    item.append(rotation);
	    item.data('rotation', 0);

	    // must see
	    var mustsee = $(`
	    	<p>
	    		<label>Must See: </label>
	    		<input type="checkbox" class="checkbox-must-see" data-id="`+gallery.images.length+`">
	    	</p>
	    `);
	    item.append(mustsee);

	    // cover
	    var cover = $(`
	    	<div>
		    	<p>
		    		<label>Cover: </label>
		    		
		    	</p>
		    	<p>
		    		<input type="radio" name="cover`+gallery.images.length+`" value="cover"> Cover
		    	</p>
		    	<p>
	  				<input type="radio" name="cover`+gallery.images.length+`" value="contain"> Contain
		    	</p>
	    	</div>
	    `);

	    item.append(cover);

	    gallery.images.push({
	    	id: gallery.images.length,
	    	filename: files[i].name,
	    	cover: true,
	    	mustSee: true,
	    	rotation: "0"
	    });

  	}

  	document.getElementById("form-selet-image").reset();
}

$(document).on('change', '.select-rotation', function(){
	var rotate_val = $(this).val();
	var item_id = $(this).data('id');
	
	var img = $("img[data-id='"+item_id+"']");
	img.css('transform', 'rotate(' + rotate_val + 'deg)');
	img.css('-ms-transform', 'rotate(' + rotate_val + 'deg)');
	img.css('-webkit-transform', 'rotate(' + rotate_val + 'deg)');

	gallery.images.map(item => {
		if(item.id == item_id) {
			item.rotation = rotate_val;
		}
	});
});

