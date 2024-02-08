//http(s)://api.qrserver.com/v1/create-qr-code/? data=[texto codificado em URL]&size=[pixels]x[pixels]

let mensagem = document.querySelector('#container-mensagem')
let btn = document.querySelector('#ibtn')
let input = document.querySelector('#input')
let containerQr = document.querySelector('#container-QRcode')
let img = document.querySelector('#iImg')
//Funções


const mensagemAlerta = (textoDaMensagem,corContainer) => {
        mensagem.textContent = textoDaMensagem
        mensagem.style.backgroundColor = corContainer

    const mensagemIda = 'container-mensagem-movimento'
    const mensagemVolta = 'container-mensagem-movimento-volta'
    mensagem.classList.add(mensagemIda);
    setTimeout(() => {

        mensagem.classList.remove(mensagemIda)
        mensagem.classList.add(mensagemVolta)

    }, 3000)
    mensagem.classList.remove(mensagemVolta)
}

const criarQr = async () => {
    const valorInput = input.value
    if (!valorInput) {
        mensagemAlerta('Digite alguma coisa', 'rgb(255, 82, 47)')
        return
    }
    else {
        mensagemAlerta('Gerando Qr code','greenyellow')
        img.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${valorInput}`
        img.addEventListener('load', () => {
            containerQr.classList.remove('hide')
            mensagemAlerta('Qr code gerado com sucesso','greenyellow')

        })
    }

};
async function copiarImg(){
    await navigator.clipboard.writeText(img.src).then(()=>{
        mensagemAlerta('Imagem copiada com sucesso','greenyellow')
    }).catch((erro)=>{
        mensagemAlerta('Não foi possivel copiar','rgb(255, 82, 47)')
        console.log(`Não foi possível copiar a imagem por conta desse erro:${erro}`)
    })
}

btn.addEventListener('click', async (e) => {
    e.preventDefault()
    criarQr()
});

img.addEventListener ('click',()=>{
    copiarImg()
    })

input.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        criarQr()

    }
})

input.addEventListener('keyup', () => {
    if (!input.value) {
        containerQr.classList.add('hide')
    }
})