import { fileTypes } from "../modals/file.modal"
export const defaultFileTypes = ['image', 'video', 'document', 'audio', 'others'];

export async function seedFileTypes() {
  try {
    const existingTypes = await fileTypes.find().distinct('fileType');

    const typesToAdd = defaultFileTypes.filter(type => !existingTypes.includes(type));

    if (typesToAdd.length > 0) {
      const inserts = typesToAdd.map(name => ({ fileType:name }));
      // console.log("value of the insert is  : ",inserts)
      await fileTypes.insertMany(inserts);
      console.log(`✅ Added missing file types: ${typesToAdd.join(', ')}`);
    } else {
      console.log('ℹ️ All default file types already exist — no action needed');
    }
  } catch (error) {
    console.error('❌ Failed to seed file types:', error);
    throw error; // Important: don't silently ignore errors in prod
  }
}