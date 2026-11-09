/**
 * features/program/management Public API
 * domain: program, usecase: management
 */

// API
export {
  getPrograms,
  getUnusedPrograms,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
} from './api/api';

// Model
export { useList as useProgramList } from './model/useList';
export { useEditor as useProgramEditor } from './model/useEditor';
export { useAction as useProgramAction } from './model/useAction';

// UI
export { Grid as ProgramManagementGrid } from './ui/Grid';
export { Editor as ProgramManagementEditor } from './ui/Editor';
export { RelationDialog as ProgramManagementRelationDialog } from './ui/RelationDialog';
