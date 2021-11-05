import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Todo } from '@todos/models';

export type TodosState = EntityState<Todo>;

export const todosAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();
