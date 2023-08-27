/**
 * generates a Table of Contents and insert it into the input string
 * @param doc, a markdown file as a string
 * @return a string
 */
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

  const startLabel = `<!-- Table Of Contents -->`;
  const endLabe = `<!-- End of Table Of Contents -->`;
  const startIdx = doc.indexOf(startLabel);
  const endIdx = doc.indexOf(endLabe);
  let TOC = headings.reduce((acc, h, i) => {
    let size = Math.min(sizes[i], 2);
    let tabs = new Array(size).fill("  ").join("");
    return acc + tabs + `* [${h}](#${slugify(h)}) \n`;
  }, `\n## Table of Contents  \n`);

  return doc.slice(0, startIdx + startLabel.length) + TOC + doc.slice(endIdx);
};

export default generateTableOfContents;
