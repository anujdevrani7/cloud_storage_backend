import { z } from "zod"
export const createFolderSchema = z.object({
    parentFolderId: z.string().nullable(),
    folderName:z.string()
    .min(3,"folder name should be greater than 3 character")
    .max(15,"folder name not to be exceed than 15 character")
    .regex(/^[a-zA-Z0-9_-]+$/, "Folder name can only contain letters, numbers, underscores, and hyphens")
}).strict();


export type createFolderType = z.infer<typeof createFolderSchema>;

export const fileFolderSchema = z.object({
  folderId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ObjectId'),
});
export type fileFolderType=z.infer<typeof fileFolderSchema>