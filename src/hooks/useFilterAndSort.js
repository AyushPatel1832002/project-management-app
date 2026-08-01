import { useDispatch, useSelector } from 'react-redux';
import { setFilter, resetFilters } from '../store/slices/uiSlice';

export const useFilterAndSort = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.ui.filters);

  const applyFilters = (tasks) => {
    if (!tasks) return [];
    
    let filtered = [...tasks];

    // Search filter
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        (task) => 
          task.title.toLowerCase().includes(search) || 
          task.description?.toLowerCase().includes(search)
      );
    }

    // Priority filter
    if (filters.priority && filters.priority.length > 0) {
      filtered = filtered.filter((task) => filters.priority.includes(task.priority));
    }

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      if (filters.sortBy === 'priority') {
        const priorityScore = { High: 3, Medium: 2, Low: 1 };
        comparison = priorityScore[b.priority] - priorityScore[a.priority];
      } else if (filters.sortBy === 'dueDate') {
        comparison = new Date(a.dueDate) - new Date(b.dueDate);
      } else {
        comparison = new Date(a.createdAt) - new Date(b.createdAt);
      }
      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  };

  const setSearching = (search) => dispatch(setFilter({ search }));
  const setSorting = (sortBy, sortOrder = 'asc') => dispatch(setFilter({ sortBy, sortOrder }));
  const setPriorityFilter = (priority) => dispatch(setFilter({ priority }));
  const reset = () => dispatch(resetFilters());

  return {
    filters,
    applyFilters,
    setSearching,
    setSorting,
    setPriorityFilter,
    reset,
  };
};
