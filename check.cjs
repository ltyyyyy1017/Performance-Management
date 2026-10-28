const vm=require('vm'),fs=require('fs'),assert=require('assert');let els={};const el=s=>els[s]??={value:s==='#month'?'2026-10':'',innerHTML:'',children:[],insertAdjacentHTML(){},classList:{toggle(){}},showModal(){throw Error('unexpected modal')}};let ctx={document:{querySelector:el},localStorage:{getItem(){return null},setItem(){}},crypto:require('crypto').webcrypto,alert(){},console};vm.createContext(ctx);vm.runInContext(fs.readFileSync('dist/app.js','utf8'),ctx);
vm.runInContext(`role='staff1';render();if(results().length!==4)throw Error('scope count');if(results().some(m=>!['宣传部','公关部'].includes(m.dept)))throw Error('report leak');for(const p of ['工作台','自由项项目','固定项收集','绩效报表','成员与权限']){page=p;render();if(document.querySelector('#app').innerHTML.includes('林嘉怡'))throw Error('person leak '+p)}taskId='t1';verify('m0');db.operators.find(o=>o.id==='staff1').departments=[];if(results().length)throw Error('revoke failed');role='chief';if(results().length!==10)throw Error('chief scope');console.log('PASS: five pages, scoped reports, forbidden write, revocation, chief access');`,ctx);
assert(!els['#nav'].innerHTML.includes('核对与审核'));assert(!els['#nav'].innerHTML.includes('考核设置'));
let closed=0;el('#modal').showModal=()=>{};el('#modal').close=()=>closed++;
vm.runInContext("modal('取消回归','',()=>{throw Error('取消不应保存')});",ctx);
assert(els['#modal'].innerHTML.includes('onclick="closeModal()"'));
vm.runInContext('closeModal()',ctx);assert.equal(closed,1);
console.log('PASS: cancel closes dialog without invoking save');

