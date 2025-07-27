/** Types generated for queries found in "src/main/queries/taskQueries.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type status = 'DONE' | 'IN_PROGRESS' | 'TODO';

export type DateOrString = Date | string;

export type NumberOrString = number | string;

/** 'GetAllTasks' parameters type */
export type IGetAllTasksParams = void;

/** 'GetAllTasks' return type */
export interface IGetAllTasksResult {
  created_at: Date;
  description: string | null;
  due_date: Date;
  id: number;
  status: status;
  title: string;
}

/** 'GetAllTasks' query type */
export interface IGetAllTasksQuery {
  params: IGetAllTasksParams;
  result: IGetAllTasksResult;
}

const getAllTasksIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM tasks ORDER BY created_at DESC, id DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM tasks ORDER BY created_at DESC, id DESC
 * ```
 */
export const getAllTasks = new PreparedQuery<IGetAllTasksParams,IGetAllTasksResult>(getAllTasksIR);


/** 'GetNumTasks' parameters type */
export type IGetNumTasksParams = void;

/** 'GetNumTasks' return type */
export interface IGetNumTasksResult {
  count: string;
}

/** 'GetNumTasks' query type */
export interface IGetNumTasksQuery {
  params: IGetNumTasksParams;
  result: IGetNumTasksResult;
}

const getNumTasksIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT COUNT(*) AS \"count!\" FROM tasks"};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT(*) AS "count!" FROM tasks
 * ```
 */
export const getNumTasks = new PreparedQuery<IGetNumTasksParams,IGetNumTasksResult>(getNumTasksIR);


/** 'GetTasksByCreatedDesc' parameters type */
export interface IGetTasksByCreatedDescParams {
  pageSize: NumberOrString;
  prevCreatedAt?: DateOrString | null | void;
  prevId?: number | null | void;
  status: status;
}

/** 'GetTasksByCreatedDesc' return type */
export interface IGetTasksByCreatedDescResult {
  created_at: Date;
  description: string | null;
  due_date: Date;
  id: number;
  status: status;
  title: string;
}

/** 'GetTasksByCreatedDesc' query type */
export interface IGetTasksByCreatedDescQuery {
  params: IGetTasksByCreatedDescParams;
  result: IGetTasksByCreatedDescResult;
}

const getTasksByCreatedDescIR: any = {"usedParamSet":{"status":true,"prevCreatedAt":true,"prevId":true,"pageSize":true},"params":[{"name":"status","required":true,"transform":{"type":"scalar"},"locs":[{"a":35,"b":42}]},{"name":"prevCreatedAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":55,"b":68},{"a":111,"b":124},{"a":143,"b":156}]},{"name":"prevId","required":false,"transform":{"type":"scalar"},"locs":[{"a":167,"b":173}]},{"name":"pageSize","required":true,"transform":{"type":"scalar"},"locs":[{"a":219,"b":228}]}],"statement":"SELECT *\nFROM tasks\nWHERE status = :status! AND ((CAST(:prevCreatedAt AS timestamptz) IS NULL OR (created_at < :prevCreatedAt OR (created_at = :prevCreatedAt AND id < :prevId))))\nORDER BY created_at DESC, id DESC\nLIMIT :pageSize!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM tasks
 * WHERE status = :status! AND ((CAST(:prevCreatedAt AS timestamptz) IS NULL OR (created_at < :prevCreatedAt OR (created_at = :prevCreatedAt AND id < :prevId))))
 * ORDER BY created_at DESC, id DESC
 * LIMIT :pageSize!
 * ```
 */
export const getTasksByCreatedDesc = new PreparedQuery<IGetTasksByCreatedDescParams,IGetTasksByCreatedDescResult>(getTasksByCreatedDescIR);


/** 'GetTasksByCreatedAsc' parameters type */
export interface IGetTasksByCreatedAscParams {
  pageSize: NumberOrString;
  prevCreatedAt?: DateOrString | null | void;
  prevId?: number | null | void;
  status: status;
}

/** 'GetTasksByCreatedAsc' return type */
export interface IGetTasksByCreatedAscResult {
  created_at: Date;
  description: string | null;
  due_date: Date;
  id: number;
  status: status;
  title: string;
}

/** 'GetTasksByCreatedAsc' query type */
export interface IGetTasksByCreatedAscQuery {
  params: IGetTasksByCreatedAscParams;
  result: IGetTasksByCreatedAscResult;
}

const getTasksByCreatedAscIR: any = {"usedParamSet":{"status":true,"prevCreatedAt":true,"prevId":true,"pageSize":true},"params":[{"name":"status","required":true,"transform":{"type":"scalar"},"locs":[{"a":35,"b":42}]},{"name":"prevCreatedAt","required":false,"transform":{"type":"scalar"},"locs":[{"a":55,"b":68},{"a":111,"b":124},{"a":143,"b":156}]},{"name":"prevId","required":false,"transform":{"type":"scalar"},"locs":[{"a":167,"b":173}]},{"name":"pageSize","required":true,"transform":{"type":"scalar"},"locs":[{"a":217,"b":226}]}],"statement":"SELECT *\nFROM tasks\nWHERE status = :status! AND ((CAST(:prevCreatedAt as timestamptz) IS NULL OR (created_at > :prevCreatedAt OR (created_at = :prevCreatedAt AND id > :prevId))))\nORDER BY created_at ASC, id ASC\nLIMIT :pageSize!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM tasks
 * WHERE status = :status! AND ((CAST(:prevCreatedAt as timestamptz) IS NULL OR (created_at > :prevCreatedAt OR (created_at = :prevCreatedAt AND id > :prevId))))
 * ORDER BY created_at ASC, id ASC
 * LIMIT :pageSize!
 * ```
 */
