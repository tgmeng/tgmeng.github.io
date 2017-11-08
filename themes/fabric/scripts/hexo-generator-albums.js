hexo.extend.generator.register('albums', locals => {
    const albums = locals.pages.filter((page) => page.layout === 'post-album').sort('-date');
    return {
        path: 'albums/index.html',
        data: { albums: albums.data, haha: true },
        layout: [ 'albums' ]
    };
});

// 简易提取 layout image 中图片链接
const ptrnImg = /<img\s+src="([^\"]*)"[^>]*?>/g;
const ptrnAlt = /alt="([^"]*)"/;
const ptrnStripQuery = /\?.*$/;
const ptrnBasename = /.*\//;
hexo.extend.filter.register('after_post_render', data => {
    if (data.layout === 'post-album') {
        let r;
        const images = [];
        const { content } = data;
        while((r = ptrnImg.exec(content)) !== null) {
            // 删除 query 信息
            const url = r[1].replace(ptrnStripQuery, '');
            if(url.trim().length === 0) {
                continue;
            }

            let alt = null;
            let r2 = r[0].match(ptrnAlt);
            if (r2) {
                alt = r2[1];
            }
            images.push({ url, alt });
        }
        data.extractedImages = images;
    }
    return data;
});

hexo.extend.tag.register('my_qiniu_image', ([src, alt = src.replace(ptrnStripQuery, '').replace(ptrnBasename, ''), title = alt]) => {
    const attrs = { alt, title, id: alt };

    const { config } = hexo.theme;
    const base = config['my_qiniu_image_base'] || '';
    const style = config['my_qiniu_image_style'] || '';

    const url = `${base}/${src}` + (style ? `?${style}` : '');
    const tpl = `img(src="${url}")&attributes(${JSON.stringify(attrs)})`;

    return hexo.render.renderSync({ text: tpl, engine: 'jade' });
});
