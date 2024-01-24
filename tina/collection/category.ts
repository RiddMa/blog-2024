import type { Collection } from "tinacms";

const Category: Collection = {
  label: "Categories",
  name: "category",
  path: "public/content/categories",
  format: "md",
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

export default Category;
