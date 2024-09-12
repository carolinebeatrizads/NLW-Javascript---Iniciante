// Importa as funções 'select' e 'input' do pacote '@inquirer/prompts' para criar prompts interativos no terminal
const { select, input } = require('@inquirer/prompts')

// Define um objeto 'meta' que representa uma meta com uma descrição (value) e um status de conclusão (checked)
let meta = {
    value: "Tomar 3L de água por dia",
    checked: false
}

// Cria um array 'metas' que armazena todas as metas, começando com a meta inicial definida acima
let metas = [ meta ]

// Função assíncrona para cadastrar uma nova meta
const cadastrarMeta = async () => {
    // Exibe um prompt de entrada no terminal para o usuário digitar uma meta
    const meta = await input({ message: "Digite a meta: "})

    // Verifica se o usuário digitou uma meta vazia
    if(meta.length == 0){
        console.log("A meta não pode ser vazia.")
        return
    } 

    // Adiciona a nova meta ao array 'metas' com o status 'checked' definido como 'false'
    metas.push(
        { value: meta, checked: false})
}

// Função principal que controla o fluxo do programa
const start = async () => {
    // Loop infinito para manter o programa executando até que o usuário escolha sair
    while(true){
        // Exibe um prompt de seleção no terminal para o usuário escolher uma opção do menu
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar Meta", // Nome exibido no menu
                    value: "cadastrar" // Valor retornado quando o usuário seleciona esta opção
                },
                {
                    name: "Listar Metas",
                    value: "listar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        // Executa diferentes ações com base na opção escolhida pelo usuário
        switch(opcao){
            case "cadastrar":
                await cadastrarMeta() // Chama a função 'cadastrarMeta' para adicionar uma nova meta
                console.log(metas) // Exibe todas as metas cadastradas no console
                break
            case "listar":
                console.log("Vamos listar...") // Placeholder para listar metas (a ser implementado)
                break
            case "sair":
                return // Encerra o loop e finaliza o programa
        }
    }
}

// Inicia a execução do programa
start()
