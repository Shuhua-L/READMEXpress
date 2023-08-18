const generateTableOfContents = (doc: string) => {
  // finds headings and their relative sizes
  let matches = Array.from(doc.matchAll(/\n(#+)[ \t](.+)\n/gm));
  let sizes = matches.map((groups) => groups[1].length);
  let headings = matches.map((groups) => groups[2]);

  // handle sizes
  let prevMin = 10;
  sizes = sizes.map((curr) => {
    if (curr < prevMin) {
      prevMin = curr;
      return 0;
    } else {
      return curr - prevMin;
    }
  });

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  // console.log({ sizes, headings });

  let TOC = `## Table of Contents  \n`;
  headings.forEach((h, i) => {
    let size = Math.min(sizes[i], 2);
    let tabs = new Array(size).fill("  ").join("");
    TOC += tabs + `* [${h}](#${slugify(h)}) \n`;
  });
  return TOC;
};

export default generateTableOfContents;
