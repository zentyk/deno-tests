import { join } from 'https://deno.land/std@0.83.0/path/mod.ts';

const [path = "."] = Deno.args;

await Deno.permissions.request({
  name: "read",
  path,
});

for await (const dir of Deno.readDir(path)) {
  let fileInfo = await Deno.stat(join(path, dir.name));
  const modificationTime = fileInfo.mtime;
  const message = [
      fileInfo.size.toString().padEnd(4),
      `${modificationTime?.getUTCMonth().toString()}/ ${modificationTime?.getUTCDay().toString().padEnd(2)}`,
      dir.name
  ]
  console.log(message.join(""));
}