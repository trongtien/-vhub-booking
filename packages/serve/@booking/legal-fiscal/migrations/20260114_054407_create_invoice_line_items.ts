
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    console.log('==> Run migration create_invoice_line_items');
    await knex.raw(`
        CREATE SCHEMA IF NOT EXISTS legal_fiscal;

        -- Chi tiết hóa đơn (bang ke thuế 01/GTGT)
        CREATE TABLE legal_fiscal.invoice_line_items (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            invoice_id UUID REFERENCES legal_fiscal.financial_invoices(id),
            description VARCHAR(255) DEFAULT null,
            item_name_snapshot VARCHAR(255),
            qty DECIMAL(15,2),
            unit_price DECIMAL(15,2),
            tax_rate DECIMAL(5,2),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        COMMENT ON COLUMN legal_fiscal.invoice_line_items.item_name_snapshot IS 'Lưu tên tại thời điểm bán để không bị đổi khi item đổi tên';
    `);

    
    console.log('==> Migration create_invoice_line_items completed');
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw('DROP TABLE IF EXISTS legal_fiscal.invoice_line_items');
    console.log('==> Rollback create_invoice_line_items completed');
}
