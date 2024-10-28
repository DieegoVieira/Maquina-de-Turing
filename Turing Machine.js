const fs = require('fs');
let json;
let arquivo;
// CRIA O OBJETO PARA LEITURA DO ARQUIVO JSON CHAMADO 'json'
try{
    const dados = fs.readFileSync('C:/Users/diego/OneDrive/Documentos/Teoria da Computação/duplo_bal.json', 'utf8');
    json = JSON.parse(dados);
} catch(erro){
    console.error('Erro ao ler JSON:\n', erro);
}
// CRIA O OBJETO PARA LEITURA DO ARQUIVO DE TEXTO CHAMADO 'arquivo'
try{
    const dados = fs.readFileSync('C:/Users/diego/OneDrive/Documentos/Teoria da Computação/duplobal.in', 'utf8');
    arquivo = dados;
} catch(erro){
    console.error('Erro ao abrir arquivo de texto:\n', erro);
}
function moverPassador(direcao){
    if(direcao === "R"){
        // console.log('Foi para direita');
        posicao +=1;
    }else if(direcao === "L"){
        // console.log('Foi para esquerda');
        posicao-= 1;
    }
}

final = json.final;
branco = json.white;
estadoAtual = json.initial;
let posicao = 0;
while(estadoAtual !== final || arquivo[posicao] !== branco){
    // console.log('\nINICIO');
    // console.log('Estado Atual: ', estadoAtual);
    // console.log('Arquivo: ', arquivo);

    let transicaoEncontrada = false;
    for(let estado of json.transitions){
        if(estadoAtual == estado.from && arquivo[posicao] == estado.read){
            // console.log('Leu: ', estado.read);
            // console.log('Escreveu: ', estado.write)

            arquivo = arquivo.slice(0, posicao) + estado.write + arquivo.slice(posicao +1);
            try{
                fs.writeFileSync('C:/Users/diego/OneDrive/Documentos/Teoria da Computação/duplo_bal.in', arquivo, 'utf8');
            }catch(erro){
                console.log("Não foi possível escrever no arquivo:\n", erro);
            }
            estadoAtual = estado.to;
            if(arquivo[posicao] != branco){
                moverPassador(estado.dir);
            }
            transicaoEncontrada = true;
            break;
        }
    }
    if (!transicaoEncontrada && estadoAtual !== final) {
        console.log("Nenhuma transição encontrada para o estado atual.");
        break;
    }
    // console.log('\nEstado Atual: ', estadoAtual);
    // console.log('Arquivo: ', arquivo + '\n');
}
console.log('Estado atual:' + estadoAtual);
console.log('Estado final: ' + final);
console.log('Posição no arquivo: ', arquivo[posicao]);
console.log('Simbolo branco: ', branco);
if(estadoAtual == final && arquivo[posicao] == branco){
    console.log("\nAUTOMATO ACEITO!");
}
else{
    console.log("\nAUTOMATO REJEITADO!");
}