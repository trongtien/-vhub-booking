import { Body, Controller, Get, Param, Post, UsePipes } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { CreateTenantUseCase, GetTenantByIdUseCase } from "@booking/serve-identity";
import { CreateTenantValidate } from "@booking/serve-identity";
import { z } from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation.pipe";

@ApiTags('tenants')
@Controller('tenants')
export class TenantController {
    constructor(
        private readonly createTenantUseCase: CreateTenantUseCase,
        private readonly getTenantByIdUseCase: GetTenantByIdUseCase
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a new tenant' })
    @ApiResponse({ status: 201, description: 'Tenant successfully created' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async createTenant(
        @Body(new ZodValidationPipe(CreateTenantValidate)) 
        request: z.infer<typeof CreateTenantValidate.schema>
    ) {
        const resultUseCaseInput = await CreateTenantValidate.fromUseCase(request);

        console.log("==> TenantController createTenant", { request, resultUseCaseInput });

        return null

        // return await this.createTenantUseCase.execute(resultUseCaseInput);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get tenant by ID' })
    @ApiParam({ name: 'id', description: 'Tenant ID' })
    @ApiResponse({ status: 200, description: 'Tenant found' })
    @ApiResponse({ status: 404, description: 'Tenant not found' })
    async getTenantById(@Param('id') id: string) {
        return await this.getTenantByIdUseCase.execute(id);
    }
}
