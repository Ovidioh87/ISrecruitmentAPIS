const { request } = require('express');
const express = require('express');
const router = express.Router();
const mysqlConn = require('../db.js');


//CONSULTAS GET
    //Todas las compañías - empresas
router.get('/companies', (req, res) => {
    mysqlConn.query('SELECT * FROM REC_COMPANY', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else{
            console.log(err);
        }
    });
});

    //Compañías - empresas por ID
router.get('/company/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    mysqlConn.query('SELECT * FROM REC_COMPANY WHERE idCompany = ?', [id], (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else{
            console.log(err);
        }
    });
});

    //Todos los pipelines
router.get('/pipelines', (req, res) => {
    mysqlConn.query(`SELECT  rec_pipeline.namePipeline, rec_process.nameProcess, rec_company.nameCompany 
    FROM (((rec_pipeline
    INNER JOIN rec_process ON rec_process.idPipeline = rec_pipeline.idPipeline)
    INNER JOIN rec_company_has_rec_process ON rec_company_has_rec_process.REC_PROCESS_idProcess = rec_process.idProcess)
    INNER JOIN rec_company ON rec_company.idCompany = rec_company_has_rec_process.REC_COMPANY_idCompany);
    `, (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else{
            console.log(err);
        }
    });
});

    //Pipeline por ID
router.get('/pipeline/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    mysqlConn.query('SELECT STEPS FROM REC_PIPELINE WHERE idPipeline = ?', [id], (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else{
            console.log(err);
        }
    });
});


    //Todos los cuestionarios
    router.get('/questionnaires', (req, res) => {
        mysqlConn.query(`SELECT  rec_questionnaire.idQuestionnaire,rec_questionnaire.nameQuestionnaire,rec_questionnaire.descriptionQuestionnaire ,rec_company.nameCompany
        FROM ((rec_questionnaire
        INNER JOIN rec_position ON rec_position.idQuestionnaire = rec_questionnaire.idQuestionnaire)
        INNER JOIN rec_company ON rec_company.idCompany = rec_position.idCompany);
        `, (err, rows, fields) => {
            if(!err){
                res.json(rows);
            } else{
                console.log(err);
            }
        });
    });
    
        //Cuestionario por ID
    router.get('/questionnaire/:id', (req, res) => {
        const { id } = req.params;
        console.log(id);
        mysqlConn.query(`SELECT  rec_questionnaire.nameQuestionnaire, rec_questionnaire.dateQuestionnaire, rec_question.typeQuestion, rec_question.question
        FROM (rec_questionnaire
        INNER JOIN rec_question ON rec_question.idQuestion = rec_questionnaire.idQuestion);
        `, [id], (err, rows, fields) => {
            if(!err){
                res.json(rows);
            } else{
                console.log(err);
            }
        });
    });
    

    //Todas las posiciones
    router.get('/positions', (req, res) => {
        mysqlConn.query('SELECT * FROM rec_position', (err, rows, fields) => {
            if(!err){
                res.json(rows);
            } else{
                console.log(err);
            }
        });
    });
    
        //Posición por ID
    router.get('/position/:id', (req, res) => {
        const { id } = req.params;
        console.log(id);
        mysqlConn.query('SELECT * FROM rec_position WHERE idPosition = ?', [id], (err, rows, fields) => {
            if(!err){
                res.json(rows);
            } else{
                console.log(err);
            }
        });
    });

        //Todas las posiciones con un estado espécifico
        router.get('/positionState/:statePosition', (req, res) => {
            const { statePosition } = req.params;
            console.log(statePosition);
            mysqlConn.query('SELECT * FROM rec_position WHERE statePosition = ?', [statePosition], (err, rows, fields) => {
                if(!err){
                    res.json(rows);
                } else{
                    console.log(err);
                }
            });
        });

                //Candidato por ID
    router.get('/candidate/:id', (req, res) => {
        const { id } = req.params;
        console.log(id);
        mysqlConn.query(`SELECT  rec_applicant.nameApplicant, rec_applicant.lastnameApplicant, rec_position.namePosition, rec_company.nameCompany
        FROM ((rec_applicant
        INNER JOIN rec_position ON rec_position.idApplicant = rec_applicant.idApplicant)
        INNER JOIN rec_company ON rec_company.idCompany = rec_position.idCompany);
        `, [id], (err, rows, fields) => {
            if(!err){
                res.json(rows);
            } else{
                console.log(err);
            }
        });
    });

                    //Documentos de candidatos por puesto
                    router.get('/candidateDocuments/:id', (req, res) => {
                        const { id } = req.params;
                        console.log(id);
                        mysqlConn.query(`SELECT  rec_applicant.idApplicant, rec_position.namePosition, rec_applicant.documentsApplicant
                        FROM ((rec_applicant
                        INNER JOIN rec_position ON rec_position.idApplicant = rec_applicant.idApplicant)
                        INNER JOIN rec_company ON rec_company.idCompany = rec_position.idCompany);
                        `, [id], (err, rows, fields) => {
                            if(!err){
                                res.json(rows);
                            } else{
                                console.log(err);
                            }
                        });
                    });
    

                    //Candidatos para un puesto dado
                    router.get('/candidatePosition/:id', (req, res) => {
                        const { id } = req.params;
                        console.log(id);
                        mysqlConn.query(`SELECT idApplicant, namePosition FROM REC_POSITION
                        WHERE IDPOSITION = ?
                        `, [id], (err, rows, fields) => {
                            if(!err){
                                res.json(rows);
                            } else{
                                console.log(err);
                            }
                        });
                    });
    





