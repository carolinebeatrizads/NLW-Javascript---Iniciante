// Importa as funções 'select' e 'input' do pacote '@inquirer/prompts' para criar prompts interativos no terminal
const { select, input, checkbox } = require('@inquirer/prompts')

let mensagem = "Bem-vindo ao App de Metas"
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

    mensagem = "Meta cadastrada com sucesso!"
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o entes para finalizar essa etapa",
        choices: [...metas],
        instructions: false
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0){
        mensagem = "Nenhuma meta foi selecionada."
        return
    }  

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = "Meta(s) marcadas como concluídas."
}

const metasRealizadas =  async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        mensagem = "Não existe metas realizadas."
        return
    }

    await select({
        message: "Metas Realizadas",
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length == 0){
        mensagem = "Não existem metas abertas."
        return
    }

    await select({
        message: "Metas Abertas",
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })

    const itensDeletar = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o enter para finalizar essa etapa",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if(itensDeletar.length == 0){
        console.log("Nenhum item para deletar.")
        return
    }


    itensDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })
}

const mostrarMensagem = () => {
    console.clear()

    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }

}

// Função principal que controla o fluxo do programa
const start = async () => {
    // Loop infinito para manter o programa executando até que o usuário escolha sair
    while(true){
        mostrarMensagem()
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
                    name: "Metas Realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas Abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar Metas",
                    value: "deletar"
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
                await cadastrarMeta()
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                return // Encerra o loop e finaliza o programa
        }
    }
}

// Inicia a execução do programa
start()
