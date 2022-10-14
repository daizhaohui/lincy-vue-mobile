import mockjs from 'mockjs';
import home from './home';

mockjs.setup({
    timeout: '200-600'
});
const mocks:any={home};
Object.keys(mocks).forEach((m:any)=>{
    const mock:any = mocks[m];
    if(mock){
      Object.keys(mock).forEach((k:any)=>{
        if(k){
          let type;
          let url;
          const index = k.indexOf(' ');
          if(index>=0){
            type = k.slice(0,index).toLowerCase();
            url = k.slice(index+1);
            if (url.indexOf('regexp:') === 0) {
              url = new RegExp(url.split('regexp:')[1]);
            }
          } else {
            type = 'get';
            url = k;
          }
          if(mock[k] && url){
            mockjs.mock(url,type,mock[k]);
          }
        }
      });
    }
});