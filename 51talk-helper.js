function fire() {
	var tIds = []
    $('a[href]').each(function(index, el) {
        var el = $(el);
        if (el.find('img').length == 0) {
            // return;
        }
        var matched = el.attr('href').match(/teacher\/info\/t/);//返回数组
        if (matched == null) {
            return;
        }
        var tId = matched['input'].substr(matched['index']);
        if (tId.indexOf('?')>-1) {    
            tId = tId.substr(0, tId.indexOf('?'));
        }
        tId = tId.substr(tId.indexOf('/t')+2);
        tIds.push(tId);
    });
    // console.log(tIds);
    tIds = tIds.filter( function(value, index, self) { 
	    return self.indexOf(value) === index;
	} );
    // console.log(tIds);
    loadTeacherInfo(tIds);
}

function loadTeacherInfo(tIds){
	var teachedId = tIds.shift();
    $.get('/teacher/info/'+teachedId, function(data) {
        var markup = data.substr(data.indexOf('人收藏')-10, 16);
        markup = markup.substr(markup.indexOf('>')+1);
        markup = markup.substr(0, markup.indexOf('人'));
        // console.log(teachedId, markup)
	    $('a[href]').each(function(index, el) {
        	var el = $(el);
	    	if (el.attr('href').indexOf('/teacher/info/t'+teachedId)>-1 && el.find('img').length>0) {
	    		el.prepend('<span class="teacher-info">'+markup+'</span>');
	    	}
	    });
        if(tIds.length>0){
        	setTimeout(function(){
			    loadTeacherInfo(tIds);
        	}, 100)
        }
    });
}

if (self.location.href.indexOf('http://www.51talk.com') == 0) {
    $('body').append(`
        <style>
            .teacher-info{
                font-size:11px;
                position:absolute;
                z-index:999;
                background:#fff;
                padding:1px;
                border-radius:4px;
                line-height:initial;
            }
        </style>
    `);
    fire();
}