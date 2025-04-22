import { createFeatureSelector, createSelector } from '@ngrx/store';
import { initialState,todoReducer } from '../store/reducer';
import {TODO,todos} from '../store/state'

export const selectTaskState = createFeatureSelector<todos>('task');

export const selectAllTasks = createSelector(
  selectTaskState,
  (state: todos) => state.todo
);

