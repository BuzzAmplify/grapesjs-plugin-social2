import grapesjs from 'grapesjs';

const stopPropagation = e => e.stopPropagation();

export default grapesjs.plugins.add('gjs-plugin-social', (editor, opts = {}) => {

  const bm = editor.BlockManager;

  bm.add('socialgroup', {
    label: 'Social Group',
    content: `
    <div data-gjs-type="groupsocial" class="groupsocial" mode="horizontal">
    <div class="div_group" style="margin:0 auto; display:flex; padding:5px; pointer-events: none;" data-gjs-hoverable="false" data-gjs-highlightable="false">
    
    <div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: rgb(59, 89, 152) none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
    <a href="#" target="_blank" style="pointer-events: none;">
      <img src="https://www.mailjet.com/images/theme/v1/icons/ico-social/facebook.png" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
    </a>
    </div>

    <div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: rgb(220, 78, 65) none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
    <a href="#" target="_blank" style="pointer-events: none;">
      <img src="https://www.mailjet.com/images/theme/v1/icons/ico-social/google-plus.png" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
    </a>
    </div>

    <div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: rgb(85, 172, 238) none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
    <a href="#" target="_blank" style="pointer-events: none;">
      <img src="https://www.mailjet.com/images/theme/v1/icons/ico-social/twitter.png" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
    </a>
    </div>

    </div>
    </div>`,
    attributes: { class: 'fa fa-share-alt' },
    category: 'Basic',
  });

  bm.add('socialelement', {
    label: 'Social Element',
    content: `<div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: rgb(59, 89, 152) none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
    <a href="#" target="_blank" style="pointer-events: none;">
      <img src="https://www.mailjet.com/images/theme/v1/icons/ico-social/facebook.png" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
    </a>
    </div>`,
    attributes: { class: 'fa fa-share-alt' },
    category: 'Basic',
  });

  const dc = editor.DomComponents;
  
  dc.addType('groupsocial', {
   // isComponent: isComponentType(type),

   isComponent(el) {
      let match = false;
      if (el && el.classList) {
          el.classList.forEach(function (klass) {
              if (klass == "groupsocial") {
                  match = true;
              }
          });
      }
      if (match) return { type: 'groupsocial' };
    },

    model: {
      defaults: {
        name: 'Social Group',
        resizable: {
                    tl: 0,
                    tc: 0,
                    tr: 0,
                    cl: 1,
                    cr: 1,
                    bl: 0,
                    bc: 0,
                    br: 0
        },
        tagName: 'div',
        attributes: {
          style: 'display: flex;',
        },
        'mode': 'horizontal',
        traits: [
          {
            type: 'select',
            label: 'Mode',
            name: 'mode',
            changeProp: 1,
            options: [
              { value: 'horizontal', name: 'Horizontal' },
              { value: 'vertical', name: 'Vertical' },
            ]
          }
        ],
      },
      init() {
        this.on('change:mode', this.updateMode);

       },
       updateMode(){
        const mode = this.get('mode');

        if(mode == 'horizontal'){
          editor.addStyle(`#` + this.ccid + ` div { display:flex; !important }`);
        }else{
          editor.addStyle(`#` + this.ccid + ` div { display:block; !important }`);
        }
       }
    },
  });

  dc.addType('elemntsocial', {
    // isComponent: isComponentType(type),
 
    isComponent(el) {
       let match = false;
       if (el && el.classList) {
           el.classList.forEach(function (klass) {
               if (klass == "elemntsocial") {
                   match = true;
               }
           });
       }
       if (match) return { type: 'elemntsocial' };
     },
 
     model: {
       defaults: {
         name: 'Social Element',
         tagName: 'div',
         draggable: '.div_group',
         traits: [
          {
            type: 'select',
            label: 'Icon',
            name: 'social',
            changeProp: 1,
            options: [
              { value: 'facebook', name: 'Facebook' },
              { value: 'twitter', name: 'Twitter' },
              { value: 'google', name: 'Google' },
              { value: 'instagram', name: 'Instagram' },
              { value: 'web', name: 'Web' },
              { value: 'youtube', name: 'Youtube' },
              { value: 'pinterest', name: 'Pinterest' },
              { value: 'linkedin', name: 'Linkedin' },
              { value: 'snapchat', name: 'Snapchat' },
              { value: 'vimeo', name: 'Vimeo' },
              { value: 'tumblr', name: 'Tumblr' },
              { value: 'github', name: 'Github' },
              { value: 'soundcloud', name: 'SoundCloud' },
              { value: 'medium', name: 'Medium' },
              { value: 'dribbble', name: 'Dribbble' },
              { value: 'xing', name: 'Xing' },
            ]
          },
          { name: 'src', changeProp: 1 },
          { name: 'href', changeProp: 1 },
        ],
       },
       init() {
        this.on('change:social', this.updateIcon);
        this.on('change:src', this.updateSrc);
        this.on('change:href', this.updateHref);

       },
        updateSrc(){
        const src = this.get('src');
        this.addAttributes({'src':src});
        this.components().models[0].components().models[0].addAttributes({'src':src});
       },
       updateHref(){
        const href = this.get('href');
        this.addAttributes({'href':href});
        this.components().models[0].addAttributes({'href':href});
       }, 
       updateIcon(){
        const social = this.get('social');

        if(social == 'facebook'){
          const href = this.get('href');

          if(href){
            var href_new = href;
          }else{
            var href_new = '#';
          }

          const src = this.get('src');
          if(src){
            var src_new = src;
          }else{
            var src_new = 'https://www.mailjet.com/images/theme/v1/icons/ico-social/facebook.png';
          }

          var color = 'rgb(59, 89, 152)';

          this.parent().append(`<div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: `+color+` none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
          <a href="`+href_new+`" target="_blank" style="pointer-events: none;">
            <img src="`+src_new+`" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
          </a>
          </div>`, {at:this.index()});
          var at = this.index()-1;
          var index = this.parent();

          this.remove();
          editor.select(index.components().models[at]);
        }else if(social == 'twitter'){
          const href = this.get('href');

          if(href){
            var href_new = href;
          }else{
            var href_new = '#';
          }

          const src = this.get('src');
          if(src){
            var src_new = src;
          }else{
            var src_new = 'https://www.mailjet.com/images/theme/v1/icons/ico-social/twitter.png';
          }

          var color = 'rgb(85, 172, 238)';

          this.parent().append(`<div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: `+color+` none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
          <a href="`+href_new+`" target="_blank" style="pointer-events: none;">
            <img src="`+src_new+`" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
          </a>
          </div>`, {at:this.index()});

          var at = this.index()-1;
          var index = this.parent();

          this.remove();
          editor.select(index.components().models[at]);
        }else if(social == 'google'){
          const href = this.get('href');

          if(href){
            var href_new = href;
          }else{
            var href_new = '#';
          }

          const src = this.get('src');
          if(src){
            var src_new = src;
          }else{
            var src_new = 'https://www.mailjet.com/images/theme/v1/icons/ico-social/google-plus.png';
          }

          var color = 'rgb(220, 78, 65)';

          this.parent().append(`<div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: `+color+` none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
          <a href="`+href_new+`" target="_blank" style="pointer-events: none;">
            <img src="`+src_new+`" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
          </a>
          </div>`, {at:this.index()});

          var at = this.index()-1;
          var index = this.parent();

          this.remove();
          editor.select(index.components().models[at]);
        }else if(social == 'instagram'){
          const href = this.get('href');

          if(href){
            var href_new = href;
          }else{
            var href_new = '#';
          }

          const src = this.get('src');
          if(src){
            var src_new = src;
          }else{
            var src_new = 'https://www.mailjet.com/images/theme/v1/icons/ico-social/instagram.png';
          }

          var color = 'rgb(63, 114, 155)';

          this.parent().append(`<div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: `+color+` none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
          <a href="`+href_new+`" target="_blank" style="pointer-events: none;">
            <img src="`+src_new+`" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
          </a>
          </div>`, {at:this.index()});

          var at = this.index()-1;
          var index = this.parent();

          this.remove();
          editor.select(index.components().models[at]);
        }else if(social == 'web'){
          const href = this.get('href');

          if(href){
            var href_new = href;
          }else{
            var href_new = '#';
          }

          const src = this.get('src');
          if(src){
            var src_new = src;
          }else{
            var src_new = 'https://www.mailjet.com/images/theme/v1/icons/ico-social/web.png';
          }

          var color = 'rgb(75, 173, 233)';

          this.parent().append(`<div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: `+color+` none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
          <a href="`+href_new+`" target="_blank" style="pointer-events: none;">
            <img src="`+src_new+`" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
          </a>
          </div>`, {at:this.index()});

          var at = this.index()-1;
          var index = this.parent();

          this.remove();
          editor.select(index.components().models[at]);
        }else if(social == 'youtube'){
          const href = this.get('href');

          if(href){
            var href_new = href;
          }else{
            var href_new = '#';
          }

          const src = this.get('src');
          if(src){
            var src_new = src;
          }else{
            var src_new = 'https://www.mailjet.com/images/theme/v1/icons/ico-social/youtube.png';
          }

          var color = 'rgb(235, 51, 35)';

          this.parent().append(`<div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: `+color+` none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
          <a href="`+href_new+`" target="_blank" style="pointer-events: none;">
            <img src="`+src_new+`" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
          </a>
          </div>`, {at:this.index()});

          var at = this.index()-1;
          var index = this.parent();

          this.remove();
          editor.select(index.components().models[at]);
        }else if(social == 'pinterest'){
          const href = this.get('href');

          if(href){
            var href_new = href;
          }else{
            var href_new = '#';
          }

          const src = this.get('src');
          if(src){
            var src_new = src;
          }else{
            var src_new = 'https://www.mailjet.com/images/theme/v1/icons/ico-social/pinterest.png';
          }

          var color = 'rgb(189, 8, 28)';

          this.parent().append(`<div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: `+color+` none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
          <a href="`+href_new+`" target="_blank" style="pointer-events: none;">
            <img src="`+src_new+`" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
          </a>
          </div>`, {at:this.index()});

          var at = this.index()-1;
          var index = this.parent();

          this.remove();
          editor.select(index.components().models[at]);
        }else if(social == 'linkedin'){
          const href = this.get('href');

          if(href){
            var href_new = href;
          }else{
            var href_new = '#';
          }

          const src = this.get('src');
          if(src){
            var src_new = src;
          }else{
            var src_new = 'https://www.mailjet.com/images/theme/v1/icons/ico-social/linkedin.png';
          }

          var color = 'rgb(0, 119, 181)';

          this.parent().append(`<div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: `+color+` none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
          <a href="`+href_new+`" target="_blank" style="pointer-events: none;">
            <img src="`+src_new+`" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
          </a>
          </div>`, {at:this.index()});

          var at = this.index()-1;
          var index = this.parent();

          this.remove();
          editor.select(index.components().models[at]);
        }else if(social == 'snapchat'){
          const href = this.get('href');

          if(href){
            var href_new = href;
          }else{
            var href_new = '#';
          }

          const src = this.get('src');
          if(src){
            var src_new = src;
          }else{
            var src_new = 'https://www.mailjet.com/images/theme/v1/icons/ico-social/snapchat.png';
          }

          var color = 'rgb(255, 250, 84)';

          this.parent().append(`<div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: `+color+` none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
          <a href="`+href_new+`" target="_blank" style="pointer-events: none;">
            <img src="`+src_new+`" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
          </a>
          </div>`, {at:this.index()});

          var at = this.index()-1;
          var index = this.parent();

          this.remove();
          editor.select(index.components().models[at]);
        }else if(social == 'vimeo'){
          const href = this.get('href');

          if(href){
            var href_new = href;
          }else{
            var href_new = '#';
          }

          const src = this.get('src');
          if(src){
            var src_new = src;
          }else{
            var src_new = 'https://www.mailjet.com/images/theme/v1/icons/ico-social/vimeo.png';
          }

          var color = 'rgb(83, 180, 231)';

          this.parent().append(`<div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: `+color+` none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
          <a href="`+href_new+`" target="_blank" style="pointer-events: none;">
            <img src="`+src_new+`" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
          </a>
          </div>`, {at:this.index()});

          var at = this.index()-1;
          var index = this.parent();

          this.remove();
          editor.select(index.components().models[at]);
        }else if(social == 'tumblr'){
          const href = this.get('href');

          if(href){
            var href_new = href;
          }else{
            var href_new = '#';
          }

          const src = this.get('src');
          if(src){
            var src_new = src;
          }else{
            var src_new = 'https://www.mailjet.com/images/theme/v1/icons/ico-social/tumblr.png';
          }

          var color = 'rgb(52, 67, 86)';

          this.parent().append(`<div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: `+color+` none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
          <a href="`+href_new+`" target="_blank" style="pointer-events: none;">
            <img src="`+src_new+`" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
          </a>
          </div>`, {at:this.index()});

          var at = this.index()-1;
          var index = this.parent();

          this.remove();
          editor.select(index.components().models[at]);
        }else if(social == 'github'){
          const href = this.get('href');

          if(href){
            var href_new = href;
          }else{
            var href_new = '#';
          }

          const src = this.get('src');
          if(src){
            var src_new = src;
          }else{
            var src_new = 'https://www.mailjet.com/images/theme/v1/icons/ico-social/github.png';
          }

          var color = 'rgb(0, 0, 0)';

          this.parent().append(`<div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: `+color+` none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
          <a href="`+href_new+`" target="_blank" style="pointer-events: none;">
            <img src="`+src_new+`" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
          </a>
          </div>`, {at:this.index()});

          var at = this.index()-1;
          var index = this.parent();

          this.remove();
          editor.select(index.components().models[at]);
        }else if(social == 'soundcloud'){
          const href = this.get('href');

          if(href){
            var href_new = href;
          }else{
            var href_new = '#';
          }

          const src = this.get('src');
          if(src){
            var src_new = src;
          }else{
            var src_new = 'https://www.mailjet.com/images/theme/v1/icons/ico-social/soundcloud.png';
          }

          var color = 'rgb(239, 127, 49)';

          this.parent().append(`<div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: `+color+` none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
          <a href="`+href_new+`" target="_blank" style="pointer-events: none;">
            <img src="`+src_new+`" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
          </a>
          </div>`, {at:this.index()});

          var at = this.index()-1;
          var index = this.parent();

          this.remove();
          editor.select(index.components().models[at]);
        }else if(social == 'medium'){
          const href = this.get('href');

          if(href){
            var href_new = href;
          }else{
            var href_new = '#';
          }

          const src = this.get('src');
          if(src){
            var src_new = src;
          }else{
            var src_new = 'https://www.mailjet.com/images/theme/v1/icons/ico-social/medium.png';
          }

          var color = 'rgb(0, 0, 0)';

          this.parent().append(`<div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: `+color+` none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
          <a href="`+href_new+`" target="_blank" style="pointer-events: none;">
            <img src="`+src_new+`" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
          </a>
          </div>`, {at:this.index()});

          var at = this.index()-1;
          var index = this.parent();

          this.remove();
          editor.select(index.components().models[at]);
        }else if(social == 'dribbble'){
          const href = this.get('href');

          if(href){
            var href_new = href;
          }else{
            var href_new = '#';
          }

          const src = this.get('src');
          if(src){
            var src_new = src;
          }else{
            var src_new = 'https://www.mailjet.com/images/theme/v1/icons/ico-social/dribbble.png';
          }

          var color = 'rgb(217, 89, 136)';

          this.parent().append(`<div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: `+color+` none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
          <a href="`+href_new+`" target="_blank" style="pointer-events: none;">
            <img src="`+src_new+`" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
          </a>
          </div>`, {at:this.index()});

          var at = this.index()-1;
          var index = this.parent();

          this.remove();
          editor.select(index.components().models[at]);
        }else if(social == 'xing'){
          const href = this.get('href');

          if(href){
            var href_new = href;
          }else{
            var href_new = '#';
          }

          const src = this.get('src');
          if(src){
            var src_new = src;
          }else{
            var src_new = 'https://www.mailjet.com/images/theme/v1/icons/ico-social/xing.png';
          }

          var color = 'rgb(41, 99, 102)';

          this.parent().append(`<div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: `+color+` none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
          <a href="`+href_new+`" target="_blank" style="pointer-events: none;">
            <img src="`+src_new+`" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
          </a>
          </div>`, {at:this.index()});

          var at = this.index()-1;
          var index = this.parent();

          this.remove();
          editor.select(index.components().models[at]);
        }
        index.components().models[at].addAttributes({'social':social});

       }
     },
   });

});
