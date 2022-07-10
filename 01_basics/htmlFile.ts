//generated blob output to html using `deno run --allow-net 01_basics/htmlFile.ts > 01_basics/index.html`
fetch("https://deno.land/logo.svg ")
    .then(r =>r.blob())
    .then(async (img) => {
        const base64 = btoa(await img.text())
        console.log(`<html><img src="data:image/svg+xml;base64,${base64}"/></html>`)
    });