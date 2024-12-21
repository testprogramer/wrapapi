const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Stock Infomation API',
            version: '1.0.0',
            description: 'Mô tả API lấy thông tin cổ phiếu',
        },
    },
    apis: ['./src/*.js'], // Đường dẫn đến file định nghĩa API
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