//ACTUALIZACIONES PUT
    //ACTUALIZACIÓN DE POSICIONES LABORALES
router.put('/position/:id', (req, res) =>{
    const { namePosition, descPosition, typePosition, locationPosition, deptPosition, educationPosition, experiencePosition, attributesPosition, statePosition, idScorecard, idQuestionnaire, idCompany, idPipeline, idApplicant } = req.body;
    const { id } = req.params;
    const query = `UPDATE rec_position
    SET
    namePosition = ?,
    descPosition = ?,
    typePosition = ?,
    locationPosition = ?,
    deptPosition = ?,
    educationPosition = ?,
    experiencePosition = ?,
    attributesPosition = ?,
    statePosition = ?,
    idScorecard = ?,
    idQuestionnaire = ?,
    idCompany = ?,
    idPipeline = ?,
    idApplicant = ?
    WHERE idPosition = ?`;
    mysqlConn.query(query, [namePosition, descPosition, typePosition, locationPosition, deptPosition, educationPosition, experiencePosition, attributesPosition, statePosition, idScorecard, idQuestionnaire, idCompany, idPipeline, idApplicant,id], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Posición actualizada' });
        } else{
            console.log(err);
        }
    });

});

    //ACTUALIZACIÓN DE CANDIDATO
    router.put('/candidate/:id', (req, res) =>{
        const { nameApplicant, lastnameApplicant, countryApplicant, addressApplicant, mailApplicant, phoneApplicant, resumeApplicant, documentsApplicant } = req.body;
        const { id } = req.params;
        const query = `UPDATE rec_applicant
        SET
        nameApplicant = ?,
        lastnameApplicant = ?,
        countryApplicant = ?,
        addressApplicant = ?,
        mailApplicant = ?,
        phoneApplicant = ?,
        resumeApplicant = ?,
        documentsApplicant = ?
        WHERE idApplicant = ?`;
        mysqlConn.query(query, [nameApplicant, lastnameApplicant, countryApplicant, addressApplicant, mailApplicant, phoneApplicant, resumeApplicant, documentsApplicant,id], (err, rows, fields) => {
            if(!err){
                res.json({Status: 'Candidato actualizado' });
            } else{
                console.log(err);
            }
        });
    
    });



    //ACTUALIZACIÓN DEL ESTADO DE UNA POSICIÓN
    router.put('/positionState/:id', (req, res) =>{
        const { statePosition } = req.body;
        const { id } = req.params;
        const query = `UPDATE rec_position
        SET
        statePosition = ?
        WHERE idPosition = ?`;
        mysqlConn.query(query, [statePosition,id], (err, rows, fields) => {
            if(!err){
                res.json({Status: 'Estado de la posición laboral actualizada' });
            } else{
                console.log(err);
            }
        });
    
    });    

        //ACTUALIZACIÓN DEL UN CANDIDATO DE UN PUESTO A OTRO
        router.put('/positionCandidate/:id', (req, res) =>{
            const { idApplicant } = req.body;
            const { id } = req.params;
            const query = `UPDATE rec_position
            SET
            idApplicant = ?
            WHERE idPosition = ?`;
            mysqlConn.query(query, [idApplicant,id], (err, rows, fields) => {
                if(!err){
                    res.json({Status: 'Candidato actualizado de posición laboral' });
                } else{
                    console.log(err);
                }
            });
        
        });   

        // Guardar cuestionarios de candidatos específicos 
        router.put('/saveAnswers/:id', (req, res) =>{
            const { answer } = req.body;
            const { id } = req.params;
            const query = `UPDATE rec_question
            SET
            answer = ?
            WHERE idQuestion = ?`;
            mysqlConn.query(query, [answer,id], (err, rows, fields) => {
                if(!err){
                    res.json({Status: 'Prgunta contestada' });
                } else{
                    console.log(err);
                }
            });
        
        });   


            //ADJUNTAR UN ARCHIVO A UN CANDIDATO
    router.put('/attachResume/:id', (req, res) =>{
        const { resumeApplicant } = req.body;
        const { id } = req.params;
        const query = `UPDATE rec_applicant
        SET
        resumeApplicant = ?
        WHERE idApplicant = ?`;
        mysqlConn.query(query, [resumeApplicant,id], (err, rows, fields) => {
            if(!err){
                res.json({Status: 'El curriculum ha sido actualizado' });
            } else{
                console.log(err);
            }
        });
    
    });  


