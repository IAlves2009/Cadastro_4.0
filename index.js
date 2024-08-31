let nomes = []
let nome = document.getElementById('nome')
let telefone = document.getElementById('telefone')
let email = document.getElementById('email')
let sexo = document.getElementById('sexo')
let data = document.getElementById('data')
let id_tmp = document.getElementById('id_tmp')
let masculino = document.getElementById('masculino')
let feminino = document.getElementById('feminino')
let outro = document.getElementById('outro')
let prefiro_nao_dizer = document.getElementById('prefiro_nao_dizer')

let btn_cadastrar = document.getElementById('btn_cadastrar');

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault();

    if (nome.value == "") {
        let msg = document.getElementById('mensagens');
        msg.classList.remove('d-none');
        setTimeout(() => {
            msg.classList.add('d-none');
        }, 3000);
    } else {
        if (id_tmp.value == "") {
            nomes.push([nome.value, telefone.value, email.value, sexo.value, data.value])
        } else {
            nomes[id_tmp.value][0] = nome.value
            nomes[id_tmp.value][1] = telefone.value
            nomes[id_tmp.value][2] = email.value
            nomes[id_tmp.value][3] = sexo.value
            nomes[id_tmp.value][4] = data.value
        }
        atualizar_lista();
        nome.value = ""
        telefone.value = ""
        email.value = ""
        sexo.value = ""
        data.value = ""
    }

    drawChart()
})

function atualizar_lista() {
    let lista = document.getElementById('lista');
    lista.innerHTML = "";

    homens = 0;
    mulheres = 0;

    nomes.forEach((nm, index) => {

    switch (nm[3]) {
        case 'Masculino':
            masculino++
            break;
    
        case 'Feminino':
        feminino++
            break;

        case 'Outro':
        outro++
            break;
    
        case 'Prefiro não dizer':
        prefiro_nao_dizer++
            break;
    }

        lista.innerHTML += `
    <tr>
    <td>${nm[0]}</td>
    <td>${nm[1]}</td>
    <td>${nm[2]}</td>
    <td>${nm[3]}</td>
    <td>${nm[4]}</td>
    <td>
    <button class="btn btn-warning" onclick="editar(${index})"><i class="bi bi-pencil-square"></i></button>
    <button class="btn btn-danger" onclick="apagar(${index})"><i class="bi bi-trash3"></i></button>
    </td>
    </tr>`
    });
    id_tmp.value = ""
}

function editar(indice) {
    console.log("estamos editando o indice: " + indice)
    nome.value = nomes[indice][0]
    telefone.value = nomes[indice][1]
    email.value = nomes[indice][2]
    sexo.value = nomes[indice][3]
    data.value = nomes[indice][4]
    btn_cadastrar.classList.remove('btn-warning')
    btn_cadastrar.classList.add('btn-info')
    id_tmp.value = indice;
}

function apagar(indice) {
    let confirmacao = confirm('Deseja apagar o item "' + nomes[indice] + '" ')

    if (confirmacao) {
        nomes.splice(indice, 1);
        atualizar_lista();
    } else {
        alert("Exclusão cancelada")
    }
}

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Homens', 0],
        ['Mulheres', 0]
        
    ]);

    var options = {
        title: 'Porcentagem de Homens e Mulheres',
        is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
    chart.draw(data, options);
}
