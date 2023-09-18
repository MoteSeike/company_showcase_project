"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const passport = require("passport");
const ValidatePipe_1 = require("../lib/ValidatePipe");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle('Company ShowCase')
        .setDescription('The company showcase API description')
        .setVersion('1.0')
        .addTag('company')
        .setContact("Hello world", "/test", "test@df.com")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document, { customSiteTitle: "Student Register Backend", });
    app.use(passport.initialize());
    await app.useGlobalPipes(new ValidatePipe_1.ValidatePipe());
    const port = 3001;
    await app.listen(port);
    common_1.Logger.debug(`Application common listen port ${port} `);
}
bootstrap();
//# sourceMappingURL=main.js.map