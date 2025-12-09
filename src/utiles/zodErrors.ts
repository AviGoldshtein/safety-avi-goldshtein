export function mapZodIssuesToFormErrors(issues: any[]) {
  const formErrors: Record<string, string> = {};

  for (const issue of issues) {
    const field = issue.path[0];
    formErrors[field] = issue.message;
  }

  return formErrors;
}
