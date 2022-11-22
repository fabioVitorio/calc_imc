// mascára de input
function mask(mascara, documento){
    var i = documento.value.length
    var saida = mascara.substring(0,1)
    var texto = mascara.substring(i)

    if(texto.substring(0,1) != saida){
        documento.value += texto.substring(0,1)
    }
}

// #app
new Vue({
    el: '#app',
    data:{
        altura: null,
        peso: null,
        resultado: null,
        bordaAltura: 'borderDefault',
        bordaPeso: 'borderDefault',
        checkAltura: false,
        checkPeso: false,
        estado: '',
        texto: '',
        src: '',
        tela1: true,
        tela2: false,
        arredondar: null
    },

    methods:{
        imc(){

            //verificar campos vazios do input ao clicar no btn
            if(!this.altura){
                this.bordaAltura = 'borderRed'
            }else if(!this.peso){
                this.bordaPeso = 'borderRed'
            }
            
            //realizar o resultado após a verificação dos inputs
            if(this.checkAltura && this.checkPeso == true){
                this.resultado = parseInt(this.peso) / (parseFloat(this.altura) * parseFloat(this.altura))
                this.arredondar = parseFloat(this.resultado.toFixed(2))
            }
            
            //verifica o peso e retorna o resultado
            if(this.resultado > 0){
                if(this.resultado < 18.5){
                    this.src = 'img/alerta.png'
                    this.estado = 'Abaixo do Peso'
                    this.texto = 'Você está abaixo do peso, procure um médico para diagnóstico e indicação de tratamento adequado, de acordo com seu perfil e histórico clínico individual.'
                }else if(this.resultado > 18.5 && this.resultado < 24.9){
                    this.src = 'img/visto.png'
                    this.estado = 'Peso Normal'
                    this.texto = 'Você está com o peso normal. Nenhuma consideração a ser feita.'
                }else if(this.resultado > 24.9 && this.resultado < 29.9){
                    this.src = 'img/alerta.png'
                    this.estado = 'Sobrepeso'
                    this.texto = 'Você está com sobrepeso, procure um médico para diagnóstico e indicação de tratamento adequado, de acordo com seu perfil e histórico clínico individual.'
                }else if(this.resultado > 29.9){
                    this.src = 'img/risco.png'
                    this.estado = 'Obesidade'
                    this.texto = 'Você está com obesidade, procure um médico para diagnóstico e indicação de tratamento adequado, de acordo com seu perfil e histórico clínico individual.'
                }

                this.tela2 = true //mostra tela de resultado
                this.tela1 = false //remove tela inicial
            }
        },

        retornar(){
                this.tela1 = true //mostra tela inicial
                this.tela2 = false //remove tela de resultado
        }
    },

    watch:{
        //assisir e comparar os dados do input altura
        altura(alt){
            if(!alt || alt <= 0){
                this.bordaAltura = 'borderRed'
                this.checkAltura = false
            }else{
                this.bordaAltura = 'borderDefault'
                this.checkAltura = true 
            }
        },
        //assisir e comparar os dados do input peso
        peso(pes){
            if(!pes || pes <= 0){
                this.bordaPeso = 'borderRed'
                this.checkPeso = false
            }else{
                this.bordaPeso = 'borderDefault'
                this.checkPeso = true 
            }
        }
    }
})
