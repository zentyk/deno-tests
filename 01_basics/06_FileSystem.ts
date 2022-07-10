//`deno run --allow-read 06_FileSystem.ts`
import { green } from "https://deno.land/std@0.83.0/fmt/colors.ts";
const decoder = new TextDecoder();
const content = await Deno.readFile('./import-maps.json');
console.log(green(decoder.decode(content)));
//await Deno.writeFile('./copied-imports.json', content);