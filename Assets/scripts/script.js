import { Table,components } from "../scripts/modules/CreateElemens/elements.mjs";

let cu = new Table('table',document.querySelector('.budgets-container'),'input-budgets')
console.log(cu)
let kk = new components('section',document.querySelector('.budgets-container'),'.card')
cu.CreateTable(3,1,['Nome','Valor'],[['cu','kisimoto'],'miagi'])
kk.CreateSection()