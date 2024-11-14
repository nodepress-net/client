export interface Repository<T> {
	save(entity: T): Promise<void>;
	find(params: unknown): Promise<T[]>;
	findOneBy(id: number): Promise<T | undefined>;
	delete(id: number): Promise<void>;
	update(id: number, entity: T): Promise<void>;
	count(params: unknown): Promise<number>;
}
