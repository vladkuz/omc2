// resources
var imageResource = function (imageUrl) {
	this._image = null;
	this.getImage = function () {
		if ( this._image === null ) {
			console.log('image ' + this.url + ' has not been loaded yet.');
			return;
		}
		return this._image;
	}
	
	this.url = imageUrl;
	this.load = function (onafterload) {
		var img = new Image();
		img.onload = function () {
			onafterload();
		}
		img.src = this.url;
		this._image = img;
	}
};


var resources = function () {
	
	this.items = [
			 new imageResource('assets/1onemorecupcake.png'),
			 new imageResource('assets/2onemorecupcake.png'),
			 new imageResource('assets/3onemorecupcake.png'),
			 new imageResource('assets/4onemorecupcake.png'),
			 new imageResource('assets/5onemorecupcake.png'),
			 new imageResource('assets/6onemorecupcake.png'),
			 new imageResource('assets/7onemorecupcake.png'),
			 new imageResource('assets/8onemorecupcake.png'),
			 new imageResource('assets/9onemorecupcake.png'),
			 new imageResource('assets/10onemorecupcake.png'),
			 new imageResource('assets/11onemorecupcake.png'),
			 new imageResource('assets/12onemorecupcake.png'),
			 new imageResource('assets/13onemorecupcake.png'),
			 new imageResource('assets/14onemorecupcake.png'),
			 new imageResource('assets/15onemorecupcake.png')
			 ];
	
	this.load = function (onloadprogress, onafterload) {
		
		if ( this.items.length === 0 ) {
			if ( typeof onloadprogress === 'function') {
				onloadprogress(100);
			}
			if ( typeof onafterload === 'function') {
				onafterload();
			}
			return;
		}
		
		var 
			that = this,
			itemsTotal = this.items.length,
			progressCounter = 0;
			
		for(var i=0;i<itemsTotal;i+=1) {
			
			this.items[i].load( function () {
				progressCounter += 1;
				onloadprogress( (progressCounter * 100 )/itemsTotal );
				if ( progressCounter === itemsTotal ) {
					onafterload();		  
				}
			});
		}
		
	}
};

