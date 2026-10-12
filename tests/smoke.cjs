/* executar: node tests/smoke.cjs */
const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const root=path.join(__dirname,'..');let sandbox={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'js/data.js'),'utf8'),sandbox);let d=sandbox.window.PORCARIA_FAULT_DATA,c=require('../js/core.js');
assert.equal(d.cases.length,72);assert.equal(d.manuals.length,22);assert(d.sources.length>=25);assert(d.catalog.length>=50);
assert.equal(new Set(d.cases.map(x=>x.id)).size,72);
for(const row of d.cases){assert(d.sources.some(s=>s.id===row.source),row.id+' missing source');assert(d.cases.filter(x=>x.anchor===row.anchor).length===3,'3 variants');assert(['input','output','network','speed','physical','calibrate'].includes(row.type));assert(d.items.some(i=>i.id===row.repairPart));assert(row.title&&row.root&&row.inspection&&row.electrical&&row.history);}
let s=c.newSave();assert(s.wallet===2100&&!s.instructor);assert(c.unlocked(d.cases.find(x=>x.chapter===0),s));
for(const row of d.cases){const ses={safe:true,safetyChoice:'protect',scanned:true,tests:['visual','electric','history'],hyp:row.scenario-1,action:'guided'};const r=c.calc(row,ses);assert(r.correctAct&&r.score===100&&r.change>0,row.id+' success');if(row.repairType==='part')assert(r.consume===row.repairPart);let wrong=c.calc(row,{...ses,hyp:(row.scenario)%3,action:'ecm'});assert(wrong.change<0&&wrong.status.includes('prematura'));let bad=c.calc(row,{...ses,safe:false,action:'clear'});assert(bad.change<=-1350);}
assert.equal(c.testCost(s,'electric'),120);s.tools.push('multimetro');assert(c.testCost(s,'electric')<120);
let imp=c.sanitizeSave({...s,session:null},d);assert.equal(imp.wallet,2100);assert(imp.tools.includes('multimetro'));
let m=d.cases[0];s.session={id:m.id,stage:'result',safe:true,safetyChoice:'protect',scanned:true,tests:['visual','electric'],hyp:0,action:'guided',spent:120,result:{score:100,change:900,status:'Reparo fundamentado',detail:'Teste',correctAct:true,safety:true,extraPartCost:0}};let clone=c.sanitizeSave(JSON.parse(JSON.stringify(s)),d);assert(clone.session.result&&clone.session.result.score===100);
let changed=c.newSave(true);assert(changed.instructor&&changed.wallet===2100&&c.unlocked(d.cases.find(x=>x.chapter===7),changed));
console.log('OK:',d.cases.length,'missões,',d.manuals.length,'manuais,',d.sources.length,'fontes;',d.cases.length*3,'testes de resultados e validação de save.');
