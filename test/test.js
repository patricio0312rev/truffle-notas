// Llamada al contrato del Sistema Universitario
const notas = artifacts.require('notas');

contract('notas', accounts => {
    it('1. Función: Evaluar(string memory _asignatura, string memory _idAlumno, uint _nota)', async() => {
        // Smart Contract desplegado
        let instance = await notas.deployed();

        // Llamada al método de evaluación del Smart Contract
        const tx1 = await instance.Evaluar('Matematicas', '77755N', 9, {from: accounts[0]});
        const tx2 = await instance.Evaluar('Biologia', '77755N', 5, {from: accounts[0]});

        // Imprimir valores
        console.log(accounts[0]);   // Direccion del profesor
        console.log(tx1);            // Transacción de la evaluación académica
        console.log(tx2);            // Transacción de la evaluación académica

        // Comprobación de la información en la Blockchain
        const nota_alumno1 = await instance.VerNotas.call('Matematicas', '77755N', {from: accounts[1]});
        const nota_alumno2 = await instance.VerNotas.call('Biologia', '77755N', {from: accounts[1]});
        
        // Condición para pasar el test: nota_alumno = 5
        console.log(nota_alumno1);
        console.log(nota_alumno2);
        assert.equal(nota_alumno1, 9);
        assert.equal(nota_alumno2, 5);
    });

    it('2. Función: Revision(string memory _asignatura, string memory _idAlumno', async() => {
        // Smart Contract desplegado
        let instance = await notas.deployed();

        // Llamada al método de revisar exámenes
        const rev1 = await instance.Revision('Matematicas', '12345X', {from: accounts[1]});
        const rev2 = await instance.Revision('Musica', '02468T', {from: accounts[2]});

        // Imprimir los valores recibidos de la revisión
        console.log(rev1);
        console.log(rev2);

        // Verificacion del test
        const id_alumno_matematicas = await instance.VerRevisiones.call('Matematicas', {from: accounts[0]});
        const id_alumno_musica = await instance.VerRevisiones.call('Musica', {from: accounts[0]});
        console.log(id_alumno_matematicas);
        console.log(id_alumno_musica);

        // Comprobación de los datos de las revisiones
        assert.equal(id_alumno_matematicas, '12345X');
        assert.equal(id_alumno_musica, '02468T');
    });
});