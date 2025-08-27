import { z } from 'zod';
const objectIdRegex = /^[a-f\d]{24}$/i;
export const generateSignedUrlSchema = z.object({
    fileName: z.string().min(1, 'Last name is required'),
    mimeType: z.string().min(2, 'Please provide a valid mime type'),
    userId:z.string().max(24,'Please  provide a valid user id '),
    folderId: z.union([
        z.string().regex(objectIdRegex, { message: 'Invalid MongoDB ObjectId format' }),
        z.null()
    ])
}).strict(); // .strict() ensures no extra fields are allowed
export type generateSignedUrlSchemaType = z.infer<typeof generateSignedUrlSchema>;


