import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    console.log('==> Run migration create_financial_invoices');
    
    await knex.raw(`
        CREATE SCHEMA IF NOT EXISTS legal_fiscal;
        
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        
        -- Hóa đơn pháp lý
        CREATE TABLE legal_fiscal.financial_invoices (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            tenant_id UUID NOT NULL,
            invoice_no VARCHAR(20),
            symbol VARCHAR(15),
            total_amount_before_tax DECIMAL(15,2),
            total_tax_amount DECIMAL(15,2),
            tax_authority_code VARCHAR(100),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE INDEX idx_fiscal_tenant_period ON legal_fiscal.financial_invoices(tenant_id, created_at);
        
        COMMENT ON COLUMN legal_fiscal.financial_invoices.tax_authority_code IS 'Mã CQ Thuế';
    `);

    console.log('==> Migration create_financial_invoices completed');
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw('DROP TABLE IF EXISTS legal_fiscal.financial_invoices');
    await knex.raw('DROP SCHEMA IF EXISTS legal_fiscal CASCADE');
    await knex.raw('DROP INDEX IF EXISTS idx_fiscal_tenant_period');

    console.log('==> Rollback create_financial_invoices completed');
}