//INSERCIONES POST
    //INSERCIÓN DE EMPRESAS

router.post('/', (req, res) =>{    
    const { idCompany, nameCompany, addressCompany, countryCompany, phoneCompany, mailCompany  } = req.body;
    console.log(req.body);
    const query = `
        CALL companyAddEdit(?,?, ?, ?, ?, ?);
        `;
    mysqlConn.query(query,[idCompany, nameCompany, addressCompany, countryCompany, phoneCompany, mailCompany], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Compañía guardada' });
        } else{
            console.log(err);
        }
    });
});

    //INSERCIÓN DE POSICIONES LABORALES
    router.post('/position', (req, res) =>{    
        const { idPosition, namePosition, descPosition, typePosition, locationPosition, deptPosition, educationPosition, experiencePosition, attributesPosition, statePosition, idScorecard, idQuestionnaire, idCompany, idPipeline, idApplicant } = req.body;
        console.log(req.body);
        const query = `INSERT INTO rec_position
        VALUES
        (?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?)            
            `;
        mysqlConn.query(query,[idPosition, namePosition, descPosition, typePosition, locationPosition, deptPosition, educationPosition, experiencePosition, attributesPosition, statePosition, idScorecard, idQuestionnaire, idCompany, idPipeline, idApplicant], (err, rows, fields) => {
            if(!err){
                res.json({Status: 'Posición insertada' });
            } else{
                console.log(err);
            }
        });
    });

    //INSERCIÓN DE DOCUMENTOS POR CANDIDATO
    router.post('/candidate', (req, res) =>{    
        const { idApplicant, nameApplicant, lastnameApplicant, countryApplicant, addressApplicant, mailApplicant, phoneApplicant, resumeApplicant, documentsApplicant } = req.body;
        console.log(req.body);
        const query = `INSERT INTO rec_applicant
        VALUES
        (?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?)            
            `;
        mysqlConn.query(query,[ idApplicant, nameApplicant, lastnameApplicant, countryApplicant, addressApplicant, mailApplicant, phoneApplicant, resumeApplicant, documentsApplicant ], (err, rows, fields) => {
            if(!err){
                res.json({Status: 'Candidato insertado' });
            } else{
                console.log(err);
            }
        });
    });

    //INSERCIÓN DE CUESTIONARIO
    router.post('/sendQuestionnaire', (req, res) =>{    
        const { idQuestionnaire, codQuestionnaire, nameQuestionnaire, descriptionQuestionnaire, dateQuestionnaire, idQuestion } = req.body;
        console.log(req.body);
        const query = `INSERT INTO rec_questionnaire
        VALUES
        (?,
        ?,
        ?,
        ?,
        ?,
        ?)            
            `;
        mysqlConn.query(query,[ idQuestionnaire, codQuestionnaire, nameQuestionnaire, descriptionQuestionnaire, dateQuestionnaire, idQuestion ], (err, rows, fields) => {
            if(!err){
                res.json({Status: 'Cuestionario insertado' });
            } else{
                console.log(err);
            }
        });
    });









router.put('/:id', (req, res) =>{
    const { nameCompany, addressCompany, countryCompany, phoneCompany, mailCompany  } = req.body;
    const { id } = req.params;
    const query = `UPDATE REC_COMPANY
        SET nameCompany = ?,
            addressCompany = ?,
            countryCompany = ?,
            phoneCompany = ?,
            mailCompany = ?
        WHERE idCompany = ?`;
    mysqlConn.query(query, [nameCompany, addressCompany, countryCompany, phoneCompany, mailCompany,id], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Compañía actualizada' });
        } else{
            console.log(err);
        }
    });

});

module.exports = router;