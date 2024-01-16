import type { Collection } from "tinacms";

const Column: Collection = {
  label: "Columns",
  name: "column",
  path: "public/content/columns",
  format: "mdx",
  // ui: {
  //   router: ({ document }) => {
  //     return `/categories/${document._sys.filename}`;
  //   }
  // },
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      isTitle: true,
      required: true
    },
    {
      type: "image",
      name: "heroImg",
      label: "Hero Image"
    },
    {
      type: "rich-text",
      label: "Description",
      name: "description",
      isBody: true
    }
  ]
};

export default Column;
