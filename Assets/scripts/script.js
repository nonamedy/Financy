import { Table,components,Complements } from "../scripts/modules/CreateElemens/elements.mjs";
let bud = document.querySelector('.budgets-container')
const table = new Table('table',bud,'nãotem')
const Tela = new components('section',bud,'card')



let table1 = table.CreateTable(3,1,['nome','idade','sexo'],['pedro',14,'Masculino'])
let component  = Tela.CreateComponent('desisto da vida',table1)
const complemento = new Complements('section',component,'');
complemento.CreateComplement(true)