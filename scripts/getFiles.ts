import fs from "fs";
import path from "path";
const fsp = fs.promises;


export const getFiles = async (dir: string): Promise<Array<string>> => {
  const fileNames = await fsp.readdir(dir, { withFileTypes: false });
  const files = await fileNames.map((file) => path.join(dir, file));
  return files;
}


// async function main() {

//   const files = await getFiles('./scripts/')
//   console.log(files);
// }

// main()