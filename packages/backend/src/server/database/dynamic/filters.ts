import { HttpException, HttpStatus } from '@nestjs/common';
import {
	Between,
	Equal,
	FindOptionsWhere,
	ILike,
	In,
	IsNull,
	LessThan,
	LessThanOrEqual,
	Like,
	MoreThan,
	MoreThanOrEqual,
	Not,
} from 'typeorm';

// TODO: Se podría usar varios filtros a la vez

export function buildWhereClause<Entity>(
	filters: Record<string, any>,
	columns: any[],
): FindOptionsWhere<Entity> {
	const columnsKeys = columns.map((column) => column.propertyName);

	const where: FindOptionsWhere<Entity> = {};

	Object.keys(filters).forEach((key) => {
		if (!columnsKeys.includes(key)) {
			throw new HttpException(
				`La columna '${key}' no existe en la entidad`,
				HttpStatus.BAD_REQUEST,
			);
		}

		const filter = filters[key];
		const conditions: Record<string, any> = {};

		Object.keys(filter).forEach((operator) => {
			const value = filter[operator];
			switch (operator) {
				case '$eq':
					conditions[key] = Equal(value);
					break;
				case '$ne':
					conditions[key] = Not(value);
					break;
				case '$lt':
					conditions[key] = LessThan(value);
					break;
				case '$lte':
					conditions[key] = LessThanOrEqual(value);
					break;
				case '$gt':
					conditions[key] = MoreThan(value);
					break;
				case '$gte':
					conditions[key] = MoreThanOrEqual(value);
					break;
				case '$in':
					conditions[key] = In(value);
					break;
				case '$notIn':
					conditions[key] = Not(In(value));
					break;
				case '$contains':
					conditions[key] = Like(`%${value}%`);
					break;
				case '$containsi':
					conditions[key] = ILike(`%${value}%`);
					break;
				case '$notContains':
					conditions[key] = Not(Like(`%${value}%`));
					break;
				case '$notContainsi':
					conditions[key] = Not(ILike(`%${value}%`));
					break;
				case '$startsWith':
					conditions[key] = Like(`${value}%`);
					break;
				case '$startsWithi':
					conditions[key] = ILike(`${value}%`);
					break;
				case '$endsWith':
					conditions[key] = Like(`%${value}`);
					break;
				case '$endsWithi':
					conditions[key] = ILike(`%${value}`);
					break;
				case '$between':
					conditions[key] = Between(value[0], value[1]);
					break;
				case '$null':
					conditions[key] = IsNull();
					break;
				case '$notNull':
					conditions[key] = Not(IsNull());
					break;
				default:
					throw new HttpException(
						`Operador desconocido: ${operator}`,
						HttpStatus.BAD_REQUEST,
					);
			}
		});

		Object.assign(where, conditions);
	});

	return where;
}
