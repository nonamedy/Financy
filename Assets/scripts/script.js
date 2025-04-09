import { Table,components,Complements } from "../scripts/modules/CreateElemens/elements.mjs";

let cu = new Table('table',document.querySelector('.budgets-container'),'')
console.log(cu)
let kk = new components('section',document.querySelector('.budgets-container'),'.card')
const table = cu.CreateTable(3,1,['Nome','Valor'],[['cu','kisimoto'],'miagi'])
kk.CreateComponent('Teste incrivel',table)

const complemento = new Complements('section',document.querySelector('body'),'sla')

complemento.CreateComplement(true)