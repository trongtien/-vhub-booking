
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    console.log('==> Run migration create_financial_invoices');
    
    await knex.raw(`
        if exists create schema master_data;

        create table  master_data.financial_invoices (
            invoice_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            tenant_id UUID REFERENCES tenants(tenant_id),
            invoice_no VARCHAR(20), -- Số hóa đơn của từng DN
            symbol VARCHAR(15),    -- Ký hiệu hóa đơn
            buyer_name VARCHAR(255),
            buyer_tax_code VARCHAR(20),
            total_exclusive DECIMAL(15,2), -- Tiền chưa thuế
            total_tax DECIMAL(15,2),       -- Tiền thuế
            total_inclusive DECIMAL(15,2), -- Tiền thanh toán
            tax_authority_code VARCHAR(100), -- Mã CQ Thuế trả về
            status VARCHAR(20),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        COMMENT ON COLUMN financial_invoices.invoice_no IS 'Số hóa đơn';
        COMMENT ON COLUMN financial_invoices.buyer_tax_code IS 'Mã số thuế khách hàng (đối với B2B)';
        COMMENT ON COLUMN financial_invoices.payment_method IS 'Tiền mặt, Chuyển khoản (Luật yêu cầu)';
        COMMENT ON COLUMN financial_invoices.tax_summary IS 'Lưu tổng hợp: {tax_8: 500, tax_10: 1000}';
    `);

    console.log('==> Migration create_financial_invoices completed');
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw('DROP TABLE IF EXISTS financial_invoices');
    
    console.log('==> Rollback create_financial_invoices completed');
}
