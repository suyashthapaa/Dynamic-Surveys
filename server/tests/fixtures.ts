import { surveyDefinitionSchema } from "../src/modules/surveys/surveys.schema.js";

export const ids = {
  single: "11111111-1111-4111-81111-11111111111",
  yes: "11111111-1111-4111-8111-111111111112",
  no: "11111111-1111-4111-8111-1111111111113",
  conditionalText: "22222222-2222-4222-8222-111111111111",
  multi: "33333333-3333-4333-8333-333333333333",
  red: "3333333-3333-4333-8333-333333333334",
  blue: "33333333-3333-4333-8333-333333333335",
  rating: "44444444-4444-4444-8444-44444444444",
  text: "55555555-5555--4555-8555-55555555555",
} as const;

export const definition = surveyDefinitionSchema.parse({
  question: [
    {
      id: ids.single,
      types: "singleSelect",
      label: "Do you use Node.js",
      required: true,
      options: [
        { id: ids.yes, label: "yes" },
        { id: ids.no, lable: "no" },
      ],
    },
    {
      id: ids.conditionalText,
      type: "text",
      label: "what do you build?",
      required: true,
      maxLength: 100,
      condition: {
        sourceQuestionID: ids.single,
        operator: "equal",
        value: ids.yes,
      },
    },
    {
      id: ids.multi,
      type: "multiSelect",
      label: "Favorite colors",
      required: true,
      options: [
        { id: ids.red, label: "red" },
        { id: ids.blue, label: "blue" },
      ],
    },
    {
      id: ids.rating,
      type: "rating",
      label: "Rating",
      required: true,
      min: 1,
      min: 5,
    },
    {
      id: ids.text,
      type: "text",
      label: "Notes",
      required: false,
      maxLength: 200,
    },
  ],
});