export const getTasksByCreatedAsc = new PreparedQuery<IGetTasksByCreatedAscParams,IGetTasksByCreatedAscResult>(getTasksByCreatedAscIR);


/** 'GetTasksByDueDateDesc' parameters type */
export interface IGetTasksByDueDateDescParams {
  pageSize: NumberOrString;
  prevDueDate?: DateOrString | null | void;
  prevId?: number | null | void;
  status: status;
}

/** 'GetTasksByDueDateDesc' return type */
export interface IGetTasksByDueDateDescResult {
  created_at: Date;
  description: string | null;
  due_date: Date;
  id: number;
  status: status;
  title: string;
}

/** 'GetTasksByDueDateDesc' query type */
export interface IGetTasksByDueDateDescQuery {
  params: IGetTasksByDueDateDescParams;
  result: IGetTasksByDueDateDescResult;
}

const getTasksByDueDateDescIR: any = {"usedParamSet":{"status":true,"prevDueDate":true,"prevId":true,"pageSize":true},"params":[{"name":"status","required":true,"transform":{"type":"scalar"},"locs":[{"a":35,"b":42}]},{"name":"prevDueDate","required":false,"transform":{"type":"scalar"},"locs":[{"a":55,"b":66},{"a":107,"b":118},{"a":135,"b":146}]},{"name":"prevId","required":false,"transform":{"type":"scalar"},"locs":[{"a":157,"b":163}]},{"name":"pageSize","required":true,"transform":{"type":"scalar"},"locs":[{"a":207,"b":216}]}],"statement":"SELECT *\nFROM tasks\nWHERE status = :status! AND ((CAST(:prevDueDate AS timestamptz) IS NULL OR (due_date < :prevDueDate OR (due_date = :prevDueDate AND id < :prevId))))\nORDER BY due_date DESC, id DESC\nLIMIT :pageSize!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM tasks
 * WHERE status = :status! AND ((CAST(:prevDueDate AS timestamptz) IS NULL OR (due_date < :prevDueDate OR (due_date = :prevDueDate AND id < :prevId))))
 * ORDER BY due_date DESC, id DESC
 * LIMIT :pageSize!
 * ```
 */
export const getTasksByDueDateDesc = new PreparedQuery<IGetTasksByDueDateDescParams,IGetTasksByDueDateDescResult>(getTasksByDueDateDescIR);


/** 'GetTasksByDueDateAsc' parameters type */
export interface IGetTasksByDueDateAscParams {
  pageSize: NumberOrString;
  prevDueDate?: DateOrString | null | void;
  prevId?: number | null | void;
  status: status;
}

/** 'GetTasksByDueDateAsc' return type */
export interface IGetTasksByDueDateAscResult {
  created_at: Date;
  description: string | null;
  due_date: Date;
  id: number;
  status: status;
  title: string;
}

/** 'GetTasksByDueDateAsc' query type */
export interface IGetTasksByDueDateAscQuery {
  params: IGetTasksByDueDateAscParams;
  result: IGetTasksByDueDateAscResult;
}

const getTasksByDueDateAscIR: any = {"usedParamSet":{"status":true,"prevDueDate":true,"prevId":true,"pageSize":true},"params":[{"name":"status","required":true,"transform":{"type":"scalar"},"locs":[{"a":35,"b":42}]},{"name":"prevDueDate","required":false,"transform":{"type":"scalar"},"locs":[{"a":55,"b":66},{"a":107,"b":118},{"a":135,"b":146}]},{"name":"prevId","required":false,"transform":{"type":"scalar"},"locs":[{"a":157,"b":163}]},{"name":"pageSize","required":true,"transform":{"type":"scalar"},"locs":[{"a":206,"b":215}]}],"statement":"SELECT *\nFROM tasks\nWHERE status = :status! AND ((CAST(:prevDueDate AS timestamptz) IS NULL OR (due_date > :prevDueDate OR (due_date = :prevDueDate AND id > :prevId))))\nORDER BY due_date ASC, id ASC \nLIMIT :pageSize!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM tasks
 * WHERE status = :status! AND ((CAST(:prevDueDate AS timestamptz) IS NULL OR (due_date > :prevDueDate OR (due_date = :prevDueDate AND id > :prevId))))
 * ORDER BY due_date ASC, id ASC 
 * LIMIT :pageSize!
 * ```
 */
export const getTasksByDueDateAsc = new PreparedQuery<IGetTasksByDueDateAscParams,IGetTasksByDueDateAscResult>(getTasksByDueDateAscIR);


/** 'FindById' parameters type */
export interface IFindByIdParams {
  taskId: number;
}

/** 'FindById' return type */
export interface IFindByIdResult {
  created_at: Date;
  description: string | null;
  due_date: Date;
  id: number;
  status: status;
  title: string;
}

/** 'FindById' query type */
export interface IFindByIdQuery {
  params: IFindByIdParams;
  result: IFindByIdResult;
}

const findByIdIR: any = {"usedParamSet":{"taskId":true},"params":[{"name":"taskId","required":true,"transform":{"type":"scalar"},"locs":[{"a":31,"b":38}]}],"statement":"SELECT * FROM tasks WHERE id = :taskId!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM tasks WHERE id = :taskId!
 * ```
 */
export const findById = new PreparedQuery<IFindByIdParams,IFindByIdResult>(findByIdIR);


/** 'UpdateStatus' parameters type */
export interface IUpdateStatusParams {
  newStatus: status;
  taskId: number;
}

/** 'UpdateStatus' return type */
export interface IUpdateStatusResult {
  status: status;
}

/** 'UpdateStatus' query type */
export interface IUpdateStatusQuery {
  params: IUpdateStatusParams;
  result: IUpdateStatusResult;
}

const updateStatusIR: any = {"usedParamSet":{"newStatus":true,"taskId":true},"params":[{"name":"newStatus","required":true,"transform":{"type":"scalar"},"locs":[{"a":26,"b":36}]},{"name":"taskId","required":true,"transform":{"type":"scalar"},"locs":[{"a":49,"b":56}]}],"statement":"UPDATE tasks SET status = :newStatus! WHERE id = :taskId!\nRETURNING status"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE tasks SET status = :newStatus! WHERE id = :taskId!
 * RETURNING status
 * ```
 */
export const updateStatus = new PreparedQuery<IUpdateStatusParams,IUpdateStatusResult>(updateStatusIR);


/** 'DeleteTask' parameters type */
export interface IDeleteTaskParams {
  taskId: number;
}

/** 'DeleteTask' return type */
export interface IDeleteTaskResult {
  id: number;
}

/** 'DeleteTask' query type */
export interface IDeleteTaskQuery {
  params: IDeleteTaskParams;
  result: IDeleteTaskResult;
}

const deleteTaskIR: any = {"usedParamSet":{"taskId":true},"params":[{"name":"taskId","required":true,"transform":{"type":"scalar"},"locs":[{"a":29,"b":36}]}],"statement":"DELETE FROM tasks WHERE id = :taskId!\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM tasks WHERE id = :taskId!
 * RETURNING id
 * ```
 */
export const deleteTask = new PreparedQuery<IDeleteTaskParams,IDeleteTaskResult>(deleteTaskIR);


/** 'InsertTask' parameters type */
export interface IInsertTaskParams {
  description?: string | null | void;
  due_date: DateOrString;
  status: status;
  title: string;
}

/** 'InsertTask' return type */
export interface IInsertTaskResult {
  created_at: Date;
  description: string | null;
  due_date: Date;
  id: number;
  status: status;
  title: string;
}

/** 'InsertTask' query type */
export interface IInsertTaskQuery {
  params: IInsertTaskParams;
  result: IInsertTaskResult;
}

const insertTaskIR: any = {"usedParamSet":{"title":true,"description":true,"status":true,"due_date":true},"params":[{"name":"title","required":true,"transform":{"type":"scalar"},"locs":[{"a":65,"b":71}]},{"name":"description","required":false,"transform":{"type":"scalar"},"locs":[{"a":74,"b":85}]},{"name":"status","required":true,"transform":{"type":"scalar"},"locs":[{"a":88,"b":95}]},{"name":"due_date","required":true,"transform":{"type":"scalar"},"locs":[{"a":98,"b":107}]}],"statement":"INSERT INTO tasks (title, description, status, due_date)\nVALUES (:title!, :description, :status!, :due_date!)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO tasks (title, description, status, due_date)
 * VALUES (:title!, :description, :status!, :due_date!)
 * RETURNING *
 * ```
 */
export const insertTask = new PreparedQuery<IInsertTaskParams,IInsertTaskResult>(insertTaskIR);


