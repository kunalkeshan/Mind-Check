import { beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

describe('Navbar Test', () => {
	beforeEach(() => {
		render(
			<BrowserRouter>
				<Navbar />
			</BrowserRouter>
		);
	});
	test('should show title', () => {
		expect(screen.getByText(/Mind Check/i)).toBeDefined();
	});

	test('should show nav element', () => {
		expect(screen.getByText(/Home/i)).toBeDefined();
		expect(screen.getByText(/Features/i)).toBeDefined();
	});
});
