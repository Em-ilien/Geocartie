import { error } from '@sveltejs/kit';
import { departments } from '../data.js';

export function load({ params }) {
	const department = departments.find((department) => department.id == params.id);

	if (!department) throw error(404);
	
	return {
		department: department
	};
}