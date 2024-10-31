import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = "http://localhost:8800/api";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URI,
  credentials: "include", // include cookies in requests
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Teams", "Tasks", "SubTasks"],
  endpoints: (builder) => ({

    // Fetch a user by ID
    // fetchUser: builder.query({
    //   query: (id) => `/user/${id}`,
    //   providesTags: (result, error, id) => [{ type: "User", id }],
    // }),

    // // Create a team
    // createTeam: builder.mutation({
    //   query: (team) => ({
    //     url: "/teams",
    //     method: "POST",
    //     body: team,
    //   }),
    //   invalidatesTags: [{ type: "Teams" }],
    // }),

    // Get all tasks
    // fetchTasks: builder.query({
    //   query: () => `/tasks`,
    //   providesTags: (result) =>
    //     result
    //       ? [...result.map(({ id }) => ({ type: "Tasks", id })), { type: "Tasks" }]
    //       : [{ type: "Tasks" }],
    // }),

    // Get a specific task by ID
    fetchTaskById: builder.query({
      query: (id) => `/task/${id}`,
      providesTags: (result, error, id) => [{ type: "Task", id }],
    }),

    // Create a new task
    // createTask: builder.mutation({
    //   query: (taskData) => ({
    //     url: "/tasks/create",
    //     method: "POST",
    //     body: taskData,
    //   }),
    //   invalidatesTags: [{ type: "Tasks" }],
    // }),

    // Duplicate a task by ID
    // duplicateTask: builder.mutation({
    //   query: (id) => ({
    //     url: `/tasks/duplicate/${id}`,
    //     method: "POST",
    //   }),
    //   invalidatesTags: [{ type: "Tasks", id }],
    // }),

    // // Add activity to a task by ID
    // postTaskActivity: builder.mutation({
    //   query: ({ id, activity }) => ({
    //     url: `/tasks/activity/${id}`,
    //     method: "POST",
    //     body: activity,
    //   }),
    //   invalidatesTags: [{ type: "Tasks", id }],
    // }),

    // Create a subtask under a task by ID
    createSubTask: builder.mutation({
      query: ({ id, subTaskData }) => ({
        url: `/task/create-subtask/${id}`,
        method: "PUT",
        body: subTaskData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Tasks", id }, { type: "SubTasks", id }],
    }),

    // Update a task by ID
    // updateTask: builder.mutation({
    //   query: ({ id, updatedData }) => ({
    //     url: `/tasks/update/${id}`,
    //     method: "PUT",
    //     body: updatedData,
    //   }),
    //   invalidatesTags: [{ type: "Tasks", id }],
    // }),

    // // Trash a task by ID
    // trashTask: builder.mutation({
    //   query: (id) => ({
    //     url: `/tasks/${id}`,
    //     method: "PUT",
    //   }),
    //   invalidatesTags: [{ type: "Tasks", id }],
    // }),

    // // Delete or restore a task by ID
    // deleteRestoreTask: builder.mutation({
    //   query: (id) => ({
    //     url: `/tasks/delete-restore/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [{ type: "Tasks", id }],
    // }),

    // // Fetch dashboard statistics
    // fetchDashboardStats: builder.query({
    //   query: () => `/tasks/dashboard`,
    // }),
  }),
});

// Export hooks for each endpoint
export const { 
  // useFetchUserQuery,
  // useCreateTeamMutation,
  // useFetchTasksQuery,
  useFetchTaskByIdQuery,
  // useCreateTaskMutation,
  // useDuplicateTaskMutation,
  // usePostTaskActivityMutation,
  useCreateSubTaskMutation,
  // useUpdateTaskMutation,
  // useTrashTaskMutation,
  // useDeleteRestoreTaskMutation,
  // useFetchDashboardStatsQuery,
} = apiSlice;
