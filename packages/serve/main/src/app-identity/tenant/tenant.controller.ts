import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { CreateTenantUseCase, GetTenantByIdUseCase } from "@booking/serve-identity";
import type { ICreateTenantUseCase } from "@booking/serve-identity";
import { CreateTenantValidate } from "@booking/serve-identity";
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
    @ApiResponse({ status: 400, description: 'Bad request - Validation error' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async createTenant(
        @Body(new ZodValidationPipe(CreateTenantValidate)) 
        request: ICreateTenantUseCase
    ) {
        // Validation and transformation handled by ZodValidationPipe
        // request is already validated and transformed to ICreateTenantUseCase
        return await this.createTenantUseCase.execute(request);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get tenant by ID' })
    @ApiParam({ name: 'id', description: 'Tenant ID', type: String })
    @ApiResponse({ status: 200, description: 'Tenant found' })
    @ApiResponse({ status: 404, description: 'Tenant not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async getTenantById(@Param('id') id: string) {
        return await this.getTenantByIdUseCase.execute(id);
    }
}
