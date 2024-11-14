export const entities = [
	{
		name: 'customer',
		options: {
			draftAndPublish: true,
		},
		columns: {
			name: {
				type: 'text',
				length: 150,
			},
			email: {
				type: 'text',
				length: 150,
				unique: true,
			},
			password: {
				type: 'text',
				length: 255,
			},
			address: {
				type: 'text',
				nullable: true,
			},
			phoneNumber: {
				type: 'text',
				length: 20,
				nullable: true,
			},
		},
	},
];
