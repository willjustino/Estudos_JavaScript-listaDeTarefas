//linkar os elem html que vamos interagir
const inputTarefa = document.querySelector(".input");
const botao = document.querySelector(".adicionar");
const tarefa = document.querySelector(".tarefa");

function criaLI() {
  const li = document.createElement("li");
  return li;
}
//cria o botão
function criaBotaoApagar(li) {
  li.innerText += " "; //adiciona espaço entre o texto e o botão
  const btnApagar = document.createElement("button"); //cria o elem HTML botão
  btnApagar.innerText = "apagar"; //insere texto dentro do botão
  btnApagar.setAttribute("class", "apagar"); //add uma classe para o botão
  li.appendChild(btnApagar); //junta o botão com o elem da lista
}
//adiciona o elemento li com o texo ao código html
function criaTarefa(textoInput) {
  const li = criaLI();
  li.innerText = textoInput;
  tarefa.appendChild(li);
  limpaInput();
  criaBotaoApagar(li);
  salvarTarefas();
}
//adiciona o valor "" ao input e faz o foco ficar nele
function limpaInput() {
  inputTarefa.value = "";
  inputTarefa.focus();
}
//verifica se a tecla enter foi pressionada
inputTarefa.addEventListener("keypress", (evento) => {
  if (evento.keyCode === 13) {
    if (!inputTarefa.value) return;
    // console.log(inputTarefa.value); //mostra o valor digitado no input text
    criaTarefa(inputTarefa.value);
  }
});

//capturar o evento botão clicado
botao.addEventListener("click", () => {
  if (!inputTarefa.value) return;
  // console.log(inputTarefa.value); //mostra o valor digitado no input text
  criaTarefa(inputTarefa.value);
});

document.addEventListener("click", (evento) => {
  const elemento = evento.target;
  if (elemento.classList.contains("apagar")) {
    elemento.parentElement.remove();
    salvarTarefas();
  }
});
//função que salva as tarefas no localStorage do navegador
function salvarTarefas() {
  const liTarefas = tarefa.querySelectorAll("li");
  const listaDeTarefas = [];
  for (let liTarefa of liTarefas) {
    let tarefaTexto = liTarefa.innerText;
    tarefaTexto = tarefaTexto.replace("apagar", "").trim();
    listaDeTarefas.push(tarefaTexto);
  }
  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem("tarefas", tarefasJSON);
}
//função que lê as tarefas salvas no localStorage
function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem("tarefas");
  const listaDeTarefas = JSON.parse(tarefas);
  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}
adicionaTarefasSalvas(); //chamado da função
