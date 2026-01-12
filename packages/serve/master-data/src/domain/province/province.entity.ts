export interface IProvinceEntityConfig {
  id: string;
  code: string;
  name: string;
  isActive: boolean;
}

export class ProvinceEntity {
  private constructor(private readonly props: IProvinceEntityConfig) {}

  static create(config: IProvinceEntityConfig): ProvinceEntity {
    return new ProvinceEntity(config);
  }
  get id(): string {
    return this.props.id;
  }

  get code(): string {
    return this.code;
  }

  get name(): string {
    return this.name;
  }

  get snapshot(): IProvinceEntityConfig {
    return { ...this.props };
  }
}
