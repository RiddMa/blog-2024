import type { Collection } from "tinacms";

const Post: Collection = {
  label: "Blog Posts",
  name: "post",
  path: "public/content/posts",
  format: "md",
  // ui: {
  //   router: ({ document }) => {
  //     return `/article/${document._sys.filename}`;
  //   }
  // },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
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
      label: "Excerpt",
      name: "excerpt"
    },
    {
      type: "reference",
      label: "Author",
      name: "author",
      collections: ["author"]
    },
    {
      type: "object",
      label: "Categories",
      name: "categories",
      list: true,
      fields: [
        {
          type: "reference",
          label: "Category",
          name: "category",
          collections: ["category"]
        }
      ]
    },
    {
      type: "object",
      label: "Columns",
      name: "columns",
      list: true,
      fields: [
        {
          type: "reference",
          label: "Column",
          name: "column",
          collections: ["column"]
        }
      ]
    },
    {
      type: "string",
      label: "Tags",
      name: "tags",
      list: true,
      ui: {
        component: "tags"
      }
    },
    {
      type: "datetime",
      label: "Posted Date",
      name: "date",
      ui: {
        dateFormat: "YYYY MMMM DD",
        timeFormat: "hh:mm A"
      }
    },
    {
      type: "datetime",
      label: "Updated Date",
      name: "updateDate",
      ui: {
        dateFormat: "YYYY MMMM DD",
        timeFormat: "hh:mm A"
      }
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [
        {
          name: "DateTime",
          label: "Date & Time",
          inline: true,
          fields: [
            {
              name: "format",
              label: "Format",
              type: "string",
              options: ["utc", "iso", "local"]
            }
          ]
        },
        {
          name: "BlockQuote",
          label: "Block Quote",
          fields: [
            {
              name: "children",
              label: "Quote",
              type: "rich-text"
            },
            {
              name: "authorName",
              label: "Author",
              type: "string"
            }
          ]
        },
        {
          name: "NewsletterSignup",
          label: "Newsletter Sign Up",
          fields: [
            {
              name: "children",
              label: "CTA",
              type: "rich-text"
            },
            {
              name: "placeholder",
              label: "Placeholder",
              type: "string"
            },
            {
              name: "buttonText",
              label: "Button Text",
              type: "string"
            },
            {
              name: "disclaimer",
              label: "Disclaimer",
              type: "rich-text"
            }
          ],
          ui: {
            defaultItem: {
              placeholder: "Enter your email",
              buttonText: "Notify Me"
            }
          }
        }
      ],
      isBody: true
    }
  ]
};

export default Post;
