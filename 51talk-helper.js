function fire() {
    $('.teacher').each(function(index, el) {
        var el = $(el);
        // console.log(el.data('id'));
        $.get('/teacher/info/'+el.data('id'), function(data) {
            var markup = data.substr(data.indexOf('人收藏')-10, 16);
            markup = markup.substr(markup.indexOf('>')+1);
            markup = markup.substr(0, markup.indexOf('人'));
            console.log(markup);
            el.find('a:eq(0)').prepend('<span style="font-size:11px;position:absolute;z-index:999;right:0;">'+markup+'</span>');
        });
    });
}

if (self.location.href.indexOf('http://www.51talk.com/reserve') == 0) {
    fire();
}