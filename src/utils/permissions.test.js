import { canManageTasks } from './permissions';

describe('canManageTasks', () => {
  it('allows admins to manage tasks', () => {
    expect(canManageTasks('Admin')).toBe(true);
  });

  it('blocks regular users from managing tasks', () => {
    expect(canManageTasks('User')).toBe(false);
  });
});
