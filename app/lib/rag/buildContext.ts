export function buildContext(
    responses: { answers: unknown }[]
  ) {
    return responses
      .map((response, index) => {
        return `Response ${index + 1}:
  ${JSON.stringify(response.answers)}`;
      })
      .join("\n\n");
  }