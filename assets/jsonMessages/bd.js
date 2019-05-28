module.exports = {
    notFound: {
        noRecords: {
            status: 404,
            title: "No records found",
            message: {
                eng: "No records found",
                pt: "Não foram encontrados dados"
            },
            success: false
        },
        noRecordsId: {
            status: 404,
            title: "No records found",
            message: {
                eng: "No records found with selected id",
                pt: "Não foram encontrados dados com o id selecionado"
            },
            success: false
        }
    },
    success: {
        successInsert: {
            status: 201,
            title: "Successful insert",
            message: {
                eng: "Record inserted with success",
                pt: "Dados inseridos com sucesso"
            },
            success: true
        },
        successUpdate: {
            status: 200,
            title: "Successful update",
            message: {
                eng: "Record updated with success",
                pt: "Dados alterados com sucesso"
            },
            success: true
        },
        successDelete: {
            status: 200,
            title: "Successful delete",
            message: {
                eng: "Record deleted with success",
                pt: "Dados apagados com sucesso"
            },
            success: true
        }
    },
    error: {
        dbError: {
            status: 400,
            title: "Database error",
            message: {
                eng: "Server connection error",
                pt: "Erro na ligação à base de dados"
            },
            success: false
        },
        errorInsert: {
            status: 201,
            title: "Invalid insert",
            message: {
                eng: "Cannot insert new record",
                pt: "Não é possível inserir novos dados"
            },
            success: false
        },
        errorDelete: {
            status: 201,
            title: "Cannot delete record",
            message: {
                eng: "Cannot delete record with selected id",
                pt: "Não é possível eliminar dados com o id selecionado"
            },
            success: false
        },
        duplicateEmail: {
            status: 409,
            title: "Duplicated email",
            message: {
                eng: "Email already registered!",
                pt: "O seu e-mail já se encontra registado!"
            },
            success: false,
            err_code: 1,
            err_message: "email já existente"
        },
        requiredData: {
            status: 400,
            title: "Data Missing",
            message: {
                eng: "Required fields are missing",
                pt: "Falta preencher dados obrigatórios"
            },
            success: false
        }
    },
};
