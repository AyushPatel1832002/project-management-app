import { canManageTasks } from './utils/permissions';

test('permits admin role to manage tasks', () => {
  expect(canManageTasks('Admin')).toBe(true);
});

test('blocks non-admin role from managing tasks', () => {
  expect(canManageTasks('User')).toBe(false);
});
