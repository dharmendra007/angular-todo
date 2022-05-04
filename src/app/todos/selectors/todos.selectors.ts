import { createSelector } from '@ngrx/store';

import { getTodosModuleState } from '@todos/reducers';
import { todosAdapter } from '@todos/states';
import { getRouterState } from '@app/reducers';

export const geTodosState = createSelector(
  getTodosModuleState,
  state => state.todos
);

export const {
  selectAll: getAllTodos,
  selectTotal: getCountAllTodos,
  selectEntities: getEntitiesTodos
} = todosAdapter.getSelectors(geTodosState);

export const getVisibleTodos = createSelector(
  getAllTodos,
  getRouterState,
  (todos, router) => {
    if (router?.state?.params) {
      const filter = router.state.params.filter;
        switch (filter) {
          default:
            return todos;
          case 'completed':
            return todos.filter(t => t.completed);
          case 'active':
            return todos.filter(t => !t.completed);
          case 'ascdate':
            return filterByDateAsc();
          case 'descdate':
            return filterByDateDesc();
        }
    }
    return todos;
  }
);

export const getTodo = createSelector(
  getEntitiesTodos,
  getRouterState,
  (entities, router) => {
    if (router?.state?.params) {
      const id = router.state.params.id;
      return entities[id];
    }
    return null;
  }
);

export const getCountVisibleTodos = createSelector(
  getVisibleTodos,
  (todos) => todos.length
);


export const getFilter = createSelector(
  getRouterState,
  (router) => {
    if (router.state && router.state.params.filter) {
      const filter = router.state.params.filter;
      switch (filter) {
        default:
          return 'all';
        case 'completed':
          return 'completed';
        case 'active':
          return 'active';
        case 'ascdate':
          return 'ascdate';
        case 'descdate':
          return 'descdate';
      }
    }
    return 'all';
  }
);

export const filterByDateAsc =()=>{
  
  let todosData = JSON.parse(localStorage.getItem("todoData"));
  console.log(todosData)
  todosData.sort((dateA, dateB) => dateA.addedDate - dateB.addedDate)
  return todosData;
}

export const filterByDateDesc =()=>{
  let todosData = JSON.parse(localStorage.getItem("todoData"));
  console.log(todosData)
  todosData.sort((dateA, dateB) => dateA.addedDate - dateB.addedDate)
  return todosData.reverse();
}
