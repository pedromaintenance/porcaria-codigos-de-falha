/* P.O.R.C.A.R.I.A. • motor de progressão e scoring (sem DOM) */
(function(root, factory){let core=factory();if(typeof module==='object'&&module.exports)module.exports=core;root.PORCARIA_CORE=core;})(typeof globalThis!=='undefined'?globalThis:this,()=>{
'use strict';const VERSION='1.0.0', KEY='porcaria.codigos.v1';
const newSave=(instructor=false)=>({version:VERSION,instructor:!!instructor,wallet:2100,earned:0,lost:0,xp:0,streak:0,completed:0,preserved:0,premature:0,score:0,stock:{},tools:[],manuals:['fundamentos','fmi','cdl','j1939'],reports:{},ledger:[{message:'Capital inicial de treinamento',amount:2100,when:'Início'}],session:null,credits:2,created:new Date().toISOString()});
const clamp=(x,lo,hi)=>Math.max(lo,Math.min(hi,Number(x)||0));
function sanitizeSave(raw,data){if(!raw||String(raw.version)!==VERSION)throw Error('Arquivo incompatível com a versão 1.0');const s=newSave(!!raw.instructor);for(const k of ['wallet','earned','lost','xp','streak','completed','preserved','premature','score','credits'])s[k]=clamp(raw[k],k==='wallet'?-99999:0,9999999);
 s.tools=Array.isArray(raw.tools)?[...new Set(raw.tools.filter(x=>data.items.some(i=>i.id===x&&i.group==='tool')))]:[];
 s.manuals=Array.isArray(raw.manuals)?[...new Set(raw.manuals.filter(x=>data.manuals.some(i=>i.id===x)))]:s.manuals;
 s.stock={};for(const p of data.items.filter(i=>i.group==='part'))s.stock[p.id]=clamp(raw.stock?.[p.id],0,50);
 s.reports={};if(raw.reports&&typeof raw.reports==='object'){for(const c of data.cases){let r=raw.reports[c.id];if(r&&typeof r==='object')s.reports[c.id]={attempts:clamp(r.attempts,0,200),best:clamp(r.best,0,100),last:clamp(r.last,0,100),finished:String(r.finished||'').slice(0,30)};}}
 s.ledger=Array.isArray(raw.ledger)?raw.ledger.slice(0,80).filter(x=>Number.isFinite(Number(x.amount))).map(x=>({message:String(x.message||'Movimentação').slice(0,100),amount:clamp(x.amount,-999999,999999),when:String(x.when||'').slice(0,40)})):s.ledger;
 if(raw.session&&data.cases.some(x=>x.id===raw.session.id)&&['safety','scan','tests','diagnosis','intervention','result'].includes(raw.session.stage)){let r=raw.session;s.session={id:r.id,stage:r.stage,safe:!!r.safe,safetyChoice:String(r.safetyChoice||''),scanned:!!r.scanned,tests:[...new Set((Array.isArray(r.tests)?r.tests:[]).filter(x=>['visual','electric','history','independent','manual'].includes(x)))],hyp:Number.isInteger(r.hyp)&&r.hyp>=0&&r.hyp<4?r.hyp:null,action:['guided','spare','ecm','clear','monitor'].includes(r.action)?r.action:null,spent:clamp(r.spent,0,100000),result:r.stage==='result'&&r.result&&typeof r.result==='object'?{score:clamp(r.result.score,0,100),change:clamp(r.result.change,-20000,20000),status:String(r.result.status||'Relatório').slice(0,80),detail:String(r.result.detail||'').slice(0,1200),correctAct:!!r.result.correctAct,safety:!!r.result.safety,extraPartCost:clamp(r.result.extraPartCost,0,20000)}:null};}
 return s;}
const resolved=s=>Object.keys(s.reports).filter(id=>s.reports[id].attempts>0).length;
const levels=[{xp:0,name:'Aprendiz de Diagnóstico'},{xp:500,name:'Inspetor de Sistemas'},{xp:2000,name:'Analista de Falhas'},{xp:4500,name:'Perito Eletrônico'},{xp:9000,name:'Mestre da Confiabilidade'}];
function level(s){let index=levels.findLastIndex(l=>s.xp>=l.xp);return {index,...levels[Math.max(0,index)],next:levels[Math.max(0,index)+1]||null};}
function unlocked(c,s){return s.instructor||c.chapter===0||resolved(s)>=c.chapter*6;}
function walletChange(s,message,amount){s.wallet+=amount;if(amount>=0)s.earned+=amount;else s.lost-=amount;s.ledger.unshift({message,amount,when:new Date().toLocaleString('pt-BR')});s.ledger=s.ledger.slice(0,80);}
const tests={visual:{price:0,tool:'kit_conect',label:'Inspeção visual e conectores'},electric:{price:120,tool:'multimetro',label:'Medição / teste elétrico'},history:{price:45,tool:'scanner',label:'Histórico e linha do tempo'},independent:{price:165,tool:'manometro',label:'Verificação independente'},manual:{price:60,tool:'osciloscopio',label:'Esquema e forma de onda / literatura'}};
function testCost(s,id){let t=tests[id];if(!t)return Infinity;return s.tools.includes(t.tool)?Math.floor(t.price*.35):t.price;}
function calc(c,ses){const evidence=ses.tests.includes('electric')&&ses.tests.includes('visual');const sufficient=ses.tests.length>=2;const correctHyp=ses.hyp===c.scenario-1;const correctAct=ses.action==='guided'&&correctHyp;const safety=ses.safe;
 let score=(safety?25:0)+(sufficient?12:0)+(evidence?13:0)+(correctHyp?30:0)+(correctAct?20:0);
 let change=0,detail='',status='';let consume=null,autoPart=0;
 if(correctAct&&safety){change=c.reward+(evidence?200:0);status='Reparo fundamentado';detail='A hipótese selecionada coincide com o mecanismo evidenciado. A intervenção corrigiu o defeito simulado, seguida de validação técnica.';
 if(c.repairType==='part'){consume=c.repairPart;detail+=' Foi necessário substituir o item comprovadamente defeituoso.';}
 }else if(ses.action==='ecm'||ses.action==='spare'){change=ses.action==='ecm'?-2800:-1250;status='Substituição prematura';detail='O componente foi condenado sem demonstração de falha. Custo de peça e indisponibilidade fictícios foram debitados. O código não comprova, por si só, que o ECM ou o conjunto deva ser substituído.';}
 else if(ses.action==='clear'){change=-1350;status='Falha não tratada';detail='Apagar o código não elimina o mecanismo físico/eletrônico. O histórico necessário para diagnóstico também poderia ser perdido.';}
 else if(ses.action==='monitor'){change=c.risk==='critica'?-2000:-600;status='Postergação insuficiente';detail='Monitoramento sem confirmação e sem plano de reação foi inadequado para o cenário. Códigos de risco crítico nunca podem ser ignorados.';}
 else{change=-1050;status='Hipótese não confirmada';detail='A intervenção foi direcionada a uma hipótese diferente da sustentada pelos testes. É necessário reabrir investigação e evitar troca por tentativa.';}
 if(!safety){change-=c.risk==='critica'?1200:450;detail+=' Falha na triagem de segurança gerou uma penalidade adicional.';}
 if(correctAct&&!evidence){change-=350;detail+=' Como não foram combinadas inspeção física e medição elétrica, o diagnóstico teve confiança insuficiente e recompensa reduzida.';}
 return {score:Math.min(100,score),change,status,detail,correctHyp,correctAct,consume,evidence,safety};}
return {VERSION,KEY,newSave,sanitizeSave,unlocked,resolved,level,walletChange,testCost,tests,calc};
});
