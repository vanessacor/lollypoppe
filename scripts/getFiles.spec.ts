import { Dirent } from "fs";
import * as fs from "fs";
import { getFiles } from "./getFiles";
const fsp = fs.promises;

const mockFile1 = "testFile1";
const mockFile2 = "testFile1";

// jest wrongly assumes the type of readdir to be Dirent and not string
const spy = jest.spyOn(fsp, "readdir") as unknown as jest.SpyInstance<
  Promise<string[]>
>;

describe("getFiles", () => {
  it("should return all files from a directory", async () => {

    const mockDir = [mockFile1, mockFile2];
    spy.mockImplementation(() => Promise.resolve(mockDir));

    const results = await getFiles("./test");

    expect(results).toHaveLength(2);
  });

  it("should return the right path for each file", async () => {
    const mockDir = [mockFile1, mockFile2];
    spy.mockImplementation(() => Promise.resolve(mockDir));

    const results = await getFiles("./test");

    expect(results[0]).toEqual("test/testFile1");
  })
});
