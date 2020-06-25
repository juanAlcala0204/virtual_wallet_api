import ConfigurationChart from '../class/config_chart.js'

const estadisticaChange = document.querySelector('#idEstadisticas');
const logicInformeCasesForMonth = ( data ) => {
    try{
    let arrayFechas = [];
    let fechaTemp;
        data.forEach( Element => {
            fechaTemp = new Date(Element.fechaCapturaIncidente);
            arrayFechas.push(fechaTemp);
        });
        let temp = {
            labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
            info: {
                enero: 0,
                febrero: 0,
                marzo: 0,
                abril: 0,
                mayo: 0
            },
            dataGet : []
            
            
        };
        console.log(arrayFechas);
        arrayFechas.forEach( Element => {
            console.log();
            switch (Element.getMonth()) {
                case 0:
                    temp.info.enero++
                break;

                case 1:
                    temp.info.febrero++
                break;

                case 2:
                    temp.info.marzo++
                break;

                case 3:
                    temp.info.abril++
                break;
                
                case 4:
                temp.info.mayo++
                break;
            
                default:
                    break;
            }

        });
        temp.dataGet = [temp.info.enero , temp.info.febrero, temp.info.marzo, temp.info.abril,temp.info.mayo]
        console.log(temp);
        return temp;
    }catch(error){
        console.error('Error en logica de Informe casos por mes' + error)
    }
}

const logicInformeCasesFinishForMonth = ( data ) => {
    try{
    let arrayFechas = [];
    let fechaTemp,
        finishCase;
        data.forEach( Element => {
            fechaTemp = new Date(Element.fechaCapturaIncidente);
            //console.log(Element.estadoIncidente);
            finishCase = (Element.estadoIncidente == 'Finalizado') ? true : false;
            //console.log(finishCase);
            arrayFechas.push({fecha: fechaTemp, finish: finishCase});
        });
        let temp = {
            labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
            info: {
                enero: 0,
                febrero: 0,
                marzo: 0,
                abril: 0,
                mayo: 0
            },
            dataGet : []
            
            
        };
        console.log(arrayFechas);
        arrayFechas.forEach( Element => {
           console.log(arrayFechas); 
            switch (Element.fecha.getMonth()) {
                case 0:
                    if (Element.finish) temp.info.enero++;
                    
                break;

                case 1:
                    if (Element.finish)temp.info.febrero++;
                break;

                case 2:
                    if (Element.finish)temp.info.marzo++;
                break;

                case 3:
                    if (Element.finish)temp.info.abril++;
                break;
                
                case 4:
                    if (Element.finish)temp.info.mayo++;
                break;
            
                default:
                    break;
            }

        });
        temp.dataGet = [temp.info.enero , temp.info.febrero, temp.info.marzo, temp.info.abril,temp.info.mayo]
        console.log(temp);
        return temp;
    }catch(error){
        console.error('Error en logica de Informe casos por mes' + error)
    }
}


const logicInformes = async ( optionsExecute, data = false ) => {
    let url = false;

    switch ( optionsExecute.type ) {
        case 'casesForMont':
                optionsExecute.url
                    ? url = 'http://localhost:3004/Incidentes'
                    : data = await logicInformeCasesForMonth(data);
            break;
        case 'casesFinish':
                optionsExecute.url
                    ? url = 'http://localhost:3004/Incidentes'
                    : data = await logicInformeCasesFinishForMonth(data);
    
        default:
            break;
    }

    if ( url ) {
        return url;
    } else {
        return data;
    }
}

async function dataStatistics( typeInforme ) {
    debugger;  
    let url = await logicInformes( { url: true, type: typeInforme}),
        response,
        data,
        dataInforme;

    const SETTINGS = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    };

    try {

        response = await fetch(url, SETTINGS);
        data = await response.json();

        dataInforme = await logicInformes( { url: false, type: typeInforme}, data );

        return dataInforme;
        
    } catch (error) {
        console.log(error)
    }
}

const createChart = async ( type, typeInforme ) =>{
    try {
        debugger;
        let ctx,
            chart,
            obj;

        const data = await dataStatistics( typeInforme );
        console.log("data create"+data);
        ctx= document.getElementById('informeChar').getContext('2d');
        obj = new  ConfigurationChart( data,type )
        console.log("obj");
        chart = new Chart(ctx, obj.objectChart);
        
    }catch(error){

    }

}
const createOptionsStatistics = () =>{
    for (let i in data) {
        let option,
            txt;
        option = document.createElement("option"),txt = document.createTextNode()
        option.appendChild(txt);
        option.setAttribute('value', data[i].idUsuario)
        dropdownList.insertBefore(option, dropdownList.lastChild);
    }
}

estadisticaChange.addEventListener('change' , () =>{    
    const divEstadisticas = document.getElementById('divEstadisticas');    
    const itemCanvas = document.createElement('canvas');
    itemCanvas.id = 'informeChar';
    itemCanvas.style = 'display:block ;width: 668px; height: 320px;';
    itemCanvas.width = '668';
    itemCanvas.height = '320';
    divEstadisticas.replaceChild(itemCanvas, document.getElementById('informeChar'));

    createChart('line',estadisticaChange.value);
})
